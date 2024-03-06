import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Text } from '../Text'
import {
  StyledHeroContainer,
  StyledWrapper,
  StyledHeading,
  StyledTimer
} from './GenericSaleHero.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { SaleCountdownTimer } from '../SaleCountdownTimer'
import { SaleProps } from 'Interfaces/sales'
import { Locale } from 'types/global-types'
import { getIsMobileDevice } from './../../utils'

interface GenericSaleHeroProps {
  /** Heading text */
  heading: string
  /** Subcopy text*/
  subcopy: string
  /** Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** Timer */
  sales: SaleProps
  locale: Locale
  countdownHeader: string
}

export const GenericSaleHero = ({
  heading,
  subcopy,
  backgroundImage,
  sales,
  locale,
  countdownHeader
}: GenericSaleHeroProps) => {
  const backgroundImageProps = {
    srcHeights: [280, 232, 330],
    mobileImage: backgroundImage?.mobileImage,
    tabletImage: backgroundImage?.tabletImage,
    desktopImage: backgroundImage?.desktopImage,
    alt: 'sale-hero-image'
  }

  const isMobileDevice = getIsMobileDevice()
  const showSubcopy = !sales?.isLastChance && !isMobileDevice

  return (
    <StyledHeroContainer>
      <BackgroundImage {...backgroundImageProps}>
        <StyledPageWidth>
          <StyledWrapper>
            <StyledHeading
              color={sales ? sales.textColor : 'gravy'}
              variant={'h1'}
            >
              {heading}
            </StyledHeading>
            {showSubcopy && (
              <Text
                color={sales ? sales.textColor : 'gravy'}
                variant={'mediumBody'}
              >
                {subcopy}
              </Text>
            )}
            {sales?.isLastChance && (
              <StyledTimer>
                <SaleCountdownTimer
                  heading={countdownHeader}
                  sales={sales}
                  locale={locale}
                />
              </StyledTimer>
            )}
          </StyledWrapper>
        </StyledPageWidth>
      </BackgroundImage>
    </StyledHeroContainer>
  )
}
