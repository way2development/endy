import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import {
  StyledCartCrossSellHeading,
  StyledCrossSellItemAdd,
  StyledCrossSellProduct,
  StyledCrossSellProductInfo,
  StyledDiscountAmount,
  StyledCrossSellLink
} from './Cart.styled'
import { Image } from '../Image/Image'
import { Text } from '../Text/Text'
import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'
import {
  getLocalizedPrice,
  getLocalizedSalePrice,
  getLevelUpSalePrice
} from '../../utils/getLocalizedPrice'
import { useAddItem, useToggleCart } from '../../lib/context'
import { SaleProps } from 'Interfaces/sales'
import { PromoFlag } from '../PromoFlag/PromoFlag'
import CartCrossSellPrice from './CartCrossSellPrice'
import {
  doesProductHaveFreeGift,
  isProductFreeGift,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { SpecialOffersProps } from './Cart'
import { getSaleTextHexColor, getProductWithStock } from '../../utils'
import {
  formatSanitySaleEndDate,
  formatSanitySaleStartDate
} from '../../lib/time'
import { isSaleActive } from '../../utils/sales'
import {
  isVariantOnCompareAtPrice,
  getLocalizedDiscount
} from '../../utils/compareAtPrice'
import { Button } from '../Button'
// Tracking
import { googleAnalytics } from '../GoogleAnalytics/analytics'

interface CartCrossSellProductProps {
  variant: VariantProps
  product?: ProductProps
  locale: Locale
  sales: SaleProps
  showPromoTag: boolean
  showSalePrice: boolean
  showFreeGift: boolean
  specialOffers: SpecialOffersProps
  subtotal: number
}

interface CrossSellProductImageProps {
  variant: VariantProps
  product: ProductProps
}

const CrossSellProductImage = ({
  product,
  variant
}: CrossSellProductImageProps) => {
  return (
    <>
      {variant?.images?.cartImage ? (
        <Image
          desktopImage={variant.images.cartImage.desktopImage}
          tabletImage={variant.images.cartImage.tabletImage}
          mobileImage={variant.images.cartImage.mobileImage}
          alt={variant.images.cartImage?.alt}
          srcWidths={[768, 1024]}
        />
      ) : (
        <Image
          desktopImage={product?.images?.cartImage?.desktopImage}
          tabletImage={product?.images?.cartImage?.tabletImage}
          mobileImage={product?.images?.cartImage?.mobileImage}
          alt={product?.images?.cartImage?.alt}
          srcWidths={[768, 1024]}
        />
      )}
    </>
  )
}
const CartCrossSellProduct = ({
  variant,
  product,
  locale,
  sales,
  showPromoTag,
  showSalePrice,
  showFreeGift,
  specialOffers,
  subtotal
}: CartCrossSellProductProps) => {
  if (!product) return null
  const localizedDictionary = dictionary[locale]
  const toggleCart = useToggleCart()
  const addItemToCart = useAddItem()
  const isReducedPriceActive = variant?.compareAtPrice ? true : false

  let localizedTotal
  let promoFlagCopy

  if (isReducedPriceActive && sales?.saleType !== 'Everything Off') {
    localizedTotal = getLocalizedPrice(variant?.compareAtPrice, locale)
  } else if (sales?.saleType === 'Everything Off') {
    const variantOffSalePrice = variant?.offSalePrice
      ? variant?.offSalePrice
      : variant.price
    localizedTotal = getLocalizedPrice(variantOffSalePrice, locale)
  } else {
    localizedTotal = getLocalizedPrice(variant.price, locale)
  }

  const localizedVariant = product?.sizeVariants?.find(
    (sizeVar) => sizeVar.id === variant.size
  )

  const calcCompareAtPriceDiscount = variant?.compareAtPrice - variant?.price

  const discountedCompareAtPrice = getLocalizedPrice(
    variant?.compareAtPrice - calcCompareAtPriceDiscount,
    locale
  )

  const variantSalePrice =
    variant?.salePrice && variant?.salePrice > 0 ? variant?.salePrice : 0

  let salePrice

  if (sales?.saleType === 'Everything Off' && variantSalePrice > 0) {
    salePrice = getLocalizedSalePrice(
      variantSalePrice,
      sales,
      locale,
      1,
      product.id
    )
  } else if (sales?.saleType === 'Level Up Offer') {
    const calcSalePrice = getLevelUpSalePrice(variant.price, sales, subtotal)

    salePrice = getLocalizedPrice(calcSalePrice, locale, 1)
  } else if (sales) {
    salePrice = getLocalizedSalePrice(
      variant.price,
      sales,
      locale,
      1,
      product.id
    )
  }

  const isFreeGift = sales ? isProductFreeGift(sales, product.id) : false
  const hasFreeGift = sales ? doesProductHaveFreeGift(sales, product.id) : false
  const isEndyCash = sales?.displayName.includes('Endy Cash')

  // Determine if product has a mystery gift
  const mysteryGiftOffer = specialOffers?.mysteryGift
  const mysteryGiftProducts = mysteryGiftOffer?.products

  const mysteryGiftStartDate = formatSanitySaleStartDate(
    mysteryGiftOffer?.startDate
  )
  const mysteryGiftEndDate = formatSanitySaleEndDate(mysteryGiftOffer?.endDate)

  const isMysteryGiftOfferActive = isSaleActive(
    mysteryGiftStartDate,
    mysteryGiftEndDate
  )

  const hasMysteryGift =
    isMysteryGiftOfferActive &&
    mysteryGiftProducts.find((mysteryGiftProduct) => {
      return mysteryGiftProduct?.id === product.id
    })
      ? true
      : false

  // get inventory info for mystery gift
  const [mysteryGiftProductInventoryInfo, updateMysteryGiftInventoryInfo] =
    useState([])

  const mysteryGift = specialOffers?.mysteryGift?.gift[0]
  // TODO hard-coding the first variant for the mystery gift product. Will require an update if multiple variants exist.
  const mysteryGiftVariant = mysteryGift?.variants[0]

  const mysteryGiftInventoryInfo = mysteryGiftProductInventoryInfo.find(
    (productInfo: VariantProps) => {
      return productInfo.id === mysteryGift?.id
    }
  )

  const mysteryGiftWithStockInfo = mysteryGift
    ? getProductWithStock(mysteryGift, mysteryGiftInventoryInfo)
    : null

  useEffect(() => {
    if (mysteryGift?.id) {
      const fetchStockInfo = async () => {
        const currentProductId = mysteryGift.id
        const response = await axios(
          `/api/shopify/product-inventory?ids=${currentProductId}`
        )
        updateMysteryGiftInventoryInfo(response.data)
      }

      fetchStockInfo()
    }
  }, [])

  const mysteryGiftVariantStockInfo = mysteryGiftWithStockInfo?.variants.find(
    (variant: VariantProps) => {
      return variant.id === mysteryGiftVariant?.id
    }
  )

  const submitAddToCart = (
    crossSellItem: { id: number; quantity: number }[]
  ) => {
    const freeGiftProducts: { id: number; quantity: number }[] = []

    if (hasMysteryGift && mysteryGiftVariantStockInfo) {
      const mysteryGiftItem = { id: mysteryGiftVariant?.id, quantity: 1 }

      freeGiftProducts.push(mysteryGiftItem)
    }

    const updatedCrossSellItems = [...crossSellItem, ...freeGiftProducts]

    return addItemToCart(updatedCrossSellItems)
  }

  const { primaryCartCrossSellPillLabel, secondaryCartCrossSellPillLabel } =
    sales?.cartCrossSellPillLabels || {}

  if (isFreeGift || isSecondarySaleProduct(sales, product.id)) {
    promoFlagCopy =
      secondaryCartCrossSellPillLabel || sales?.secondaryProductPillLabel
  } else {
    promoFlagCopy =
      primaryCartCrossSellPillLabel || sales?.secondaryProductPillLabel
  }
  const showDiscountAmount = sales?.saleType === 'Level Up Offer'

  const calcDiscountForLevelUpOffer =
    (sales?.saleType === 'Level Up Offer' ||
      sales?.secondarySaleType === 'Level Up Offer') &&
    subtotal < sales?.discountThresholdForLevelUp
      ? sales?.firstDiscountForLevelUp
      : sales?.secondDiscountForLevelUp

  const formatDiscountForLevelUpOffer = () => {
    return sales?.discountValueForLevelUp === 'Percentage'
      ? `${calcDiscountForLevelUpOffer}${locale === 'en' ? `% ` : ` % `}`
      : `${getLocalizedPrice(calcDiscountForLevelUpOffer, locale)} `
  }
  const isVariantOnDiscount = isVariantOnCompareAtPrice(variant)

  return (
    <StyledCrossSellProduct>
      {(showPromoTag || showFreeGift || hasFreeGift) &&
        sales &&
        !isVariantOnDiscount && (
          <PromoFlag
            isCartCrossSell={showPromoTag || showFreeGift || hasFreeGift}
            promoCopy={promoFlagCopy}
            bgColor={sales.themeColor}
            color={getSaleTextHexColor(sales.themeColor)}
          />
        )}

      {isVariantOnDiscount && (
        <PromoFlag
          isCartCrossSell={showPromoTag || showFreeGift || hasFreeGift}
          promoCopy={getLocalizedDiscount(
            variant.compareAtPrice,
            variant.price,
            locale
          )}
          bgColor={'#FFFFFF'}
          color={'#243746'}
        />
      )}

      {product?.slug ? (
        <Link
          href={`/products${product?.slug}`}
          locale={locale}
          onClick={toggleCart}
        >
          <CrossSellProductImage product={product} variant={variant} />
        </Link>
      ) : (
        <CrossSellProductImage product={product} variant={variant} />
      )}

      <StyledCrossSellProductInfo>
        {product?.slug ? (
          <StyledCrossSellLink
            href={`/products${product?.slug}`}
            locale={locale}
            onClick={toggleCart}
          >
            <StyledCartCrossSellHeading
              variant={'smallBody'}
              color='gravy'
              hasProductSlug={product?.slug ? true : false}
            >
              <strong>{product?.name}</strong>
            </StyledCartCrossSellHeading>
          </StyledCrossSellLink>
        ) : (
          <StyledCartCrossSellHeading
            variant={'smallBody'}
            color='gravy'
            hasProductSlug={product?.slug ? true : false}
          >
            <strong>
              {isEndyCash
                ? `${localizedDictionary.freeGift} : ${product?.name}`
                : product?.name}
            </strong>
          </StyledCartCrossSellHeading>
        )}

        {showDiscountAmount && (
          <StyledDiscountAmount variant={'smallBody'} color={'rubine'}>
            <strong>
              {calcDiscountForLevelUpOffer && formatDiscountForLevelUpOffer()}
              {localizedDictionary.cartFixedSalesMessageOff}
            </strong>
          </StyledDiscountAmount>
        )}
        <CartCrossSellPrice
          localizedTotal={localizedTotal}
          sales={sales}
          showSalePrice={showSalePrice}
          salePrice={salePrice?.toString()}
          discountedCompareAtPrice={discountedCompareAtPrice}
          isReducedPriceActive={isReducedPriceActive}
        />
        <Text variant={'smallBody'} color='gravy'>
          {localizedVariant?.label}
        </Text>
      </StyledCrossSellProductInfo>
      <StyledCrossSellItemAdd>
        <Button
          variant={'solid-gravy'}
          label={locale === 'en' ? '+ Add to Cart' : '+ Ajouter'}
          onClick={() => {
            submitAddToCart([{ id: variant.id, quantity: 1 }])
            googleAnalytics.addCartCrossSellToCart({
              product,
              variant,
              sales
            })
          }}
          className='SideCartCrossSellCTA'
        />
      </StyledCrossSellItemAdd>
    </StyledCrossSellProduct>
  )
}

export default CartCrossSellProduct
