import { DEFAULT_CURRENCY_CODE } from '../constants'

const formatNumber = (val: any) => {
  return new Intl.NumberFormat('en', {
    currency: DEFAULT_CURRENCY_CODE,
    style: 'currency'
  }).format(val)
}

export const getPriceRange = (price: any) => {
  if (!price || typeof price?.minVariantPrice === 'undefined') {
    return 'No price found'
  }
  if (price.maxVariantPrice && price.minVariantPrice !== price.maxVariantPrice) {
    return `${formatNumber(price.minVariantPrice)} – ${formatNumber(price.maxVariantPrice)}`
  }

  return formatNumber(price.minVariantPrice)
}
