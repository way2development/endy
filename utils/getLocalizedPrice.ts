import { Locale } from 'types/global-types'
import { SaleProps } from '../Interfaces/sales'
import { isSecondarySaleProduct } from './isProductOnSale'

// Formats price strings to have comma separators for EN and spaces for French (ie. 1,000,000 or 1 000 000)
export const getThousandsSeparator = (price: string, locale: string) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g
  const separator = locale === 'fr' ? ' ' : ','

  return price.replace(regex, separator)
}

export const getFixedNumber = (num: number) => {
  const requiresDecimal = Math.floor(num) !== num
  return requiresDecimal ? num.toFixed(2) : num.toFixed(0)
}

export const getLocalizedPrice = (
  num: number,
  locale: string,
  quantity = 1
) => {
  const sum = num * quantity
  const price = Math.round(sum * 100) / 100

  const priceWithFixedDigits = getFixedNumber(price)

  const formattedEnglishPrice = getThousandsSeparator(
    priceWithFixedDigits,
    locale
  )

  const formattedFrenchPrice = getThousandsSeparator(
    priceWithFixedDigits,
    locale
  ).replace('.', ',')

  return locale === 'fr'
    ? `${formattedFrenchPrice} $`
    : `$${formattedEnglishPrice}`
}

export const getLevelUpSalePrice = (
  regPrice: number,
  sales: SaleProps,
  cartSubtotal?: number
) => {
  const {
    discountThresholdForLevelUp,
    firstDiscountForLevelUp,
    secondDiscountForLevelUp,
    discountValueForLevelUp
  } = sales

  const isPriceGreaterThanThreshold = regPrice > discountThresholdForLevelUp

  let activeDiscount

  if (cartSubtotal) {
    const isSubtotalGreaterThanThreshold =
      cartSubtotal > discountThresholdForLevelUp

    activeDiscount = isSubtotalGreaterThanThreshold
      ? secondDiscountForLevelUp
      : firstDiscountForLevelUp
  } else {
    activeDiscount = isPriceGreaterThanThreshold
      ? secondDiscountForLevelUp
      : firstDiscountForLevelUp
  }

  if (discountValueForLevelUp === 'Percentage') {
    return regPrice * ((100 - activeDiscount) / 100)
  }

  if (discountValueForLevelUp === 'Fixed Amount') {
    return regPrice - activeDiscount
  }

  return regPrice
}

// TODO: Functions takes many arguments. Clean up function and refactor to use a higher-level object so that arguments are managable.
export const getLocalizedSalePrice = (
  regPrice: number,
  sales: SaleProps,
  locale: string,
  quantity: number,
  productId?: number
) => {
  if (sales.saleType === 'Percentage') {
    return (
      sales.discountPercentage &&
      getLocalizedPrice(
        regPrice * ((100 - sales.discountPercentage) / 100),
        locale,
        quantity
      )
    )
  }

  if (sales.saleType === 'Level Up Offer') {
    const salePrice = getLevelUpSalePrice(regPrice, sales)
    return getLocalizedPrice(salePrice, locale, quantity)
  }

  if (
    productId &&
    isSecondarySaleProduct(sales, productId) &&
    sales?.secondarySaleType === 'Percentage'
  ) {
    return (
      sales.secondaryDiscountPercentage &&
      getLocalizedPrice(
        regPrice * ((100 - sales.secondaryDiscountPercentage) / 100),
        locale,
        quantity
      )
    )
  }

  if (sales.saleType === 'Fixed Amount') {
    return (
      sales.discountValue &&
      getLocalizedPrice(regPrice - sales.discountValue, locale, quantity)
    )
  }

  if (
    productId &&
    isSecondarySaleProduct(sales, productId) &&
    sales?.secondarySaleType === 'Fixed Amount'
  ) {
    return (
      sales.secondaryDiscountValue &&
      getLocalizedPrice(
        regPrice - sales.secondaryDiscountValue,
        locale,
        quantity
      )
    )
  }

  return getLocalizedPrice(regPrice, locale, quantity)
}

export const getSum = (num: number, quantity: number) => {
  const sum = num * quantity
  return Math.round(sum * 100) / 100
}

// Returns the total value of the cart (including discounts) as a number
export const getSaleCartTotal = (
  regPrice: number,
  sales: SaleProps,
  quantity: number,
  productId: number
) => {
  if (sales.saleType === 'Percentage') {
    return sales.discountPercentage
      ? getSum(regPrice * ((100 - sales.discountPercentage) / 100), quantity)
      : getSum(regPrice, quantity)
  }

  if (
    sales.saleType === 'Fixed Amount' &&
    !isSecondarySaleProduct(sales, productId)
  ) {
    return sales.discountValue
      ? getSum(regPrice - sales.discountValue, quantity)
      : getSum(regPrice, quantity)
  }

  if (
    isSecondarySaleProduct(sales, productId) &&
    sales?.secondarySaleType === 'Percentage'
  ) {
    return sales.secondaryDiscountPercentage
      ? getSum(
          regPrice * ((100 - sales.secondaryDiscountPercentage) / 100),
          quantity
        )
      : getSum(regPrice, quantity)
  }

  if (
    isSecondarySaleProduct(sales, productId) &&
    sales?.secondarySaleType === 'Fixed Amount'
  ) {
    return sales.secondaryDiscountValue
      ? getSum(regPrice - sales.secondaryDiscountValue, quantity)
      : getSum(regPrice, quantity)
  }

  return getSum(regPrice, quantity)
}

// getSaleCartTotal does not work with BMSM calculation
export const getBmsmData = (
  totalCartPrice: number,
  sales: SaleProps | undefined
) => {
  const firstDiscountThreshold = sales?.firstDiscountThreshold || 0
  const secondDiscountThreshold = sales?.secondDiscountThreshold || 0

  const firstDiscount = sales?.firstDiscount || 0
  const secondDiscount = sales?.secondDiscount || 0

  const isFirstDiscountThresholdMet =
    totalCartPrice >= firstDiscountThreshold &&
    totalCartPrice < secondDiscountThreshold

  const isSecondDiscountThresholdMet = totalCartPrice >= secondDiscountThreshold

  if (isFirstDiscountThresholdMet) {
    return { activeDiscount: firstDiscount, activePromoCode: sales?.promoCode }
  }

  if (isSecondDiscountThresholdMet) {
    return {
      activeDiscount: secondDiscount,
      activePromoCode: sales?.secondPromoCode
    }
  }

  // Default
  return {
    activeDiscount: 0,
    activePromoCode: sales?.promoCode
  }
}

// Return regular price and sale price based on user locale
export const getLocalizedPrices = (
  sales: SaleProps | undefined,
  variantPrice: number,
  locale: Locale
) => {
  const regularPrice = getLocalizedPrice(variantPrice, locale)
  const salePrice =
    sales && getLocalizedSalePrice(variantPrice, sales, locale, 1)

  return [regularPrice, salePrice]
}

export const getLocalizedAffirmPrice = (
  regPrice: number,
  sales: SaleProps | undefined,
  locale: string,
  quantity: number,
  productId?: number
) => {
  const INSTALMENT = 12

  let priceWithDiscounts = regPrice

  if (sales && sales.saleType === 'Percentage' && sales.discountPercentage) {
    priceWithDiscounts = regPrice * ((100 - sales.discountPercentage) / 100)
  }

  if (
    sales &&
    productId &&
    isSecondarySaleProduct(sales, productId) &&
    sales?.secondarySaleType === 'Percentage' &&
    sales.secondaryDiscountPercentage
  ) {
    priceWithDiscounts =
      regPrice * ((100 - sales.secondaryDiscountPercentage) / 100)
  }

  if (sales && sales.saleType === 'Fixed Amount' && sales.discountValue) {
    priceWithDiscounts = regPrice - sales.discountValue
  }

  if (sales && sales.saleType === 'Level Up Offer') {
    priceWithDiscounts = getLevelUpSalePrice(regPrice, sales)
  }
  const paymentAmount = priceWithDiscounts / INSTALMENT

  return getLocalizedPrice(paymentAmount, locale, quantity)
}
