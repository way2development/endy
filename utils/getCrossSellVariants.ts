import { ProductProps } from '../components/ShopModule/ShopModule.types'
import { getEquivalentMattressSizes } from './getEquivalentMattressSizes'

export const getCrossSellVariants = (
  products: ProductProps[],
  selectedMattressSizes: string[],
  sizeRanking: string[]
) => {
  const crossSellVariants = products?.map((crossSellProduct) => {
    // sort mattressSizes based on ranking
    const sortedMattressSizes = sizeRanking?.map(sizeRankingId => {
      return selectedMattressSizes.find(mattressSizeId => mattressSizeId === sizeRankingId)
    }).filter((sizeVariant) => sizeVariant)

    const availabeVariant = sortedMattressSizes.map(sizeId => {
      // find variant that contains equivalent mattress size
      return crossSellProduct.variants.find(variant => {
        const variantMattressSizes = getEquivalentMattressSizes(crossSellProduct, variant)
        return variantMattressSizes.includes(sizeId || '') && variant.isAvailable
      })
    }).filter(variant => variant)
    return availabeVariant[0]
  }) || []

  const availableCrossSellVariants = crossSellVariants.filter(variant => variant)

  return availableCrossSellVariants
}