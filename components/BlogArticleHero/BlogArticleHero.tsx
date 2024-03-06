import React from 'react'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { Image, ImageProps } from '../Image'
import { Text } from '../Text'
import { CtaLink } from '../CtaLink'
import { StyledSemibold } from '../../styles/global.styled'
import {
  StyledWrapper,
  StyledImageContainer,
  StyledNavList,
  StyledNavListItem
} from './BlogArticleHero.styled'

interface BlogArticleHeroProps {
  category: { title: string; slug: { current: string } }
  heading: string
  slug: string
  locale: Locale
  image: ImageProps
}

export const BlogArticleHero = ({
  category,
  heading,
  slug,
  locale,
  image
}: BlogArticleHeroProps) => {
  const localizedDictionary = dictionary[locale]

  const lifestyleImageProps = {
    srcHeights: [160, 329, 514],
    // TODO: edit srcWidth values to match image exports
    srcWidths: [767, 1024, 1200],
    desktopImage: image?.desktopImage,
    tabletImage: image?.tabletImage,
    mobileImage: image?.mobileImage
  }
  // TODO: update breadcrumb links in return statement when blog v2 is ready
  return (
    <StyledWrapper>
      <nav aria-label={localizedDictionary.breadcrumb}>
        <StyledNavList isBreadcrumb={true}>
          <StyledNavListItem>
            <Text color='gravy' variant='largeBody'>
              <CtaLink
                url='/blog'
                label={localizedDictionary.theEndyBlog}
                variant='inline'
              />
            </Text>
          </StyledNavListItem>
          <StyledNavListItem>
            <Text color='gravy' variant='largeBody'>
              <CtaLink
                url={`/blog/${category.slug.current}`}
                label={category.title}
                variant='inline'
              />
            </Text>
          </StyledNavListItem>
          <StyledNavListItem>
            <Text color='gravy' variant='largeBody'>
              <StyledSemibold>
                <CtaLink
                  url={`/blog/${category.slug.current}/${slug}`}
                  label={heading}
                  variant='inline'
                />
              </StyledSemibold>
            </Text>
          </StyledNavListItem>
        </StyledNavList>
      </nav>
      <StyledImageContainer>
        <Image {...lifestyleImageProps}></Image>
      </StyledImageContainer>
    </StyledWrapper>
  )
}
