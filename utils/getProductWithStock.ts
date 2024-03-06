import { ProductProps } from '../components/ShopModule/ShopModule.types'
import { InventoryInfoProps } from '../Interfaces/inventoryInfo'

export const getProductWithStock = (
  product: ProductProps,
  inventoryInfo: InventoryInfoProps | undefined
) => ({
  ...product,
  variants: product.variants?.map((variant) => {
    const variantInventoryInfo = inventoryInfo?.variants?.find(
      (variantInfo) => {
        return variantInfo.id === variant.id
      }
    )

    return {
      ...variant,
      isAvailable:
        variantInventoryInfo === undefined
          ? true
          : variantInventoryInfo.isAvailable
    }
  })
})
