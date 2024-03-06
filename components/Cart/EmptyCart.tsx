import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import {
  StyledEmptyCart,
  StyledText,
  StyledImgTextContainer
} from './Cart.styled'
import { TextilesProps } from './CartTextiles'

const shoppingCartIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/0c7c6d56c6d21610e6b17f697d1b600715e88187-68x68.svg'

interface EmptyCartProps {
  locale: Locale
  textiles: TextilesProps
}

const EmptyCart = ({ locale, textiles }: EmptyCartProps) => {
  const localizedDictionary = dictionary[locale]
  return (
    <StyledEmptyCart>
      <StyledImgTextContainer>
        <StyledText color='gravy' variant='h5'>
          {localizedDictionary.emptyCartHeading}
        </StyledText>
        {/* TODO: replace with the Icon component once ready */}
        <img
          src={shoppingCartIcon}
          alt={localizedDictionary.emptyShoppingCart}
        />
        <p>{localizedDictionary.emptyCartSubcopy}</p>
        <p>{localizedDictionary.emptyCartCTALabel}</p>
      </StyledImgTextContainer>
      {textiles}
    </StyledEmptyCart>
  )
}

export default EmptyCart
