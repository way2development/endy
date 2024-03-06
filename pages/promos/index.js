import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import axios from 'axios'

import { getStaticPage, queries, getAllDocSlugsIds } from '@data'
import { assignLocalizedRoutes } from '../../utils/routeTranslations'

import { buildPageProps } from '@lib/buildPage'
import NotFoundPage from '@pages/404'
import {
  useLanguageSetting,
  useLocalizedRoutes,
  useUserLocation
} from '@lib/context'
import {
  CtaLink,
  GenericSaleHero,
  Grid,
  SalesBanner,
  SalesEmailSignUp
} from '@components'
import { getSalesData, isSaleActive } from '../../utils/sales'
import { ProductCard } from 'components/ProductCard'
import { theme, mq } from '../../styles/theme'
import Layout from '../../components/layout'
import { Text } from 'components/Text'
import { isProductOnSale } from '../../utils'
import { StyledPageWidth } from 'styles/global.styled'
import { Image } from 'components/Image'
import { SecondarySaleProducts } from 'components/SecondarySaleProducts'

//TO DO: Move styles into style file

const StyledSectionTitle = styled(Text)`
  overflow: hidden;
  text-align: center;
  line-height: 1.2;
  ${mq({
    marginBottom: [
      `${theme.spacing.l}`,
      `${theme.spacing.xl}`,
      `${theme.spacing.xxl}`
    ]
  })}

  > span {
    position: relative;
    display: inline-block;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      border-bottom: 1px solid;
      width: 591px;
      margin: 0 ${theme.spacing.l};
    }
    &::before {
      right: 100%;
    }
    &::after {
      left: 100%;
    }
  }
`

const StyledSaleCollectionContainer = styled.div`
  ${mq({
    margin: [
      `${theme.spacing.xl} 0`,
      `${theme.spacing.xl} 0`,
      `${theme.spacing.xxl} 0`
    ]
  })}
`



const StyledCollectionCTA = styled.div`
  margin-top: ${theme.spacing.xl};
  display: flex;
  justify-content: center;
  width: 100%;
`

export const StyledPlaceholderContainer = styled.div`
  ${({ productCardsLength }) => css`
    ${mq({
      display:
        productCardsLength % 3 !== 0 ? ['none', '', 'block'] : ['none', '', '']
    })}
  `}

  picture {
    height: 100%;
  }

  img {
    object-fit: cover;
    height: 100%;
  }
`
export const StyledCardwrapper = styled.div`
  width: 100%;
`

// TODO: clean up long object chains by destructuring

const SalesLandingPage = ({ data, locale, selectedSaleId, isLastChance }) => {
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <NotFoundPage locale={locale} />
  }

  const userLocation = useUserLocation()
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')
  const isQuebec = userLocation?.province === 'Quebec'
  const localizedRoutes = useLocalizedRoutes()

  useEffect(() => {
    const siteLanguagePreference = JSON.parse(
      sessionStorage.getItem('siteLanguagePreference')
    )

    // TODO: Might need to update to whenever blog is in FR
    if (isFrench && !siteLanguagePreference?.prefersEnglish) {
      router.replace('/fr/promos')
    }

    if (siteLanguagePreference?.prefersEnglish) {
      router.replace('/promos')
    }
  }, [isFrench])

  const references = Object.keys(data.references).reduce(
    (allReferences, type) => {
      return allReferences.concat(data.references[type])
    },
    []
  )

  const sales = getSalesData(
    data.sales,
    isQuebec,
    locale,
    { references },
    selectedSaleId,
    isLastChance
  )
  const page = buildPageProps(data.page, {
    sales,
    locale,
    references
  })

  const global = buildPageProps(data.global, { sales, locale, references })

  const {
    defaultCollectionHeading,
    defaultCollectionProducts,
    hero,
    salesbanner,
    signup,
    modules,
    prefooter
  } = page

  if (!page) {
    return (
      <Error
        title={`"Sales Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

  useEffect(() => {
    const redirectProductPageData = {
      localizedRoutes,
      locale,
      currentRoute: locale === 'en' ? '/promos' : '/fr/promos',
      redirectRoute: locale === 'en' ? '/fr/promos' : '/promos'
    }

    assignLocalizedRoutes(redirectProductPageData)
  }, [router])

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

  const isActiveSale = Boolean(sales)
  const signUp = signup
  const showDefaultCollection = sales?.saleType === 'Buy X Get Y'

  const getProductCards = (productCards, isBundleCard = false) => {
    return (
      <>
        {productCards?.map((productCard) => {
          const isOnSale =
            !!sales && isProductOnSale(sales, productCard?.product?.id)

          return (
            <ProductCard
              key={productCard.product.id}
              product={productCard.product}
              image={productCard.image}
              variant='gravy'
              bgColor={sales?.themeColor}
              borderStyle='dotted'
              isOnSale={isOnSale}
              locale={locale}
              review={allReviews.find(
                (review) => Number(review.domain_key) === productCard.product.id
              )}
              isSaleActive={isSaleActive}
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

  const saleCollectionGrid = () => {
    const productCards = sales?.salesLandingPage?.saleLandingProductCards
    const numberOfCards = productCards?.length

    const isSplitGridLayout = numberOfCards >= 6

    let primaryProductCards
    let secondaryProductCards

    if (isSplitGridLayout) {
      primaryProductCards = productCards.slice(0, 6)
      secondaryProductCards = productCards.slice(6)
    }

    return (
      <>
        <StyledSaleCollectionContainer>
          <StyledPageWidth>
            <SalesEmailSignUp {...signUpProps} locale={locale} />
          </StyledPageWidth>
        </StyledSaleCollectionContainer>
        <StyledSaleCollectionContainer
          
        >
          {isSplitGridLayout ? (
            <>
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
                  {getProductCards(primaryProductCards)}
                </Grid>

                <Grid
                  rowGap={[
                    `${theme.spacing.xl}`,
                    `${theme.spacing.l}`,
                    `${theme.spacing.xl}`
                  ]}
                  columnGap={['', `${theme.spacing.l}`, `${theme.spacing.xl}`]}
                  columnRatio={['1', '1:1', '1:1:1']}
                >
                  {getProductCards(secondaryProductCards)}
                </Grid>

                {sales?.salesLandingPage?.saleLandingCollectionCTA && (
                  <StyledCollectionCTA>
                    <CtaLink
                      url={`/${locale}/collection`}
                      label={sales?.salesLandingPage?.saleLandingCollectionCTA}
                      variant='solid-gravy'
                    />
                  </StyledCollectionCTA>
                )}
              </StyledPageWidth>
            </>
          ) : (
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
                {getProductCards(productCards, true)}
                {sales?.salesLandingPage?.salesLandingOneColumnImage && (
                  <StyledPlaceholderContainer
                    productCardsLength={productCards.length}
                  >
                    <Image
                      srcWidths={[768, 1024]}
                      desktopImage={
                        sales?.salesLandingPage?.salesLandingOneColumnImage
                          ?.desktopImage
                      }
                      tabletImage={
                        sales?.salesLandingPage?.salesLandingOneColumnImage
                          ?.desktopImage
                      }
                      mobileImage={
                        sales?.salesLandingPage?.salesLandingOneColumnImage
                          ?.desktopImage
                      }
                      alt={
                        sales?.salesLandingPage?.salesLandingOneColumnImage?.alt
                      }
                    />
                  </StyledPlaceholderContainer>
                )}
              </Grid>
            </StyledPageWidth>
          )}
        </StyledSaleCollectionContainer>
      </>
    )
  }

  const defaultCollectionGrid = () => {
    if (!defaultCollectionProducts) {
      return null
    }

    return (
      <StyledSaleCollectionContainer>
        <StyledPageWidth>
          <StyledSectionTitle color='gravy' variant='h2'>
            <span>{defaultCollectionHeading}</span>
          </StyledSectionTitle>

          <Grid
            rowGap={[
              `${theme.spacing.xl}`,
              `${theme.spacing.l}`,
              `${theme.spacing.xl}`
            ]}
            columnGap={['', `${theme.spacing.l}`, `${theme.spacing.xl}`]}
            columnRatio={['1', '1:1', '1:1:1']}
          >
            {getProductCards(defaultCollectionProducts)}
          </Grid>
        </StyledPageWidth>
      </StyledSaleCollectionContainer>
    )
  }

  const saleHeroProps = {
    heading:
      sales && sales?.salesLandingPage?.salesLandingHero
        ? sales?.salesLandingPage?.salesLandingHero?.props?.heading
        : hero?.props?.heading,
    subcopy:
      sales && sales?.salesLandingPage?.salesLandingHero
        ? sales?.salesLandingPage?.salesLandingHero?.props?.subcopy
        : hero?.props?.subcopy,
    backgroundImage:
      sales && sales?.salesLandingPage?.salesLandingHero
        ? sales?.salesLandingPage?.salesLandingHero?.props?.backgroundImage
        : hero?.props?.backgroundImage
  }

  const salesSignUp = sales?.salesLandingPage?.salesLandingSignUp

  const signUpProps = {
    heading: salesSignUp ? salesSignUp?.heading : signUp?.heading,
    subcopy: salesSignUp ? salesSignUp?.subcopy : signUp?.subcopy,
    lifestyleImage: salesSignUp
      ? salesSignUp?.lifestyleImage
      : signUp?.lifestyleImage,
    microcopy: salesSignUp ? salesSignUp?.microcopy : signUp?.microcopy
  }

  return (
    <Layout
      page={page}
      global={global}
      data={data}
      locale={locale}
      sales={sales}
    >
      {hero && (
        <GenericSaleHero
          heading={saleHeroProps?.heading}
          subcopy={saleHeroProps?.subcopy}
          backgroundImage={saleHeroProps?.backgroundImage}
          sales={sales}
          locale={locale}
          countdownHeader={sales?.countdownTimeLabel}
        />
      )}
      {/* TODO: Breakdown JSX into smaller component files */}

      <StyledPageWidth>
        {isActiveSale && sales?.salesLandingPage?.salesLandingBanner ? (
          <SalesBanner
            heading={sales?.salesLandingPage?.salesLandingBanner?.heading}
            subcopy={sales?.salesLandingPage?.salesLandingBanner?.subcopy}
            subcopyImage={
              sales?.salesLandingPage?.salesLandingBanner?.subcopyImage
            }
            microcopy={sales?.salesLandingPage?.salesLandingBanner?.microcopy}
            badgeImage={sales?.salesLandingPage?.salesLandingBanner?.badgeImage}
            lifestyleImage={
              sales?.salesLandingPage?.salesLandingBanner?.lifestyleImage
            }
            sales={sales}
            bgColor={sales?.salesLandingPage?.salesLandingBanner?.bgColor?.hex}
            themeColor={sales?.themeColor}
            saleBundles={sales?.salesLandingPage?.salesLandingBanner?.bundles}
            locale={locale}
          />
        ) : (
          <SalesEmailSignUp {...signUpProps} locale={locale} />
        )}
      </StyledPageWidth>

      {/* TODO: Make these into named components */}
      {(!sales || showDefaultCollection) && defaultCollectionGrid()}

      {sales &&
        sales?.salesLandingPage?.saleLandingProductCards &&
        saleCollectionGrid()}
        {sales && sales?.salesLandingPage?.secondarySaleProducts?.saleLandingProductCards && 
        <>
        <SecondarySaleProducts 
        heading={sales?.salesLandingPage?.secondarySaleProducts?.heading}
        subcopy={sales?.salesLandingPage?.secondarySaleProducts?.subcopy}
        productCards={sales?.salesLandingPage?.secondarySaleProducts?.saleLandingProductCards}
        backgroundColor={sales?.salesLandingPage?.secondarySaleProducts?.backgroundColor?.hex}
        sales={sales}
        locale={locale} />
        </>
        }
      {modules}

      {prefooter}
    </Layout>
  )
}

export async function getStaticProps({ locale, preview }) {
  const pageData = await getStaticPage(
    queries.getFormattedTypeQuery(
      'salesLandingPage',
      locale,
      `{
        "id": _id,
        hero,
        collections,
        defaultCollectionHeading,
        defaultCollectionProducts,
        salesbanner,
        signup,
        saleActive,
        content,
        settings, 
        modules[],
        title,
        prefooter,
        seo
      }`
    ),
    locale
  )

  const enFrSlugsIds = await getAllDocSlugsIds('salesLandingPage')

  return {
    props: {
      data: pageData,
      locale,
      enFrSlugsIds,
      isPreviewMode: preview || false
    }
  }
}

export default SalesLandingPage
