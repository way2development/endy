import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import React from 'react'
import { SaleProps } from '../../Interfaces/sales'
import { ProductProps } from '../ShopModule/ShopModule.types'

import { Text } from '../Text'
import { Price } from '../ShopModule/Price'
import { Button } from '../Button'

import { isProductOnSale } from '../../utils'

import {
  StyledButtonContainer,
  StyledFlexContainer,
  StyledProductDetails,
  StyledProductTitle,
  StyledProductPrice,
  StyledStickyBar
} from './ProductStickyBar.styled'
import { StyledPageWidth } from '../../styles/global.styled'

interface ProductStickyBarProps {
  locale: Locale
  offset: number
  product: ProductProps
  sales: SaleProps
  productStickyBarRef: React.RefObject<HTMLDivElement> | null
  showStickyBar: boolean
  productId: number
}
export const ProductStickyBar = ({
  locale,
  product,
  sales,
  productStickyBarRef,
  showStickyBar,
  productId
}: ProductStickyBarProps) => {
  const localizedDictionary = dictionary[locale]

  if (!showStickyBar) return null

  const minPrice = product?.priceRange?.minVariantPrice
  const isOnSale = sales && isProductOnSale(sales, product.id)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  return (
    // Element requires id so that component can be omitted from heatmaps
    <StyledStickyBar ref={productStickyBarRef} id='productStickyBar'>
      <StyledPageWidth>
        <StyledFlexContainer>
          <StyledProductDetails>
            <StyledProductTitle variant='h5' color='gravy'>
              {product.name}
            </StyledProductTitle>
            <StyledProductPrice>
              <Text variant='mediumBody' color='gravy' display='inline'>
                {localizedDictionary.startingFrom}{' '}
              </Text>

              <Price
                variantSalePrice={
                  product?.variants[0]?.salePrice
                    ? product?.variants[0]?.salePrice
                    : 0
                }
                variantOffSalePrice={
                  product?.variants[0]?.offSalePrice
                    ? product?.variants[0]?.offSalePrice
                    : minPrice
                }
                variantPrice={minPrice}
                locale={locale}
                sales={sales}
                isOnSale={isOnSale}
                productId={productId}
              />
            </StyledProductPrice>
          </StyledProductDetails>
          <StyledButtonContainer>
            <Button
              variant='solid-rubine'
              label={localizedDictionary.buyNow}
              onClick={() => scrollToTop()}
            />
          </StyledButtonContainer>
        </StyledFlexContainer>
      </StyledPageWidth>
    </StyledStickyBar>
  )
}
