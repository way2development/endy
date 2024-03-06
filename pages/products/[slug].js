import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  getTranslatedRouteById,
  assignLocalizedRoutes,
  getLocalizedRouteWithQueryParams
} from '../../utils/routeTranslations'
import {
  getStaticPage,
  getAllDocSlugs,
  queries,
  getAllDocSlugsIds
} from '@data'
import { buildPageProps } from '@lib/buildPage'

import {
  useAddItem,
  useUserLocation,
  useSiteContext,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'

import NotFoundPage from '@pages/404'

import { getSalesData, isSaleActive } from '../../utils/sales'
import Layout from '../../components/layout'
import { ShopModule } from '../../components/ShopModule'
import { ProductCrossSellGrid } from '../../components/ProductCrossSellGrid'
import { ProductStickyBar } from '../../components/ProductStickyBar'
import { googleAnalytics } from '../../components/GoogleAnalytics/analytics'
import { getScrollPosition } from '../../utils/getScrollPosition'
import { kickDynamicTracking } from 'components/GlobalAnalytics/analytics'

import {
  getIsMobileDevice,
  getProductWithStock,
  getCrossSellVariants,
  getEquivalentMattressSizes,
  getProductSchema,
  getRebuyProducts
} from './../../utils'

import {
  formatSanitySaleEndDate,
  formatSanitySaleStartDate
} from '../../lib/time'

import { getYotpoBottomLine } from '../../utils/getYotpoReviews'
import { CustomerReviews } from '../../components/CustomerReviews'
import {
  productReviewKeywordsEN,
  productReviewKeywordsFR
} from '../../components/CustomerReviews/utils'
import { WriteAReviewContext } from '../../lib/context'

const ProductDetailPage = ({
  data,
  locale,
  selectedSaleId,
  isLastChance,
  enFrSlugsIds
}) => {
  const router = useRouter()
  if (!router.isFallback && !data) {
    return <NotFoundPage locale={locale} />
  }

  const addItemToCart = useAddItem()
  const { isCartError } = useSiteContext()
  const localizedRoutes = useLocalizedRoutes()
  const userLocation = useUserLocation()
  const isMobileDevice = getIsMobileDevice()
  const selectedSize = router?.query?.size || ''
  const selectedColor = router?.query?.color || ''

  const isQuebec = userLocation?.province === 'Quebec'
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')

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
  const page = buildPageProps(data.page, { sales, locale, references })
  const global = buildPageProps(data.global, { sales, locale, references })

  const {
    carouselBadgeImage,
    carouselBadgeImageSecondary,
    productBadges,
    modules,
    prefooter,
    product,
    slug,
    featuredReviews,
    crossSellRebuy,
    crossSellProducts,
    upsellRebuy,
    upsellProducts,
    freeGiftBanner,
    additionalInfo,
    comparisonInfo,
    outboundLinks,
    sizeGuide,
    accordionList,
    showDropAHint,
    productTypeSelector
  } = page

  const { shopSettings, crossSellRankings } = global

  const [productsInventoryInfo, updateProductsInventoryInfo] = useState([])
  const productInventoryInfo = productsInventoryInfo.find((productInfo) => {
    return productInfo.id === product.id
  })

  const [showReviewForm, setShowReviewForm] = useState()
  const [upsellProductList, setUpsellProductList] = useState()
  const [crossSellProductList, setCrossSellProductList] = useState()

  /**
   * Fetch Rebuy recommendations for Shop Module upsell
   */
  useEffect(() => {
    // TODO: Rename these later
    async function fetchRebuyUpsells() {
      // If Rebuy recommendations are NOT enabled in Sanity use Sanity data for Shop Module upsell
      // Else, get Rebuy products. If error, fallback on Sanity data.
      const upsellRebuyEnabled =
        upsellRebuy?.enableUpsellRebuy && upsellRebuy?.upsellRulesetId

      if (!upsellRebuyEnabled) {
        // If rebuy recommendations are not set/enabled in Sanity, use sanity data
        setUpsellProductList(upsellProducts)
      } else {
        const FETCH_LIMIT = '6'
        const rebuyUpsellProducts = await getRebuyProducts(
          upsellRebuy.upsellRulesetId,
          FETCH_LIMIT,
          product.id,
          selectedVariant.id,
          references,
          sales,
          locale
        ).catch((error) => {
          console.error(error)
          setUpsellProductList(crossSellProducts)
        })

        // If too few rebuy products are fetched, fallback on Sanity data.
        if (rebuyUpsellProducts.length < 1) {
          return setUpsellProductList(upsellProducts)
        }

        const rebuyUpsellProductWithDetails = rebuyUpsellProducts.map(
          (rebuyUpsellProduct) => {
            return {
              ...rebuyUpsellProduct
            }
          }
        )

        setUpsellProductList(rebuyUpsellProductWithDetails)
      }
    }

    fetchRebuyUpsells()
  }, [
    upsellRebuy?.enableUpsellRebuy,
    upsellRebuy?.upsellRulesetId,
    data.references
  ])

  /**
   * Get and set cross sell products with Rebuy data or fallback Sanity data
   */
  useEffect(() => {
    async function fetchAndSetRebuyCrossSells() {
      const crossSellRebuyEnabled =
        crossSellRebuy?.enableCrossSellRebuy &&
        crossSellRebuy?.crossSellRulesetId

      if (!crossSellRebuyEnabled) {
        // Fallback to Sanity cross sell data
        setCrossSellProductList(crossSellProducts)
      } else {
        const FETCH_LIMIT = '6'
        const rebuyCrossSellProducts = await getRebuyProducts(
          crossSellRebuy.crossSellRulesetId,
          FETCH_LIMIT,
          product.id,
          selectedVariant.id,
          references,
          sales,
          locale
        ).catch((error) => {
          // If error, fallback to Sanity cross sell data
          console.error(error)
          setCrossSellProductList(crossSellProducts)
        })

        // If too few rebuy products are fetched, fallback on Sanity data.
        if (rebuyCrossSellProducts?.length < 4) {
          return setCrossSellProductList(crossSellProducts)
        }
        setCrossSellProductList(rebuyCrossSellProducts)
      }
    }

    fetchAndSetRebuyCrossSells()
  }, [
    crossSellRebuy?.enableCrossSellRebuy,
    crossSellRebuy?.enableCrossSellRebuy,
    data.references
  ])

  const mediaModule = modules.find((module) => {
    const { video, _type } = module.props
    return video && _type === 'mediaModule'
  })

  const faqModule = modules.find((module) => {
    const { _type } = module.props
    return _type === 'accordionList'
  })

  const productWithStockInfo = getProductWithStock(
    product,
    productInventoryInfo
  )

  // Determine if product has a mystery gift
  const mysteryGiftOffer = global?.specialOffers?.mysteryGift

  const mysteryGiftProducts = mysteryGiftOffer?.products

  const mysteryGiftStartDate = formatSanitySaleStartDate(
    mysteryGiftOffer?.startDate
  )

  const mysteryGiftEndDate = formatSanitySaleEndDate(mysteryGiftOffer?.endDate)

  const isMysteryGiftOfferActive = isSaleActive(
    mysteryGiftStartDate,
    mysteryGiftEndDate
  )

  const hasMysteryGift =
    isMysteryGiftOfferActive &&
    mysteryGiftProducts.find((mysteryGiftProduct) => {
      return mysteryGiftProduct.id === product.id
    })
      ? true
      : false

  // If product is included in mystery gift offer, get inventory info for mystery gift
  let mysteryGiftInventoryInfo
  let mysteryGiftWithStockInfo

  if (hasMysteryGift) {
    const mysteryGift = global?.specialOffers?.mysteryGift?.gift[0]

    mysteryGiftInventoryInfo = productsInventoryInfo.find((productInfo) => {
      return productInfo.id === mysteryGift.id
    })

    mysteryGiftWithStockInfo = getProductWithStock(
      mysteryGift,
      mysteryGiftInventoryInfo
    )
  }

  // If product has upsells, get inventory info for upsell products
  const upsellProductsWithStockInfo = upsellProductList?.map((product) => {
    const productInventoryInfo = productsInventoryInfo.find((productInfo) => {
      return productInfo.id === product.id
    })
    return getProductWithStock(product, productInventoryInfo)
  })

  const crossSellProductWithStockInfo = crossSellProductList?.map((product) => {
    const productInventoryInfo = productsInventoryInfo.find((productInfo) => {
      return productInfo.id === product.id
    })
    return getProductWithStock(product, productInventoryInfo)
  })

  const topRankedMattressSize = global.crossSellRankings.mattressSizeRanking[0]

  const topRankedSizeObj =
    productWithStockInfo.sizeVariants.find((variant) => {
      return variant.mattressSize.find((size) => size === topRankedMattressSize)
    }) || productWithStockInfo.sizeVariants[0]

  const topRankedSizeVariantId = product.variants.find((variant) => {
    return variant.size === topRankedSizeObj.id
  }).id

  const selectedVariant =
    productWithStockInfo?.variants.find((variant) => {
      const isSelectedSize = selectedSize === variant.size
      const isSelectedColor = selectedColor === variant.color
      if (selectedSize && selectedColor) {
        return isSelectedSize && isSelectedColor
      } else if (selectedSize && !selectedColor) {
        return isSelectedSize
      } else {
        return isSelectedColor
      }
    }) || productWithStockInfo.variants[0]

  // Get the equivalent mattress sizes for the current product variant
  const equivalentMattressSizes = getEquivalentMattressSizes(
    product,
    selectedVariant
  )

  const crossSellVariants = getCrossSellVariants(
    crossSellProductWithStockInfo,
    equivalentMattressSizes,
    global.crossSellRankings.mattressSizeRanking
  ).slice(0, 4)

  const upsellVariantList = getCrossSellVariants(
    upsellProductsWithStockInfo,
    equivalentMattressSizes,
    global.crossSellRankings.mattressSizeRanking
  )

  const filterUpsellVariants = (upsellVariantList) => {
    //  HOT FIX: For the platform bed PDP, we will not be offering the foam headboard in Warm Oat as an add-on. Quick fix to hide the Foam Headboard upsell if the color selected is Warm Oat. Remove once the foam headboard is out of stock.
    const includesFoamHeadboard = upsellVariantList.find((variant) => {
      return variant.productId === 4721316233264
    })

    if (includesFoamHeadboard && selectedColor === 'Warm Oat') {
      return upsellVariantList.filter((variant) => {
        return variant.productId !== 4721316233264
      })
    }

    return upsellVariantList
  }

  const upsellVariants = filterUpsellVariants(upsellVariantList).slice(0, 3)

  // Yotpo Reviews
  const [reviewSummary, setReviewSummary] = useState({})
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchStockInfo = async () => {
      const currentProductId = product?.id

      const crossSellProductIds = crossSellProductList
        ?.map((product) => product.id)
        ?.join(',')

      const upsellProductIds =
        upsellProductList &&
        upsellProductList.map((product) => product.id)?.join(',')

      const mysteryGiftId = global?.specialOffers?.mysteryGift?.gift[0]?.id

      const endpoint = hasMysteryGift
        ? `/api/shopify/product-inventory?ids=${currentProductId},${crossSellProductIds},${upsellProductIds},${mysteryGiftId}`
        : `/api/shopify/product-inventory?ids=${currentProductId},${crossSellProductIds},${upsellProductIds}`

      const response = await axios(endpoint)
      updateProductsInventoryInfo(response.data)
    }

    fetchStockInfo()
    getYotpoBottomLine(productWithStockInfo.id, setReviewSummary)

    // Adding view item list to trigger once per product page
    const variants = upsellProducts?.map((product) => product.variants[0])
    const viewItemListData = {
      products: upsellProducts?.slice(0, 3),
      variants: variants?.slice(0, 3),
      listName: 'add ons',
      listId: 'addons',
      sales
    }
    if (upsellProducts && variants) {
      googleAnalytics.viewItemList(viewItemListData)
      googleAnalytics.elevarViewItemList(viewItemListData)
    }
  }, [])

  useEffect(() => {
    if (
      router.isReady &&
      `/${router.query.slug}` === `${productWithStockInfo.slug}`
    ) {
      // find product variant based on url query
      const querySelectedVariant = productWithStockInfo.variants.find(
        (variant) => {
          const isValidSize = variant.size === selectedSize
          const isValidColor = variant.color === selectedColor

          return isValidSize && isValidColor
        }
      )
      // if url query yield invalid variant set to default variant and/or look for queries from affliate params
      if (!querySelectedVariant) {
        const defaultColorId = productWithStockInfo.colorVariants
          ? productWithStockInfo.colorVariants[0]?.id
          : undefined
        // const defaultVariantId = productWithStockInfo.variants[0]?.id
        const defaultSizeId = topRankedSizeObj.id

        const routerQueries = router?.query ? router?.query : {}
        const affiliateParams = Object.keys(routerQueries)
          .filter((key) => key !== 'slug' && key !== 'size' && key !== 'color')
          .reduce((acc, key) => {
            acc[key] = routerQueries[key]
            return acc
          }, {})

        router.asPath.includes('products') &&
          router.replace(
            {
              pathname: `/products${slug}`,
              query: {
                size: defaultSizeId,
                ...(defaultColorId ? { color: defaultColorId } : {}),
                ...affiliateParams
              }
            },
            undefined,
            { locale }
          )
      }
    }
  }, [router])

  useEffect(() => {
    // On page load, send product details to GA based on URL query param, otherwise send the default product details
    if (router?.query?.size) {
      const sizeQueryParam = router?.query?.size
      const sizeQueryParamVariantId = product.variants.find((variant) => {
        return (
          variant.size.toLowerCase() === sizeQueryParam.toLowerCase() ||
          variant.size === sizeQueryParam
        )
      })?.id

      googleAnalytics.viewItemDetails(product, sizeQueryParamVariantId, sales)

      kickDynamicTracking.viewProduct(product)
    } else {
      kickDynamicTracking.viewProduct(product)
    }
  }, [router?.query?.size, router?.query?.color])

  const handleSelect = (sizeSelection, variantId, colorSelection) => {
    // update query params
    router.push(
      {
        pathname: `/products${slug}`,
        query: {
          size: sizeSelection,
          ...(colorSelection ? { color: colorSelection } : {})
        }
      },
      undefined,
      {
        shallow: true,
        locale
      }
    )
  }

  // Get the corresponding mattress size array for the Main Product
  const mainProductVariantCorrespondingSizes = product.sizeVariants.find(
    (sizeVariant) => {
      return sizeVariant.id === selectedVariant.size
    }
  )?.mattressSize

  const topRankedCorrespondingVariantSize =
    global.crossSellRankings.mattressSizeRanking?.find((rank) => {
      return mainProductVariantCorrespondingSizes?.find((size) => {
        return size === rank
      })
    })

  let mysteryGiftVariant

  if (hasMysteryGift) {
    // Get Variant Stock Info
    const mysteryGiftSizeVariant = mysteryGiftWithStockInfo?.sizeVariants?.find(
      (sizeVariant) => {
        return sizeVariant.mattressSize.find(
          (size) => size == topRankedCorrespondingVariantSize
        )
      }
    )

    mysteryGiftVariant = mysteryGiftWithStockInfo?.variants?.find((variant) => {
      return variant.size === mysteryGiftSizeVariant?.id
    })
  }

  let shopModuleProps = {
    selectedVariant,
    carouselBadgeImage,
    carouselBadgeImageSecondary,
    productBadges,
    product: productWithStockInfo,
    reviews: {
      rating: reviewSummary?.averageScore,
      totalReviews: reviewSummary?.totalReviews,
      starDistribution: reviewSummary?.star_distribution,
      isError,
      locale
    },
    addItemToCart,
    locale,
    sales,
    shippingModal: shopSettings?.shippingModal,
    affirmModal: shopSettings?.affirmModal,
    selectedSize,
    selectedColor,
    handleSelect,
    isMobileDevice,
    userLocation,
    featuredReviews,
    upsellProducts: {
      variants: upsellVariants,
      products: upsellProductsWithStockInfo
    },
    freeGiftBanner,
    additionalInfo,
    comparisonInfo,
    outboundLinks,
    accordionList,
    showDropAHint,
    sizeGuide,
    router,
    isCartError,
    productTypeSelector
  }

  if (hasMysteryGift) {
    shopModuleProps = {
      ...shopModuleProps,
      mysteryGift: {
        product: mysteryGiftWithStockInfo
      },
      mysteryGiftVariant,
      hasMysteryGift
    }
  }

  // Get Product SEO Schema
  const currentUrl = `https://endy.com/${router.locale}/products${productWithStockInfo.slug}`

  const productSchema = useMemo(
    () =>
      Object.keys(reviewSummary).length !== 0 &&
      router.query.size &&
      getProductSchema(
        product,
        currentUrl,
        featuredReviews,
        page.seo,
        global?.settings?.shareGraphic,
        reviewSummary,
        router.query.size,
        mediaModule?.props,
        faqModule?.props
      ),
    [currentUrl, reviewSummary, router.query.size]
  )

  const shopModuleRef = useRef(null)
  const [stickyBarOffset, setstickyBarOffset] = useState(0)
  const productStickyBarRef = useRef(null)

  const scrollPosition = getScrollPosition()
  const showStickyBar = scrollPosition > stickyBarOffset

  useEffect(() => {
    if (!shopModuleRef) null
    setstickyBarOffset(shopModuleRef.current?.clientHeight)
  }, [])

  useEffect(() => {
    const productPageData = {
      enFrSlugsIds,
      locale,
      page,
      product
    }

    const translatedRoute = getTranslatedRouteById(productPageData)

    const redirectProductPageData = {
      localizedRoutes,
      locale,
      currentRoute: `/products${product.slug}`,
      redirectRoute: `/products${translatedRoute[0]?.slug}`
    }

    assignLocalizedRoutes(redirectProductPageData)
  }, [router])

  useEffect(() => {
    const productPageData = {
      enFrSlugsIds,
      locale,
      page,
      product
    }

    const translatedRoute = getTranslatedRouteById(productPageData)

    if (isFrench && !window.location.pathname.includes(`/${locale}/`)) {
      router.push(
        getLocalizedRouteWithQueryParams(
          router?.query,
          `/fr/products${translatedRoute[0]?.slug}`
        )
      )
    }
  }, [isFrench, router?.query])

  return (
    <WriteAReviewContext.Provider value={{ showReviewForm, setShowReviewForm }}>
      {!router.isFallback && (
        <Layout
          page={page}
          global={global}
          schema={productSchema}
          data={data}
          locale={locale}
          sales={sales}
          productStickyBarRef={productStickyBarRef}
          showStickyBar={showStickyBar}
        >
          <ProductStickyBar
            offset={stickyBarOffset}
            locale={locale}
            sales={sales}
            product={productWithStockInfo}
            productStickyBarRef={productStickyBarRef}
            showStickyBar={showStickyBar}
            productId={product.id}
          />
          <div ref={shopModuleRef}>
            <ShopModule {...shopModuleProps} />
            {/* TODO: Temporarily hiding the cross sells. The cross sells will be moved lower on the PDP with an upcoming project. */}
            {/* {crossSellProductList && (
              <ProductCrossSellGrid
                mainProduct={product.title}
                variants={crossSellVariants}
                products={crossSellProductWithStockInfo}
                locale={locale}
                sales={sales}
                addItemToCart={addItemToCart}
                slug={slug}
                topRankedCorrespondingVariantSize={
                  topRankedCorrespondingVariantSize
                }
                router={router}
                isCartError={isCartError}
              />
            )} */}
          </div>
          {modules}
          <CustomerReviews
            product={productWithStockInfo}
            locale={locale}
            productDropdown={{
              label: product.name,
              id: product.id.toString(),
              slug:
                locale === 'en'
                  ? `https://www.endy.com/products${product.slug}`
                  : `https://www.endy.com/fr/products${product.slug}`
            }}
            keywords={
              locale === 'fr'
                ? productReviewKeywordsFR
                : productReviewKeywordsEN
            }
            isError={isError}
            setIsError={setIsError}
          />
          {prefooter}
        </Layout>
      )}
    </WriteAReviewContext.Provider>
  )
}

export async function getStaticProps({ params, locale, preview }) {
  const pageData = await getStaticPage(
    queries.getFormattedTypeQuery(
      'productDetailPage',
      locale,
      `{
        "id": _id,
        "type": _type,
        modules[],
        title,
        carouselBadgeImage,
        carouselBadgeImageSecondary,
        productBadges,
        slug,
        product,
        prefooter,
        featuredReviews,
        crossSellProducts,
        crossSellRebuy,
        upsellProducts,
        upsellRebuy,
        seo,
        freeGiftBanner,
        additionalInfo,
        comparisonInfo,
        outboundLinks,
        sizeGuide,
        accordionList,
        showDropAHint,
        productTypeSelector
      }`,
      `slug == "/${params.slug}"`
    ),
    locale
  )

  const enFrSlugsIds = await getAllDocSlugsIds('productDetailPage')

  return {
    props: {
      data: pageData,
      locale,
      enFrSlugsIds,
      isPreviewMode: preview || false
    }
  }
}

export async function getStaticPaths() {
  const allPages = await getAllDocSlugs('productDetailPage')

  return {
    paths:
      allPages?.map((page) => {
        const slugs = page.slug.split('/').filter(Boolean)[0]

        return {
          params: {
            slug: slugs
          },
          locale: page.__i18n_lang
        }
      }) || [],
    fallback: false
  }
}

export default ProductDetailPage
