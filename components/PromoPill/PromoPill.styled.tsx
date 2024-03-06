import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledProductPill = styled.span<{
  variant: string
  borderStyle: string
  bgColor: string
  showCountdown: boolean
}>`
  color: ${(props) => `var(--${props.variant})`};
  display: block;
  font-size: var(--font-size-micro);
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};
  letter-spacing: var(--letter-spacing-1px);
  line-height: normal;
  text-transform: uppercase;
  background-color: ${(props) => `${props.bgColor}`};
  // prettier-ignore
  border: ${theme.spacing.xxxs} ${(props) => `${props.borderStyle}`} ${(
    props
  ) => `var(--${props.variant})`};
  border-radius: 12.5px;
  width: max-content;
  margin: auto;
  margin-bottom: ${theme.spacing.s};
  padding: 3px 15px;
`

export const StyledTime = styled.div`
  display: flex;
  align-items: center;
`

export const StyledCountdownText = styled(Text)<{ isFrench: boolean }>`
  text-transform: uppercase;
  letter-spacing: ${theme.letterSpacing.s};
  padding-left: ${theme.spacing.xxs};
  line-height: 1.2;

  ${({ isFrench }) => isFrench && `text-transform: initial;`}
`

export const StyledPromoPillCountdown = styled(Text)`
  font-weight: ${theme.fontWeights.semibold};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  line-height: 1.2;
`

export const StyledTimeContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledLabel = styled.div`
  padding-right: ${theme.spacing.xxs};
`

export const StyledColon = styled.div`
  padding: 0 ${theme.spacing.xxs};
`
