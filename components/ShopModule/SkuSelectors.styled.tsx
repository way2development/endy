import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'
import { Button } from '../Button'

export const StyledInputContainer = styled.div`
  display: flex;
  /* TODO: wrap last two flex-children together (prevent orphans) */
  flex-flow: wrap;
  margin-top: ${theme.spacing.s};
  gap: ${theme.spacing.xs};
`

export const StyledLabel = styled.label<{
  isOutOfStock: boolean
  checked: boolean
}>`
  position: relative;
  height: 60px;
  width: 60px;
  // If sku is out of stock, add opacity to entire sku selector
  opacity: ${({ isOutOfStock, checked }) => isOutOfStock && !checked && '0.6'};
`

export const StyledRadio = styled.input<{ isOutOfStock: boolean }>`
  appearance: none;
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  &:checked {
    border: 2px solid ${theme.colors.gravy60};
    border-radius: 2px;
  }

  // If sku is out of stock, cross out sku selector
  ${({ isOutOfStock }) =>
    isOutOfStock &&
    css`
      &:before {
        content: '';
        height: inherit;
        width: inherit;

        background: linear-gradient(
          135deg,
          transparent calc(50% - 1px),
          ${theme.colors.gravy60} 50%,
          transparent calc(50% + 1px)
        );
      }
    `}
`

export const StyledLegendSizeGuideContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledSizeGuideGroup = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: ${theme.spacing.xxs};
    margin-top: 1px;
  }
`

export const StyledButton = styled(Button)`
  font-weight: ${theme.fontWeights.regular};
`
