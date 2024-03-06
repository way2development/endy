import { useState } from 'react'

import { AccordionList } from '../Accordion'
import { AccordionItemProps } from '../Accordion/AccordionItem'
import { CtaLink } from '../CtaLink'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { FeaturedReviewsCard } from '../FeaturedReviewsCard'

import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const StyledReviews = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${theme.spacing.m};
  }
`

export const StyledMoreReviews = styled.div`
  margin-top: ${theme.spacing.m};
  a {
    width: 100%;
  }
`

export interface CustomerReviewsProps {
  heading: string
  subcopy: string
  name: string
  location: string
  publishedDate: string
}
export interface FeaturedReviewsProps {
  /** Heading copy */
  heading: string
  /** Top 3 customer reviews */
  reviews: CustomerReviewsProps[]
  locale: Locale
}

export const FeaturedReviews = ({
  heading,
  reviews,
  locale
}: FeaturedReviewsProps) => {
  const localizedDictionary = dictionary[locale]
  const customerReviews =
    reviews.length > 0 &&
    reviews.map((review) => {
      return (
        <FeaturedReviewsCard
          key={review.subcopy}
          heading={review.heading}
          headingTextVariant={'mediumBody'}
          subcopy={review.subcopy}
          name={review.name}
          location={review.location}
          locale={locale}
        />
      )
    })

  const [showAccordion, setShowAccordion] = useState(false)

  const toggleAccordion = () => {
    setShowAccordion(!showAccordion)
  }

  const accordionContent = (
    <>
      <StyledReviews>{customerReviews}</StyledReviews>
      <StyledMoreReviews>
        <CtaLink
          url='#product-reviews'
          label={localizedDictionary.readMoreReviews}
          variant='hollow-gravy'
        />
      </StyledMoreReviews>
    </>
  )

  const accordion = [
    {
      heading: heading,
      content: accordionContent,
      toggleItem: toggleAccordion,
      showItem: true,
      index: 0
    }
  ] as AccordionItemProps[]

  return <AccordionList accordionItems={accordion} removeMargins={true} />
}
