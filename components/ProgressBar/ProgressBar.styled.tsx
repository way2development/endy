import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'

export const StyledContainer = styled.div<{
  isBmsm: boolean
  isFirstThresholdMet: boolean | undefined
}>`
  margin: ${theme.spacing.xxs} 0;
  height: 8px;
  position: relative;
  width: 100%;

  /* adds a dividing line in the middle of the progress bar to delineate reaching the first threshold, which disappears once reached */
  ${({ isBmsm, isFirstThresholdMet }) =>
    isBmsm &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1px;
        background-color: ${theme.colors.gravy};
        display: ${isFirstThresholdMet ? 'none' : 'block'};
      }
    `}
`

export const StyledBarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.gravy40};
  border-radius: 16px;
`

export const StyledCurrentSpend = styled.div<{ currentSpend: number }>`
  position: absolute;
  height: 100%;
  width: ${({ currentSpend }) => currentSpend}%;
  background: linear-gradient(
    to right,
    ${theme.colors.gravy20},
    ${theme.colors.gravy}
  );
  max-width: 100%;
  border-radius: 16px;
  transition: width 0.3s ease;
`
