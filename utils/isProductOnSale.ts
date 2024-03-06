import { SaleProps } from '../Interfaces/sales'

const isProductDiscounted = (
  productsOnSale: number[] | undefined,
  id: number
): boolean => {
  const saleProducts = productsOnSale !== undefined ? productsOnSale : []

  return saleProducts.some((productId) => productId === id)
}

// Determines if product is included in active sale by product id
// TODO: Revisit helper function as additional sale types are added
export const isProductOnSale = (sales: SaleProps, id: number): boolean => {
  let isOnSale = false

  if (!sales) return isOnSale

  const { saleType, secondarySaleType } = sales

  if (saleType === 'Percentage') {
    isOnSale = isProductDiscounted(sales.discountPercentageProducts, id)
  }

  if (saleType === 'Fixed Amount') {
    isOnSale = isProductDiscounted(sales.discountValueProducts, id)
  }

  if (saleType === 'Buy X Get Y') {
    isOnSale =
      doesProductHaveFreeGift(sales, id) || isProductFreeGift(sales, id)
  }

  if (saleType === 'Bmsm') {
    isOnSale = isProductDiscounted(sales.bmsmProducts, id)
  }

  if (saleType === 'Everything Off') {
    isOnSale = isProductDiscounted(sales.everythingOffProducts, id)
  }

  if (saleType === 'Level Up Offer') {
    isOnSale = isProductDiscounted(sales.levelUpProducts, id)
  }

  if (!isOnSale && secondarySaleType === 'Percentage') {
    isOnSale = isProductDiscounted(
      sales.secondaryDiscountPercentageProducts,
      id
    )
  }

  if (!isOnSale && secondarySaleType === 'Fixed Amount') {
    isOnSale = isProductDiscounted(sales.secondaryDiscountValueProducts, id)
  }

  return isOnSale
}

export const doesProductHaveFreeGift = (
  sales: SaleProps,
  id: number
): boolean => {
  const { bxgyProductData, saleType } = sales

  let hasFreeGift = false

  if (saleType === 'Buy X Get Y') {
    const productIds = bxgyProductData?.map((product) => product.id)
    hasFreeGift = isProductDiscounted(productIds, id)
  }

  return hasFreeGift
}

export const isProductFreeGift = (sales: SaleProps, id: number): boolean => {
  const { customerGetsProducts, saleType } = sales

  let isFreeGift = false

  if (saleType === 'Buy X Get Y') {
    isFreeGift = customerGetsProducts?.id === id
  }

  return isFreeGift
}

export const isSecondarySaleProduct = (
  sales: SaleProps | undefined,
  id: number
) => {
  let isOnSale = false

  if (!sales || !sales?.secondarySaleType) return isOnSale

  if (sales?.secondarySaleType === 'Percentage') {
    isOnSale = isProductDiscounted(
      sales.secondaryDiscountPercentageProducts,
      id
    )
  }

  if (sales?.secondarySaleType === 'Fixed Amount') {
    isOnSale = isProductDiscounted(sales.secondaryDiscountValueProducts, id)
  }

  return isOnSale
}
