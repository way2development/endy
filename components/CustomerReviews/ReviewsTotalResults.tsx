import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { getThousandsSeparator } from '../../utils'
import { StyledSemibold } from '../../styles/global.styled'

import {
  StyledTotalResults,
  StyledTotalResultsContainer
} from './CustomerReviews.styled'

interface ReviewsTotalResultsProps {
  totalResults: number
  locale: Locale
}

export const ReviewsTotalResults = ({
  totalResults,
  locale
}: ReviewsTotalResultsProps) => {
  const localizedDictionary = dictionary[locale]

  const formattedTotalResults = getThousandsSeparator(
    totalResults.toString(),
    locale
  )
  return (
    <StyledTotalResultsContainer>
      <StyledTotalResults color={'gravy'} variant={'largeBody'}>
        <StyledSemibold>
          {formattedTotalResults} {localizedDictionary.reviews}
        </StyledSemibold>
      </StyledTotalResults>
    </StyledTotalResultsContainer>
  )
}
