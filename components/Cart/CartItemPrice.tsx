import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { Text } from '../Text/Text'
import {
  StyledCartItemOriginalPrice,
  StyledCartItemSalePriceContainer
} from './Cart.styled'
import { SaleProps } from '../../Interfaces/sales'

interface CartItemPriceProps {
  localizedTotal: string
  showSale: boolean
  salePrice?: string | number
  isFreeGift: boolean
  locale: Locale
  sales: SaleProps
  isReducedPriceActive: boolean
  regularCompareAtPrice: string | false
  isOnSale: boolean
}

const CartItemPrice = ({
  localizedTotal,
  showSale,
  salePrice,
  isFreeGift,
  locale,
  sales,
  isReducedPriceActive,
  regularCompareAtPrice,
  isOnSale
}: CartItemPriceProps) => {
  const localizedDictionary = dictionary[locale]

  // TODO: Refactor if statements to reduce repetition

  if (showSale && salePrice && sales?.saleType === 'Everything Off') {
    return (
      <StyledCartItemSalePriceContainer>
        <StyledCartItemOriginalPrice variant={'mediumBody'} color={'gravy70'}>
          {localizedTotal}
        </StyledCartItemOriginalPrice>
        <Text variant={'mediumBody'} color={'gravy'}>
          <strong>{salePrice}</strong>
        </Text>
      </StyledCartItemSalePriceContainer>
    )
  }

  // Applies for all other sales: Percentage, Fixed Amount, BMSM, Level Up Offer
  if ((showSale && salePrice) || isReducedPriceActive) {
    return (
      <StyledCartItemSalePriceContainer>
        <StyledCartItemOriginalPrice variant={'mediumBody'} color={'gravy70'}>
          {isReducedPriceActive ? regularCompareAtPrice : localizedTotal}
        </StyledCartItemOriginalPrice>
        <Text variant={'mediumBody'} color={'gravy'}>
          <strong>
            {isReducedPriceActive && !isOnSale ? localizedTotal : salePrice}
          </strong>
        </Text>
      </StyledCartItemSalePriceContainer>
    )
  }

  if (isFreeGift && sales?.saleType === 'Buy X Get Y') {
    const showOutstandingPrice = salePrice !== '$0'
    return (
      <StyledCartItemSalePriceContainer>
        <StyledCartItemOriginalPrice variant={'mediumBody'} color={'gravy70'}>
          {isReducedPriceActive ? regularCompareAtPrice : localizedTotal}
        </StyledCartItemOriginalPrice>
        <Text variant={'mediumBody'} color={'gravy'}>
          <strong>
            {showOutstandingPrice ? salePrice : localizedDictionary.free}
          </strong>
        </Text>
      </StyledCartItemSalePriceContainer>
    )
  }

  return (
    <Text variant={'mediumBody'} color={'gravy'}>
      <strong>{localizedTotal}</strong>
    </Text>
  )
}

export default CartItemPrice
