import { BackgroundImageProps } from '../components/BackgroundImage'
import { ImageProps } from '../components/Image'
import { Button } from '../components/Button'
import { ProductProps } from '../components/ShopModule/ShopModule.types'
import { Locale } from '../types/global-types'
// These interfaces are works in progress as we continue to build out the blog. Please adjust as needed.

export interface blogArticleProps {
  content: JSX.Element | JSX.Element[]
  hero: { image: ImageProps }
  readMore: readMoreProps
  settings: blogArticleSettingsProps
}

interface readMoreProps {
  moreArticles: blogArticleProps[]
}

interface blogArticleSettingsProps {
  author: string
  categories: blogCategoriesProps[]
  heading: string
  publishedAt: string
  slug: { current: string }
}

interface blogCategoriesProps {
  slug: { current: string }
  title: string
  id: string
}

export interface blogHomepageProps {
  featuredArticle: { article: blogArticleProps[] }
  header: {
    heading: string
    navigation: blogNavigationProps[]
  }
  locale: Locale
}
export interface blogNavigationProps {
  label: string
  url: string
  heading: string
}

interface blogNewsletterProps {
  backgroundImage: BackgroundImageProps
  button: React.ElementRef<typeof Button>
  newsletterTitle: string
  subcopy: string
}

interface blogPrefooter {
  primaryProduct: ProductProps
  secondaryProduct: ProductProps
}

export interface BlogFeaturedArticleProps {
  copy: string
  heading: string
  subcopy: string
  primaryBtnLabel: string
  primaryMobileBtnLabel: string
  url: string
  backgroundImage: BackgroundImageProps
  publishedDate: Date
  locale: Locale
}

export interface ContentProps {
  variant?: 'solid-rubine' | 'block-line-gravy'
  label: string
}
export interface BlogArticleCardProps
  extends Omit<blogArticleProps, 'content' | 'readMore' | 'settings'> {
  content: {
    subcopy: string
  }
  readMore: {
    title: string
  }
  settings: {
    author: string
    categories: {
      slug: {
        current: string
      }
      title: string
    }[]
    heading: string
    publishedAt: string
    slug: { current: string }
  }
  _updatedAt: string
  _id: string
}

export interface Blog {
  blogCategories: blogCategoriesProps[]
  blogHomepage: blogHomepageProps
  blogArticles: BlogArticleCardProps[]
}
