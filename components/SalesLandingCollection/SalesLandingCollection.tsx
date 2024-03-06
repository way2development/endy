import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { ColorProps } from '../../Interfaces/color'
import { Image, ImageProps } from '../Image'
import { ProductProps } from '../ShopModule/ShopModule.types'

import { Grid } from '../Grid'
import { Badge } from '../Badge'
import { PromoPill } from '../PromoPill'
import { PromoFlag } from '../PromoFlag'
import { ProductReviewStars } from '../ProductReviewStars'
import { Tooltip } from '../Tooltip'

import {
  getLocalizedPrice,
  getLocalizedSalePrice
} from '../../utils/getLocalizedPrice'
import { getThousandsSeparator, isProductOnSale } from '../../utils'
import { isSecondarySaleProduct } from '../../utils/isProductOnSale'
import { doesProductHaveCompareAtPrice } from '../../utils/compareAtPrice'

import { SaleProps } from 'Interfaces/sales'

import { theme } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'
import {
  StyledSection,
  StyledHeading,
  StyledSubcopy
} from './SaleLandingCollection.styled'

import { getTimeInET, formatSanitySaleStartDate } from '../../lib/time'

interface SalesLandingCollectionProps {
  heading: string
  subcopy?: string
  saleColor: ColorProps
  saleStartDate: string
  bgColor: ColorProps
  promoLabel: string
  discountPercentage: number
  fixedAmount: number
  saleType: string
  productCards: productCardProps[]
  locale: Locale
  useGlobalSales: boolean | undefined
  sales: SaleProps
}
interface productCardProps {
  image: ImageProps
  product: ProductProps
  discountPercentage: number
  fixedAmount: number
}
export interface ReviewSummaryProps {
  domain_key: string
  product_score: number
  total_reviews: number
}
export interface ProductCardProps {
  product: ProductProps
  image: ImageProps
  review?: ReviewSummaryProps
  isLoading: boolean
  locale: Locale
  saleColor: ColorProps
  promoLabel: string
  discountPercentage: number
  fixedAmount: number
  saleType: string
  isSaleActive: boolean
  isProductOnLocallySetSale: boolean
  isProductOnGlobalSale: boolean
  isEveryProductDiscounted: boolean
  useGlobalSales: boolean | undefined
  sales: SaleProps
}

const ProductCard = ({
  product,
  locale,
  image,
  review,
  isLoading,
  saleColor,
  promoLabel,
  discountPercentage,
  fixedAmount,
  saleType,
  isSaleActive,
  isProductOnLocallySetSale,
  isProductOnGlobalSale,
  isEveryProductDiscounted,
  useGlobalSales,
  sales
}: ProductCardProps) => {
  const localizedDictionary = dictionary[locale]

  // TODO: Combine into a single function and rework logic when other sale types are introduced
  const isTennisCanadaSale =
    isSaleActive && isProductOnLocallySetSale && saleType === 'Percentage'

  const isFriendsAndFamilySale =
    isSaleActive && isEveryProductDiscounted && saleType === 'Percentage'

  // TODO: The secondary sale logic will need to be tested with the upcoming Boxing Week Sale variants
  const isSecondaryPercentageSaleProduct =
    sales &&
    sales?.secondarySaleType === 'Percentage' &&
    isSecondarySaleProduct(sales, product.id)

  const isSecondaryFixedAmountProduct =
    sales &&
    sales?.secondarySaleType === 'Fixed Amount' &&
    isSecondarySaleProduct(sales, product.id)

  const showGlobalSalePrice =
    isProductOnGlobalSale &&
    (sales?.saleType === 'Percentage' ||
      sales?.saleType === 'Fixed Amount' ||
      sales?.saleType === 'Everything Off' ||
      sales?.saleType === 'Level Up Offer' ||
      isSecondaryPercentageSaleProduct ||
      isSecondaryFixedAmountProduct)

  const minPrice = product?.priceRange?.minVariantPrice
  const regularPrice = getLocalizedPrice(
    product?.priceRange?.minVariantPrice,
    locale
  )
  const globalSalePrice =
    sales && getLocalizedSalePrice(minPrice, sales, locale, 1, product.id)

  // TODO: Refactor as more sale types are added
  const locallySetSalePrice =
    saleType === 'Fixed Amount'
      ? getLocalizedPrice(
          product?.priceRange?.minVariantPrice - fixedAmount,
          locale
        )
      : saleType === 'Percentage'
      ? getLocalizedPrice(
          product?.priceRange?.minVariantPrice *
            ((100 - discountPercentage) / 100),
          locale
        )
      : regularPrice

  const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)

  // Reviews
  const productRating = review?.product_score
    ? Number(review?.product_score?.toFixed(1))
    : 5

  const numberOfReviews = review?.total_reviews
    ? getThousandsSeparator(review.total_reviews.toString(), locale)
    : undefined
  const showReview = review && review.total_reviews >= 10

  // TODO: Variables copied from collection page. Refactor to make these strings global to avoid repetition
  const englishTooltip = `${productRating} average star rating based on ${numberOfReviews} customer reviews`
  const englishRatingCopy = `${productRating} Rating`

  const frenchProductRating = productRating.toString().replace('.', ',')
  const frenchTooltip = `Moyenne de ${frenchProductRating} étoiles basée sur ${numberOfReviews} avis.`
  const frenchRatingCopy = `Moyenne de ${frenchProductRating}`

  const translatedTooltipCopy = locale === 'en' ? englishTooltip : frenchTooltip
  const translatedRatingCopy =
    locale === 'en' ? englishRatingCopy : frenchRatingCopy

  const giftBadge =
    locale === 'fr'
      ? 'https://cdn.sanity.io/images/d0kd7r9c/production/779f70032c2c35a5459f68d2831f26851c10ba51-115x115.svg'
      : 'https://cdn.sanity.io/images/d0kd7r9c/production/987e6352d87eb1e3336fe18702bbde7de33371b8-115x115.svg'

  // TODO: JSX was modified from the product card module which is still using class names. Update to styled components.

  return (
    <div className='collections-grid-item product-item display-flex bg-off-white'>
      <Link
        href={`/products${product.slug}`}
        locale={locale}
        className='collections-product-card bg-white'
      >
        {(isFriendsAndFamilySale ||
          isTennisCanadaSale ||
          isProductOnGlobalSale) && (
          <PromoPill
            bgColor={saleColor.hex}
            promoCopy={useGlobalSales ? sales?.productPillLabel : promoLabel}
            variant={'gravy'}
            borderStyle={'dotted'}
            locale={locale}
          />
        )}

        {/* Compare At Price Flag */}
        {hasVariantWithDiscount && !isProductOnGlobalSale && (
          <PromoFlag
            bgColor={'#FFFFFF'}
            promoCopy={locale === 'fr' ? 'Solde' : 'Sale'}
            color={'#243746'}
          />
        )}

        <div className='collections-product-card-header'>
          {image && (
            <Image
              desktopImage={image.desktopImage}
              mobileImage={image.mobileImage}
              tabletImage={image.tabletImage}
              alt={image.alt}
              srcWidths={[600, 600, 600]}
            />
          )}
        </div>
        {product.isNewProduct && <Badge text={localizedDictionary.new} />}
        {!product.isNewProduct && product.isPopularProduct && (
          <Badge text={localizedDictionary.topRated} />
        )}

        {!product.isNewProduct &&
          !product.isPopularProduct &&
          product.isGiftIdea && (
            <img
              id='collections-gift-idea'
              src={giftBadge}
              alt={localizedDictionary.giftIdea}
            />
          )}

        <div className='collections-product-card-body align-content-between flex-container justify-content-between'>
          <div className='collections-product-card-body-name flex-container justify-content-between width-100'>
            <h3 className='h5 margin-bottom-zero product-card-title'>
              {product?.name}
            </h3>
            <p className='flex calibre-semibold flex-container margin-bottom-zero product-card-price-container'>
              <span>{localizedDictionary.from + ' '}</span>

              {isFriendsAndFamilySale ||
              isTennisCanadaSale ||
              showGlobalSalePrice ? (
                <>
                  <span className='collection-product-price collection-product-price-sale'>
                    {useGlobalSales ? globalSalePrice : locallySetSalePrice}
                  </span>
                  <span className='strikethrough calibre-regular'>
                    {regularPrice}
                  </span>
                </>
              ) : (
                <span className='collection-product-price'>{regularPrice}</span>
              )}

              <span className='hidden calibre-regular'></span>
            </p>
          </div>
          <p className='margin-bottom-zero font-size-small product-card-tagline display-flex align-items-center'>
            {product?.shortDescription}
          </p>
          <div className='flex-container landing-products-stars-container width-100 justify-content-between align-items-center'>
            {!isLoading && showReview && (
              <div className='landing-products-stars align-items-center flex-container'>
                <ProductReviewStars rating={productRating} />
                <p className='rating-phrase font-size-micro text-gravy-70 margin-bottom-zero'>
                  {translatedRatingCopy}
                </p>
                <Tooltip
                  icon='https://cdn.sanity.io/images/d0kd7r9c/production/af9d6d44eabc973c05c23f9cfb842104136609c9-12x12.svg'
                  text={translatedTooltipCopy}
                />
              </div>
            )}
            <p className='font-size-micro text-gravy-70 margin-bottom-zero align-items-center'>
              {/* TODO: double check if this is the correct message */}
              {!isLoading && !showReview && localizedDictionary.firstReview}
            </p>
            <div className='free-shipping display-flex height-100 align-items-center'>
              <img
                className='free-shipping-icon'
                src='https://cdn.sanity.io/images/d0kd7r9c/production/e38ad3d244f3aa0467332720a16794168406d240-16x16.svg'
                alt=''
              />
              <p className='font-size-micro text-gravy-70'>
                {localizedDictionary.freeShipping}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export const SalesLandingCollection = ({
  heading,
  subcopy,
  saleStartDate,
  saleColor,
  bgColor,
  promoLabel,
  discountPercentage,
  fixedAmount,
  productCards,
  saleType,
  locale,
  useGlobalSales,
  sales
}: SalesLandingCollectionProps) => {
  const localDateTime = new Date()
  const dateTimeET = getTimeInET(localDateTime)
  const startDate = formatSanitySaleStartDate(saleStartDate)

  const isLocallySetSaleActive = dateTimeET > startDate
  const isGlobalSaleActive = dateTimeET < sales?.endDate

  // TODO: Reviews fetch request copied from collections.js - Refactor to helper function
  const [isLoading, setIsLoading] = useState(false)
  const [allReviews, setAllReviews] = useState([])
  const fetchReviews = async () => {
    const API_KEY = process.env.YOTPO_API_KEY

    try {
      setIsLoading(true)

      // Yotpo limits fetch to 100 products
      const { data } = await axios.get(
        `https://api.yotpo.com/v1/apps/${API_KEY}/bottom_lines?count=100&page=1`
      )

      setAllReviews(data.response.bottomlines || [])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // if every product has a discount value return false, otherwise return true
  const isEveryProductDiscounted = productCards?.every((productCard) => {
    return productCard.fixedAmount && productCard.discountPercentage
      ? false
      : true
  })

  return (
    <StyledSection bgColor={bgColor?.hex}>
      <StyledPageWidth>
        <StyledHeading variant={'h2'} color={'gravy'}>
          <span>{heading}</span>
        </StyledHeading>
        {subcopy && (
          <StyledSubcopy variant={'mediumBody'} color={'gravy'}>
            {subcopy}
          </StyledSubcopy>
        )}
        <Grid
          rowGap={[
            `${theme.spacing.xl}`,
            `${theme.spacing.l}`,
            `${theme.spacing.xl}`
          ]}
          columnGap={['', `${theme.spacing.l}`, `${theme.spacing.xl}`]}
          columnRatio={['1', '1:1', '1:1:1']}
        >
          {productCards.map((productCard) => {
            const isOnSale =
              !!sales && isProductOnSale(sales, productCard.product.id)
            return (
              <ProductCard
                key={productCard.product.id}
                product={productCard.product}
                locale={locale}
                image={productCard.image}
                isProductOnLocallySetSale={
                  productCard.fixedAmount || productCard.discountPercentage
                    ? true
                    : false
                }
                isProductOnGlobalSale={useGlobalSales ? isOnSale : false}
                isEveryProductDiscounted={isEveryProductDiscounted}
                review={allReviews.find(
                  (review: ReviewSummaryProps) =>
                    Number(review.domain_key) === productCard.product.id
                )}
                isLoading={isLoading}
                saleColor={saleColor}
                promoLabel={promoLabel}
                discountPercentage={
                  useGlobalSales
                    ? sales?.discountPercentage || 0
                    : discountPercentage
                }
                fixedAmount={
                  useGlobalSales ? sales?.discountValue || 0 : fixedAmount
                }
                saleType={useGlobalSales ? sales?.saleType : saleType}
                isSaleActive={
                  useGlobalSales ? isGlobalSaleActive : isLocallySetSaleActive
                }
                useGlobalSales={useGlobalSales}
                sales={sales}
              />
            )
          })}
        </Grid>
      </StyledPageWidth>
    </StyledSection>
  )
}
