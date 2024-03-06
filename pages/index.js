import React, { useEffect } from 'react'
import Error from 'next/error'
import { useRouter } from 'next/router'

import { getStaticPage, queries, getAllDocSlugsIds } from '@data'
import { buildPageProps } from '@lib/buildPage'
import {
  useUserLocation,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'

import Layout from '../components/layout'
import { getSalesData } from '../utils/sales'
import {
  getTranslatedRouteById,
  assignLocalizedRoutes
} from '../utils/routeTranslations'

const Home = ({ data, locale, selectedSaleId, isLastChance, enFrSlugsIds }) => {
  const userLocation = useUserLocation()
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')
  const isQuebec = userLocation?.province === 'Quebec'
  const localizedRoutes = useLocalizedRoutes()
  const router = useRouter()

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
  const { modules, prefooter, hero } = page

  if (!page) {
    return (
      <Error
        title={`"Home Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

  useEffect(() => {
    const redirectProductPageData = {
      localizedRoutes,
      locale,
      currentRoute: locale === 'en' ? '/' : '/fr',
      redirectRoute: locale === 'en' ? '/fr' : '/'
    }

    assignLocalizedRoutes(redirectProductPageData)
  }, [router])

  useEffect(() => {
    const homePageData = {
      enFrSlugsIds: [
        { id: enFrSlugsIds[0].id, slug: '/' },
        { id: enFrSlugsIds[1].id, slug: '/fr' }
      ],
      locale,
      page,
      router
    }

    const translatedRoute = getTranslatedRouteById(homePageData)

    if (isFrench && !window.location.pathname.includes(`/${locale}/`)) {
      router.push(`${translatedRoute[0]?.slug}`)
    }
  }, [isFrench])

  return (
    <Layout
      page={page}
      global={global}
      data={data}
      locale={locale}
      sales={sales}
    >
      {sales?.heros?.homePageHero || hero}
      {modules}
      {prefooter}
    </Layout>
  )
}

export async function getStaticProps({ locale, preview }) {
  const pageData = await getStaticPage(
    queries.getFormattedTypeQuery(
      'homePage',
      locale,
      `{
        "id": _id,
        hero,
        modules[],
        title,
        prefooter,
        seo
      }`
    ),
    locale
  )

  const enFrSlugsIds = await getAllDocSlugsIds('homePage')

  return {
    props: {
      data: pageData,
      locale,
      enFrSlugsIds,
      isPreviewMode: preview || false
    }
  }
}

export default Home
