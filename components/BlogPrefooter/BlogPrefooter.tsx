import React from 'react'
import { Image, ImageProps } from '../Image'
import {
  StyledProductsContainer,
  StyledProductInfo,
  StyledPriceInfo,
  StyledProductCardLink,
  StyledPrefooterContainer,
  StyledFrom
} from './BlogPrefooter.styled'
import { Text } from '../Text'
import { Price } from '../ShopModule/Price'
import dictionary from '../../dictionary.json'
import {
  isProductOnSale,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { PromoFlag } from '../PromoFlag'
import { getSaleTextVariantColor } from '../../utils'
import { SaleProps } from '../../Interfaces/sales'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { Locale } from '../../types/global-types'

interface PrefooterProductProps {
  product: ProductProps
  prefooterImage: ImageProps
}
interface PrefooterCardLinkProps {
  locale: Locale
  data: PrefooterProductProps
  sales?: SaleProps
}

interface BlogPrefooterProps {
  locale: Locale
  sales?: SaleProps
  prefooter: {
    title: string
    primaryProduct: PrefooterProductProps
    secondaryProduct: PrefooterProductProps
  }
}

const PrefooterCardLink = ({ data, sales, locale }: PrefooterCardLinkProps) => {
  const localizedDictionary = dictionary[locale]

  const { product, prefooterImage } = data

  return (
    <StyledProductCardLink href={`/products${product.slug}`} locale={locale}>
      {!!sales && isProductOnSale(sales, product.id) && (
        <PromoFlag
          color={getSaleTextVariantColor(sales.themeColor)}
          bgColor={sales.themeColor}
          promoCopy={
            isSecondarySaleProduct(sales, product.id)
              ? sales.secondaryProductPillLabel
              : sales.productPillLabel
          }
        />
      )}
      <Image
        desktopImage={prefooterImage?.desktopImage}
        tabletImage={prefooterImage?.tabletImage}
        mobileImage={prefooterImage?.tabletImage}
        alt={prefooterImage?.alt}
        srcWidths={[768, 1024]}
      />

      <StyledProductInfo>
        <Text variant={'h4'} color={'gravy'} element={'h3'}>
          {product.title}
        </Text>

        <StyledPriceInfo>
          <StyledFrom variant={'mediumBody'} color={'gravy'} element={'span'}>
            {localizedDictionary.from}
          </StyledFrom>
          <Price
            variantSalePrice={
              product?.variants[0]?.salePrice
                ? product?.variants[0]?.salePrice
                : 0
            }
            variantOffSalePrice={
              product?.variants[0]?.offSalePrice
                ? product?.variants[0]?.offSalePrice
                : product?.priceRange?.minVariantPrice
            }
            variantPrice={product?.priceRange?.minVariantPrice}
            locale={locale}
            sales={sales}
            isOnSale={sales ? isProductOnSale(sales, product.id) : false}
            productId={product.id}
          />
        </StyledPriceInfo>
      </StyledProductInfo>
    </StyledProductCardLink>
  )
}

export const BlogPrefooter = ({
  prefooter,
  sales,
  locale
}: BlogPrefooterProps) => {
  const { title, primaryProduct, secondaryProduct } = prefooter || {}

  return (
    <StyledPrefooterContainer>
      <h2>{title}</h2>
      <StyledProductsContainer>
        <PrefooterCardLink
          data={primaryProduct}
          sales={sales}
          locale={locale}
        />

        <PrefooterCardLink
          data={secondaryProduct}
          sales={sales}
          locale={locale}
        />
      </StyledProductsContainer>
    </StyledPrefooterContainer>
  )
}
