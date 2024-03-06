import { Grid } from '../Grid'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'
import { CtaLink } from '../CtaLink'
import { Text } from '../Text'
import { PromoPill } from '../PromoPill'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { SaleCountdownTimer } from '../SaleCountdownTimer'
import { SaleProps } from '../../Interfaces/sales'

import { Locale } from '../../types/global-types'

import {
  StyledHeroContainer,
  StyledLifeStyleImgContainer,
  StyledTextContainer,
  StyledCountdownTimer,
  StyledSubcopyImageContainer,
  StyledSubcopy,
  StyledMicrocopy,
  StyledBadgeVariant,
  StyledWrapper
} from './MlpHero.styled'

interface MlpHeroProps {
  /** Heading text */
  heading: string
  /** Button CTA and Link */
  cta?: React.ElementRef<typeof CtaLink>[]
  /** Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** Lifestyle Image Assets */
  lifestyleImage: ImageProps
  /** Badge on Lifestyle Image */
  badgeImage?: BadgeImageProps
  badgeVariant?: string
  /** * Subcopy Image (Optional) */
  subcopyTextImage?: ImageProps
  sales?: SaleProps
  locale: Locale
}

export const MlpHero = ({
  heading,
  cta,
  backgroundImage,
  lifestyleImage,
  badgeImage,
  badgeVariant = 'Circle',
  subcopyTextImage,
  sales,
  locale
}: MlpHeroProps) => {
  const salesMlpHero = sales?.heros?.mlpHero
  const visibleBackgroundImage = salesMlpHero
    ? salesMlpHero.backgroundImage
    : backgroundImage
  const visibleLifestyleImage = salesMlpHero
    ? salesMlpHero.lifestyleImage
    : lifestyleImage
  const salesBadgeImage = sales?.isLastChance
    ? sales.lastChance?.mlpHero?.badgeImage
    : salesMlpHero?.badgeImage
  const visibleBadgeImage = salesMlpHero ? salesBadgeImage : badgeImage
  const visibleSubcopyTextImage = salesMlpHero
    ? salesMlpHero.subcopyTextImage
    : null

  const visiblePillLabel = sales?.isLastChance
    ? sales.lastChance?.mlpHero?.pillLabel
    : salesMlpHero?.pillLabel

  // badgeVariant defaults to 'Circle' unless author chooses 'Pill' or 'Wide Pill' in Sanity
  const selectedBadgeVariant = salesMlpHero
    ? salesMlpHero.badgeVariant
    : badgeVariant

  return (
    <StyledHeroContainer>
      <BackgroundImage
        srcHeights={[767, 800, 530]}
        mobileImage={visibleBackgroundImage?.mobileImage}
        tabletImage={visibleBackgroundImage.tabletImage}
        desktopImage={visibleBackgroundImage?.desktopImage}
      >
        <StyledWrapper>
          <Grid
            columnRatio={['1', '1', '1:2']}
            rowGap={['0']}
            columnGap={['0']}
          >
            <StyledTextContainer
              hasSubcopy={salesMlpHero?.subcopy !== undefined}
            >
              <div>
                {visiblePillLabel && sales && (
                  <PromoPill
                    promoCopy={visiblePillLabel}
                    variant={sales?.textColor}
                    locale={locale}
                  />
                )}
                <Text color={sales ? sales.textColor : 'gravy'} variant={'h1'}>
                  {salesMlpHero ? salesMlpHero.heading : heading}
                </Text>
                {salesMlpHero?.subcopyTextImage && visibleSubcopyTextImage && (
                  <StyledSubcopyImageContainer>
                    <Image
                      desktopImage={visibleSubcopyTextImage.desktopImage}
                      tabletImage={visibleSubcopyTextImage.tabletImage}
                      mobileImage={visibleSubcopyTextImage.mobileImage}
                      alt={subcopyTextImage?.alt}
                      srcWidths={[768, 1024]}
                    />
                  </StyledSubcopyImageContainer>
                )}
                {salesMlpHero?.subcopy && sales && (
                  <StyledSubcopy hasCountdown={!!sales?.isLastChance}>
                    <Text color={sales?.textColor} variant={'largeBody'}>
                      {salesMlpHero.subcopy}
                    </Text>
                  </StyledSubcopy>
                )}
                {sales?.isLastChance && (
                  <StyledCountdownTimer>
                    <Text
                      color={sales?.textColor}
                      variant={'mediumBody'}
                      element={'div'}
                    >
                      <SaleCountdownTimer
                        heading={sales.countdownTimeLabel}
                        sales={sales}
                        locale={locale}
                      />
                    </Text>
                  </StyledCountdownTimer>
                )}
                {salesMlpHero ? salesMlpHero.cta : cta}
                {salesMlpHero?.microcopy && sales && (
                  <StyledMicrocopy color={sales?.textColor} variant='micro'>
                    {salesMlpHero.microcopy}
                  </StyledMicrocopy>
                )}
              </div>
            </StyledTextContainer>

            <StyledLifeStyleImgContainer>
              <Image
                srcWidths={[768, 910]}
                desktopImage={visibleLifestyleImage?.desktopImage}
                tabletImage={visibleLifestyleImage?.tabletImage}
                mobileImage={visibleLifestyleImage?.mobileImage}
                alt=''
              />
              {visibleBadgeImage && (
                <StyledBadgeVariant badgeVariant={selectedBadgeVariant}>
                  <BadgeImage
                    image={visibleBadgeImage.image}
                    alt={visibleBadgeImage.alt}
                  />
                </StyledBadgeVariant>
              )}
            </StyledLifeStyleImgContainer>
          </Grid>
        </StyledWrapper>
      </BackgroundImage>
    </StyledHeroContainer>
  )
}
