import React from 'react'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Grid } from '../Grid'
import { Image, ImageProps } from '../Image'
import { PromoPill } from '../PromoPill'
import { Text } from '../Text'
import { SaleProps } from '../../Interfaces/sales'
import {
  StyledWrapper,
  StyledHeading,
  StyledBadgeContainer,
  StyledImageContainer,
  StyledHeroContainer,
  StyledComparisonBadgeWrapper,
  StyledMicrocopy,
  StyledMobileMicrocopyContainer
} from './CollectionsHero.styled'

import { StyledProductBadge } from '../../styles/global.styled'
import { StyledSemibold, StyledPageWidth } from '../../styles/global.styled'
import { Locale } from '../../types/global-types'

interface ComparisonBadgesProps {
  key: string
  heading: string
  badgeImage: BadgeImageProps
}

interface CollectionsHeroProps {
  /** Heading text */
  heading: string
  /** Subcopy text*/
  subcopy: string
  /** An array of product badges */
  comparisonBadges?: ComparisonBadgesProps[]
  /** Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** Lifestyle Image Assets */
  lifestyleImage: ImageProps
  sales?: SaleProps
  locale: Locale
}

const ComparisonBadge = ({ heading, badgeImage }: ComparisonBadgesProps) => {
  return (
    <StyledBadgeContainer>
      <StyledProductBadge>
        {badgeImage && <BadgeImage image={badgeImage.image} alt='' />}
      </StyledProductBadge>
      <Text color={'gravy80'} variant={'smallBody'}>
        <StyledSemibold>{heading}</StyledSemibold>
      </Text>
    </StyledBadgeContainer>
  )
}

export const CollectionsHero = ({
  heading,
  subcopy,
  comparisonBadges,
  backgroundImage,
  lifestyleImage,
  sales,
  locale
}: CollectionsHeroProps) => {
  const salesCollectionsHero = sales?.heros?.collectionsHero
  const visibleBackgroundImage = salesCollectionsHero
    ? salesCollectionsHero.backgroundImage
    : backgroundImage
  const backgroundImageProps = {
    srcHeights: [633, 500, 330],
    mobileImage: visibleBackgroundImage?.mobileImage,
    tabletImage: visibleBackgroundImage?.tabletImage,
    desktopImage: visibleBackgroundImage?.desktopImage
  }

  const visibleLifestyleImage = salesCollectionsHero
    ? salesCollectionsHero.lifestyleImage
    : lifestyleImage
  const lifestyleImageProps = {
    srcWidths: [767, 1024, 594],
    mobileImage: visibleLifestyleImage?.mobileImage,
    tabletImage: visibleLifestyleImage?.tabletImage,
    desktopImage: visibleLifestyleImage?.desktopImage,
    alt: ''
  }

  const visiblePillLabel = sales?.isLastChance
    ? sales.lastChance?.collections?.heroPillLabel
    : salesCollectionsHero?.pillLabel

  return (
    <StyledHeroContainer>
      <BackgroundImage {...backgroundImageProps}>
        <StyledPageWidth>
          <Grid
            columnRatio={['1', '1', '1:1']}
            rowGap={['0']}
            columnGap={['0']}
          >
            <StyledWrapper hasPromoPill={visiblePillLabel ? true : false}>
              {visiblePillLabel && (
                <PromoPill
                  promoCopy={visiblePillLabel}
                  variant='gravy'
                  locale={locale}
                />
              )}
              <StyledHeading color={'gravy'} variant={'h1'}>
                {salesCollectionsHero?.heading
                  ? salesCollectionsHero.heading
                  : heading}
              </StyledHeading>
              <Text color={'gravy'} variant={'mediumBody'}>
                {salesCollectionsHero?.subcopy
                  ? salesCollectionsHero.subcopy
                  : subcopy}
              </Text>
              {comparisonBadges && (
                <StyledComparisonBadgeWrapper>
                  {comparisonBadges?.map((badge) => (
                    <ComparisonBadge
                      key={badge.heading}
                      heading={badge.heading}
                      badgeImage={badge.badgeImage}
                    />
                  ))}
                </StyledComparisonBadgeWrapper>
              )}
              <StyledMicrocopy color='gravy80' variant='micro'>
                {salesCollectionsHero?.microcopy}
              </StyledMicrocopy>
            </StyledWrapper>
            <StyledImageContainer>
              <Image {...lifestyleImageProps} />
            </StyledImageContainer>
            {salesCollectionsHero?.microcopy && (
              <StyledMobileMicrocopyContainer>
                <StyledMicrocopy color='white' variant='micro'>
                  {salesCollectionsHero?.microcopy}
                </StyledMicrocopy>
              </StyledMobileMicrocopyContainer>
            )}
          </Grid>
        </StyledPageWidth>
      </BackgroundImage>
    </StyledHeroContainer>
  )
}
