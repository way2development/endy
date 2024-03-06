import React from 'react'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'
import {
  StyledWrapper,
  StyledImageContainer,
  StyledContentContainer,
  StyledText,
  StyledTextContainer
} from './BlogSellingCard.styled'
import { theme } from '../../styles/theme'

export type BlogSellingCardVariants = 'Left' | 'Right'

export interface BlogSellingCardProps {
  variant: BlogSellingCardVariants
  lifestyleImage: ImageProps
  backgroundImage: BackgroundImageProps
  copy: string
  backgroundColor: { hex: string }
}

export const BlogSellingCard = ({
  variant = 'Left',
  lifestyleImage,
  backgroundImage,
  backgroundColor,
  copy
}: BlogSellingCardProps) => {
  const lifestyleImageProps = {
    srcWidths: [375, 375, 375],
    mobileImage: lifestyleImage?.mobileImage,
    tabletImage: lifestyleImage?.tabletImage,
    desktopImage: lifestyleImage?.desktopImage,
    alt: ''
  }

  const backgroundImageProps = {
    srcHeights: [450, 645, 890],
    desktopImage: backgroundImage?.desktopImage,
    tabletImage: backgroundImage?.tabletImage,
    mobileImage: backgroundImage?.mobileImage
  }

  return (
    <StyledWrapper variant={variant}>
      <StyledImageContainer>
        <Image {...lifestyleImageProps} />
      </StyledImageContainer>
      <StyledContentContainer
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor.hex
            : `${theme.colors.white}`
        }}
      >
        <BackgroundImage {...backgroundImageProps}>
          <StyledTextContainer>
            <StyledText variant={'mediumBody'} color={'gravy'} element={'p'}>
              {copy}
            </StyledText>
          </StyledTextContainer>
        </BackgroundImage>
      </StyledContentContainer>
    </StyledWrapper>
  )
}
