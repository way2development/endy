import { RefObject } from 'react'
import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'
import { isProductOnSale } from '../../utils'
import { SaleProps } from '../../Interfaces/sales'

type Item = ItemProps | undefined
// Making all parameters optional as we have different params for elevar and GA4
export interface ItemProps {
  item_name?: string
  item_id?: string
  price?: string | number
  item_brand?: string
  item_category?: string
  item_variant?: string
  product_image_url?: string
  variant_sku?: string
  item_list_name?: string
  brand?: string
  category?: string
  id?: string
  variant?: string
  variant_id?: string
  list?: string
  quantity?: string | number
  position?: number
  compare_price?: string | number
  image?: string
  item_variant_id?: string
  index?: number
}

export const isScrolledIntoView = (ref: RefObject<HTMLDivElement>) => {
  const elemContainer = ref?.current?.getBoundingClientRect()
  const elemTop = elemContainer?.top
  const elemBottom = elemContainer?.bottom
  const isVisible =
    elemTop && elemTop >= 0 && elemBottom && elemBottom <= window.innerHeight

  return isVisible
}

export const getProductByProductId = (
  products: ProductProps[],
  productId: number
) => {
  return products.find((product) => {
    return product.id === productId
  })
}

export const getVariantByVariantId = (
  variants: VariantProps[],
  variantId: number
) => variants.find((variant) => variantId === variant.id)

export const getVariantByProductId = (
  variants: (VariantProps | undefined)[] | undefined,
  productId: number
) => {
  return variants?.find((variant) => {
    if (!variant) return

    return productId === variant.productId
  })
}

// Making all parameters optional as we have different params for elevar and GA4
interface CurrentItemProps {
  item_name?: string
  item_id?: string
  price?: string | number
  item_brand?: string
  item_category?: string
  item_variant?: string
  product_image_url?: string
  variant_sku?: string
  item_list_name?: string
  brand?: string
  category?: string
  id?: string
  variant?: string
  variant_id?: string
  list?: string
  quantity?: string | number
  position?: number
  compare_price?: string | number
  image?: string
}

interface ViewItemListProps {
  currentItem: CurrentItemProps
  listId: string
  product: ProductProps
  sales: SaleProps | undefined
  variants?: (VariantProps | undefined)[] | undefined
  listName: string
}

export const getviewItemListProducts = ({
  currentItem,
  listId,
  product,
  sales,
  variants,
  listName
}: ViewItemListProps) => {
  const isCollection = listId === 'collections'
  const variant = isCollection
    ? product.variants[0]
    : getVariantByProductId(variants, product.id)

  const viewItemListProducts = {
    ...currentItem,
    item_list_id: `${listId}`,
    item_list_name: `${listName}`,
    item_variant: variant?.title,
    item_variant_id: variant?.id?.toString(),
    price: variant?.price?.toString(),
    compare_price: variant?.compareAtPrice?.toString(),
    quantity: '1'
  }

  const viewItemListProductsOnSale = {
    ...viewItemListProducts,
    coupon: sales?.promoCode
  }

  return sales && isProductOnSale(sales, product.id)
    ? viewItemListProductsOnSale
    : viewItemListProducts
}

export const getRankedCrossSells = (
  filteredItems: Item[],
  variants: (VariantProps | undefined)[] | undefined
) => {
  if (!variants) return
  return filteredItems
    .sort((firstEl, secondEl) => {
      return (
        variants.findIndex(
          (variant) => variant?.id === firstEl?.item_variant_id
        ) -
        variants.findIndex(
          (variant) => variant?.id === secondEl?.item_variant_id
        )
      )
    })
    .slice(0, 3)
}

export const getCrossSellWithCorrectIndexes = (
  filteredItems: Item[] | undefined
) => {
  return filteredItems?.map((items, i) => {
    if (items?.index === i) filteredItems

    return {
      ...items,
      index: i + 1
    }
  })
}

export const getCartItemData = (
  cartProducts: ProductProps[],
  cartVariants: VariantProps[],
  sales: SaleProps
) => {
  const items = cartVariants.map((cartVariant) => {
    const product = getProductByProductId(cartProducts, cartVariant.productId)

    const currentItem = {
      item_name: `${product?.title}`,
      item_id: cartVariant.sku,
      price: cartVariant.price,
      item_brand: 'Endy',
      item_category: product?.productType,
      item_variant: cartVariant.title,
      quantity: cartVariant.quantity,
      product_image_url: product?.previewImageUrl,
      variant_sku: cartVariant.sku
    }

    if (isProductOnSale(sales, cartVariant.productId)) {
      return {
        ...currentItem,
        coupon: sales.promoCode
      }
    }

    return {
      ...currentItem
    }
  })

  return items
}

// TODO: add to a Google Analytics doc for debugging purposes
export const getFilteredDataLayer = () => {
  return window.dataLayer.filter((data: any) => {
    return data.event !== 'optimize.domChange'
  })
}
// Retrieves the cart item data for Elevar tracking.
export const getCartItemDataElevar = (
  cartProducts: ProductProps[],
  cartVariants: VariantProps[],
  sales: SaleProps
) => {
  const items = cartVariants.map((cartVariant, index) => {
    const product = getProductByProductId(cartProducts, cartVariant.productId)

    const currentItem = {
      brand: 'Endy',
      category: `${product?.productType}`,
      id: cartVariant?.sku?.toString(),
      name: `${product?.title} - ${cartVariant.title}`,
      variant: cartVariant.title,
      variant_id: cartVariant.id?.toString(),
      price: cartVariant?.price?.toString(),
      image: `${product?.previewImageUrl}`,
      product_id: `${product?.id?.toString()}`,
      quantity: cartVariant.quantity?.toString(),
      position: index + 1,
      compare_price: cartVariant.compareAtPrice?.toString(),
      list: `/product${product?.slug}`
    }

    if (isProductOnSale(sales, cartVariant.productId)) {
      return {
        ...currentItem,
        coupon: sales.promoCode
      }
    }

    return {
      ...currentItem
    }
  })

  return items
}
