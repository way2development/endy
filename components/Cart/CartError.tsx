import dictionary from '../../dictionary.json'
import { Text } from '../Text/Text'
import { Locale } from '../../types/global-types'
import { CartErrorContainer, CartResetButton, StyledText } from './Cart.styled'

interface CartErrorProps {
  locale: Locale
}

const shoppingCartIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/70be8121e5c8d7dbd3424e9175a180d3d13e8627-64x64.svg'

const resetCart = () => {
  if (window) {
    // If a shopify id exists in localstorage, delete it
    window.localStorage.removeItem('shopify_checkout_id')
    // Reload the page to call shopify API and create a new cart instance
    window.location.reload()
  }
}

export const CartError = ({ locale }: CartErrorProps) => {
  const localizedDictionary = dictionary[locale]
  return (
    <CartErrorContainer>
      <StyledText color={'gravy'} variant={'h5'}>
        {localizedDictionary.cartErrorMessage}
      </StyledText>
      <Text color={'gravy'} variant={'h5'}>
        {localizedDictionary.cartErrorTryAgainMessage}
      </Text>
      {/* TODO: Replace with icon component */}
      <img src={shoppingCartIcon} alt='' />
      <CartResetButton onClick={resetCart} variant={'solid-rubine'}>
        {localizedDictionary.tryAgain}
      </CartResetButton>
    </CartErrorContainer>
  )
}

export default CartError
