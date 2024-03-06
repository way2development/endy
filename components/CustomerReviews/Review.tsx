import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { Grid } from '../Grid'
import { Text } from '../Text'

import { ReviewVotes } from './ReviewVotes'

import { getFormattedDate } from '../../lib/time'

import {
  StyledCustomerDetails,
  StyledReviewContainer,
  StyledPostedDate,
  StyledReviewTitle,
  StyledReviewContent,
  StyledVerifiedBuyer
} from './CustomerReviews.styled'

import { StyledSemibold } from '../../styles/global.styled'

import { ProductReviewStars } from '../ProductReviewStars'

import { useReviewFilters } from '../../lib/context'
export interface ReviewProps {
  locale: Locale
  // TODO: Look to type response from Yotpo and remove any keyword
  review: any
}

export const Review = ({ locale, review }: ReviewProps) => {
  const reviewFilters = useReviewFilters()

  const {
    id,
    title,
    votes_up: votesUp,
    votes_down: votesDown,
    created_at: postedDate,
    verified_buyer: verifiedBuyer,
    content: reviewCopy,
    score: starRating
  } = review

  const { display_name: customerName } = review.user

  const sleepPosition =
    review.custom_fields && review.custom_fields['--18329']
      ? review.custom_fields['--18329'].value
      : undefined

  let sleepPositionFr
  if (sleepPosition === 'On my back') {
    sleepPositionFr = 'Sur le dos'
  } else if (sleepPosition === 'On my stomach') {
    sleepPositionFr = 'Sur le ventre'
  } else if (sleepPosition === 'Side sleeper (right)') {
    sleepPositionFr = 'Sur le côté (droit)'
  } else if (sleepPosition === 'Side sleeper (left)') {
    sleepPositionFr = 'Sur le côté (gauche)'
  }

  const sleepPositionTranslated =
    locale === 'fr' ? sleepPositionFr : sleepPosition

  const city =
    review.custom_fields && review.custom_fields['--18327']
      ? review.custom_fields['--18327'].value
      : undefined

  const verifiedIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/e38ad3d244f3aa0467332720a16794168406d240-16x16.svg?fit=max&w=600&h=600'

  let reviewContent = reviewCopy
  let reviewTitle = title

  // Highlight the keyword in the review content and title if active keyword search
  const isKeywordSearchActive = reviewFilters['keywordSearch'] !== ''

  if (isKeywordSearchActive) {
    const keyword = reviewFilters['keywordSearch']
    const regex = new RegExp(keyword, 'gi')
    const content = reviewCopy.replace(regex, `<mark>$&</mark>`)
    const title = reviewTitle.replace(regex, `<mark>$&</mark>`)

    reviewContent = content
    reviewTitle = title
  }

  return (
    <Grid columnRatio={['1', '1', '1:3']} rowGap={['0']} columnGap={['2rem']}>
      <StyledReviewContainer>
        <StyledCustomerDetails>
          <Text variant='h5' color='gravy' element='li'>
            {customerName}
          </Text>
          <StyledPostedDate variant='smallBody' color='gravy' element='li'>
            {dictionary[locale].postedOn}{' '}
            {getFormattedDate(
              postedDate.split('T', 1).join(),
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              },
              locale
            )}
          </StyledPostedDate>
          {sleepPosition !== undefined && (
            <Text variant='smallBody' color='gravy' element='li'>
              <StyledSemibold>
                {dictionary[locale].sleepPosition}{' '}
              </StyledSemibold>
              {sleepPositionTranslated}
            </Text>
          )}
          {city !== undefined && (
            <Text variant='smallBody' color='gravy' element='li'>
              <StyledSemibold>{dictionary[locale].city}: </StyledSemibold>
              {city}
            </Text>
          )}
          {verifiedBuyer && (
            <StyledVerifiedBuyer variant='smallBody' color='gravy' element='li'>
              {/* TODO: Add icon component when available */}
              <img src={verifiedIcon} alt='' />
              <StyledSemibold>
                {dictionary[locale].verifiedPurchase}
              </StyledSemibold>
            </StyledVerifiedBuyer>
          )}
        </StyledCustomerDetails>
      </StyledReviewContainer>
      <div>
        <ProductReviewStars rating={starRating} />
        <StyledReviewTitle variant='h5' color='gravy' element='p'>
          <span dangerouslySetInnerHTML={{ __html: reviewTitle }}></span>
        </StyledReviewTitle>
        <StyledReviewContent variant='mediumBody' color='gravy'>
          <span dangerouslySetInnerHTML={{ __html: reviewContent }}></span>
        </StyledReviewContent>
        <ReviewVotes
          reviewId={id}
          votesUp={votesUp}
          votesDown={votesDown}
          locale={locale}
        />
      </div>
    </Grid>
  )
}
