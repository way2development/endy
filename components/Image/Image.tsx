import React from 'react'
import { buildSrcSet, SanityImageProps } from '../../lib/buildSrcSet'

import { StyledPicture, StyledImage } from './Image.styled'

export interface ImageProps {
  /** Optional alt text for image */
  alt?: string
  /** Optional Sanity object for mobile background image (required field when using it in code) */
  mobileImage: SanityImageProps
  /** Optional Sanity object for tablet background image (required field when using it in code) */
  tabletImage: SanityImageProps
  /** Sanity object for desktop background image */
  desktopImage: SanityImageProps
  /** mobile and desktop source width of the image used to fetch the right image size */
  srcWidths: number[]
}

const srcsetMap = [767, 1024]

export const Image = ({
  mobileImage,
  tabletImage,
  desktopImage,
  alt = '',
  srcWidths
}: ImageProps) => {
  const Picture = () => {
    return (
      <StyledPicture>
        <source
          key={srcsetMap[0]}
          media={`(max-width: ${srcsetMap[0]}px)`}
          srcSet={buildSrcSet(
            mobileImage || tabletImage || desktopImage,
            srcWidths[0]
          )}
        />
        <source
          key={srcsetMap[1]}
          media={`(max-width: ${srcsetMap[1]}px)`}
          srcSet={buildSrcSet(tabletImage || desktopImage, srcWidths[1])}
        />
        <StyledImage
          width='100%'
          height='auto'
          src={buildSrcSet(desktopImage)}
          alt={alt}
        />
      </StyledPicture>
    )
  }

  return <Picture />
}
