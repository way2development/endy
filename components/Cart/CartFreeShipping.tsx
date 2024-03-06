import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { StyledFreeShipping } from './Cart.styled'
import { Text } from '../Text'

interface CartFreeShippingProps {
  locale: Locale
}

const checkmarkIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/77352a25e074665374e0f131b5e690be48e29058-16x16.svg'

const CartFreeShipping = ({ locale }: CartFreeShippingProps) => {
  const localizedDictionary = dictionary[locale]

  return (
    <StyledFreeShipping>
      {/* TODO: Replace with icon component */}
      <img src={checkmarkIcon} alt='' />
      <Text variant={'smallBody'} color={'gravy'} element={'span'}>
        {localizedDictionary.cartFreeShipping}
      </Text>
    </StyledFreeShipping>
  )
}

export default CartFreeShipping
