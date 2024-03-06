import { SaleContent } from './SaleContent'
import { HomepageHero } from '../HomepageHero'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { ImageProps } from '../Image'
import { CtaLinkProps } from '../CtaLink'
import { Grid } from '../Grid'

import {
  StyledSplitScreenContainer,
  StyledInnerWrapper,
  StyledOneBlockContainer,
  StyledImgContainer,
  StyledMicrocopy,
  StyledBadgeVariant
} from './SalesHomepageHero.styled'

import { StyledPageWidth } from '../../styles/global.styled'
import { SaleProps } from '../../Interfaces/sales'
import { Locale } from 'types/global-types'

export type SaleLayoutVariants =
  | 'Default/Sale Split Screen V1'
  | 'Default/Sale Split Screen V2'
  | 'Sale/Sale Split Screen'
  | 'One Block Fade'
  | 'One Block'

export interface SaleElementsProps {
  /** * Promo pill above heading */
  pillLabel?: string
  /** * Heading copy */
  heading: string
  secondaryHeading: SaleProps
  /** * Heading Image (Optional) */
  headingTextImage: ImageProps
  /** * Subcopy text or alt text if heading is an image */
  subcopy: string
  /** * Subcopy Image (Optional) */
  subcopyTextImage?: ImageProps
  /** * Terms and conditions copy */
  microcopy?: string
  /** * Button CTA and Link */
  cta: CtaLinkProps
  asideCtaLabel: string
  sales?: SaleProps
  locale: Locale
  themeColor?: string
  textColor?: 'gravy' | 'white'
  gradientColor?: string
  asideTextColor?: 'gravy' | 'white'
}

interface AsideProps {
  url: string
  label: string
  variant: SaleLayoutVariants
  headingTextImage: ImageProps
}

interface SalesHomepageHeroProps extends SaleElementsProps {
  /** * Sale Design Template */
  variant: SaleLayoutVariants
  /** * Lifestyle Image Assets */
  lifestyleImage: BackgroundImageProps
  /** * Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** * Badge on Lifestyle Image */
  badgeImage: BadgeImageProps
  /** * Badge Variant */
  badgeVariant?: string
  /** * Badge Position*/
  badgePosition: string
  /** * Link for aside sale column */
  asideLink: AsideProps
}

export const SalesHomepageHero = ({
  variant,
  heading,
  secondaryHeading,
  headingTextImage,
  subcopy,
  subcopyTextImage,
  microcopy,
  pillLabel,
  cta,
  asideCtaLabel,
  lifestyleImage,
  backgroundImage,
  badgeImage,
  badgeVariant,
  badgePosition,
  sales,
  locale,
  gradientColor,
  asideTextColor
}: SalesHomepageHeroProps) => {
  const saleContentProps = {
    pillLabel,
    heading,
    secondaryHeading,
    headingTextImage,
    subcopy,
    subcopyTextImage,
    microcopy,
    cta,
    asideCtaLabel,
    sales,
    locale
  }

  const backgroundImageProps = {
    srcHeights: [477, 520, 838],
    desktopImage: backgroundImage?.desktopImage,
    tabletImage: backgroundImage?.tabletImage,
    mobileImage: backgroundImage?.mobileImage
  }

  const AsideLinkProps = {
    url: '/promos',
    label: asideCtaLabel,
    variant: variant
  }

  const visibleBadge = sales?.isLastChance
    ? sales.lastChance?.homepageHero?.badgeImage
    : badgeImage

  return (
    <>
      {(variant === 'Default/Sale Split Screen V1' ||
        variant === 'Default/Sale Split Screen V2') && (
        <HomepageHero
          backgroundImage={backgroundImage}
          cta={cta}
          asideCtaLabel={asideCtaLabel}
          heading={heading}
          secondaryHeading={secondaryHeading}
          headingTextImage={headingTextImage}
          lifestyleImage={lifestyleImage}
          asideLink={AsideLinkProps}
          sales={sales}
          pillLabel={pillLabel}
          variant={variant}
          gradientColor={gradientColor}
          asideTextColor={asideTextColor}
          locale={locale}
        />
      )}
      {variant === 'Sale/Sale Split Screen' && (
        <StyledSplitScreenContainer>
          <Grid
            columnGap={['0']}
            columnRatio={['1', '1', '1:1']}
            rowGap={['0']}
          >
            <BackgroundImage
              srcWidths={[767, 768, 1200]}
              srcHeights={[477, 520, 647]}
              desktopImage={backgroundImage?.desktopImage}
              tabletImage={backgroundImage?.tabletImage}
              mobileImage={backgroundImage?.mobileImage}
            >
              <StyledInnerWrapper>
                <SaleContent
                  {...saleContentProps}
                  variant={variant}
                  locale={locale}
                />
                {microcopy && sales && (
                  <StyledMicrocopy variant='micro' color={sales.textColor}>
                    {' '}
                    {microcopy}
                  </StyledMicrocopy>
                )}
              </StyledInnerWrapper>
            </BackgroundImage>
            <StyledImgContainer>
              <BackgroundImage
                desktopImage={lifestyleImage?.desktopImage}
                tabletImage={lifestyleImage?.tabletImage}
                mobileImage={lifestyleImage?.mobileImage}
                srcHeights={[375, 450, 645]}
                srcWidths={[767, 768, 720]}
              />
              {visibleBadge && (
                <StyledBadgeVariant
                  badgeVariant={badgeVariant}
                  position={badgePosition}
                >
                  <BadgeImage
                    image={visibleBadge.image}
                    alt={visibleBadge.alt}
                  />
                </StyledBadgeVariant>
              )}
            </StyledImgContainer>
          </Grid>
        </StyledSplitScreenContainer>
      )}

      {(variant === 'One Block Fade' || variant === 'One Block') && (
        <StyledOneBlockContainer variant={variant}>
          <BackgroundImage {...backgroundImageProps}>
            <SaleContent {...saleContentProps} locale={locale} />
            <StyledPageWidth>
              <StyledImgContainer>
                <BackgroundImage
                  srcHeights={
                    variant === 'One Block Fade'
                      ? [334, 312, 520]
                      : [240, 284, 556]
                  }
                  srcWidths={
                    variant === 'One Block Fade'
                      ? [375, 617, 1200]
                      : [375, 617, 1200]
                  }
                  desktopImage={lifestyleImage?.desktopImage}
                  tabletImage={lifestyleImage?.tabletImage}
                  mobileImage={lifestyleImage?.mobileImage}
                />
                {visibleBadge && (
                  <StyledBadgeVariant
                    badgeVariant={badgeVariant}
                    position={badgePosition}
                  >
                    <BadgeImage
                      image={visibleBadge.image}
                      alt={visibleBadge.alt}
                    />
                  </StyledBadgeVariant>
                )}
              </StyledImgContainer>
            </StyledPageWidth>
            {microcopy && sales && (
              <StyledMicrocopy variant='micro' color={sales.textColor}>
                {' '}
                {microcopy}
              </StyledMicrocopy>
            )}
          </BackgroundImage>
        </StyledOneBlockContainer>
      )}
    </>
  )
}
