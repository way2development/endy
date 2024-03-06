import { Grid } from '../Grid'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'
import { ColorProps } from '../../Interfaces/color'
import { CtaLink } from '../CtaLink'
import { Text } from '../Text'
import { PromoPill } from '../PromoPill'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { SaleCountdownTimer } from '../SaleCountdownTimer'
import { getSaleTextVariantColor, getSaleTextHexColor } from '../../utils'

import { formatSanitySaleStartDate } from '../../lib/time'

import { getTimeInET } from '../../lib/time'
import { Locale } from '../../types/global-types'

import {
  StyledLifeStyleImgContainer,
  StyledTextContainer,
  StyledSubcopy
} from '../MlpHero/MlpHero.styled'

import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledBadge, StyledPageWidth } from '../../styles/global.styled'

import {
  StyledLabel,
  StyledCountdownText,
  StyledColon,
  StyledTimeContainer
} from '../SaleCountdownTimer/SaleCountdownTimer.styled'
import { SaleProps } from '../../Interfaces/sales'

// TODO: Styled components are getting long. Consider breaking out into separate .styled.tsx file.
const StyledHeroContainer = styled.div<{ color: string; bgColor?: string }>`
  position: relative;
  width: 100%;

  /* Background Color */
  background-color: ${({ bgColor }) => (bgColor ? bgColor : '')};

  /* Background image */
  > div {
    background-position: top;
    ${mq({
      padding: ['0', '0', `${theme.spacing.l} 0`],
      minHeight: ['', '', '500px'],
      display: ['', '', 'flex'],
      height: ['', '', '100%'],
      alignItems: ['', '', 'center']
    })}
  }

  ${StyledLabel}, ${StyledCountdownText}, ${StyledColon}, ${StyledTimeContainer} {
    color: ${({ color }) => `1px solid ${color}`};
  }
`

export const StyledCountdownTimer = styled.div<{ color: string }>`
  border-top: ${({ color }) => `1px solid ${color}`};
  padding: ${theme.spacing.m} 0 ${theme.spacing.xl};
`

const StyledMicrocopyDesktop = styled(Text)`
  ${mq({
    margin: ['auto', 'auto', 'unset'],
    marginTop: [
      `${theme.spacing.xl}`,
      `${theme.spacing.xl}`,
      `${theme.spacing.xl}`
    ],
    display: ['none', 'none', 'block']
  })}

  a {
    font-weight: normal;
    letter-spacing: ${theme.letterSpacing.s};
    ${mq({
      fontSize: ['12px', '', '13px']
    })}
  }
`

const StyledMicrocopyMobile = styled(Text)`
  text-align: center;
  ${mq({
    margin: ['auto', 'auto', 'unset'],
    marginTop: [
      `${theme.spacing.m}`,
      `${theme.spacing.m}`,
      `${theme.spacing.xl}`
    ],
    display: ['block', 'block', 'none']
  })}

  a {
    font-weight: normal;
  }
`

const StyledCustomBadge = styled(StyledBadge)`
  img {
    transform: rotate(0deg);
  }
`

interface SalesLandingHeroProps {
  showCountdown: boolean
  badgeImage?: BadgeImageProps
  badgePosition: string
  countdownHeader: string
  cta?: React.ElementRef<typeof CtaLink>[]
  backgroundImage: BackgroundImageProps
  backgroundColor?: ColorProps
  heading: string
  lifestyleImage: ImageProps
  locale: Locale
  pillLabel: string
  pillBorderStyle: 'dotted' | 'solid'
  saleActiveCta?: React.ElementRef<typeof CtaLink>[]
  saleActivePillLabel: string
  saleActiveSubcopy?: string
  saleActiveMicrocopy?: string
  subcopy?: string
  microcopy?: string
  saleStartDate: string
  themeColor: ColorProps
  sales: SaleProps
}

export const SalesLandingHero = ({
  backgroundImage,
  badgeImage,
  badgePosition,
  countdownHeader,
  cta,
  heading,
  lifestyleImage,
  locale,
  saleActiveCta,
  saleActivePillLabel,
  saleActiveSubcopy,
  saleActiveMicrocopy,
  saleStartDate,
  subcopy,
  microcopy,
  pillLabel,
  pillBorderStyle,
  themeColor,
  sales,
  showCountdown,
  backgroundColor
}: SalesLandingHeroProps) => {
  const localDateTime = new Date()
  const dateTimeET = getTimeInET(localDateTime)
  const startDate = formatSanitySaleStartDate(saleStartDate)

  const isSaleActive = dateTimeET > startDate

  let mlpContent

  if (isSaleActive) {
    mlpContent = {
      cta: saleActiveCta,
      pillLabel: saleActivePillLabel,
      subcopy: saleActiveSubcopy,
      microcopy: saleActiveMicrocopy
    }
  } else {
    mlpContent = {
      cta,
      pillLabel,
      subcopy,
      microcopy
    }
  }

  return (
    <StyledHeroContainer
      color={getSaleTextHexColor(themeColor?.hex)}
      bgColor={!backgroundImage && backgroundColor ? backgroundColor?.hex : ''}
    >
      <BackgroundImage
        srcHeights={[800, 800, 530]}
        mobileImage={backgroundImage?.mobileImage}
        tabletImage={backgroundImage?.tabletImage}
        desktopImage={backgroundImage?.desktopImage}
      >
        <StyledPageWidth>
          <Grid
            columnRatio={['1', '1', '1:2']}
            rowGap={['0']}
            columnGap={['0']}
          >
            <StyledTextContainer hasSubcopy={mlpContent.subcopy !== undefined}>
              <div>
                <PromoPill
                  promoCopy={mlpContent.pillLabel}
                  variant={getSaleTextVariantColor(themeColor?.hex)}
                  borderStyle={pillBorderStyle}
                  locale={locale}
                />
                <Text
                  color={getSaleTextVariantColor(themeColor?.hex)}
                  variant={'h1'}
                >
                  {heading}
                </Text>
                {mlpContent.subcopy && (
                  <StyledSubcopy hasCountdown={!isSaleActive}>
                    <Text
                      color={getSaleTextVariantColor(themeColor?.hex)}
                      variant={'largeBody'}
                    >
                      {mlpContent.subcopy}
                    </Text>
                  </StyledSubcopy>
                )}

                {!isSaleActive && showCountdown && (
                  <StyledCountdownTimer
                    color={getSaleTextHexColor(themeColor?.hex)}
                  >
                    <SaleCountdownTimer
                      heading={countdownHeader}
                      locale={locale}
                      sales={sales}
                    />
                  </StyledCountdownTimer>
                )}

                {mlpContent.cta && mlpContent.cta}

                {mlpContent.microcopy && (
                  <>
                    <StyledMicrocopyDesktop
                      color={getSaleTextVariantColor(themeColor?.hex)}
                      variant={'micro'}
                    >
                      {microcopy}
                    </StyledMicrocopyDesktop>
                    <StyledMicrocopyMobile
                      color={getSaleTextVariantColor(themeColor?.hex)}
                      variant={'micro'}
                    >
                      {microcopy}
                    </StyledMicrocopyMobile>
                  </>
                )}
              </div>
            </StyledTextContainer>

            <StyledLifeStyleImgContainer>
              <Image
                srcWidths={[768, 910]}
                desktopImage={lifestyleImage?.desktopImage}
                tabletImage={lifestyleImage?.tabletImage}
                mobileImage={lifestyleImage?.mobileImage}
                alt=''
              />
              {badgeImage && (
                <StyledCustomBadge position={badgePosition}>
                  <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
                </StyledCustomBadge>
              )}
            </StyledLifeStyleImgContainer>
          </Grid>
        </StyledPageWidth>
      </BackgroundImage>
    </StyledHeroContainer>
  )
}
