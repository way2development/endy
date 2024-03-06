import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { useCheckout, useToggleCart } from '../../lib/context'

import {
  getLocalizedPrice,
  getLocalizedAffirmPrice,
  getSaleCartTotal,
  getSum,
  getBmsmData,
  getLevelUpSalePrice
} from '../../utils/getLocalizedPrice'
import {
  StyledText,
  StyledTotals,
  StyledTotalsRow,
  StyledCartLink,
  StyledCartTotalContainer,
  StyledOriginalTotal,
  StyledSavingsPill,
  StyledAffirmRow
} from './Cart.styled'
import { Text } from '../Text/Text'
import { SaleProps } from '../../Interfaces/sales'
import { StyledVisuallyHidden } from '../../styles/global.styled'
import { LineItemProps } from './CartItem'
import { ProductProps } from '../ShopModule/ShopModule.types'
import {
  isProductOnSale,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { googleAnalytics } from '../GoogleAnalytics/analytics'
import { getCookie } from '../../utils/cookies'
import { PromoPill } from '../PromoPill/PromoPill'

interface CheckoutProps {
  locale: Locale
  sales: SaleProps
  items: LineItemProps[]
  products: ProductProps[]
  setSubtotal: Dispatch<SetStateAction<number>>
  subtotal: number
}

export const Checkout = ({
  locale,
  sales,
  items,
  products,
  setSubtotal,
  subtotal
}: CheckoutProps) => {
  const localizedDictionary = dictionary[locale]
  const affirmLogo =
    'https://cdn.sanity.io/images/d0kd7r9c/production/cadb20e2292a5591f3e835dd8908864f2d376cc1-40x16.svg'
  const [isHovered, setIsHovered] = useState(false)
  const lockIcon = isHovered
    ? 'https://cdn.sanity.io/images/d0kd7r9c/production/9f8839b3bdad49318afc45019737682e72d8a80e-16x16.svg'
    : 'https://cdn.sanity.io/images/d0kd7r9c/production/690ccf3db71720488d7bd60eebab5caf7586dd58-16x16.svg'
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Context
  const checkoutURL = useCheckout()
  const [checkoutLink, setCheckoutLink] = useState(checkoutURL)
  const [disableFreeShipping, setDisableFreeShipping] = useState(false)
  const toggleCart = useToggleCart()

  const subtotalBeforeDiscounts = items.reduce((sum, item) => {
    let regularPrice

    if (sales?.saleType === 'Everything Off' && item.offSalePrice !== null) {
      regularPrice = item.offSalePrice
    } else if (item.compareAtPrice > 0) {
      regularPrice = item.compareAtPrice
    } else {
      regularPrice = item.price
    }

    return (sum += regularPrice * item.quantity)
  }, 0)

  const subtotalWithDiscountsApplied = items.reduce((sum, item) => {
    let itemTotalPrice = getSum(item.price, item.quantity)

    // Product Record Discounts
    if (sales?.saleType === 'Everything Off') {
      const salePrice = item.salePrice ? item.salePrice : 0
      const finalPrice = salePrice > 0 ? salePrice : item.price
      itemTotalPrice = finalPrice * item.quantity
    }

    if (sales?.saleType === 'Level Up Offer') {
      const calcSalePrice = getLevelUpSalePrice(item.price, sales, subtotal)
      itemTotalPrice = getSum(calcSalePrice, item?.quantity)
    }

    // Sale Record Discounts
    const product = products.find((product) => product.id === item.productId)
    const isOnSale =
      sales && product ? isProductOnSale(sales, product.id) : false
    const isSecondarySale =
      sales && product ? isSecondarySaleProduct(sales, product?.id) : false

    if (
      isOnSale &&
      (sales?.saleType === 'Percentage' || sales?.saleType === 'Fixed Amount')
    ) {
      itemTotalPrice = getSaleCartTotal(
        item.price,
        sales,
        item.quantity,
        item.productId
      )
    }

    if (isOnSale && sales?.saleType === 'Buy X Get Y') {
      const freeGiftQuantity = item?.freeGiftQuantity
        ? item.quantity - item.freeGiftQuantity
        : item.quantity
      itemTotalPrice = getSaleCartTotal(
        item.price,
        sales,
        freeGiftQuantity,
        item.productId
      )
    }

    return sum + itemTotalPrice
  }, 0)

  // Cart Level Discounts - ie. BMSM

  // Calculate the total value of BMSM items in cart
  const saleProductsTotal = items.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.productId)

    const isOnSale =
      sales && product ? isProductOnSale(sales, product.id) : false

    const bmsmTotal = isOnSale ? item.price * item.quantity : 0

    return (sum += bmsmTotal)
  }, 0)

  const bmsmData = getBmsmData(saleProductsTotal, sales)

  const subtotalWithCartDiscountsApplied =
    subtotalWithDiscountsApplied - bmsmData.activeDiscount

  // If cart items are discount, show sale price
  const showSale =
    subtotalBeforeDiscounts > subtotalWithDiscountsApplied ||
    subtotalBeforeDiscounts > subtotalWithCartDiscountsApplied

  // This does not include cart/BMSM discount
  const totalSavings = getLocalizedPrice(
    subtotalBeforeDiscounts - subtotalWithDiscountsApplied,
    locale
  )
  // This includes cart/BMSM discounts
  const totalSavingsIncludingCartDiscounts =
    sales?.saleType === 'Bmsm'
      ? getLocalizedPrice(
          subtotalBeforeDiscounts - subtotalWithCartDiscountsApplied,
          locale
        )
      : totalSavings

  const calcPromoCode = () => {
    if (
      sales.saleType === 'Level Up Offer' &&
      subtotal < sales?.discountThresholdForLevelUp
    ) {
      return sales.promoCode
    } else if (
      sales.saleType === 'Level Up Offer' &&
      subtotal >= sales?.discountThresholdForLevelUp
    ) {
      return sales.secondPromoCodeForLevelUp
    }

    if (sales.saleType === 'Bmsm') {
      return bmsmData.activePromoCode
    }

    return sales.promoCode
  }

  // function to get the promo code from the cookie
  const personalPromoCode = () => {
    const promoCode = getCookie('promoCode')
    return promoCode ? '&discount=' + promoCode : ''
  }

  useEffect(() => {
    setSubtotal(subtotalBeforeDiscounts)
  }, [subtotalBeforeDiscounts])

  // TODO: french checkout link does not currently work - fix when translated page is live in Shopify
  useEffect(() => {
    if (checkoutURL || sales) {
      const buildCheckoutLink = checkoutURL.replace(
        /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/g,
        'https://ca.endy.com'
      )
      const localizedLink =
        locale === 'en'
          ? buildCheckoutLink + '&locale=en'
          : buildCheckoutLink + '&locale=fr'

      // Add promos to checkout URL
      const checkoutLink =
        sales?.promoCode && showSale && sales?.saleType !== 'Everything Off'
          ? localizedLink + '&discount=' + calcPromoCode()
          : localizedLink + personalPromoCode()

      // Add referrals to checkout URL
      const utmObject = getCookie('utmObject') !== ''
      const checkoutLinkWithParams = utmObject
        ? checkoutLink + `&${getCookie('utmObject')}`
        : checkoutLink

      setCheckoutLink(checkoutLinkWithParams)
    }
  }, [checkoutURL, sales, showSale, calcPromoCode])

  // if *any* item in cart has paid shipping, disable 'free shipping' copy
  useEffect(() => {
    const isPaidShipping = items.some((item) => {
      const product = products.find((product) => product.id === item.productId)
      return product?.disableFreeShipping
    })
    // some() method returns true or false, use to set state variable
    setDisableFreeShipping(isPaidShipping)
  }, [items])

  // Affirm Financing Row Logic
  const regPrice = subtotalWithCartDiscountsApplied
  const qty = 1
  const isAffirmAvailable = regPrice >= 250
  const affirmFinancingPrice = getLocalizedAffirmPrice(
    regPrice,
    sales,
    locale,
    qty
  )

  // Redirect to Checkout & track analytics
  const redirectToCheckout = (result: unknown) => {
    if (result) {
      window.open(checkoutLink, '_self')
    } else {
      window.open(checkoutLink, '_self')
    }
  }

  const fireGA4 = async function () {
    const result = await googleAnalytics.beginCheckout(products, items, sales)
    redirectToCheckout(result)
  }

  const goToCheckout = (e: any) => {
    e.preventDefault()
    toggleCart()
    fireGA4()
  }

  return (
    <>
      <StyledTotals>
        <StyledTotalsRow>
          <Text variant={'smallBody'} color={'gravy'}>
            {localizedDictionary.cartShippingLabel}
          </Text>
          <Text variant={'smallBody'} color={'gravy'}>
            {disableFreeShipping
              ? localizedDictionary.cartShippingPaid
              : localizedDictionary.cartShippingFree}
          </Text>
        </StyledTotalsRow>
        {sales && showSale && sales?.saleType !== 'Everything Off' && (
          <>
            <StyledTotalsRow style={{ textAlign: 'right' }}>
              <Text variant={'smallBody'} color={'gravy'}>
                {localizedDictionary.promoApplied}
              </Text>
              <Text variant={'smallBody'} color={'gravy'}>
                {calcPromoCode()}
              </Text>
            </StyledTotalsRow>
            <StyledSavingsPill>
              <PromoPill
                bgColor={sales?.themeColor}
                variant='gravy'
                promoCopy={`${localizedDictionary.youreSaving} ${totalSavingsIncludingCartDiscounts}!`}
                borderStyle={'dotted'}
                locale={locale}
              />
            </StyledSavingsPill>
          </>
        )}
        {sales && showSale && sales?.saleType === 'Everything Off' && (
          <StyledTotalsRow style={{ textAlign: 'right' }}>
            <Text variant={'smallBody'} color={'gravy'}>
              <strong>{localizedDictionary.discount}</strong>
            </Text>
            <Text variant={'smallBody'} color={'gravy'}>
              {localizedDictionary.youreSaving} {totalSavings}!
            </Text>
          </StyledTotalsRow>
        )}

        {showSale &&
          sales === undefined && ( // accounts for products with compareAtPrice offer, but without an active sale
            <StyledTotalsRow>
              <Text variant={'smallBody'} color={'gravy'}>
                {localizedDictionary.discount}
              </Text>
              <Text variant={'smallBody'} color={'gravy'}>
                {`${localizedDictionary.youreSaving} ${totalSavingsIncludingCartDiscounts}!`}
              </Text>
            </StyledTotalsRow>
          )}
        <StyledTotalsRow>
          <Text variant={'mediumBody'} color={'gravy'}>
            <strong>{localizedDictionary.cartSubtotalLabel}</strong>
          </Text>
          {showSale ? (
            <StyledCartTotalContainer>
              <StyledOriginalTotal
                element={'h3'}
                variant={'h4'}
                color={'gravy70'}
              >
                {getLocalizedPrice(subtotalBeforeDiscounts, locale)}
              </StyledOriginalTotal>
              <StyledText element={'h3'} variant={'h4'} color={'gravy'}>
                <StyledVisuallyHidden>
                  {localizedDictionary.salePriceIs}
                </StyledVisuallyHidden>
                {sales?.saleType === 'Bmsm'
                  ? getLocalizedPrice(subtotalWithCartDiscountsApplied, locale)
                  : getLocalizedPrice(subtotalWithDiscountsApplied, locale)}
              </StyledText>
            </StyledCartTotalContainer>
          ) : (
            <StyledText element={'h3'} variant={'h4'} color={'gravy'}>
              {getLocalizedPrice(subtotalBeforeDiscounts, locale)}
            </StyledText>
          )}
        </StyledTotalsRow>

        {isAffirmAvailable && (
          <StyledAffirmRow>
            {locale === 'en' ? (
              <Text variant={'micro'} color={'gravy'}>
                Or pay {affirmFinancingPrice}/mo with{' '}
                <img src={affirmLogo} alt='Affirm' /> financing.
              </Text>
            ) : (
              <Text variant={'micro'} color={'gravy'}>
                Ou payez {affirmFinancingPrice} par mois avec le financement{' '}
                <img src={affirmLogo} alt='Affirm' />
              </Text>
            )}
          </StyledAffirmRow>
        )}
      </StyledTotals>
      <StyledCartLink
        variant={'solid-rubine'}
        href={checkoutLink}
        onClick={(e) => goToCheckout(e)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={lockIcon} alt='' />
        {localizedDictionary.cartCheckoutButtonLabel}
      </StyledCartLink>
    </>
  )
}

export default Checkout
