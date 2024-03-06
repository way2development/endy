import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  assignLocalizedRoutes,
  getTranslatedRouteById
} from '../utils/routeTranslations'

import { getStaticPage, queries, getCollectionAnchorIds } from '@data'
import { buildPageProps } from '@lib/buildPage'
import {
  useUserLocation,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'

import Layout from '../components/layout'
import { getSalesData } from '../utils/sales'
import { theme } from '../styles/theme'
import { googleAnalytics } from '../components/GoogleAnalytics/analytics'

const getCollectionsProducts = (collections) =>
  collections.map((collection) => {
    const { productCards } = collection.props
    return productCards.map((productCard) => productCard.product)
  })

const CollectionsPage = ({
  data,
  locale,
  selectedSaleId,
  isLastChance,
  enFrCollections
}) => {
  const userLocation = useUserLocation()
  const router = useRouter()
  const localizedRoutes = useLocalizedRoutes()
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

  const { collections, prefooter, hero } = page
  const { heading } = hero.props

  if (!page) {
    return (
      <Error
        title={`"Collections Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

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

  useEffect(() => {
    const collectionPageData = {
      collections: enFrCollections
    }

    const allAnchorIds = getTranslatedRouteById(collectionPageData)

    const redirectCollectionPageData = {
      localizedRoutes,
      locale,
      currentRoute: router?.asPath,
      redirectRoute: `/collection`
    }

    const containsCollectionsAnchorId = allAnchorIds.some((anchorId) => {
      return router.asPath.includes(anchorId.anchorId)
    })

    if (!containsCollectionsAnchorId) {
      return assignLocalizedRoutes(redirectCollectionPageData)
    }

    const currentCollectionAnchorId = allAnchorIds.find(
      (currentCollectionCategory) => {
        return (
          router.asPath.split('#')[1] === currentCollectionCategory.anchorId
        )
      }
    )

    const redirectCollectionAnchorId = allAnchorIds.find(
      (redirectCollectionCategory) => {
        return (
          router.asPath.split('#')[1] !== redirectCollectionCategory.anchorId &&
          currentCollectionAnchorId?.key === redirectCollectionCategory.key
        )
      }
    )

    const collectionCategoryPageData = {
      localizedRoutes,
      locale,
      currentRoute: router?.asPath,
      redirectRoute: `/collection#${redirectCollectionAnchorId?.anchorId}`
    }

    assignLocalizedRoutes(collectionCategoryPageData)

    if (
      isFrench &&
      !window.location.pathname.includes(`/${locale}/`) &&
      window.location.hash.includes('#')
    ) {
      router.push(`/fr/collection#${redirectCollectionAnchorId?.anchorId}`)
    }
  }, [router, isFrench])

  useEffect(() => {
    if (
      isFrench &&
      !window.location.pathname.includes(`/${locale}/`) &&
      !window.location.hash.includes('#')
    ) {
      router.push(`/fr/collection`)
    }
  }, [isFrench])

  return (
    <Layout
      page={page}
      global={global}
      data={data}
      locale={locale}
      sales={sales}
      backgroundColor={theme.colors.offWhite}
    >
      {hero}
      {collections.map((collection) => {
        return React.cloneElement(collection, {
          reviews: allReviews,
          isReviewsLoading: isLoading
        })
      })}
      {prefooter}
    </Layout>
  )
}

export async function getStaticProps({ locale, preview }) {
  const pageData = await getStaticPage(
    queries.getFormattedTypeQuery(
      'collectionsPage',
      locale,
      `{
        "id": _id,
        hero,
        collections[],
        title,
        prefooter,
        seo
      }`
    ),
    locale
  )

  const enFrCollections = await getCollectionAnchorIds('collectionsPage')

  return {
    props: {
      data: pageData,
      locale,
      enFrCollections,
      isPreviewMode: preview || false
    }
  }
}

export default CollectionsPage
