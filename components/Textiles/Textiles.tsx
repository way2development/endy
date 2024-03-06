import { Grid } from '../Grid'
import { Image, ImageProps } from '../Image'
import Link from 'next/link'
import { Text } from '../Text'
import { StyledArrow } from '../CtaLink/CtaLink.styled'
import { SaleProps } from '../../Interfaces/sales'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { isProductOnSale, isSecondarySaleProduct } from '../../utils'
import {
  StyledCtaContainer,
  StyledHeadingContainer,
  StyledHeadingWrapper,
  StyledPrimaryTextile,
  StyledText,
  StyledProductHeading,
  StyledSecondaryTextile,
  StyledTertiaryTextile,
  StyledTextileAnchor,
  StyledWrapper,
  StyledPromoFlag,
  StyledPromoFlagContainer
} from './Textiles.styled'
import { getSaleTextVariantColor } from '../../utils'
import { doesProductHaveCompareAtPrice } from '../../utils/compareAtPrice'

interface Textile {
  product: ProductProps
  lifestyleImage: ImageProps
  sales: SaleProps
  locale: Locale
}

interface TextilesProps {
  heading: string
  sales: SaleProps
  primaryProduct: Textile
  secondaryProduct: Textile
  tertiaryProduct: Textile
  locale: Locale
}

const SingleTextile = ({ lifestyleImage, product, sales, locale }: Textile) => {
  const localizedDictionary = dictionary[locale]
  const isOnSale = !!sales && isProductOnSale(sales, product.id)
  const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)
  return (
    <Link href={`/products${product.slug}`} locale={locale}>
      <StyledTextileAnchor>
        <StyledProductHeading>
          <StyledText variant={'largeBody'} color={'gravy'}>
            <strong>{product.name}</strong>
          </StyledText>
          <StyledCtaContainer>
            <Text variant={'mediumBody'} color={'gravy'}>
              <strong>
                {localizedDictionary.shop}
                <StyledArrow aria-hidden='true'> →</StyledArrow>
              </strong>
            </Text>
          </StyledCtaContainer>
        </StyledProductHeading>
        <StyledPromoFlagContainer>
          {isOnSale && !hasVariantWithDiscount && (
            <StyledPromoFlag
              bgColor={sales.themeColor}
              color={getSaleTextVariantColor(sales?.themeColor)}
              borderStyle='dotted'
            >
              {isSecondarySaleProduct(sales, product.id)
                ? sales.secondaryProductPillLabel
                : sales.productPillLabel}
            </StyledPromoFlag>
          )}

          {hasVariantWithDiscount && (
            <StyledPromoFlag
              bgColor={'#FFFFFF'}
              color={'#243746'}
              borderStyle='dotted'
            >
              {locale === 'fr' ? 'Solde' : 'Sale'}
            </StyledPromoFlag>
          )}
        </StyledPromoFlagContainer>
        <Image
          alt={lifestyleImage.alt}
          desktopImage={lifestyleImage.desktopImage}
          tabletImage={lifestyleImage.tabletImage}
          mobileImage={lifestyleImage.mobileImage}
          srcWidths={[768, 1024]}
        />
      </StyledTextileAnchor>
    </Link>
  )
}

export const Textiles = ({
  heading,
  primaryProduct,
  secondaryProduct,
  tertiaryProduct,
  sales,
  locale
}: TextilesProps) => {
  return (
    <StyledWrapper>
      <StyledHeadingWrapper>
        <StyledHeadingContainer>
          <Text variant={'h2'} color={'gravy'}>
            {heading}
          </Text>
        </StyledHeadingContainer>
      </StyledHeadingWrapper>
      <Grid
        rowGap={['1.5rem', '', '2rem']}
        columnGap={['1.5rem', '', '2rem']}
        columnRatio={['1:1', '1:1', '2:1']}
      >
        <StyledPrimaryTextile>
          <SingleTextile {...primaryProduct} sales={sales} locale={locale} />
        </StyledPrimaryTextile>
        <StyledSecondaryTextile>
          <SingleTextile {...secondaryProduct} sales={sales} locale={locale} />
        </StyledSecondaryTextile>
        <StyledTertiaryTextile>
          <SingleTextile {...tertiaryProduct} sales={sales} locale={locale} />
        </StyledTertiaryTextile>
      </Grid>
    </StyledWrapper>
  )
}
