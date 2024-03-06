import {
  ProductProps,
  VariantProps
} from '../components/ShopModule/ShopModule.types'
import { getLocalizedPrice } from '../utils/getLocalizedPrice'
import { Locale } from '../types/global-types'
import dictionary from '../dictionary.json'

export const doesProductHaveCompareAtPrice = (product: ProductProps) => {
  return product?.variants.some((variant) => variant.compareAtPrice > 0)
}

export const getDiscountPillCopy = (
  compareAtPrice: number,
  price: number,
  locale: Locale
) => {
  const localizedDictionary = dictionary[locale]
  const discountAmount = compareAtPrice - price

  const formattedDiscountAmount = getLocalizedPrice(discountAmount, locale)

  return `${localizedDictionary.youreInLuck} | ${formattedDiscountAmount} 
  ${localizedDictionary.cartFixedSalesMessageOff}`
}

export const isVariantOnCompareAtPrice = (variant: VariantProps) => {
  return variant.compareAtPrice > 0
}

export const getLocalizedDiscount = (
  compareAtPrice: number,
  price: number,
  locale: Locale
) => {
  const localizedDictionary = dictionary[locale]
  const discountAmount = compareAtPrice - price

  const formattedDiscountAmount = getLocalizedPrice(discountAmount, locale)

  return `${formattedDiscountAmount} 
    ${localizedDictionary.cartFixedSalesMessageOff}`
}
