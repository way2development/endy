import React, { useEffect, useState } from 'react'
import { Children } from 'react'

import {
  StyledFlexContainer,
  StyledPagination,
  StyledPaginationButtons,
  StyledPaginationButton,
  StyledPageNumberContainer,
  StyledIndex
} from './Pagination.styled'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { StyledVisuallyHidden } from '../../styles/global.styled'

import { Text } from '../Text'

import {
  useUpdateReviewPage,
  useReviewPage,
  useReviewFilters
} from '../../lib/context'

import { RESULTS_PER_PAGE } from '../../utils/getYotpoReviews'
interface PaginationProps {
  currentResults: any[]
  children: React.ReactNode | React.ReactNode[]
  locale: Locale
  totalResults: number
  resultsPerPage: number
  containerId: string
  indexOfLastResult?: number
  range: number
  rangeLeft: number
  rangeRight: number
  getAdditionalData?: (index: number) => void
  showIndexes: boolean
  dynamicPadding?: string
}

const createRange = (start: number, end: number) => {
  const range: number[] = []

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
}

export const Pagination = ({
  children,
  containerId,
  getAdditionalData,
  locale,
  totalResults,
  resultsPerPage,
  indexOfLastResult,
  range,
  rangeLeft = 1,
  rangeRight = 3,
  showIndexes,
  currentResults,
  dynamicPadding,
}: PaginationProps) => {
  const localizedDictionary = dictionary[locale]

  const allResults = Children.toArray(children)

  const updateReviewPage = useUpdateReviewPage()
  const reviewPage = useReviewPage()
  const reviewFilters = useReviewFilters()

  // TODO: See if we can further type and remove any keyword
  const [paginatedReviews, setPaginatedReviews] = useState<any>([])

  const [currentPage, setCurrentPage] = useState(1)

  const [indexOfFirstItem, setIndexOfFirstItem] = useState(
    indexOfLastResult ? indexOfLastResult : 0
  )
  const [indexOfLastItem, setIndexOfLastItem] = useState(
    indexOfFirstItem + resultsPerPage
  )
  const [pageNumbers, setPageNumbers] = useState(
    createRange(rangeLeft, rangeRight)
  )

  useEffect(() => {
    updatePage(currentPage)
  }, [indexOfLastResult, currentResults])

  // If Yotpo filters update, reset pagination to page 1
  useEffect(() => {
    updatePage(1)
  }, [
    reviewFilters['selectedSort'],
    reviewFilters['sleepPosition'],
    reviewFilters['keywordSearch'],
    totalResults
  ])

  // Triggers additional fetch requests if results are paginated from the API. Currently used for Yotpo.
  useEffect(() => {
    getAdditionalData && getAdditionalData(indexOfLastItem)
  }, [reviewPage])

  const updatePage = (currentPage: number) => {
    const firstIndex = (currentPage - 1) * resultsPerPage
    const lastIndex = firstIndex + resultsPerPage

    if (lastIndex >= allResults.length && allResults.length < totalResults) {
      const nextPage = (lastIndex + RESULTS_PER_PAGE) / RESULTS_PER_PAGE
      updateReviewPage(Math.floor(nextPage))
    }
    const currentItems = allResults.slice(firstIndex, lastIndex)

    const totalPages = Math.round(totalResults / resultsPerPage)

    updatePageNumberRange(currentPage, range, totalPages)
    setCurrentPage(currentPage)
    setIndexOfLastItem(lastIndex)
    setIndexOfFirstItem(firstIndex)
    setPaginatedReviews(currentItems)
  }

  const updatePageNumberRange = (
    currentPage: number,
    range: number,
    totalPages: number
  ) => {
    let maxRangeLeft = currentPage - Math.floor(range / 2)

    let maxRangeRight = currentPage + Math.floor(range / 2)

    if (maxRangeLeft < 1) {
      maxRangeLeft = 1
      maxRangeRight = range
    }

    if (maxRangeRight > totalPages) {
      maxRangeLeft = totalPages - (range - 1)

      if (maxRangeLeft < 1) {
        maxRangeLeft = 1
      }

      maxRangeRight = totalPages
    }

    setPageNumbers(createRange(maxRangeLeft, maxRangeRight))
  }

  const scrollToTop = () => {
    // TODO: Remove DOM selector and implement Refs
    const container = document.getElementById(containerId)

    if (!container) return

    // TODO: Revisit offset once product sticky nav is added. The offset will need to be adjusted so the heading isn't cut off.
    const offset = container.offsetTop

    const STICKY_NAV_OFFSET = 80
    const HEADER_OFFSET = 60
    const pageOffset = STICKY_NAV_OFFSET + HEADER_OFFSET

    window.scrollTo({
      top: offset - pageOffset,
      behavior: 'smooth'
    })
  }

  const paginationIndex =
    locale === 'en'
      ? `Displaying Reviews ${indexOfFirstItem + 1} to ${indexOfLastItem}`
      : `Affichage des avis ${indexOfFirstItem + 1} à ${indexOfLastItem}`

  return (
    <>
      {paginatedReviews &&
        paginatedReviews.map((review: React.ReactNode) => {
          return React.isValidElement(review)
            ? React.cloneElement(review)
            : review
        })}
      <StyledPagination dynamicPadding={dynamicPadding}>
        {showIndexes && (
          <StyledIndex variant='smallBody' color='gravy80' element='div'>
            {paginationIndex}
          </StyledIndex>
        )}
        <StyledFlexContainer>
          <StyledPaginationButtons>
            {indexOfFirstItem > 0 && (
              <StyledPaginationButton
                aria-label={localizedDictionary.previous}
                onClick={() => {
                  updatePage(currentPage - 1)
                  scrollToTop()
                }}
              >
                {/* TODO: Replace with the Icon component once ready */}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/cd9263d6b93b97e297cdbd5ed63c87c220718ecf-32x33.svg'
                  alt=''
                />
              </StyledPaginationButton>
            )}

            <StyledPageNumberContainer>
              {pageNumbers.map((pageNumber) => {
                return (
                  <StyledPaginationButton
                    key={pageNumber}
                    onClick={() => {
                      updatePage(pageNumber)
                      scrollToTop()
                    }}
                  >
                    {pageNumber === currentPage ? (
                      <Text
                        variant={'mediumBody'}
                        color={'gravy'}
                        element={'span'}
                      >
                        <StyledVisuallyHidden>
                          {localizedDictionary.skipToPage}
                        </StyledVisuallyHidden>
                        <strong>{pageNumber}</strong>
                      </Text>
                    ) : (
                      <Text
                        variant={'mediumBody'}
                        color={'gravy70'}
                        element={'span'}
                      >
                        <StyledVisuallyHidden>
                          {localizedDictionary.skipToPage}
                        </StyledVisuallyHidden>
                        {pageNumber}
                      </Text>
                    )}
                  </StyledPaginationButton>
                )
              })}
            </StyledPageNumberContainer>

            {indexOfLastItem < totalResults && (
              <StyledPaginationButton
                onClick={() => {
                  updatePage(currentPage + 1)
                  scrollToTop()
                }}
                aria-label={localizedDictionary.next}
              >
                {/* TODO: replace with the Icon component once ready */}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/acc0bb555cee2da9da27f0f45b722f941f6b3749-32x33.svg'
                  alt=''
                />
              </StyledPaginationButton>
            )}
          </StyledPaginationButtons>
        </StyledFlexContainer>
      </StyledPagination>
    </>
  )
}
