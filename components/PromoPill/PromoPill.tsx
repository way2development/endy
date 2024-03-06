import { Locale } from '../../types/global-types'
import { SaleProps } from '../../Interfaces/sales'

import { StyledProductPill } from './PromoPill.styled'
import { PromoPillCountdown } from './PromoPillCountdown'

export interface PromoPillProps {
  /**
   * Text content to show in the Promo Pill
   */
  promoCopy?: string
  /**
   * Select a color variant
   */
  variant:
    | 'rubine'
    | 'gravy'
    | 'white'
    | 'dark-blue'
    | 'endy-blue'
    | 'mint'
    | 'mauve'
    | 'peach'
    | string
  /**
   * Select border style
   */
  borderStyle?: 'solid' | 'dotted' | 'none'
  bgColor?: string
  locale: Locale
  sales?: SaleProps
  showCountdown?: boolean
}

export const PromoPill = ({
  promoCopy = 'Promo',
  variant = 'gravy',
  borderStyle = 'solid',
  bgColor = 'initial',
  locale,
  sales,
  showCountdown = false
}: PromoPillProps) => {
  return (
    <StyledProductPill
      variant={variant}
      borderStyle={borderStyle}
      bgColor={bgColor}
      showCountdown={showCountdown}
    >
      {showCountdown && <PromoPillCountdown locale={locale} sales={sales} />}
      {!showCountdown && promoCopy}
    </StyledProductPill>
  )
}
