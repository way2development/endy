import { ImageProps } from '../Image/Image'
import {
  StyledInnerThumb,
  StyledSlideThumbnail,
  StyledSlideThumb
} from './ProductCarousel.styled'
import { Image } from '../Image'

interface CarouselThumbnailProps {
  selected: boolean
  onClick: () => void
  thumbnail: ImageProps
}

export const CarouselThumbnail = ({
  selected,
  onClick,
  thumbnail
}: CarouselThumbnailProps) => {
  return (
    <StyledSlideThumb>
      <StyledInnerThumb
        onClick={onClick}
        selected={selected}
        aria-label='View product slide image'
      >
        <StyledSlideThumbnail selected={selected}>
          <Image
            desktopImage={thumbnail.desktopImage}
            tabletImage={thumbnail.tabletImage}
            mobileImage={thumbnail.mobileImage}
            srcWidths={[110, 110]}
            alt={thumbnail.alt}
          />
        </StyledSlideThumbnail>
      </StyledInnerThumb>
    </StyledSlideThumb>
  )
}
