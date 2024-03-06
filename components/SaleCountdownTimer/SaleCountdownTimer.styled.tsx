import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledSaleCountdownTimer = styled(Text)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  line-height: 1.5;
`

export const StyledTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 43px;
  line-height: 1.2;
  padding: ${theme.spacing.s} 0;
`

export const StyledCountdownText = styled.span<{ isFrench: boolean }>`
  font-size: var(--font-size-small);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-1px);
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};

  ${({ isFrench }) => isFrench && `text-transform: initial;`}
`

export const StyledColon = styled.span`
  font-size: var(--font-size-h4);
  padding: ${theme.spacing.m} ${theme.spacing.xs};
`
export const StyledTimeContainer = styled.div<{ borderColor: string }>`
  display: flex;
  justify-content: center;
  border-left: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-right: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-bottom: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 2px;
  padding: ${theme.spacing.xs} ${theme.spacing.l};
  width: 267px;
`

export const StyledLabel = styled.span<{ borderColor: string }>`
  font-family: ${theme.fonts.calibre};
  font-size: var(--font-size-small);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-1px);
  width: 265px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  white-space: nowrap;

  ${mq({
    top: ['-9.5px', '', '-11.5px']
  })}

  &::before {
    content: '';
    border-bottom: ${({ borderColor }) => `1px solid ${borderColor}`};
    width: 100%;
    margin-right: ${theme.spacing.xs};
  }

  &::after {
    content: '';
    border-bottom: ${({ borderColor }) => `1px solid ${borderColor}`};
    width: 100%;
    margin-left: ${theme.spacing.xs};
  }
`
