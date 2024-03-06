import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text'
import { Locale } from '../../types/global-types'
import { SaleProps } from '../../Interfaces/sales'

import dictionary from '../../dictionary.json'
import { getSaleTextHexColor } from '../../utils'

import { StyledFreeGiftLink, StyledFreeGiftText } from './ShopModule.styled'

import { StyledSemibold } from '../../styles/global.styled'

interface FreeGiftBannerProps {
  url?: string
  heading: string
  slug?: string
  sales: SaleProps | undefined
  locale: Locale
}

const freeGiftIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/e52cce9cf1e2f13528a561e3823fe1318441fee0-32x32.svg'

const chevronIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/559650a3cd713e72f7139bf876b3e4d9faf5ca43-16x16.svg'

export const FreeGiftBanner = ({
  heading,
  url,
  locale,
  slug,
  sales
}: FreeGiftBannerProps) => {
  const link = url ? url : `/products${slug}`

  const bannerColor = sales?.themeColor
    ? sales?.themeColor
    : theme.colors.endyBlue40

  const bannerBgColor = sales?.themeColor
    ? sales?.themeColor
    : theme.colors.endyBlue40

  return (
    <StyledFreeGiftLink
      href={link}
      locale={locale}
      color={getSaleTextHexColor(bannerColor)}
      bgColor={bannerBgColor}
    >
      {/* TODO: Replace with the Icon component */}
      <img src={freeGiftIcon} alt='' />
      <StyledFreeGiftText
        variant={'mediumBody'}
        color={'gravy'}
        element={'span'}
      >
        <StyledSemibold>{heading}</StyledSemibold>
      </StyledFreeGiftText>
      <img src={chevronIcon} alt='' />
    </StyledFreeGiftLink>
  )
}
