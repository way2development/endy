import React, { useEffect, useMemo } from 'react'
import dictionary from '../../../../dictionary.json'
import Error from 'next/error'
import { useRouter } from 'next/router'
import {
  getStaticBlogPage,
  queries,
  getAllDocSlugsIds,
  getAllDocSlugs,
  getAllBlogArticleSlugsIds,
  getAllBlogArticleSlugs
} from '@data'
import { buildPageProps } from '@lib/buildPage'
import {
  useUserLocation,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'
import { StyledPageWidth } from '../../../../styles/global.styled'
import Layout from '../../../../components/layout'
import { getSalesData } from '../../../../utils/sales'
import {
  assignLocalizedRoutes,
  getTranslatedRouteById
} from '../../../../utils/routeTranslations'
import { BlogArticleHero } from '../../../../components/BlogArticleHero/BlogArticleHero'
import { BlogPrefooter } from '../../../../components/BlogPrefooter/BlogPrefooter'
import { BlogReadMoreCards } from '../../../../components/BlogReadMoreCards/BlogReadMoreCards'
import { ArticleContent } from '../../../../components/ArticleContent/ArticleContent'
import { NewsletterCard } from 'components/NewsletterCard/NewsletterCard'
import styled from 'styled-components'
import { theme, mq } from '../../../../styles/theme'
import { getFormattedDate } from '../../../../lib/time'
import { getBlogSchema } from 'utils/getBlogSchema'

const StyledPage = styled.div`
  background-color: ${theme.colors.offWhite};
`

const StyledBlogArticleWrapper = styled.div`
  display: flex;
  ${mq({
    flexDirection: ['column', '', 'row']
  })}
`

const StyledBlogAside = styled.aside`
  ${mq({
    width: ['100%', '', '35%'],
    paddingLeft: ['0', '', `${theme.spacing.xl}`],
    paddingTop: ['0', '', `${theme.spacing.xxl}`]
  })}
`

const BlogArticle = ({
  data,
  locale,
  selectedSaleId,
  isLastChance,
  enFrSlugsIds,
  enFrCategorySlugIds
}) => {
  const userLocation = useUserLocation()
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')
  const isQuebec = userLocation?.province === 'Quebec'
  const localizedRoutes = useLocalizedRoutes()
  const router = useRouter()
  const localizedDictionary = dictionary[locale]

  if (!router.isFallback && !data) {
    return <NotFoundPage locale={locale} />
  }

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

  const blog = buildPageProps(data.blog, { sales, locale, references })

  const global = buildPageProps(data.global, { sales, locale, references })

  // Localization
  const currentCategory = enFrCategorySlugIds.find(
    (category) => category.slug === router?.query?.category
  )

  const translatedCategoryRoute = enFrCategorySlugIds.find((category) => {
    return locale === 'en'
      ? category.id.includes(currentCategory?.id) &&
          category.slug !== router?.query?.category
      : currentCategory?.id.includes(category.id) &&
          category.slug !== router?.query?.category
  })

  useEffect(() => {
    const articlePageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: page.settings.slug.current
    }

    const translatedArticleRoute = getTranslatedRouteById(articlePageData)

    const redirectArticlePageData = {
      localizedRoutes,
      locale,
      currentRoute: router.asPath,
      redirectRoute: `/blog/${translatedCategoryRoute?.slug}/${translatedArticleRoute[0]?.slug}`
    }

    assignLocalizedRoutes(redirectArticlePageData)
  }, [router])

  useEffect(() => {
    const articlePageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: page.settings.slug.current
    }

    const translatedRoute = getTranslatedRouteById(articlePageData)

    if (isFrench && !window.location.pathname.includes(`/${locale}/`)) {
      router.push(
        `/fr/blog/${translatedCategoryRoute?.slug}/${translatedRoute[0]?.slug}`
      )
    }
  }, [isFrench])

  if (!page) {
    return (
      <Error
        title={`"Blog Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

  const {
    settings: {
      author,
      categories,
      heading,
      slug: { current },
      publishedAt
    },
    content: { body, subcopy },
    hero,
    prefooter,
    readMore: { title = localizedDictionary.readMore }
  } = page || {}

  const formattedDate = getFormattedDate(
    publishedAt,
    { month: 'long', day: 'numeric', year: 'numeric' },
    locale
  )

  const readMoreCardData = page.readMore.moreArticles

  // Get ARTICLE SEO Schema
  const currentUrl = `https://endy.com/${router.locale}/blog/${categories[0]?.slug?.current}/${current}`
  const { blogArticles } = blog

  const blogSchema = useMemo(
    () =>
      Object.keys(blogArticles).length !== 0 &&
      router.pathname &&
      getBlogSchema(global?.settings?.shareGraphic, data.blog, currentUrl, [
        page
      ]),
    [global?.settings?.shareGraphic, blog, currentUrl]
  )

  return (
    <Layout
      page={{ ...page, title: heading }}
      global={global}
      data={data}
      locale={locale}
      sales={sales}
      schema={blogSchema}
    >
      <StyledPage>
        <StyledPageWidth>
          <BlogArticleHero
            category={categories[0]}
            heading={heading}
            slug={current}
            image={hero?.image}
            locale={locale}
          />
          <StyledBlogArticleWrapper>
            <ArticleContent
              formattedPublishedDate={formattedDate}
              current={current}
              heading={heading}
              author={author}
              body={body}
              locale={locale}
            />
            <StyledBlogAside>
              <NewsletterCard locale={locale} />
              {readMoreCardData && (
                <BlogReadMoreCards
                  title={title}
                  blogReadMoreCard={readMoreCardData}
                />
              )}
            </StyledBlogAside>
          </StyledBlogArticleWrapper>

          {prefooter && (
            <BlogPrefooter
              prefooter={prefooter}
              locale={locale}
              sales={sales}
            />
          )}
        </StyledPageWidth>
      </StyledPage>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, preview }) {
  const pageData = await getStaticBlogPage(
    queries.getFormattedTypeQuery(
      'blogArticle',
      locale,
      `{
        "id": _id,
        _updatedAt,
        content,
        hero,
        prefooter,
        settings {
          "author": author->name,
          heading,
          publishedAt,
          _updatedAt,
          slug,
          categories[]->
        },
        seo,
        readMore {
          ...,
          moreArticles[]->
        }
      }`,
      `settings.slug.current == "${params.article}"`
    ),
    locale
  )

  const enFrSlugsIds = await getAllBlogArticleSlugsIds('blogArticle')
  const enFrCategorySlugIds = await getAllDocSlugsIds('category')

  return {
    props: {
      data: pageData,
      locale,
      enFrSlugsIds,
      enFrCategorySlugIds,
      isPreviewMode: preview || false
    }
  }
}

export async function getStaticPaths() {
  const allPages = await getAllBlogArticleSlugs('blogArticle')

  const articlePages = allPages.reduce((accum, article) => {
    if (article.categories !== []) {
      article.categories.map((articleCategory) => {
        accum = [
          ...accum,
          {
            articleSlug: article.slug,
            categorySlug: articleCategory.slug.current,
            __i18n_lang: article.__i18n_lang
          }
        ]
      })
    }

    return accum
  }, [])

  return {
    paths:
      articlePages?.map((page) => {
        return {
          params: {
            category: page.categorySlug,
            article: page.articleSlug
          },
          locale: page.__i18n_lang
        }
      }) || [],
    fallback: false
  }
}

export default BlogArticle
