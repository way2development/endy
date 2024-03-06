import { useEffect, useRef } from 'react'
import { StyledPageWidth } from '../../styles/global.styled'
import { theme } from '../../styles/theme'
import { useRouter } from 'next/router'

import { Grid } from '../Grid'
import { Image, ImageProps } from '../Image'
import { CtaLinkProps } from '../CtaLink'
import {
  ProductCard,
  ProductCardProps,
  ReviewSummaryProps
} from '../ProductCard'
import { SaleProps } from '../../Interfaces/sales'
import {
  StyledSection,
  StyledHeading,
  StyledHeadingContainer,
  StyledPlaceholderContainer,
  StyledHighlightContainer
} from './ProductCardGrid.styled'
import { Locale } from 'types/global-types'
import { getScreenWidth, isProductOnSale } from '../../utils'
import { isScrolledIntoView } from '../GoogleAnalytics/utils'
// Tracking
import { googleAnalytics } from '../GoogleAnalytics/analytics'
import throttle from 'lodash/throttle'

interface ProductCardGridProps {
  cta?: CtaLinkProps
  heading: string
  productCards: ProductCardProps[]
  /* * Fills space spanning the width of 1 card. Not visible when grid stacks 1 card per row. */
  oneColumnImage: ImageProps
  /* *Fills space spanning the width of 2 cards. Not visible when grid stacks 1 card per row. */
  twoColumnImage: ImageProps
  /* *Only viewable on tablet and mobile. Fills space below the grid, spanning the width of 2 cards on tablet and 1 card on mobile */
  highlightImage?: ImageProps
  sales?: SaleProps
  locale: Locale
  reviews: ReviewSummaryProps[]
  isReviewsLoading: boolean
  anchorId: string
}

export const ProductCardGrid = ({
  cta,
  heading,
  productCards,
  oneColumnImage,
  twoColumnImage,
  highlightImage,
  sales,
  locale,
  reviews,
  isReviewsLoading,
  anchorId
}: ProductCardGridProps) => {
  const collectionsRef = useRef<HTMLDivElement>(null)
  const collectionTitlesRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const numCards = productCards.length

  let placeholder = undefined
  let highlight = highlightImage

  let placeholderSpanValue = 1
  let highlightSpanValue = 1

  const screenWidth = getScreenWidth()

  if (screenWidth >= 768) {
    // 1, 3, 5, 7 cards, etc.
    if ((numCards + 1) % 2 === 0) {
      placeholder = oneColumnImage
      placeholderSpanValue = 1

      highlight = undefined
    }

    // 2, 4, 6, 8 cards, etc.
    if (numCards % 2 === 0) {
      placeholder = undefined

      highlight = highlightImage
      highlightSpanValue = 2
    }
  }

  if (screenWidth > 1024) {
    // highlight image does not appear on desktop screen widths
    highlight = undefined

    // 3, 6, 9 cards, etc.
    if (numCards % 3 === 0) {
      placeholder = undefined
    }

    // 1, 4, 7 cards, etc.
    if ((numCards - 1) % 3 === 0) {
      placeholder = twoColumnImage
      placeholderSpanValue = 2
    }

    // 2, 5, 8 cards, etc.
    if ((numCards + 1) % 3 === 0) {
      placeholder = oneColumnImage
      placeholderSpanValue = 1
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    if (!collectionsRef.current) return

    const { id } = collectionsRef.current

    // smooth scroll to the correct DOM element according to the current route
    if (router.asPath === `${router.route}#${id}`) {
      const containerOffset = collectionsRef.current.offsetTop

      const SECTION_PADDING = 48
      const HEADER_OFFSET = 55
      const pageOffset = SECTION_PADDING + HEADER_OFFSET

      window.scrollTo({ top: containerOffset - pageOffset })
    }
  }, [router.isReady])
  useEffect(() => {
    const products = productCards.map((productCard) => productCard.product)
    const variants = products.map((product) => product.variants[0])
  
    // Prepare the data for view item list event
    const viewItemListData = {
      products: products,
      variants: variants,
      listName: products[0]?.productType,
      listId: 'collections',
      sales,
    }
  
    let eventFired = false // Flag to track if the event has already been fired
  
    const fireAnalyticsViewListEvent = () => {
      if (isScrolledIntoView(collectionTitlesRef) && !eventFired) {
        // Fire the view item list events if the element is scrolled into view and the event hasn't been fired yet
        googleAnalytics.viewItemList(viewItemListData)
        googleAnalytics.elevarViewItemList(viewItemListData)
        eventFired = true // Set the flag to true after firing the event
      }
    }
  
    const handleScroll = throttle(fireAnalyticsViewListEvent, 1000)
  
    window.addEventListener('scroll', handleScroll)
  
    // Clean up the scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [collectionTitlesRef])

  return (
    <StyledSection id={anchorId} ref={collectionsRef}>
      <StyledPageWidth>
        <StyledHeadingContainer ref={collectionTitlesRef}>
          <StyledHeading variant={'h2'} color={'gravy'}>
            {heading}
          </StyledHeading>

          {cta}
        </StyledHeadingContainer>

        <Grid
          rowGap={[
            `${theme.spacing.xl}`,
            `${theme.spacing.l}`,
            `${theme.spacing.xl}`
          ]}
          columnGap={['', `${theme.spacing.l}`, `${theme.spacing.xl}`]}
          columnRatio={['1', '1:1', '1:1:1']}
        >
          {productCards.map((productCard, index) => {
            const isOnSale =
              !!sales && isProductOnSale(sales, productCard.product.id)
            return (
              <ProductCard
                key={productCard.product.id}
                isOnSale={isOnSale}
                product={productCard.product}
                sales={sales}
                locale={locale}
                image={productCard.image}
                review={reviews.find(
                  (review) =>
                    Number(review.domain_key) === productCard.product.id
                )}
                isLoading={isReviewsLoading}
                index={index+1}
              />
            )
          })}

          {placeholder && (
            <StyledPlaceholderContainer spanValue={placeholderSpanValue}>
              <Image
                srcWidths={[768, 1024]}
                desktopImage={placeholder.desktopImage}
                tabletImage={placeholder.desktopImage}
                mobileImage={placeholder.desktopImage}
                alt={placeholder.alt}
              />
            </StyledPlaceholderContainer>
          )}

          {highlight && (
            <StyledHighlightContainer spanValue={highlightSpanValue}>
              <Image
                srcWidths={[768, 1024]}
                desktopImage={highlight.desktopImage}
                tabletImage={highlight.desktopImage}
                mobileImage={highlight.desktopImage}
                alt={highlight.alt}
              />
            </StyledHighlightContainer>
          )}
        </Grid>
      </StyledPageWidth>
    </StyledSection>
  )
}
