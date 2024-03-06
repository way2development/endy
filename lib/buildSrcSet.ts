import { imageBuilder } from './sanity'

export interface SanityImageProps {
  asset: SanityAssetProps
  hotspot?: SanityHotspotProps
}

export interface SanityAssetProps {
  _ref: string
}

export interface SanityHotspotProps {
  height: number
  width: number
  x: number
  y: number
}

export const buildSrcSet = (image: SanityImageProps, width?: number, height?: number) => {
  if (image) {
    let src = imageBuilder.image(image).auto('format').fit('min')

    if(width) {
      src = src.width(width)
    }

    if(height) {
      src = src.height(height)
    }

    return src.url()
  }

  return ''
}
 