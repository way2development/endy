import {
  StyledAnchor,
  StyledReviewsMicrocopy,
  StyledUnderlineLink
} from './ProductReviews.styled'
import { useContext } from 'react'
import { Tooltip } from '../Tooltip'
import { ProductReviewStars } from '../ProductReviewStars'
import { StyledVisuallyHidden } from '../../styles/global.styled'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { getThousandsSeparator } from '../../utils'
import { WriteAReviewContext } from '../../lib/context'

interface ProductReviewProps {
  /** Product Rating - from 1 to 5 stars */
  rating?: number
  /** Total number of customers who have reviewed this product */
  totalReviews?: number
  isError: boolean
  locale: Locale
}

export const ProductReviews = ({
  rating,
  totalReviews,
  isError,
  locale
}: ProductReviewProps) => {
  const localizedDictionary = dictionary[locale]
  const productRating = Number(rating?.toFixed(1))
  const numberOfReviews = totalReviews
    ? getThousandsSeparator(totalReviews.toString(), locale)
    : undefined

  // TODO: add to dictionary
  const frenchProductRating = productRating.toString().replace('.', ',')
  const frenchTooltip = `Moyenne de ${frenchProductRating} étoiles basée sur ${numberOfReviews} avis.`
  const englishTooltip = `${productRating} average star rating based on ${numberOfReviews} customer reviews`
  const translatedTooltipCopy = locale === 'en' ? englishTooltip : frenchTooltip

  const translatedMicroCopy =
    locale === 'en' ? localizedDictionary.customerReviews : 'avis clients'

  //@TODO: context.js file loses the ability to use TypeScript with Context, update context.js to context.ts, but for now ignore.
  //@ts-ignore
  const { setShowReviewForm } = useContext(WriteAReviewContext)

  return (
    <>
      {totalReviews && totalReviews >= 10 && productRating ? (
        <StyledAnchor href='#product-reviews'>
          <StyledVisuallyHidden>{translatedTooltipCopy}</StyledVisuallyHidden>
          {productRating && <ProductReviewStars rating={productRating} />}
          <StyledReviewsMicrocopy>
            {numberOfReviews} {translatedMicroCopy}
          </StyledReviewsMicrocopy>
          <Tooltip
            icon='https://cdn.sanity.io/images/d0kd7r9c/production/af9d6d44eabc973c05c23f9cfb842104136609c9-12x12.svg'
            text={translatedTooltipCopy}
          />
        </StyledAnchor>
      ) : isError ? (
        ''
      ) : (
        <StyledAnchor
          onClick={() => {
            setShowReviewForm(true)
          }}
          href={'#write-a-review'}
        >
          <StyledReviewsMicrocopy>
            {localizedDictionary.firstReview}{' '}
            <StyledUnderlineLink>{`${localizedDictionary.writeFirstReview} →`}</StyledUnderlineLink>
          </StyledReviewsMicrocopy>
        </StyledAnchor>
      )}
    </>
  )
}
