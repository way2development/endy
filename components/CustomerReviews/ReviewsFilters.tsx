import { useEffect, useState, BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { getIsMobileDevice } from './../../utils'

import { Dropdown } from '../Dropdown'
import { Button } from '../Button'

import {
  sortByListEN,
  sortByListFR,
  sleepPositionListEN,
  sleepPositionListFR,
  searchIcon
} from './utils'

import {
  useUpdateReviewFilters,
  useReviewFilters,
  useClearReviewFilters
} from '../../lib/context'
import {
  StyledInputWrapper,
  StyledSearchInput,
  StyledFilterTitle,
  StyledDropdownContainer,
  StyledFilterSection,
  StyledDropdownFilter,
  StyledKeywordButton,
  StyledFilterHeading,
  StyledSleepPositionDropdownFilter
} from './CustomerReviews.styled'

import { KeywordProps } from './CustomerReviews'

interface ReviewFiltersProps {
  productId: number
  locale: Locale
  fetchReviews: (productId: number, lastIndex: number) => void
  keywords?: KeywordProps[]
}

export const ReviewsFilters = ({
  productId,
  locale,
  fetchReviews,
  keywords
}: ReviewFiltersProps) => {
  const localizedDictionary = dictionary[locale]

  const updateReviewFilters = useUpdateReviewFilters()
  const clearFilters = useClearReviewFilters()
  const reviewFilters = useReviewFilters()
  const [resetDropdown, setResetDropdown] = useState(false)
  const isKeywordSearchActive =
    reviewFilters['keywordSearch'] !== '' ||
    reviewFilters['sleepPosition'] !== ''

  const filterResults = (option: string, selectedFilter: string) => {
    setResetDropdown(false)
    updateReviewFilters({ [selectedFilter]: option })
  }

  const resetFilters = () => {
    clearFilters()
    setResetDropdown(true)
    reset()
  }

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false
  })
  const keywordSearch = register('keywordSearch')

  const onSubmit = (
    data: Record<string, string>,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault()

    updateReviewFilters({ keywordSearch: data.keywordSearch })
  }

  const isMobile = getIsMobileDevice()
  const numberOfVisibleWords = isMobile ? 5 : 8
  const visibleKeywords = keywords && keywords.slice(0, numberOfVisibleWords)
  const hiddenKeywords =
    keywords && keywords.slice(numberOfVisibleWords, keywords.length)
  const [showMoreKeywords, setShowMoreKeywords] = useState(false)

  useEffect(() => {
    fetchReviews(productId, 0)
  }, [
    reviewFilters['selectedSort'],
    reviewFilters['sleepPosition'],
    reviewFilters['keywordSearch']
  ])

  return (
    <StyledFilterSection>
      <StyledFilterHeading>
        <StyledFilterTitle color={'gravy'} variant={'mediumBody'}>
          {localizedDictionary.filterReviews}
        </StyledFilterTitle>
        {isKeywordSearchActive && (
          <Button
            label={localizedDictionary.clearAll}
            onClick={() => resetFilters()}
            variant='block-line-gravy'
          />
        )}
      </StyledFilterHeading>
      <form onSubmit={handleSubmit((...params) => onSubmit(...params))}>
        <StyledInputWrapper>
          <StyledSearchInput
            type='text'
            placeholder={localizedDictionary.search}
            {...keywordSearch}
          />
          {searchIcon}
        </StyledInputWrapper>
      </form>
      {keywords && (
        <div>
          {visibleKeywords &&
            visibleKeywords.map((keyword) => {
              return (
                <StyledKeywordButton
                  key={keyword.label}
                  isSelected={
                    reviewFilters['keywordSearch'] === keyword.searchTerm
                      ? true
                      : false
                  }
                  onClick={() =>
                    filterResults(keyword.searchTerm, 'keywordSearch')
                  }
                >
                  {keyword.label}
                </StyledKeywordButton>
              )
            })}

          {showMoreKeywords &&
            hiddenKeywords &&
            hiddenKeywords.map((keyword) => {
              return (
                <StyledKeywordButton
                  key={keyword.label}
                  isSelected={
                    reviewFilters['keywordSearch'] === keyword.searchTerm
                      ? true
                      : false
                  }
                  onClick={() =>
                    filterResults(keyword.searchTerm, 'keywordSearch')
                  }
                >
                  {keyword.label}
                </StyledKeywordButton>
              )
            })}

          {hiddenKeywords && hiddenKeywords.length > 0 && (
            <StyledKeywordButton
              isSelected={false}
              onClick={() =>
                showMoreKeywords
                  ? setShowMoreKeywords(false)
                  : setShowMoreKeywords(true)
              }
              aria-label={
                showMoreKeywords
                  ? localizedDictionary.hideAdditionalKeywords
                  : localizedDictionary.showMoreKeywords
              }
            >
              ...
            </StyledKeywordButton>
          )}
        </div>
      )}

      <StyledDropdownContainer>
        <StyledDropdownFilter>
          <Dropdown
            label={localizedDictionary.sortBy}
            handleChange={(option) => filterResults(option, 'selectedSort')}
            handleClick={(option) => filterResults(option, 'selectedSort')}
            options={locale === 'fr' ? sortByListFR : sortByListEN}
            variant={'offWhite'}
            resetDropdown={resetDropdown}
          />
        </StyledDropdownFilter>
        <StyledSleepPositionDropdownFilter locale={locale}>
          <Dropdown
            label={localizedDictionary.sleepPosition}
            handleChange={(option) => filterResults(option, 'sleepPosition')}
            handleClick={(option) => filterResults(option, 'sleepPosition')}
            options={
              locale === 'fr' ? sleepPositionListFR : sleepPositionListEN
            }
            variant={'offWhite'}
            resetDropdown={resetDropdown}
          />
        </StyledSleepPositionDropdownFilter>
      </StyledDropdownContainer>
    </StyledFilterSection>
  )
}
