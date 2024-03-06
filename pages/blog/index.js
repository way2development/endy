import { buildPageProps } from '@lib/buildPage'
import { getAllDocSlugsIds, getStaticBlogPage, queries } from '@data'
import { useRouter } from 'next/router'
import Error from 'next/error'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import {
  useLanguageSetting,
  useLocalizedRoutes,
  useUserLocation
} from '../../lib/context'
import Layout from '../../components/layout'
import { getSalesData } from '../../utils/sales'
import { assignLocalizedRoutes } from '../../utils/routeTranslations'
import { BlogArticleCardsGrid } from '../../components/BlogArticleCard/BlogArticleCardsGrid'
import { StyledPageWidth } from '../../styles/global.styled'
import { theme } from '../../styles/theme'
import { BlogPrefooter } from 'components/BlogPrefooter/BlogPrefooter'
import { Pagination } from 'components/Pagination'

import { BlogHeader } from '../../components/BlogHeader'
import { BlogFeaturedArticle } from '../../components/BlogFeaturedArticle'
import NotFoundPage from '../../pages/404'
import { getSortedArticlesOfObj } from '../../lib/time'
import { getBlogSchema } from '../../utils/getBlogSchema'

export const StyledPageWidthWrap = styled.div`
  background-color: ${theme.colors.offWhite};
`

const Blog = ({ data, locale, selectedSaleId, isLastChance, enFrSlugsIds }) => {
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
      router.replace('/fr/blog')
    }

    if (siteLanguagePreference?.prefersEnglish) {
      router.replace('/blog')
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
  const page = buildPageProps(data.blog.blogHomepage, {
    sales,
    locale,
    references
  })
  const global = buildPageProps(data.global, { sales, locale, references })
  const blog = buildPageProps(data.blog, { sales, locale, references })
  const articles = blog.blogArticles

  if (!page) {
    return (
      <Error
        title={`"Blog Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

  useEffect(() => {
    const redirectProductPageData = {
      localizedRoutes,
      locale,
      currentRoute: locale === 'en' ? '/blog' : '/fr/blog',
      redirectRoute: locale === 'en' ? '/fr/blog' : '/blog'
    }

    assignLocalizedRoutes(redirectProductPageData)
  }, [router])

  const { blogArticles } = blog
  const { header, featuredArticle } = page
  const { content, hero, readMore, settings } = featuredArticle?.article[0]
  const { cta } = featuredArticle

  const sortedArticles = useMemo(() => {
    return getSortedArticlesOfObj(articles)
  }, [articles])

  // Get BLOG SEO Schema
  const currentUrl = `https://endy.com/${router.locale}/blog`

  const blogSchema = useMemo(
    () =>
      Object.keys(blogArticles).length !== 0 &&
      router.pathname &&
      getBlogSchema(
        global?.settings?.shareGraphic,
        blog,
        currentUrl,
        blogArticles
      ),
    [global?.settings?.shareGraphic, blog, currentUrl]
  )

  return (
    <Layout
      page={{ ...page, title: header?.heading }}
      global={global}
      data={data}
      locale={locale}
      sales={sales}
      schema={blogSchema}
    >
      <StyledPageWidthWrap>
        <StyledPageWidth>
          <BlogHeader locale={locale} header={header} />
          <BlogFeaturedArticle
            subcopy={content?.subcopy}
            backgroundImage={hero?.image}
            heading={settings?.heading}
            primaryBtnLabel={cta?.props?.label}
            primaryMobileBtnLabel={readMore?.title}
            url={`/blog/${settings?.categories[0]?.slug.current}/${settings?.slug?.current}`}
            publishedDate={settings?.publishedAt}
          />
          <BlogArticleCardsGrid articles={sortedArticles} locale={locale} />
          {blog?.blogPrefooter && (
            <BlogPrefooter
              prefooter={blog.blogPrefooter}
              locale={locale}
              sales={sales}
            />
          )}
        </StyledPageWidth>
      </StyledPageWidthWrap>
    </Layout>
  )
}

export async function getStaticProps({ locale, preview }) {
  const pageData = await getStaticBlogPage(
    queries.getFormattedTypeQuery(
      'blogHomepage',
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

  const enFrSlugsIds = await getAllDocSlugsIds('blogHomepage')

  return {
    props: {
      data: pageData,
      locale,
      enFrSlugsIds,
      isPreviewMode: preview || false
    }
  }
}

export default Blog
