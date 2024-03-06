import {
  ProductProps,
  VariantProps
} from '../components/ShopModule/ShopModule.types'

export const getEquivalentMattressSizes = (
  product: ProductProps,
  selectedVariant: VariantProps
) => {
  return (
    product?.sizeVariants?.find(
      (variant) => variant.id === selectedVariant.size
    )?.mattressSize || []
  )
}
