import React from 'react'
import { buildSrcSet, SanityImageProps } from '../../lib/buildSrcSet'

export interface BadgeImageProps {
  /** Optional alt text for image */
  alt?: string
  /** Sanity object for image */
  image: SanityImageProps
  /** Width of the image */
  width?: string
  /** Width of the image */
  height?: string
}

export const BadgeImage = ({
  alt = '',
  image,
  width = '100%',
  height = 'auto'
}: BadgeImageProps) => {
  return image ? (
    <img width={width} height={height} src={buildSrcSet(image)} alt={alt} />
  ) : null
}
