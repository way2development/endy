import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { Text } from '../Text/Text'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { LineItemProps } from './CartItem'
import { Image } from '../Image/Image'

import { getLocalizedPrice } from '../../utils/getLocalizedPrice'

interface CartItemMysteryProps {
  locale: Locale
  mysteryGiftProduct: ProductProps
  mysteryGiftItem: LineItemProps
  // removeFromCart: (lineItemId: string) => Promise<void>
  retailValue: number
  itemLineId: string
}

import {
  StyledMysteryItemHeading,
  StyledCartItemImgContainer,
  StyledCartItemInfoContainer,
  StyledCartItemVariantContainer,
  StyledCartItemOriginalPrice,
  StyledFreeGiftInfo,
  // MysteryGiftRemoveBtn,
  // MysteryGiftControlsContainer,
  StyledMysteryItem,
  StyledMysteryItemWrapper
} from './Cart.styled'

export const CartItemMystery = ({
  locale,
  mysteryGiftItem,
  mysteryGiftProduct,
  // removeFromCart,
  itemLineId,
  retailValue
}: CartItemMysteryProps) => {
  const localizedDictionary = dictionary[locale]

  return (
    <StyledMysteryItem>
      <StyledMysteryItemWrapper>
        <StyledMysteryItemHeading variant={'mediumBody'} color={'gravy'}>
          <strong>{mysteryGiftProduct?.name}</strong>
        </StyledMysteryItemHeading>

        <StyledCartItemInfoContainer>
          <StyledCartItemVariantContainer>
            <StyledCartItemImgContainer>
              {mysteryGiftItem?.images?.cartImage ? (
                <Image
                  desktopImage={mysteryGiftItem.images.cartImage.desktopImage}
                  tabletImage={mysteryGiftItem.images.cartImage.tabletImage}
                  mobileImage={mysteryGiftItem.images.cartImage.mobileImage}
                  alt={mysteryGiftItem.images.cartImage?.alt}
                  srcWidths={[768, 1024]}
                />
              ) : (
                <Image
                  desktopImage={
                    mysteryGiftProduct?.images?.cartImage?.desktopImage
                  }
                  tabletImage={
                    mysteryGiftProduct?.images?.cartImage?.tabletImage
                  }
                  mobileImage={
                    mysteryGiftProduct?.images?.cartImage?.mobileImage
                  }
                  alt={mysteryGiftProduct?.images?.cartImage?.alt}
                  srcWidths={[768, 1024]}
                />
              )}
            </StyledCartItemImgContainer>
            <div>
              <StyledFreeGiftInfo>
                <Text variant={'smallBody'} color={'gravy'}>
                  {/* TODO: Use Icon component when ready */}
                  <img
                    src='https://cdn.sanity.io/images/d0kd7r9c/production/bf62c7e10ff15125f335ebce03a721f40a4669dd-13x13.svg'
                    alt=''
                  />
                  {localizedDictionary.includedInMattressBox}
                  <br />
                  {localizedDictionary.qty}: {mysteryGiftItem?.quantity}
                </Text>
              </StyledFreeGiftInfo>
            </div>
          </StyledCartItemVariantContainer>
          <div>
            <StyledCartItemOriginalPrice
              variant={'smallBody'}
              color={'gravy70'}
              element={'span'}
            >
              {getLocalizedPrice(retailValue, locale, mysteryGiftItem.quantity)}
            </StyledCartItemOriginalPrice>
            <Text variant={'smallBody'} color={'gravy'} element={'span'}>
              <strong>
                {getLocalizedPrice(0, locale, mysteryGiftItem.quantity)}
              </strong>
            </Text>
          </div>
          {/* <MysteryGiftControlsContainer>
            <MysteryGiftRemoveBtn
              onClick={() => {
                removeFromCart(itemLineId)
              }}
              aria-label={localizedDictionary.removeProductButtonAlt}
            >
              <Text variant={'smallBody'} color={'gravy'}>
                <strong>{localizedDictionary.remove}</strong>
              </Text>
            </MysteryGiftRemoveBtn>
          </MysteryGiftControlsContainer> */}
        </StyledCartItemInfoContainer>
      </StyledMysteryItemWrapper>
    </StyledMysteryItem>
  )
}

export default CartItemMystery
