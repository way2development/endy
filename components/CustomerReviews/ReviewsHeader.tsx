import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { ProductReviewStars } from '../ProductReviewStars'
import { StarRatingHistogram } from '../StarRatingHistogram'
import { getThousandsSeparator } from '../../utils'
import { Dropdown } from '../Dropdown'
import { useClearReviewFilters } from '../../lib/context'

import {
  StyledReviewsHeader,
  StyledFlexContainer,
  StyledRating,
  StyledRatingMicrocopy,
  StyledRatingContainer,
  StyledRatingWrapper,
  StyledButtonDesktopContainer,
  StyledHeading,
  StyledButtonMobileContainer,
  StyledReviewHeaderContainer,
  StyledProductDropdown
} from './CustomerReviews.styled'
import { Button } from '../Button'
import { ProductPdpProps } from '../CustomerReviews'

interface ReviewsHeaderProps {
  averageScore: number
  isError: boolean
  totalReviews: number
  locale: Locale
  starDistribution: {
    1?: number
    2?: number
    3?: number
    4?: number
    5?: number
  }
  showReviewForm: boolean
  setShowReviewForm: (param: boolean) => void
  productDropdownList: ProductPdpProps | ProductDropdownProps[]
  productId: number
  setSelectedProductId: (param: number) => void
}

interface ProductDropdownProps {
  label: string
  id: string
  slug?: string
}
interface WriteAReviewButtonProps {
  locale: Locale
  showReviewForm: boolean
  setShowReviewForm: (param: boolean) => void
}

const WriteReviewButton = ({
  locale,
  setShowReviewForm,
  showReviewForm
}: WriteAReviewButtonProps) => {
  return (
    <Button
      label={dictionary[locale].writeAReview}
      variant='solid-gravy'
      onClick={() => setShowReviewForm(!showReviewForm)}
    />
  )
}

export const ReviewsHeader = ({
  averageScore,
  isError,
  totalReviews,
  locale,
  starDistribution,
  showReviewForm,
  setShowReviewForm,
  productDropdownList,
  productId,
  setSelectedProductId
}: ReviewsHeaderProps) => {
  const localizedDictionary = dictionary[locale]
  const clearFilters = useClearReviewFilters()

  const productRating =
    locale === 'en'
      ? averageScore?.toFixed(1)
      : averageScore?.toFixed(1).replace('.', ',')

  const numberOfReviews = totalReviews
    ? getThousandsSeparator(totalReviews.toString(), locale)
    : undefined

  const averageRatingCopy =
    locale === 'en'
      ? `Average Rating of ${numberOfReviews} reviews`
      : `Moyenne sur ${numberOfReviews} avis`

  const resetFilters = () => {
    clearFilters()
  }

  const handleProductSelection = (option: string) => {
    setSelectedProductId(parseInt(option))
    resetFilters()
  }

  return (
    <StyledReviewsHeader>
      <StyledReviewHeaderContainer>
        <StyledHeading color={'gravy'} variant={'h2'}>
          {dictionary[locale].customerReviews}
        </StyledHeading>
        <StyledProductDropdown>
          {Array.isArray(productDropdownList) && (
            <Dropdown
              label={localizedDictionary.product}
              handleChange={(option) => handleProductSelection(option)}
              handleClick={(option) => handleProductSelection(option)}
              options={productDropdownList}
              variant={'offWhite'}
              selectedOption={productId.toString()}
            />
          )}
        </StyledProductDropdown>
      </StyledReviewHeaderContainer>

      {!isError && (
        <StyledRatingContainer>
          <StyledRatingWrapper>
            <StyledFlexContainer>
              <StyledRating color={'gravy'} variant={'h2'}>
                {locale === 'en'
                  ? productRating
                  : productRating.replace('.', ',')}
              </StyledRating>
              <ProductReviewStars rating={averageScore} isReviewHeader={true} />
            </StyledFlexContainer>
            <StyledRatingMicrocopy color={'gravy70'} variant={'micro'}>
              {averageRatingCopy}
            </StyledRatingMicrocopy>
            <StyledButtonDesktopContainer>
              <WriteReviewButton
                locale={locale}
                showReviewForm={showReviewForm}
                setShowReviewForm={setShowReviewForm}
              />
            </StyledButtonDesktopContainer>
          </StyledRatingWrapper>

          <div>
            <StarRatingHistogram
              totalReviews={totalReviews}
              starDistribution={starDistribution}
            />
          </div>

          <StyledButtonMobileContainer>
            <WriteReviewButton
              locale={locale}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
            />
          </StyledButtonMobileContainer>
        </StyledRatingContainer>
      )}
    </StyledReviewsHeader>
  )
}
