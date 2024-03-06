import React, { useState, useEffect, useCallback } from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import { getScreenWidth } from '../../utils/getScreenWidth'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { CtaLinkProps } from '../CtaLink'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'
import { StyledPageWidth } from '../../styles/global.styled'
import { FeaturedReviewsCard } from '../FeaturedReviewsCard'

import {
  StyledDotButton,
  StyledCarouselCard,
  StyledDotContainer,
  StyledEmblaContainer,
  StyledEmblaViewport,
  StyledFeaturedCarousel,
  StyledFeaturedReviewContainer,
  StyledHeading,
  StyledReviewImage,
  StyledSocialHandle,
  StyledReviewsContainer,
  StyledCtaContainer
} from './FeaturedReviews.styled'

export interface reviewCardProps {
  subcopy: string
  pillLabel?: string
  heading?: string
  name?: string
  location?: string
  lifestyleImage?: ImageProps
  socialHandle?: string
}

interface FeaturedReviewsProps {
  heading: string
  reviews: reviewCardProps[]
  cta?: CtaLinkProps
  backgroundImage: BackgroundImageProps
  bgColor?: { hex: string }
  locale: Locale
}

interface DotButtonProps {
  selected: boolean
  onClick: () => void
  label: string
}

const DotButton = ({ selected, onClick, label }: DotButtonProps) => (
  <StyledDotButton isSelected={selected} onClick={onClick} aria-label={label} />
)

export const FeaturedReviews = ({
  heading,
  reviews,
  cta,
  backgroundImage,
  bgColor,
  locale
}: FeaturedReviewsProps) => {
  const screenWidth = getScreenWidth()

  // Options for Embla
  const [slidesToShow, setSlidesToShow] = useState(1)
  const [isDraggable, setIsDraggable] = useState(true)

  useEffect(() => {
    if (screenWidth >= 1025) {
      setSlidesToShow(3)
      setIsDraggable(false)
    } else if (screenWidth >= 768) {
      setSlidesToShow(2)
      setIsDraggable(true)
    } else {
      setSlidesToShow(1)
      setIsDraggable(true)
    }
  }, [screenWidth])

  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: slidesToShow,
    skipSnaps: false
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList() as never)
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect, slidesToShow])

  const reviewCard =
    reviews.length > 0 &&
    reviews.map((review) => {
      return (
        <StyledCarouselCard key={review.subcopy}>
          {review.lifestyleImage && (
            <StyledReviewImage>
              <Image
                srcWidths={[300, 378]}
                desktopImage={review.lifestyleImage.desktopImage}
                tabletImage={review.lifestyleImage.tabletImage}
                mobileImage={review.lifestyleImage.mobileImage}
                alt={review.lifestyleImage.alt}
              />
              {review.socialHandle && (
                <StyledSocialHandle
                  variant='smallBody'
                  color='gravy'
                  element='span'
                >
                  {review.socialHandle}
                </StyledSocialHandle>
              )}
            </StyledReviewImage>
          )}
          <StyledFeaturedReviewContainer>
            <FeaturedReviewsCard
              pillLabel={review.pillLabel}
              heading={review.heading}
              subcopy={review.subcopy}
              name={review.name}
              location={review.location}
              locale={locale}
            />
          </StyledFeaturedReviewContainer>
        </StyledCarouselCard>
      )
    })

  return (
    <StyledFeaturedCarousel bgColor={bgColor}>
      <BackgroundImage
        srcHeights={[600, 600, 715]}
        mobileImage={backgroundImage?.mobileImage}
        tabletImage={backgroundImage?.tabletImage}
        desktopImage={backgroundImage?.desktopImage}
      >
        <StyledPageWidth>
          <StyledHeading variant='h2' color='gravy'>
            {heading}
          </StyledHeading>
        </StyledPageWidth>
        <StyledReviewsContainer>
          <StyledEmblaViewport ref={viewportRef}>
            <StyledEmblaContainer>{reviewCard}</StyledEmblaContainer>
          </StyledEmblaViewport>

          <StyledDotContainer>
            {scrollSnaps.length > 1 &&
              scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => scrollTo(index)}
                  label={dictionary[locale].sliderDotButton}
                />
              ))}
          </StyledDotContainer>
          {cta && <StyledCtaContainer>{cta}</StyledCtaContainer>}
        </StyledReviewsContainer>
      </BackgroundImage>
    </StyledFeaturedCarousel>
  )
}
