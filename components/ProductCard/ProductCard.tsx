import Link from 'next/link'
import { Badge } from '../Badge'
import { PromoFlag } from '../PromoFlag'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { Image, ImageProps } from '../Image'
import { ProductReviewStars } from '../ProductReviewStars'
import { Tooltip } from '../Tooltip'
import {
  getLocalizedPrice,
  getLocalizedSalePrice
} from '../../utils/getLocalizedPrice'
import { SaleProps } from '../../Interfaces/sales'
import dictionary from '../../dictionary.json'
import { Locale } from 'types/global-types'
import { doesProductHaveFreeGift, getThousandsSeparator } from '../../utils'
import {
  isProductFreeGift,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { getSaleTextVariantColor } from '../../utils'
import { googleAnalytics } from '../GoogleAnalytics/analytics'
import { doesProductHaveCompareAtPrice } from '../../utils/compareAtPrice'

import { StyledBundleCta } from './ProductCard.styled'
import { CtaLink, CtaLinkProps } from '../CtaLink'

export interface ProductCardProps {
  /**
   * Whether the product is currently on sale
   */
  isOnSale: boolean
  /**
   * Details of the product (from Shopify)
   */
  product: ProductProps
  /**
   * Destination for user to be sent when clicking on product card
   */
  sales?: SaleProps
  locale: Locale
  /**
   * Product image
   */
  image: ImageProps
  review?: ReviewSummaryProps
  isLoading: boolean
  productCardPillCopy?: string
  variant?:
    | 'gravy'
    | 'white'
    | 'rubine'
    | 'dark-blue'
    | 'endy-blue'
    | 'mint'
    | 'mauve'
    | 'peach'
  bgColor?: string
  borderStyle?: 'solid' | 'dotted' | 'none' | undefined
  index?: number
  isBundleCard?: boolean
  bundleCard?: {
    cta: {
      props: CtaLinkProps
    }
    promoPill: string
    title: string
  }
}

export interface ReviewSummaryProps {
  domain_key: string
  product_score: number
  total_reviews: number
}

export const ProductCard = ({
  isOnSale = false,
  product,
  sales,
  locale,
  image,
  review,
  isLoading,
  index,
  productCardPillCopy,
  isBundleCard,
  bundleCard
}: ProductCardProps) => {
  const localizedDictionary = dictionary[locale]

  const isSecondaryPercentageSaleProduct =
    sales &&
    sales?.secondarySaleType === 'Percentage' &&
    isSecondarySaleProduct(sales, product.id)

  const isSecondaryFixedAmountProduct =
    sales &&
    sales?.secondarySaleType === 'Fixed Amount' &&
    isSecondarySaleProduct(sales, product.id)

  // this variable applies logic when we want a Secondary Sale Product in the third Bundle Card position on the SLP (for Bundle Sales)
  const isSecondarySaleItem =
    isSecondaryPercentageSaleProduct || isSecondaryFixedAmountProduct

  const isBundleSale =
    sales?.customerGetsProducts?.isBundleProduct &&
    sales?.saleType === 'Buy X Get Y' &&
    isBundleCard

  // TODO: move to util
  const showSalePrice =
    isOnSale &&
    (sales?.saleType === 'Percentage' ||
      sales?.saleType === 'Fixed Amount' ||
      sales?.saleType === 'Everything Off' ||
      sales?.saleType === 'Level Up Offer' ||
      isSecondaryPercentageSaleProduct ||
      isSecondaryFixedAmountProduct ||
      isBundleSale)

  // Everything Off Prices
  const variantSalePrice =
    sales?.saleType === 'Everything Off' && product?.variants[0]?.salePrice
      ? product?.variants[0]?.salePrice
      : product?.priceRange?.minVariantPrice

  const variantOffSalePrice =
    sales?.saleType === 'Everything Off' && product?.variants[0]?.offSalePrice
      ? product?.variants[0]?.offSalePrice
      : product?.priceRange?.minVariantPrice

  const minPrice =
    sales?.saleType === 'Everything Off'
      ? variantOffSalePrice
      : product?.priceRange?.minVariantPrice

  const regularPrice = getLocalizedPrice(minPrice, locale)

  const calcSalePrice =
    sales?.saleType === 'Everything Off' ? variantSalePrice : minPrice

  const totalRegularBundlePrice =
    sales?.customerGetsProducts &&
    getLocalizedSalePrice(
      sales?.customerGetsProducts?.priceRange.minVariantPrice +
        product?.priceRange?.minVariantPrice,
      sales,
      locale,
      1,
      product.id
    )

  const salePrice =
    sales && getLocalizedSalePrice(calcSalePrice, sales, locale, 1, product.id)

  const isRvProduct = product.id === 4433572003888

  const hasFreeGift = sales ? doesProductHaveFreeGift(sales, product.id) : false
  const isFreeGift = sales ? isProductFreeGift(sales, product.id) : false

  const showPromoFlag = sales && (isOnSale || hasFreeGift || isFreeGift)

  // Review
  const productRating = review?.product_score
    ? Number(review?.product_score?.toFixed(1))
    : 5

  const numberOfReviews = review?.total_reviews
    ? getThousandsSeparator(review.total_reviews.toString(), locale)
    : undefined
  const showReview = review && review.total_reviews >= 10

  // TODO: add to dictionary
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

  const promoFlagCopy =
    sales && isSecondarySaleProduct(sales, product.id)
      ? sales?.secondaryProductPillLabel
      : sales?.productPillLabel
  // Handles item selection and triggers Google Analytics tracking
  const handleSelectItemClick = () => {
    googleAnalytics.selectItem(
      product,
      product.variants[0]?.id,
      'collection',
      index
    )
  }

  const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)

  return (
    <div className='collections-grid-item product-item display-flex'>
      <Link
        href={`/products${product.slug}`}
        locale={locale}
        className='collections-product-card bg-white'
      >
        {/* Sale Flag */}
        {showPromoFlag && !hasVariantWithDiscount && (
          <PromoFlag
            bgColor={sales.themeColor}
            color={getSaleTextVariantColor(sales.themeColor)}
            promoCopy={isBundleSale ? bundleCard?.promoPill : promoFlagCopy}
          />
        )}

        {/* Compare At Price Flag */}
        {hasVariantWithDiscount && (
          <PromoFlag
            bgColor={'#FFFFFF'}
            promoCopy={locale === 'fr' ? 'Solde' : 'Sale'}
            color={'#243746'}
          />
        )}

        {/* Product Feature Flag */}
        {!showPromoFlag && productCardPillCopy && (
          <PromoFlag
            bgColor={'#596f8c'}
            promoCopy={productCardPillCopy}
            color={'#FFF'}
            borderStyle={'solid'}
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
        {isRvProduct && (
          <img
            id='collections-rv-icon'
            src='https://cdn.sanity.io/images/d0kd7r9c/production/32e91f67c069eb95a5a14b6af39f66a072f27d77-74x74.svg'
            alt=''
          />
        )}
        {!isRvProduct && product.isNewProduct && localizedDictionary &&(
          <Badge text={localizedDictionary.new} />
        )}
        {!isRvProduct && !product.isNewProduct && product.isPopularProduct && (
          <Badge text={localizedDictionary.topRated} />
        )}

        {!isRvProduct &&
          !product.isNewProduct &&
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
              {/* TODO: hotfix below to remove Sateen/Armure Satin from Bedding Product names/titles. Revisit later for a CMS-based solution. */}
              {product?.name.replace(`${localizedDictionary.sateen}`, '')}{' '}
              {isBundleSale &&
                bundleCard &&
                bundleCard.title &&
                `+ ${bundleCard?.title}`}
            </h3>
            <p className='flex calibre-semibold flex-container margin-bottom-zero product-card-price-container'>
              {/* TODO: add localized string */}
              <span>{localizedDictionary.from + ' '}</span>
              {showSalePrice ? (
                <>
                  <span className='collection-product-price collection-product-price-sale'>
                    {salePrice}
                  </span>
                  <span className='strikethrough calibre-regular'>
                    {isSecondarySaleItem
                      ? regularPrice
                      : isBundleSale
                      ? totalRegularBundlePrice
                      : regularPrice}
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
              {!isLoading && !showReview}
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
          {isBundleSale && bundleCard && (
            <StyledBundleCta>
              <CtaLink
                url={`${bundleCard?.cta.props.url}`}
                label={`${bundleCard?.cta.props.label}`}
                variant='solid-gravy'
              />
            </StyledBundleCta>
          )}
        </div>
      </Link>
    </div>
  )
}
