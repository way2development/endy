import Link from 'next/link'

import { useEffect, useRef } from 'react'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { ReviewSummaryProps } from '../ProductCard'
import { Image, ImageProps } from '../Image'
import { SaleProps } from '../../Interfaces/sales'

import { ProductReviewStars } from '../ProductReviewStars'
import { Text } from '../Text'
import { CtaLink } from '../CtaLink'
import { StyledArrow } from '../CtaLink/CtaLink.styled'
import { PromoFlag } from '../PromoFlag'

import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { getLocalizedPrice } from '../../utils/getLocalizedPrice'
import { isProductOnSale } from '../../utils'
import { getSaleTextVariantColor } from '../../utils'
import { googleAnalytics } from '../GoogleAnalytics/analytics'
import throttle from 'lodash/throttle'
import { isScrolledIntoView } from '../GoogleAnalytics/utils'

import {
  StyledProductAnchor,
  StyledReviewAnchor,
  StyledCtaContainer,
  StyledFeatureWrapper,
  StyledProductHeading,
  StyledPrice,
  StyledProductDetailsContainer,
  StyledProductDetailsWrapper,
  StyledProductDetailsInnerContainer,
  StyledProductReview,
  StyledPromoPill,
  StyledRecommendationContainer,
  StyledRecommendationHeading
} from './VersusProduct.styled'

import {
  StyledColumnWrapper,
  StyledCompetitorWrapper,
  StyledFeatureText,
  StyledHeading,
  StyledSection
} from '../VersusCompetitor/VersusCompetitor.styled'

interface VersusProductProps {
  heading?: string
  productOne: ColumnProps
  productTwo: ColumnProps
  bgColor?: { hex: string }
  locale: Locale
  productReviews: ReviewSummaryProps[]
  isProductReviewsLoading: boolean
  sales?: SaleProps
  isComparisonModal?: boolean
  productDisplayName?: string
}
export interface ColumnProps {
  productPill: string
  product: ProductProps
  productDisplayName?: string
  productImage: ImageProps
  recommendation: RecommendationProps
  features: FeatureProps[]
}
interface RenderedColumns {
  items: ({ type: string } & (
    | { text: string }
    | { product: ProductProps; image: ImageProps; productDisplayName?: string }
    | { recommendation: RecommendationProps }
    | FeatureProps
    | { slug: string }
  ))[]
}
export interface RecommendationProps {
  heading: string
  subcopy: string
}
export interface FeatureProps {
  heading: string
  subcopy: string
  key: string
}
interface FeatureComponentProps {
  feature: string
  subcopy: string | HTMLElement
  order: number
}
interface ProductDetailsProps {
  columnIndex: number
  image: ImageProps
  itemIndex: number
  productId: number
  productName: string
  productDisplayName?: string
  productPrice: string
  productSlug: string
  productReviews: ReviewSummaryProps[]
  isProductReviewsLoading: boolean
  locale: Locale
  sales?: SaleProps
  isComparisonModal?: boolean
}
const determineGridOrder = (columnIndex: number, itemIndex: number) => {
  return columnIndex % 2 === 0 ? itemIndex * 2 : itemIndex * 2 + 1
}

const Feature = ({ feature, subcopy, order }: FeatureComponentProps) => (
  <StyledFeatureWrapper order={order}>
    <StyledFeatureText variant='h5' color='gravy'>
      {feature}
    </StyledFeatureText>
    <p>{subcopy}</p>
  </StyledFeatureWrapper>
)

const ProductDetails = ({
  columnIndex,
  itemIndex,
  image,
  productId,
  productName,
  productDisplayName,
  productPrice,
  productSlug,
  productReviews,
  sales,
  isProductReviewsLoading,
  locale,
  isComparisonModal
}: ProductDetailsProps) => {
  const localizedDictionary = dictionary[locale]

  const isOnSale = sales && isProductOnSale(sales, productId)

  const productReview = productReviews.find(
    (review) => Number(review.domain_key) === productId
  )

  const productRating = Number(productReview?.product_score?.toFixed(1))
  const frenchProductRating = productRating.toString().replace('.', ',')
  const localizedProductRating =
    locale === 'en' ? `${productRating}` : `${frenchProductRating}`

  const reviewsPageUrl =
    locale === 'en'
      ? 'https://endy.com/reviews/endy-mattress'
      : 'https://endy.com/fr/reviews/matelas-endy'

  return (
    <StyledProductDetailsContainer
      order={determineGridOrder(columnIndex, itemIndex)}
    >
      <StyledProductDetailsInnerContainer>
        <Link href={`/products${productSlug}`} locale={locale}>
          {isOnSale && (
            <PromoFlag
              promoCopy={sales?.productPillLabel}
              bgColor={sales?.themeColor}
              color={getSaleTextVariantColor(sales?.themeColor)}
            />
          )}
          <Image
            alt={image?.alt}
            desktopImage={image?.desktopImage}
            tabletImage={image?.tabletImage}
            mobileImage={image?.mobileImage}
            srcWidths={[768, 1024]}
          />
        </Link>

        <StyledProductDetailsWrapper>
          <StyledProductHeading color={'rubine'} variant={'h4'}>
            <StyledProductAnchor
              href={`/products${productSlug}`}
              locale={locale}
            >
              {isComparisonModal ? productDisplayName : productName}
            </StyledProductAnchor>
          </StyledProductHeading>

          {productRating > 0 && !isProductReviewsLoading ? (
            <StyledProductReview>
              <ProductReviewStars rating={productRating} />
              <Text color='gravy70' variant={'smallBody'}>
                {localizedProductRating} {localizedDictionary.rating}
              </Text>
            </StyledProductReview>
          ) : (
            <StyledReviewAnchor href={reviewsPageUrl} locale={locale}>
              <Text color='gravy70' variant={'smallBody'}>
                {localizedDictionary.writeFirstReview}{' '}
                <StyledArrow aria-hidden='true'> →</StyledArrow>
              </Text>
            </StyledReviewAnchor>
          )}
        </StyledProductDetailsWrapper>
      </StyledProductDetailsInnerContainer>

      <StyledPrice color={'gravy'} variant={'smallBody'}>
        {localizedDictionary.startingFrom} {productPrice}
      </StyledPrice>
    </StyledProductDetailsContainer>
  )
}

export const VersusProduct = ({
  heading,
  productOne,
  productTwo,
  bgColor,
  locale,
  productReviews,
  isProductReviewsLoading,
  sales,
  isComparisonModal = false
}: VersusProductProps) => {
  if (!productOne || !productTwo) return null

  const productsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const items = [productOne, productTwo]
    const products = items.map((item) => item.product)
    const variants = products.map(({ variants }) => variants?.[0])

    // Prepare the data for view item list event
    const viewItemListData = {
      products: products,
      variants: variants,
      listName: 'mlp',
      listId: 'collections',
      sales
    }

    let eventFired = false // Flag to track if the event has already been fired

    const fireAnalyticsViewListEvent = () => {
      if (isScrolledIntoView(productsRef) && !eventFired) {
        // Fire the view item list events if the element is scrolled into view and the event hasn't been fired yet
        googleAnalytics.viewItemList(viewItemListData)
        googleAnalytics.elevarViewItemList(viewItemListData)
        eventFired = true // Set the flag to true after firing the event
      }
    }

    const handleScroll = throttle(fireAnalyticsViewListEvent, 1000)

    window.addEventListener('scroll', handleScroll)

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const localizedDictionary = dictionary[locale]

  // Creating an array in order to utilize css grids to maintain row alignment
  const columns: RenderedColumns[] = [
    {
      items: [
        { type: 'productPill', text: productOne?.productPill },
        {
          type: 'product',
          product: productOne?.product,
          productDisplayName: productOne?.productDisplayName,
          image: productOne?.productImage
        },
        { type: 'recommendation', recommendation: productOne?.recommendation },
        ...productOne.features.map((feat) => ({ ...feat, type: 'feature' })),
        { type: 'cta', slug: productOne?.product.slug }
      ]
    },
    {
      items: [
        { type: 'productPill', text: productTwo?.productPill },
        {
          type: 'product',
          product: productTwo?.product,
          productDisplayName: productTwo?.productDisplayName,
          image: productTwo?.productImage
        },
        { type: 'recommendation', recommendation: productTwo?.recommendation },
        ...productTwo.features.map((feat) => ({ ...feat, type: 'feature' })),
        { type: 'cta', slug: productTwo?.product.slug }
      ]
    }
  ]

  return (
    <StyledSection bgColor={bgColor}>
      <StyledCompetitorWrapper>
        <StyledHeading variant='h2' color='gravy'>
          {heading}
        </StyledHeading>

        <StyledColumnWrapper numberOfColumns={columns.length}>
          {/* In order to keep the rows aligned across the columns, we are using css grid and using the indexes to assign the grid order. */}
          {columns.map((column, columnIndex) =>
            column.items.map((columnItem: any, itemIndex) => {
              switch (columnItem.type) {
                case 'productPill':
                  return (
                    <StyledPromoPill
                      promoCopy={columnItem.text}
                      variant={'gravy'}
                      order={determineGridOrder(columnIndex, itemIndex)}
                      key={itemIndex}
                      locale={locale}
                    />
                  )

                case 'product':
                  return (
                    <ProductDetails
                      columnIndex={columnIndex}
                      itemIndex={itemIndex}
                      image={columnItem?.image}
                      productId={columnItem?.product?.id}
                      productName={columnItem?.product?.name}
                      productDisplayName={columnItem?.productDisplayName}
                      productPrice={getLocalizedPrice(
                        columnItem?.product?.priceRange?.minVariantPrice,
                        locale
                      )}
                      productSlug={columnItem?.product?.slug}
                      productReviews={productReviews}
                      isProductReviewsLoading={isProductReviewsLoading}
                      locale={locale}
                      sales={sales}
                      key={itemIndex}
                      isComparisonModal={isComparisonModal}
                    />
                  )

                case 'recommendation':
                  return (
                    <StyledRecommendationContainer
                      order={determineGridOrder(columnIndex, itemIndex)}
                      key={itemIndex}
                      ref={productsRef}
                    >
                      <StyledRecommendationHeading
                        color={'rubine'}
                        variant={'h5'}
                      >
                        {columnItem?.recommendation.heading}
                      </StyledRecommendationHeading>
                      <Text color={'gravy'} variant={'mediumBody'}>
                        {columnItem?.recommendation.subcopy}
                      </Text>
                    </StyledRecommendationContainer>
                  )

                case 'feature':
                  return (
                    <Feature
                      order={determineGridOrder(columnIndex, itemIndex)}
                      feature={columnItem.heading}
                      subcopy={columnItem.subcopy}
                      key={itemIndex}
                    />
                  )

                case 'cta':
                  return (
                    !isComparisonModal && (
                      <StyledCtaContainer
                        order={determineGridOrder(columnIndex, itemIndex)}
                        key={itemIndex}
                      >
                        <CtaLink
                          label={localizedDictionary.shop}
                          variant='solid-rubine'
                          url={`/products${columnItem.slug}`}
                        />
                      </StyledCtaContainer>
                    )
                  )
              }
            })
          )}
        </StyledColumnWrapper>
      </StyledCompetitorWrapper>
    </StyledSection>
  )
}
