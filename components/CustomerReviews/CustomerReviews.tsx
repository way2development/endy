import { useEffect, useState, useContext } from 'react'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { useRouter } from 'next/router'

import { Review } from './Review'
import { ReviewsHeader } from './ReviewsHeader'
import { ReviewsFilters } from './ReviewsFilters'
import { ReviewsTotalResults } from './ReviewsTotalResults'

import { WriteAReview } from '../WriteAReview'

import { LoadingSpinner } from '../LoadingSpinner'
import { Pagination } from '../Pagination'

import { StyledPageWidth } from '../../styles/global.styled'

import {
  getYotpoReviews,
  getYotpoBottomLine
} from '../../utils/getYotpoReviews'

import {
  StyledCustomerReviews,
  StyledErrorMessage,
  StyledNoResults
} from './CustomerReviews.styled'

import { useReviewPage, useReviewFilters } from '../../lib/context'

import { ProductProps } from '../ShopModule/ShopModule.types'
import { WriteAReviewContext } from '../../lib/context'

export interface ProductPdpProps extends Omit<ProductProps, 'id'> {
  label: string
  id: string
  slug: string
}
interface CustomerReviewsProps {
  locale: Locale
  product: ProductProps
  keywords: KeywordProps[]
  productDropdown: ProductPdpProps
}

export interface KeywordProps {
  label: string
  searchTerm: string
}
interface CustomerReviewsProps {
  locale: Locale
  product: ProductProps
  keywords: KeywordProps[]
  productDropdown: ProductPdpProps
  setIsError: () => void
  isError: boolean
}

export const CustomerReviews = ({
  locale,
  product,
  keywords,
  productDropdown,
  setIsError,
  isError
}: CustomerReviewsProps) => {
  if (!product) return null

  const localizedDictionary = dictionary[locale]

  const [reviewSummary, setReviewSummary] = useState({
    averageScore: 0,
    totalReviews: 0
  })

  const [starDistribution, setStarDistribution] = useState({})
  const [allReviews, setAllReviews] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(product.id)
  const [paginatedTotal, setPaginatedTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [indexOfLastResult, setIndexOfLastResult] = useState(0)
  const [hasTenOrMoreReviews, setHasTenOrMoreReviews] = useState(false)

  const reviewPage = useReviewPage()
  const reviewFilters = useReviewFilters()
  const isKeywordSearchActive = reviewFilters['keywordSearch'] !== ''
  const router = useRouter()
  const currentQuerySlug = router?.asPath
  const excludedSlugs = ['/reviews/endy-mattress', '/reviews/matelas-endy']

  const fetchReviews = (productId: number, lastIndex: number) => {
    // TODO: Refactor props to use high order object
    getYotpoReviews(
      productId,
      reviewPage,
      setPaginatedTotal,
      setIsLoading,
      setIsError,
      allReviews,
      setAllReviews,
      lastIndex,
      setIndexOfLastResult,
      reviewFilters,
      setStarDistribution
    )
  }

  useEffect(() => {
    fetchReviews(selectedProductId, 0)
    getYotpoBottomLine(selectedProductId, setReviewSummary)
  }, [selectedProductId])

  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    if (allReviews.length >= 10) {
      setHasTenOrMoreReviews(true)
    }

    if (isKeywordSearchActive && allReviews.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }
  }, [allReviews.length])

  const productDropdownList =
    Array.isArray(productDropdown) &&
    productDropdown?.map((product: ProductProps) => {
      return {
        label: product.name,
        id: product.id.toString(),
        slug: product.slug
      }
    })

  //@TODO: context.js file loses the ability to use TypeScript with Context, update context.js to context.ts, but for now ignore.
  //@ts-ignore
  const { showReviewForm, setShowReviewForm } = useContext(WriteAReviewContext)

  const renderReviewsHeader = () => (
    <ReviewsHeader
      averageScore={reviewSummary.averageScore}
      totalReviews={reviewSummary.totalReviews}
      locale={locale}
      isError={isError}
      starDistribution={starDistribution}
      showReviewForm={showReviewForm}
      setShowReviewForm={setShowReviewForm}
      productDropdownList={productDropdownList || productDropdown}
      productId={selectedProductId}
      setSelectedProductId={setSelectedProductId}
    />
  )

  const renderReviewComponents = () => (
    <>
      <ReviewsFilters
        productId={selectedProductId}
        locale={locale}
        fetchReviews={fetchReviews}
        keywords={keywords}
      />
      <ReviewsTotalResults totalResults={paginatedTotal} locale={locale} />
      {isLoading && <LoadingSpinner locale={locale} />}
      {isError && (
        <StyledErrorMessage color='gravy' variant='mediumBody'>
          {dictionary[locale].noReviewsAvailable}
        </StyledErrorMessage>
      )}
      {noResults && (
        <StyledNoResults variant={'mediumBody'} color={'gravy'} element={'div'}>
          {localizedDictionary.noSearchResults}
        </StyledNoResults>
      )}
      {!isError && !noResults && (
        <Pagination
          locale={locale}
          totalResults={paginatedTotal}
          resultsPerPage={5}
          containerId={'product-reviews'}
          indexOfLastResult={indexOfLastResult}
          range={5}
          rangeLeft={1}
          rangeRight={5}
          getAdditionalData={(lastIndex) =>
            fetchReviews(selectedProductId, lastIndex)
          }
          showIndexes={true}
          currentResults={allReviews}
        >
          {allReviews.length > 0 ? (
            allReviews.map((review: any) => {
              return <Review key={review.id} review={review} locale={locale} />
            })
          ) : (
            <StyledErrorMessage color='gravy' variant='mediumBody'>
              {dictionary[locale].noReviewsAvailable}
            </StyledErrorMessage>
          )}
        </Pagination>
      )}
    </>
  )

  // Conditional rendering, explainer:
  // 1. The excluded slugs represent the Reviews Page, which will always show the entire CustomerReviews module regardless of number of reviews.
  // 2. The PDPs will only show the entire CustomerReviews module if there are >=10 reviews, otherwise, only the 'Write a Review' form will render (when/if triggered by user click on the 'Write a Review' link).

  return (
    <StyledCustomerReviews id='product-reviews'>
      <StyledPageWidth>
        {excludedSlugs.includes(currentQuerySlug) || hasTenOrMoreReviews
          ? renderReviewsHeader()
          : null}

        <WriteAReview
          locale={locale}
          productDropdown={
            productDropdownList ? productDropdownList : productDropdown
          }
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
        />

        {excludedSlugs.includes(currentQuerySlug) || hasTenOrMoreReviews
          ? renderReviewComponents()
          : null}
      </StyledPageWidth>
    </StyledCustomerReviews>
  )
}
