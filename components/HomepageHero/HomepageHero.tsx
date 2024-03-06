import Link from 'next/link'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Image, ImageProps } from '../Image'
import { CtaLinkProps } from '../CtaLink'
import { Grid } from '../Grid'
import { Text } from '../Text'
import { StyledArrow } from '../CtaLink/CtaLink.styled'

import { StyledSplitScreen } from '../../styles/global.styled'
import { SaleProps } from '../../Interfaces/sales'
import { PromoPill } from '../PromoPill'
import { Locale } from '../../types/global-types'

import {
  StyledAside,
  StyledBadge,
  StyledWrapper,
  StyledHeadingContainer,
  StyledImageContainer,
  StyledTextAsideLink,
  StyledSaleAsideContainer,
  StyledBgGradientContainer,
  StyledSaleAsideTextContainer,
  StyledText
} from './HomepageHero.styled'

interface AsideProps {
  url: string
  label: string | undefined
  variant: string
}

interface HomepageHeroProps {
  /** * Main Hero Image on both Desktop and Mobile */
  backgroundImage: BackgroundImageProps
  /** * CTA to any internal page */
  cta: CtaLinkProps
  /** * Title copy */
  heading: string
  secondaryHeading?: SaleProps
  /** * Image Asset for aside column */
  lifestyleImage: BackgroundImageProps
  /** * Link for aside image column */
  asideLink: AsideProps
  asideCtaLabel: string | undefined
  /** * Badge on aside image column */
  badgeImage?: BadgeImageProps
  /** * Determines which Homepage variant to render */
  variant: string
  sales?: SaleProps
  pillLabel: string | undefined
  /** * Text Lockup Image for Default/Sale Split Screen V2 Aside container */
  headingTextImage: ImageProps
  /** * Background gradientColor for Default/Sale Split Aside container */
  gradientColor: string | undefined
  /** * Text color for Default/Sale Split Aside container */
  asideTextColor?: 'gravy' | 'white'
  locale: Locale
}

export const HomepageHero = ({
  backgroundImage,
  badgeImage,
  cta,
  asideCtaLabel,
  heading,
  secondaryHeading,
  lifestyleImage,
  asideLink,
  sales,
  headingTextImage,
  pillLabel,
  gradientColor,
  asideTextColor = 'gravy',
  variant,
  locale
}: HomepageHeroProps) => {
  const backgroundImageProps = {
    srcHeights: [450, 645, 890],
    desktopImage: backgroundImage.desktopImage,
    tabletImage: backgroundImage.tabletImage,
    mobileImage: backgroundImage.mobileImage
  }

  const lifestyleImageProps = {
    srcHeights: [448, 300, 645],
    // custom srcWidth required for desktop viewport (sale aside lifestyle image)
    srcWidths: [767, 512, 500],
    desktopImage: lifestyleImage.desktopImage,
    tabletImage: lifestyleImage.tabletImage,
    mobileImage: lifestyleImage.mobileImage
  }

  const visiblePillLabel = sales?.isLastChance
    ? sales.lastChance?.homepageHero?.pillLabel
    : pillLabel

  const isBMSM = sales?.displayName.includes('BMSM')

  const AsideContents = ({
    badgeImage,
    asideLink,
    asideCtaLabel,
    variant,
    headingTextImage
  }: {
    badgeImage?: BadgeImageProps
    asideLink: AsideProps
    asideCtaLabel: string | undefined
    variant: string
    headingTextImage?: ImageProps
  }) => (
    <BackgroundImage {...lifestyleImageProps}>
      {badgeImage && (
        <StyledBadge>
          <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
        </StyledBadge>
      )}
      {variant === 'Default/Sale Split Screen V1' ||
      variant === 'Default/Sale Split Screen V2' ? (
        <StyledSaleAsideContainer variant={variant}>
          <StyledBgGradientContainer
            gradientColor={gradientColor}
            variant={variant}
          >
            <StyledSaleAsideTextContainer variant={variant} isBMSM={isBMSM}>
              {visiblePillLabel && (
                <PromoPill
                  promoCopy={visiblePillLabel}
                  variant={asideTextColor}
                  locale={locale}
                />
              )}
              {headingTextImage ? (
                <Image
                  desktopImage={headingTextImage.desktopImage}
                  tabletImage={headingTextImage.tabletImage}
                  mobileImage={headingTextImage.mobileImage}
                  alt={headingTextImage?.alt}
                  srcWidths={[141, 183, 211]}
                />
              ) : (
                <Text
                  color={asideTextColor}
                  variant={
                    variant === 'Default/Sale Split Screen V1' ? 'h3' : 'h2'
                  }
                >
                  {secondaryHeading}
                </Text>
              )}
              <StyledTextAsideLink variant={variant} color={asideTextColor}>
                {asideCtaLabel}
                <StyledArrow aria-hidden='true'> →</StyledArrow>
              </StyledTextAsideLink>
            </StyledSaleAsideTextContainer>
          </StyledBgGradientContainer>
        </StyledSaleAsideContainer>
      ) : (
        <StyledTextAsideLink variant={'mediumBody'} color={'white'}>
          {`${asideLink.label}`}
          <StyledArrow aria-hidden='true'> →</StyledArrow>
        </StyledTextAsideLink>
      )}
    </BackgroundImage>
  )

  return (
    <StyledSplitScreen>
      <Grid
        columnGap={['2px']}
        columnRatio={['1', '1', '2:1']}
        rowGap={['2px']}
      >
        <StyledWrapper>
          <StyledHeadingContainer variant={variant}>
            <StyledText color={'gravy'} variant={'h1'}>
              {heading}
            </StyledText>
            {cta}
          </StyledHeadingContainer>
          <StyledImageContainer>
            <BackgroundImage {...backgroundImageProps} />
          </StyledImageContainer>
        </StyledWrapper>

        {/* TODO: Aside component needs to be restructured due to html tags going against semantic rules
including div in anchor tag(s) and anchor in span tag(s) */}
        <StyledAside variant={variant}>
          <Link href={asideLink.url}>
            {badgeImage ? (
              <AsideContents
                badgeImage={badgeImage}
                asideLink={asideLink}
                asideCtaLabel={asideCtaLabel}
                variant={variant}
                headingTextImage={headingTextImage}
              />
            ) : (
              <AsideContents
                asideLink={asideLink}
                asideCtaLabel={asideCtaLabel}
                variant={variant}
                headingTextImage={headingTextImage}
              />
            )}
          </Link>
        </StyledAside>
      </Grid>
    </StyledSplitScreen>
  )
}
