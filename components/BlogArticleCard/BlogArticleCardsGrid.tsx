import React from 'react'

import { BlogArticleCard } from './BlogArticleCard'
import { Locale } from '../../types/global-types'
import { Grid } from '../Grid'
import { StyledGridContainer, StyledPagination } from './BlogArticleCard.styled'
import { BlogArticleCardProps } from 'Interfaces/blog'

interface BlogArticleCardsGridProps {
  articles: BlogArticleCardProps[]
  locale: Locale
}

export const BlogArticleCardsGrid = ({
  articles,
  locale
}: BlogArticleCardsGridProps) => {
  return (
    <StyledGridContainer id='blog-articles'>
      <Grid
        rowGap={[]}
        columnGap={['0.5rem', '1rem', '3rem']}
        columnRatio={['1', '1:1', '1:1']}
      >
        {articles.length > 0 && (
          <StyledPagination
            locale={locale}
            totalResults={articles.length}
            resultsPerPage={4}
            containerId={'blog-articles'}
            indexOfLastResult={articles.length - 1}
            range={3}
            rangeLeft={1}
            rangeRight={5}
            showIndexes={false}
            currentResults={articles}
            dynamicPadding={'0'}
          >
            {articles.map((article) => (
              <BlogArticleCard
                key={article._id}
                lifestyleImage={article?.hero?.image}
                heading={article.settings.heading}
                subcopy={article.content.subcopy}
                publishedDate={article.settings.publishedAt}
                url={`/blog/${article?.settings?.categories[0]?.slug?.current}/${article?.settings?.slug?.current}`}
                locale={locale}
              />
            ))}
          </StyledPagination>
        )}
      </Grid>
    </StyledGridContainer>
  )
}
