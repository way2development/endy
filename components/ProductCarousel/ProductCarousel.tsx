import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselThumbnail as Thumbnail } from './CarouselThumbnail'
import { PrevButton, NextButton } from './CarouselButtons'
import { Image } from '../Image'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import {
  StyledCarousel,
  StyledSlides,
  StyledViewport,
  StyledInnerCarousel,
  StyledSlide,
  StyledSlideInner,
  StyledSlideImg,
  StyledThumbPreview,
  StyledInnerThumbPreview
} from './ProductCarousel.styled'
import { ImageProps } from '../Image/Image'
import {
  StyledBadgeBottomLeft,
  StyledBadgeTopRight
} from '../../styles/global.styled'

interface ProductCarouselProps {
  /** Images and alt text from CMS */
  images?: ImageProps[]
  /** Optional badge images and alt text */
  badge?: BadgeImageProps
  badgeSecondary?: BadgeImageProps
  /** Option to change chevron icon */
  chevronIcon?: string
}

const createSlides = (arrLength: number) => Array.from(Array(arrLength).keys())

export const ProductCarousel = ({
  images,
  badge,
  badgeSecondary,
  chevronIcon
}: ProductCarouselProps) => {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    skipSnaps: false
  })

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs) embla.scrollTo(index)
    },
    [embla, emblaThumbs]
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  return (
    <StyledCarousel>
      <StyledSlides>
        {badge && (
          <StyledBadgeTopRight>
            <BadgeImage image={badge.image} alt={badge.alt}></BadgeImage>
          </StyledBadgeTopRight>
        )}
        {badgeSecondary && (
          <StyledBadgeBottomLeft>
            {badgeSecondary &&
              (selectedIndex === 0 ? (
                <BadgeImage
                  image={badgeSecondary?.image}
                  alt={badgeSecondary?.alt}
                ></BadgeImage>
              ) : null)}
          </StyledBadgeBottomLeft>
        )}
        <StyledViewport ref={mainViewportRef}>
          <StyledInnerCarousel>
            {images &&
              createSlides(images.length).map((slide) => {
                return (
                  <StyledSlide key={slide}>
                    <StyledSlideInner>
                      <StyledSlideImg>
                        <Image
                          desktopImage={images[slide].desktopImage}
                          tabletImage={images[slide].tabletImage}
                          mobileImage={images[slide].mobileImage}
                          srcWidths={[768, 1024]}
                          alt={images[slide].alt}
                        />
                      </StyledSlideImg>
                    </StyledSlideInner>
                  </StyledSlide>
                )
              })}
          </StyledInnerCarousel>
          <PrevButton
            onClick={scrollPrev}
            enabled={prevBtnEnabled}
            chevronIcon={chevronIcon}
          />
          <NextButton
            onClick={scrollNext}
            enabled={nextBtnEnabled}
            chevronIcon={chevronIcon}
          />
        </StyledViewport>
      </StyledSlides>

      <StyledThumbPreview>
        <StyledViewport ref={thumbViewportRef}>
          <StyledInnerThumbPreview>
            {images &&
              createSlides(images.length).map((slide) => {
                return (
                  <Thumbnail
                    onClick={() => onThumbClick(slide)}
                    selected={slide === selectedIndex}
                    thumbnail={images[slide]}
                    key={slide}
                  />
                )
              })}
          </StyledInnerThumbPreview>
        </StyledViewport>
      </StyledThumbPreview>
    </StyledCarousel>
  )
}
