import { Text } from '../Text/Text'
import { SaleProps } from '../../Interfaces/sales'
import {
  StyledCartItemOriginalPrice,
  StyledCartItemSalePriceContainer
} from './Cart.styled'

interface CartCrossSellPriceProps {
  localizedTotal: string
  sales: SaleProps
  showSalePrice: boolean
  salePrice?: string
  discountedCompareAtPrice: string
  isReducedPriceActive: boolean
}

const CartCrossSellPrice = ({
  localizedTotal,
  sales,
  showSalePrice,
  salePrice,
  discountedCompareAtPrice,
  isReducedPriceActive
}: CartCrossSellPriceProps) => {
  if ((showSalePrice && sales) || isReducedPriceActive) {
    return (
      <StyledCartItemSalePriceContainer>
        <StyledCartItemOriginalPrice variant={'smallBody'} color={'gravy70'}>
          {localizedTotal}
        </StyledCartItemOriginalPrice>
        <Text variant={'smallBody'} color={'gravy'}>
          <strong>
            {salePrice}
            {isReducedPriceActive && !sales && discountedCompareAtPrice}
          </strong>
        </Text>
      </StyledCartItemSalePriceContainer>
    )
  }

  return (
    <Text variant={'smallBody'} color='gravy80'>
      <strong>{localizedTotal}</strong>
    </Text>
  )
}

export default CartCrossSellPrice
