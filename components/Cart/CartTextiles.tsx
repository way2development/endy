import { theme } from '../../styles/theme'
import { Grid } from '../Grid'
import { Image, ImageProps } from '../Image'
import Link from 'next/link'
import { Text } from '../Text'
import { ProductProps } from '../ShopModule/ShopModule.types'
import {
  StyledPrimaryTextile,
  StyledProductHeading,
  StyledSecondaryTextile,
  StyledTertiaryTextile,
  StyledTextileAnchor,
  StyledWrapper
} from './CartTextiles.styled'
import { isProductOnSale } from '../../utils'
import { SaleProps } from '../../Interfaces/sales'
import { Locale } from '../../types/global-types'
// import { getSaleTextVariantColor } from '../../utils'
import { PromoPill } from '../PromoPill/PromoPill'

interface Textile {
  product: ProductProps
  lifestyleImage: ImageProps
  sales: SaleProps
  locale: Locale
}

export interface TextilesProps {
  primaryProduct: Textile
  secondaryProduct: Textile
  tertiaryProduct: Textile
  sales: SaleProps
  locale: Locale
}

const SingleTextile = ({ lifestyleImage, product, sales, locale }: Textile) => {
  const isOnSale = !!sales && isProductOnSale(sales, product.id)

  const organicCottonString =
    locale === 'fr' ? 'en coton biologique' : 'Organic Cotton'

  const productName = product.name.includes(organicCottonString)
    ? product.name.replace(organicCottonString, '')
    : product.name

  return (
    <Link href={`/products${product.slug}`} locale={locale}>
      <StyledTextileAnchor>
        <StyledProductHeading isOnSale={isOnSale}>
          <Text variant={'largeBody'} color={'gravy'}>
            <strong>{productName}</strong>
          </Text>
        </StyledProductHeading>
        {isOnSale && (
          <PromoPill
            bgColor={sales.themeColor}
            borderStyle='dotted'
            variant='gravy'
            locale={locale}
            promoCopy={sales.productPillLabel}
          />
        )}
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

export const CartTextiles = ({
  primaryProduct,
  secondaryProduct,
  tertiaryProduct,
  sales,
  locale
}: TextilesProps) => {
  return (
    <StyledWrapper>
      <Grid
        rowGap={`${theme.spacing.m}`}
        columnGap={`${theme.spacing.s}`}
        columnRatio={['1:1', '1:1', '1:1']}
      >
        <StyledPrimaryTextile>
          {primaryProduct && (
            <SingleTextile {...primaryProduct} sales={sales} locale={locale} />
          )}
        </StyledPrimaryTextile>
        <StyledSecondaryTextile>
          {secondaryProduct && (
            <SingleTextile
              {...secondaryProduct}
              sales={sales}
              locale={locale}
            />
          )}
        </StyledSecondaryTextile>
        <StyledTertiaryTextile>
          {tertiaryProduct && (
            <SingleTextile {...tertiaryProduct} sales={sales} locale={locale} />
          )}
        </StyledTertiaryTextile>
      </Grid>
    </StyledWrapper>
  )
}
