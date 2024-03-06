import { Text } from '../Text'
import { ProductReviewStars } from '../ProductReviewStars'

import {
  StyledReview,
  StyledHeading,
  StyledContainer,
  StyledCustomer,
  StyledLocation,
  StyledPillContainer
} from './FeaturedReviewsCard.styled'

import { PromoPill } from '../PromoPill'
import { StyledSemibold } from '../../styles/global.styled'

import { Locale } from '../../types/global-types'

interface FeaturedReviewsCardProps {
  pillLabel?: string
  heading?: string
  headingTextVariant?: string
  subcopy: string
  location?: string
  name?: string
  locale: Locale
}

const locationIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/4393372718668b252ee2a63c205edf30b24116ee-10x14.svg'

export const FeaturedReviewsCard = ({
  pillLabel,
  heading,
  headingTextVariant = 'h5',
  subcopy,
  location,
  name,
  locale
}: FeaturedReviewsCardProps) => {
  return (
    <StyledReview>
      {pillLabel && (
        <StyledPillContainer>
          <PromoPill promoCopy={pillLabel} variant='gravy' locale={locale} />
        </StyledPillContainer>
      )}
      {heading && (
        <StyledContainer>
          {headingTextVariant === 'mediumBody' ? (
            <StyledHeading color={'gravy'} variant={'mediumBody'}>
              <StyledSemibold>{heading}</StyledSemibold>
            </StyledHeading>
          ) : (
            <StyledHeading color={'gravy'} variant={'h5'}>
              {heading}
            </StyledHeading>
          )}

          <ProductReviewStars rating={5} />
        </StyledContainer>
      )}
      <Text color={'gravy'} variant={'mediumBody'}>
        {subcopy}
      </Text>

      {name && (
        <StyledCustomer color={'gravy'} variant={'smallBody'}>
          <Text color={'gravy'} variant={'smallBody'} display='inline'>
            {name}
          </Text>
          <span>
            {/* TODO: Update the icon to the Icon component when ready */}
            <StyledLocation src={locationIcon} alt='' />
            {location}
          </span>
        </StyledCustomer>
      )}
    </StyledReview>
  )
}
