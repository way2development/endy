import React, { useEffect, useState } from 'react'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Text } from '../Text'
import {
  StyledHeading,
  StyledSection,
  StyledSecondarySaleHeadingWrapper,
  StyledSubcopy
} from './SecondarySaleProducts.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { SaleCountdownTimer } from '../SaleCountdownTimer'
import { SaleProps } from 'Interfaces/sales'
import { getIsMobileDevice, isProductOnSale } from './../../utils'
import { ProductCard } from 'components/ProductCard'
import { Grid } from '@components'
import { theme } from 'styles/theme'
import { ImageProps } from '../Image'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { isSaleActive } from 'utils/sales'
import { Locale } from '../../types/global-types'
import axios from 'axios'

interface productCardProps {
  image: ImageProps
  product: ProductProps
  discountPercentage: number
  fixedAmount: number
}

interface SecondarySaleProductsProps {
  /** Heading text */
  heading: string
  /** Subcopy text*/
  subcopy: string
  /** Background Image Assets */
  backgroundColor: string
  /** Timer */
  sales?: SaleProps
  locale: Locale
  productCards: productCardProps[]
}

interface Review {
  domain_key: number;
}
export const SecondarySaleProducts = ({
  heading,
  subcopy,
  backgroundColor,
  sales,
  locale,
  productCards
}: SecondarySaleProductsProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const [allReviews, setAllReviews] = useState([])

  const fetchReviews = async () => {
    const API_KEY = process.env.YOTPO_API_KEY

    try {
      setIsLoading(true)

      // Yotpo limits fetch to 100 products
      const { data } = await axios.get(
        `https://api.yotpo.com/v1/apps/${API_KEY}/bottom_lines?count=100&page=1`
      )

      setAllReviews(data.response.bottomlines || [])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchReviews()
  }, [])
  const getProductCards = (productCards: any, isBundleCard = false) => {
    return (
      <>
        {productCards?.map((productCard: any) => {
          const isOnSale =
            !!sales && isProductOnSale(sales, productCard?.product?.id)

          return (
            <ProductCard
              key={productCard?.product?.id}
              product={productCard.product}
              image={productCard.image}
              variant='gravy'
              bgColor={sales?.themeColor}
              borderStyle='dotted'
              isOnSale={isOnSale}
              locale={locale}
              review={allReviews.find(
                (review: Review) => Number(review.domain_key) === productCard.product.id
              )}
              isLoading={isLoading}
              sales={sales}
              productCardPillCopy={productCard?.productCardPillCopy}
              isBundleCard={isBundleCard}
              bundleCard={productCard?.bundleCard}
            />
          )
        })}
      </>
    )
  }
  return (
    <StyledSection bgColor={backgroundColor}>
      <StyledPageWidth>
        <StyledSecondarySaleHeadingWrapper>
          <StyledHeading
            color={sales ? sales.textColor : 'gravy'}
            variant={'h2'}
          >
            {heading}
          </StyledHeading>
          <StyledSubcopy>
              <Text
                color={sales ? sales.textColor : 'gravy'}
                variant={'mediumBody'}
              >
                {subcopy}
              </Text>
            </StyledSubcopy>
        </StyledSecondarySaleHeadingWrapper>
      </StyledPageWidth>
      <StyledPageWidth>
        <Grid
          rowGap={[
            `${theme.spacing.xl}`,
            `${theme.spacing.l}`,
            `${theme.spacing.xl}`
          ]}
          columnGap={['', `${theme.spacing.l}`, `${theme.spacing.xl}`]}
          columnRatio={['1', '1:1', '1:1:1']}
        >
          {getProductCards(productCards)}
        </Grid>
      </StyledPageWidth>
    </StyledSection>
  )
}
