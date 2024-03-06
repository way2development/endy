import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import {
  StyledSalePillFlagContainer,
  StyledSalePillFlag
} from './ShopModule.styled'

import { ProductProps } from '../ShopModule/ShopModule.types'
import {
  doesProductHaveCompareAtPrice,
  getDiscountPillCopy
} from '../../utils/compareAtPrice'
interface CompareAtPricePillProps {
  product: ProductProps
  variantPrice: number
  compareAtPrice: number | null
  locale: Locale
}

export const CompareAtPricePill = ({
  product,
  compareAtPrice,
  variantPrice,
  locale
}: CompareAtPricePillProps) => {
  const localizedDictionary = dictionary[locale]

  const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)

  if (!hasVariantWithDiscount) return null

  let pillCopy

  if (hasVariantWithDiscount && !compareAtPrice) {
    pillCopy = localizedDictionary.saveOnSelectItems
  }

  if (hasVariantWithDiscount && compareAtPrice) {
    pillCopy = getDiscountPillCopy(compareAtPrice, variantPrice, locale)
  }

  return (
    <>
      <StyledSalePillFlagContainer>
        <StyledSalePillFlag variant={'mediumBody'} color={'gravy'}>
          {pillCopy}
        </StyledSalePillFlag>
      </StyledSalePillFlagContainer>
    </>
  )
}
