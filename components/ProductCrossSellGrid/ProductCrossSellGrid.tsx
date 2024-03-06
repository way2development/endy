import { useRef, useEffect } from 'react'
import { NextRouter } from 'next/router'
import throttle from 'lodash/throttle'
import dictionary from '../../dictionary.json'
import { SaleProps } from '../../Interfaces/sales'
import { Locale } from '../../types/global-types'
import { StyledPageWidth } from '../../styles/global.styled'
import {
  ProductProps,
  SelectedItem,
  VariantProps
} from '../ShopModule/ShopModule.types'
import { isProductOnSale } from '../../utils/isProductOnSale'
import { Grid } from '../Grid'

import { Card } from './CrossSellCard'
import {
  StyledHeading,
  StyledHeadingContainer,
  StyledSection
} from './ProductCrossSell.styled'

import { isScrolledIntoView } from '../GoogleAnalytics/utils'

// Tracking
import { googleAnalytics } from '../GoogleAnalytics/analytics'

interface ProductCrossSellProps {
  heading: string
  locale: Locale
  products: ProductProps[]
  variants: VariantProps[]
  sales?: SaleProps
  addItemToCart: (items: SelectedItem[]) => void
  slug: string
  topRankedCorrespondingVariantSize: string
  router: NextRouter
  isCartError: boolean,
  mainProduct: string
}

export const ProductCrossSellGrid = ({
  mainProduct,
  products,
  locale,
  sales,
  variants,
  addItemToCart,
  slug,
  topRankedCorrespondingVariantSize,
  router,
  isCartError
}: ProductCrossSellProps) => {
  const productCrossSellRef = useRef<HTMLDivElement>(null)

  const localizedDictionary = dictionary[locale]
  const getProductById = (id: number) => {
    return products.find((product) => product.id === id)
  }

  useEffect(() => {
    const viewItemListData = {
      products,
      listName: localizedDictionary.completeYourCollection,
      listId: slug.replace('/', ''),
      sales,
      variants,
      router
    }

    const fireAnalyticsViewListEvent = () => {
      isScrolledIntoView(productCrossSellRef) &&
      topRankedCorrespondingVariantSize
        ? googleAnalytics.viewItemList(viewItemListData)
        : null
    }

    if (!router.isReady) return

    // if cross sells scroll into view, fire the GA event
    window.addEventListener(
      'scroll',
      throttle(fireAnalyticsViewListEvent, 1000)
    )

    return () =>
      window.removeEventListener(
        'scroll',
        throttle(fireAnalyticsViewListEvent, 1000)
      )
  }, [topRankedCorrespondingVariantSize])

  return (
    <StyledSection ref={productCrossSellRef}>
      <StyledPageWidth>
        <StyledHeadingContainer>
          <StyledHeading variant={'h3'} color={'gravy'}>
            {localizedDictionary.completeYourCollection}
          </StyledHeading>
        </StyledHeadingContainer>
        <Grid
          rowGap={['2rem', '1rem', '']}
          columnGap={['0.75rem', '1.5rem', '2rem']}
          columnRatio={['1:1', '1:1', '1:1:1:1']}
        >
          {variants.map((variant) => {
            const product = variant ? getProductById(variant.productId) : null
            return (
              <>
                {product && variant && (
                  <Card
                    key={product.id}
                    sizeLabel={
                      product.sizeVariants.find(
                        (size) => size.id === variant.size
                      )?.label || ''
                    }
                    colorLabel={
                      product.colorVariants?.find(
                        (color) => color.id === variant.color
                      )?.label
                    }
                    title={product.name}
                    variant={variant}
                    onClick={() => {
                      addItemToCart([{ id: variant.id, quantity: 1 }])
                      googleAnalytics.addCrossSellToCart({
                        product,
                        variant,
                        sales,
                        mainProduct
                      })
                    }}
                    productUrl={product.slug}
                    isOnSale={!!sales && isProductOnSale(sales, product.id)}
                    sales={sales}
                    locale={locale}
                    image={
                      variant?.images?.crossSellImage ||
                      product?.images?.crossSellImage
                    }
                    isCartError={isCartError}
                    productId={product.id}
                  />
                )}
              </>
            )
          })}
        </Grid>
      </StyledPageWidth>
    </StyledSection>
  )
}
