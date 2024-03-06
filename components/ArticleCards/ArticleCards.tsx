import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import useEmblaCarousel from 'embla-carousel-react'
import { getScreenWidth } from '../../utils/getScreenWidth'

import { ArticleCard, ArticleCardProps } from './ArticleCard'
import {
  StyledHeader,
  StyledEmblaContainer,
  StyledEmblaViewport,
  StyledDotContainer,
  StyledDotButton,
  StyledArticleCardsContainer,
  StyledArticleCardsCarousel
} from './ArticleCard.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { Locale } from '../../types/global-types'
import { ColorProps } from '../../Interfaces/color'
import dictionary from '../../dictionary.json'

interface ArticleCardsProps {
  /**
   * Must provide lifestyleImage, heading, subcopy, url, and urlLabel
   */
  articleCards?: ArticleCardProps[]
  heading: string
  locale: Locale
  bgColor?: ColorProps
}

interface DotButtonProps {
  selected: boolean
  onClick: () => void
  label: string
}

const DotButton = ({ selected, onClick, label }: DotButtonProps) => (
  <StyledDotButton isSelected={selected} onClick={onClick} aria-label={label} />
)

export const ArticleCards = ({
  articleCards,
  heading,
  locale,
  bgColor
}: ArticleCardsProps) => {
  const screenWidth = getScreenWidth()
  // Custom layout requested for module on Reviews Page
  const router = useRouter()
  const currentQuerySlug = router?.query?.slug
  // Options for Embla
  const [slidesToShow, setSlidesToShow] = useState(1)
  const [isDraggable, setIsDraggable] = useState(true)

  useEffect(() => {
    if (screenWidth >= 1250) {
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

  return (
    <StyledArticleCardsCarousel
      bgColor={bgColor?.hex}
      isReviewsPage={currentQuerySlug}
    >
      <StyledPageWidth>
        <StyledHeader color='gravy' variant='h2'>
          {heading}
        </StyledHeader>
      </StyledPageWidth>
      <StyledArticleCardsContainer>
        <StyledEmblaViewport ref={viewportRef}>
          <StyledEmblaContainer>
            {articleCards?.map((card) => (
              <ArticleCard
                lifestyleImage={card.lifestyleImage}
                key={card.heading}
                heading={card.heading}
                subcopy={card.subcopy}
                url={card.url}
                urlLabel={card.urlLabel}
                locale={locale}
              />
            ))}
          </StyledEmblaContainer>
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
      </StyledArticleCardsContainer>
    </StyledArticleCardsCarousel>
  )
}
