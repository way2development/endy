import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'

// TODO: Swap any type for something more specific. Find a better way to declare global kd object
declare const kd: any

export const kickDynamicTracking = {
  viewProduct: (product: ProductProps) => {
    const productID = product.id

    if (typeof kd !== undefined) {
      kd.push(['view', productID])
      kd.push(['submit'])
    }
  },
  viewCart: (cartVariants: VariantProps[]) => {
    const cartItems = cartVariants.map((variant) => {
      return {
        item: variant.productId,
        price: variant.price,
        quantity: variant.quantity,
        uniqueItemId: variant.sku
      }
    })

    if (typeof kd !== undefined) {
      kd.push(['cart', cartItems])
      kd.push(['submit'])
    }
  }
}
