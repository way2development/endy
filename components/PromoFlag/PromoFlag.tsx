import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'

interface PromoFlagProps {
  /**
   * Hex code for the background color in the PromoFlag
   */
  bgColor?: string
  /**
   * Hex code for the text color in the PromoFlag
   */
  color?: string
  /**
   * Text content to show in the PromoFlag
   */
  promoCopy?: string
  /**
   * Position of flag
   */
  isCentered?: boolean
  /**
   * Whether the flag should be positioned for the cart cross sell items
   */
  isCartCrossSell?: boolean
  /**
   * Select border style
   */
  borderStyle?: 'solid' | 'dotted' | 'none'
}

export const StyledProductTag = styled.span<{
  bgColor: string
  color: string
  isCentered?: boolean
  isCartCrossSell?: boolean
  borderStyle?: string
}>`
  background-color: ${(props) => props.bgColor};
  border-radius: 15px;
  border: ${({ borderStyle }) => `2px ${borderStyle} ${theme.colors.darkBlue}`};
  color: ${(props) => props.color};
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};
  font-size: var(--font-size-micro);
  letter-spacing: var(--letter-spacing-1px);
  padding: ${theme.spacing.xxs} ${theme.spacing.s};
  position: absolute;
  right: ${theme.spacing.s};
  text-transform: uppercase;
  top: ${theme.spacing.s};
  z-index: 10;

  ${({ isCartCrossSell }) =>
    isCartCrossSell &&
    css`
      right: unset;
      left: 6px;
      top: 6px;
      padding: ${theme.spacing.xxs} ${theme.spacing.s};
    `}

  ${({ isCentered }) =>
    isCentered &&
    css`
      position: relative;
      top: 0;
      right: 0;
      left: ${theme.spacing.xs};
      margin-left: ${theme.spacing.xs};
      padding: ${theme.spacing.xxxs} ${theme.spacing.xs};
    `}
`

export const PromoFlag = ({
  bgColor = '#c5dce8',
  color = '#243746',
  promoCopy = 'promo',
  isCentered,
  isCartCrossSell,
  borderStyle = 'dotted'
}: PromoFlagProps) => {
  return (
    <StyledProductTag
      color={color}
      bgColor={bgColor}
      isCentered={isCentered}
      isCartCrossSell={isCartCrossSell}
      borderStyle={borderStyle}
    >
      {promoCopy}
    </StyledProductTag>
  )
}

export const PopularFlag = ({
  bgColor = '#c5dce8',
  color = '#243746',
  promoCopy = 'popular',
  isCentered,
  isCartCrossSell = false
}: PromoFlagProps) => {
  return (
    <StyledProductTag
      color={color}
      bgColor={bgColor}
      isCentered={isCentered}
      isCartCrossSell={isCartCrossSell}
    >
      {promoCopy}
    </StyledProductTag>
  )
}
