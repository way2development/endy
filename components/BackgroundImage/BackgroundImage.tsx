import React from 'react'
import styled from 'styled-components'

import { buildSrcSet, SanityImageProps } from '../../lib/buildSrcSet'
import { mq } from '../../styles/theme'

export interface BackgroundImageProps {
  /** Optional Sanity object for mobile background image (required field when using it in code) */
  mobileImage: SanityImageProps
  /** Optional Sanity object for tablet background image (required field when using it in code) */
  tabletImage: SanityImageProps
  /** Sanity object for desktop background image */
  desktopImage: SanityImageProps
  /** source height of the background image used to fetch the right image size across 3 breakpoints (excluding the largest breakpoint) */
  srcHeights: number[]
  /** source width of the background image used to fetch the right image size across 3 breakpoints (excluding the largest breakpoint) */
  srcWidths?: number[]
}

const defaultSrcWidths = [767, 1024, 1439]

export const StyledImageContainer = styled.div(
  ({
    mobileImage,
    tabletImage,
    desktopImage,
    srcHeights,
    srcWidths = defaultSrcWidths
  }: BackgroundImageProps) => {
    return mq({
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%',
      backgroundImage: [
        `url(${buildSrcSet(
          mobileImage || tabletImage || desktopImage,
          srcWidths[0] * 2,
          srcHeights[0] * 2
        )})`,
        `url(${buildSrcSet(
          tabletImage || desktopImage,
          srcWidths[1] * 2,
          srcHeights[1] * 2
        )})`,
        `url(${buildSrcSet(
          desktopImage,
          srcWidths[2] * 2,
          srcHeights[2] * 2
        )})`,
        `url(${buildSrcSet(desktopImage)})`
      ]
    })
  }
)

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  mobileImage,
  tabletImage,
  desktopImage,
  srcHeights,
  srcWidths = defaultSrcWidths,
  children
}) => {
  return (
    <StyledImageContainer
      mobileImage={mobileImage}
      tabletImage={tabletImage}
      desktopImage={desktopImage}
      srcHeights={srcHeights}
      srcWidths={srcWidths}
    >
      {children}
    </StyledImageContainer>
  )
}
