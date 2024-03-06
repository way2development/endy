import { StyledSemibold, StyledCartError } from '../../styles/global.styled'
import { Locale } from '../../types/global-types'
import {
  getLocalizedPrice,
  getLocalizedSalePrice
} from '../../utils/getLocalizedPrice'
import dictionary from '../../dictionary.json'
import { Image, ImageProps } from '../Image'
import { PromoFlag } from '../PromoFlag'
import { Text } from '../Text'
import { CtaLink } from '../CtaLink'

import { VariantProps } from '../ShopModule/ShopModule.types'
import {
  StyledAnchor,
  StyledCard,
  StyledCardButton,
  StyledContentWrapper,
  StyledDetailsContainer,
  StyledOriginalPrice,
  StyledProductTitle,
  StyledSalePrice,
  StyledTextContainer
} from './ProductCrossSell.styled'

import { SaleProps } from 'Interfaces/sales'
import Link from 'next/link'
import {
  isProductFreeGift,
  doesProductHaveFreeGift,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { getSaleTextVariantColor } from '../../utils'
interface CardProps {
  sizeLabel: string
  colorLabel?: string
  onClick: () => void
  productUrl: string
  title: string
  variant: VariantProps
  sales?: SaleProps
  locale: Locale
  image: ImageProps
  isOnSale: boolean
  isCartError: boolean
  productId: number
}

export const Card = ({
  onClick,
  productUrl,
  title,
  variant,
  sales,
  locale,
  image,
  sizeLabel,
  colorLabel,
  isOnSale,
  isCartError,
  productId
}: CardProps) => {
  const isSecondaryPercentageProduct =
    sales &&
    sales?.secondarySaleType === 'Percentage' &&
    isSecondarySaleProduct(sales, productId)

  const isSecondaryFixedAmountProduct =
    sales &&
    sales?.secondarySaleType === 'Fixed Amount' &&
    isSecondarySaleProduct(sales, productId)

  const showSalePrice =
    isOnSale &&
    (sales?.saleType === 'Percentage' ||
      sales?.saleType === 'Fixed Amount' ||
      sales?.saleType === 'Everything Off' ||
      isSecondaryPercentageProduct ||
      isSecondaryFixedAmountProduct)

  const localizedDictionary = dictionary[locale]

  const regularPrice = getLocalizedPrice(variant.price, locale)

  let salePrice

  if (sales?.saleType === 'Everything Off' && variant.salePrice) {
    salePrice = getLocalizedPrice(variant.salePrice, locale)
  } else if (sales) {
    salePrice = getLocalizedSalePrice(
      variant.price,
      sales,
      locale,
      1,
      productId
    )
  }

  const hasFreeGift = sales
    ? doesProductHaveFreeGift(sales, variant.productId)
    : false
  const isFreeGift = sales ? isProductFreeGift(sales, variant.productId) : false

  const showPromoFlag = sales && (isOnSale || hasFreeGift || isFreeGift)

  const promoFlagCopy =
    sales && isSecondarySaleProduct(sales, productId)
      ? sales?.secondaryProductPillLabel
      : sales?.productPillLabel

  const isReducedPriceActive = variant?.compareAtPrice ? true : false

  const calcCompareAtPriceDiscount = variant?.compareAtPrice - variant.price

  const regularCompareAtPrice =
    isReducedPriceActive && getLocalizedPrice(variant.compareAtPrice, locale)

  const discountedCompareAtPrice = getLocalizedPrice(
    variant?.compareAtPrice - calcCompareAtPriceDiscount,
    locale
  )

  return (
    <StyledCard>
      {showPromoFlag && (
        <PromoFlag
          promoCopy={promoFlagCopy}
          bgColor={sales.themeColor}
          color={getSaleTextVariantColor(sales.themeColor)}
        />
      )}

      <StyledContentWrapper>
        <Link
          href={`/products${productUrl}`}
          locale={locale}
          aria-label={localizedDictionary.crossSellProductLink}
        >
          {image && (
            <Image
              alt={image.alt}
              desktopImage={image.desktopImage}
              tabletImage={image.tabletImage}
              mobileImage={image.mobileImage}
              srcWidths={[768, 1024]}
            />
          )}
        </Link>
        <StyledDetailsContainer>
          <StyledTextContainer>
            <StyledAnchor href={`/products${productUrl}`} locale={locale}>
              <StyledProductTitle
                element={'h3'}
                variant={'mediumBody'}
                color={'gravy'}
              >
                <StyledSemibold>{title}</StyledSemibold>
              </StyledProductTitle>
            </StyledAnchor>
            <Text display={'inline'} color={'gravy'} variant={'smallBody'}>
              {colorLabel && colorLabel + ', '}
              {sizeLabel + ' - '}
            </Text>
            {(showSalePrice || isReducedPriceActive) && (
              <StyledSalePrice
                display={'inline'}
                color={'gravy'}
                variant={'smallBody'}
              >
                {!isReducedPriceActive && salePrice}
                {isReducedPriceActive && !isOnSale && discountedCompareAtPrice}
                {isReducedPriceActive && isOnSale && salePrice}
              </StyledSalePrice>
            )}
            <StyledOriginalPrice
              // isOnSale={isOnSale} removed for 'Buy X Get Y' sale
              isOnSale={isReducedPriceActive || showSalePrice}
              display={'inline'}
              color={'gravy'}
              variant={'smallBody'}
            >
              {isReducedPriceActive ? regularCompareAtPrice : regularPrice}
            </StyledOriginalPrice>
          </StyledTextContainer>

          {isCartError ? (
            <>
              <CtaLink
                url={`/products${productUrl}`}
                label={localizedDictionary.learnMore}
                variant={'solid-rubine'}
                locale={locale}
              />

              <StyledCartError color={'errorRed'} variant={'smallBody'}>
                {localizedDictionary.cartUnavailable}
              </StyledCartError>
            </>
          ) : (
            <StyledCardButton
              variant={'solid-rubine'}
              onClick={onClick}
              className='CrossSellCTA'
            >
              {localizedDictionary.addItem}
            </StyledCardButton>
          )}
        </StyledDetailsContainer>
      </StyledContentWrapper>
    </StyledCard>
  )
}
