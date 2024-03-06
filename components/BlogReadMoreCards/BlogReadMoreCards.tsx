import { BlogReadMoreCard } from './BlogReadMoreCard'
import { Locale } from '../../types/global-types'
import {
  StyledHeading,
  StyledBlogReadMoreCardContainer
} from './BlogReadMoreCards.styled'
import { blogArticleProps } from '../../Interfaces/blog'

interface BlogReadMoreCardsProps {
  blogReadMoreCard: blogArticleProps[]
  title: string
  locale: Locale
}

export const BlogReadMoreCards = ({
  blogReadMoreCard,
  title,
  locale
}: BlogReadMoreCardsProps) => {
  // TODO: (Corey) clean up the return statement by incorporating object destructuring
  return (
    <>
      <StyledHeading element='h2' color='gravy' variant='h4'>
        {title}
      </StyledHeading>
      <StyledBlogReadMoreCardContainer>
        {blogReadMoreCard?.map((card) => (
          <BlogReadMoreCard
            key={card?.settings.slug.current}
            image={{
              desktopImage: card?.hero?.image?.desktopImage,
              tabletImage: card?.hero?.image?.tabletImage,
              mobileImage: card?.hero?.image?.mobileImage,
              srcWidths: [767, 1024, 1200]
            }}
            heading={card?.settings.heading}
            url={card?.settings.slug.current}
            category={card?.settings.categories[0].slug.current}
            publishedAt={card?.settings.publishedAt}
            locale={locale}
          />
        ))}
      </StyledBlogReadMoreCardContainer>
    </>
  )
}
