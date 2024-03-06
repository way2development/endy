import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { SaleProps } from '../../Interfaces/sales'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Image, ImageProps } from '../Image'
import { Text } from '../Text'
import { StyledSemibold } from '../../styles/global.styled'

import {
  StyledHeading,
  StyledImageContainer,
  StyledSubcopy,
  StyledMicrocopy,
  StyledGrid,
  StyledPromoPill,
  StyledLeftContainer,
  StyledRightContainer,
  StyledOverlappingPillWrap,
  StyledBadgeContainer,
  StyledTextContainer,
  StyledSalesBannerContainer,
  StyledMicrocopyContainer,
  StyledTotalValue
} from './SalesBanner.styled'

import { RichText } from '../RichText/RichText'
import { getLocalizedPrice } from '../../utils/getLocalizedPrice'

interface SalesBannerProps {
  /** Heading text */
  heading: string
  /** Subcopy text*/
  subcopy: React.ElementRef<typeof RichText>
  subcopyImage?: ImageProps | undefined
  badgeImage: BadgeImageProps
  /** Lifestyle Image Assets */
  lifestyleImage: ImageProps
  microcopy: React.ElementRef<typeof RichText>
  bgColor: string
  themeColor: string
  sales?: SaleProps
  saleBundles?: { isBundleSale: boolean; totalBundleValue: number }
  locale: Locale
}

const giftIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/0781d96197d0d38c6defb967768102833bb95465-14x15.svg'

export const SalesBanner = ({
  heading,
  subcopy,
  subcopyImage,
  lifestyleImage,
  badgeImage,
  microcopy,
  bgColor,
  themeColor,
  sales,
  saleBundles,
  locale
}: SalesBannerProps) => {
  const localizedDictionary = dictionary[locale]

  const lifestyleImageProps = {
    srcWidths: [767, 1024, 594],
    mobileImage: lifestyleImage?.mobileImage,
    tabletImage: lifestyleImage?.tabletImage,
    desktopImage: lifestyleImage?.desktopImage,
    alt: ''
  }

  const visiblePillLabel = sales?.isLastChance
    ? sales?.lastChance?.salesLandingPage?.salesBannerPill
    : sales?.salesLandingBanner?.pillLabel

  const isBundleSale = saleBundles?.isBundleSale

  const totalBundleValue = saleBundles?.totalBundleValue

  const bundlePrice = totalBundleValue
    ? getLocalizedPrice(totalBundleValue, locale)
    : ''

  return (
    <StyledSalesBannerContainer>
      <StyledGrid
        columnRatio={['1', '1', '1:2']}
        rowGap={['0']}
        columnGap={['0']}
      >
        <StyledLeftContainer bgColor={bgColor}>
          <StyledOverlappingPillWrap>
            <span id='right-pill'>
              <StyledPromoPill
                promoCopy={visiblePillLabel}
                variant='gravy'
                bgColor={themeColor}
                borderStyle='dotted'
                locale={locale}
              />
            </span>
          </StyledOverlappingPillWrap>
          <StyledTextContainer isBundleSale={isBundleSale}>
            <StyledHeading color={'gravy'} variant={'h2'}>
              {heading}
            </StyledHeading>

            <StyledSubcopy color={'gravy'} variant={'mediumBody'}>
              {subcopy}
            </StyledSubcopy>

            {subcopyImage && (
              <Image
                srcWidths={[767, 1024, 594]}
                mobileImage={subcopyImage?.mobileImage}
                tabletImage={subcopyImage?.tabletImage}
                desktopImage={subcopyImage?.desktopImage}
                alt={subcopyImage?.alt}
              />
            )}

            <StyledMicrocopyContainer isBundleSale={isBundleSale}>
              <StyledMicrocopy color='gravy90' variant='micro'>
                {microcopy}
              </StyledMicrocopy>
            </StyledMicrocopyContainer>

            {isBundleSale && (
              <StyledTotalValue>
                {/* TODO: Replace with the Icon component */}
                <img src={giftIcon} alt='' />
                <Text variant='micro' color='gravy'>
                  <StyledSemibold>
                    {localizedDictionary.upTo} {bundlePrice}{' '}
                    {locale === 'en' ? `${localizedDictionary.value}` : null}
                  </StyledSemibold>
                </Text>
              </StyledTotalValue>
            )}
          </StyledTextContainer>
        </StyledLeftContainer>
        <StyledRightContainer bgColor={bgColor} isBundleSale={isBundleSale}>
          <StyledBadgeContainer>
            <BadgeImage {...badgeImage} />
          </StyledBadgeContainer>
          <StyledOverlappingPillWrap>
            <StyledPromoPill
              promoCopy={visiblePillLabel}
              variant='gravy'
              bgColor={themeColor}
              borderStyle='dotted'
              locale={locale}
            />
          </StyledOverlappingPillWrap>
          <StyledImageContainer>
            <Image {...lifestyleImageProps} />
          </StyledImageContainer>
        </StyledRightContainer>
      </StyledGrid>
    </StyledSalesBannerContainer>
  )
}
