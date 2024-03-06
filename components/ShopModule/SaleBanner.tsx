import {
  StyledSaleBanner,
  StyledText,
  StyledSpecialOfferContainer,
  StyledContentContainer,
  StyledSaleMessageContainer,
  StyledPromoPillContainer
} from './SaleBanner.styled'
import { getSaleTextVariantColor } from '../../utils'
import { Tooltip } from '../Tooltip'
import { SaleProps } from 'Interfaces/sales'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { PromoPill } from '../PromoPill'
interface SaleBannerProps {
  shopModuleBanner?: {
    bannerBgColor: { hex: string }
    content: HTMLElement
  }
  sales?: SaleProps
  hasMysteryGift: boolean
  locale: Locale
  showCountdown?: boolean
}

export const SaleBanner = ({
  shopModuleBanner,
  sales,
  hasMysteryGift,
  locale,
  showCountdown
}: SaleBannerProps) => {
  const localizedDictionary = dictionary[locale]

  return (
    <StyledSaleBanner
      bgColor={shopModuleBanner?.bannerBgColor.hex}
      showCountdown={showCountdown}
    >
      <StyledContentContainer>
        <StyledSaleMessageContainer hasMysteryGift={hasMysteryGift}>
          {showCountdown && (
            <StyledPromoPillContainer locale={locale}>
              <PromoPill
                showCountdown={showCountdown}
                locale={locale}
                variant={'gravy'}
                borderStyle={'dotted'}
                sales={sales}
              />
            </StyledPromoPillContainer>
          )}

          {/* TODO: Replace with the icon component */}
          {sales?.saleType === 'Bmsm' ||
          sales?.saleType === 'Level Up Offer' ||
          sales?.saleType === 'Fixed Amount' ? (
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/f3c7c5060a54d20be6f5da42d442aee1ab183d9f-36x32.svg'
              alt=''
            />
          ) : (
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/97e7abf6c7d541f34f4d753633451e305a65e22d-48x48.svg'
              alt=''
            />
          )}
          <StyledText
            variant={'smallBody'}
            color={getSaleTextVariantColor(shopModuleBanner?.bannerBgColor.hex)}
          >
            {shopModuleBanner?.content}
          </StyledText>
        </StyledSaleMessageContainer>
        {hasMysteryGift && (
          <StyledSpecialOfferContainer>
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/43221cf669cac980528ac11319d3e9952d562317-36x32.svg'
              alt=''
            />
            <StyledText
              variant={'smallBody'}
              color={getSaleTextVariantColor(
                shopModuleBanner?.bannerBgColor.hex
              )}
            >
              {localizedDictionary.salesBannerSpecialOfferMessage}
              <Tooltip
                icon='https://cdn.sanity.io/images/d0kd7r9c/production/3fe7c9c998fb4817a022e1d20fe257d6ebd93b7d-12x12.svg'
                text={localizedDictionary.salesBannerSpecialOfferTooltip}
                top={'25px'}
                right={'-120px'}
              />
            </StyledText>
          </StyledSpecialOfferContainer>
        )}
      </StyledContentContainer>
    </StyledSaleBanner>
  )
}
