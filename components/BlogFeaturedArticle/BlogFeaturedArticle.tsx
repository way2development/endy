import React from 'react'

import { BackgroundImage } from '../BackgroundImage'
import { BlogFeaturedArticleProps, ContentProps } from '../../Interfaces/blog'
import { CtaLink } from '../CtaLink'
import { Image } from '../Image'
import {
  StyledContentContainer,
  StyledContainerWrap,
  StyledCtaLinkDiv,
  StyledImageContainer,
  StyledWrapper,
  StyledSubCopyText,
  StyledHeaderText
} from './BlogFeaturedArticle.styled'
import { StyledFormattedDate } from '../BlogArticleCard/BlogArticleCard.styled'
import { getFormattedDate } from '../../lib/time'

export const BlogFeaturedArticle = ({
  backgroundImage,
  heading,
  subcopy,
  primaryBtnLabel,
  primaryMobileBtnLabel,
  url,
  publishedDate,
  locale
}: BlogFeaturedArticleProps) => {
  const backgroundImageProps = {
    srcHeights: [450, 645, 890],
    desktopImage: backgroundImage?.desktopImage,
    tabletImage: backgroundImage?.tabletImage,
    mobileImage: backgroundImage?.mobileImage
  }

  const formattedDate = getFormattedDate(
    publishedDate,
    { month: 'long', day: 'numeric', year: 'numeric' },
    locale
  )

  const BlogContent = ({ variant = 'solid-rubine', label }: ContentProps) => (
    <>
      <StyledHeaderText color='gravy' variant='h2'>
        {heading}
      </StyledHeaderText>

      <StyledFormattedDate variant='smallBody' color='gravy'>
        {formattedDate}
      </StyledFormattedDate>

      <StyledSubCopyText color='gravy' variant='mediumBody'>
        {subcopy}
      </StyledSubCopyText>

      <StyledCtaLinkDiv>
        <CtaLink label={label} url={url} variant={variant} />
      </StyledCtaLinkDiv>
    </>
  )

  return (
    <>
      <StyledImageContainer>
        <Image {...backgroundImageProps} srcWidths={[768, 1024]} />
        <BlogContent variant='block-line-gravy' label={primaryMobileBtnLabel} />
      </StyledImageContainer>

      <StyledWrapper>
        <BackgroundImage {...backgroundImageProps} srcWidths={[375, 768, 1024]}>
          <StyledContentContainer>
            <StyledContainerWrap>
              <BlogContent label={primaryBtnLabel} />
            </StyledContainerWrap>
          </StyledContentContainer>
        </BackgroundImage>
      </StyledWrapper>
    </>
  )
}
