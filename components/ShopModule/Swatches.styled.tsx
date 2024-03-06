import styled, { css } from 'styled-components'

import { theme } from '../../styles/theme'

import { Text } from '../Text'

export const StyledSwatchWrapper = styled.div<{
  isFreeGift: boolean
}>`
  display: flex;
  justify-content: ${(props) => (props.isFreeGift ? 'flex-end' : 'flex-start')};
  gap: ${theme.spacing.xxxs};

  ${({ isFreeGift }) =>
    !isFreeGift &&
    css`
      border-bottom: 1px solid ${theme.colors.gravy20};
      padding-bottom: ${theme.spacing.s};
    `}
`

export const StyledRadio = styled.input<{
  color: string
  isAvailable?: boolean
  isFreeGift: boolean
}>`
  appearance: none;
  position: relative;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: ${(props) => (props.isFreeGift ? `${theme.spacing.m}` : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  // swatch color
  &:before {
    content: '';
    background: ${(props) => props.color};
    border-radius: 50%;
    height: 26px;
    width: 26px;
    position: absolute;
    border: 1px solid ${theme.colors.lineGrey};
  }

  &:checked {
    height: 28px;
    width: 28px;
    border: 1px solid ${theme.colors.gravy};
  }

  /* &:focus {
    border-color: transparent;
  } */

  &:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }

  // If color is out of stock, cross out color swatch
  &:after {
    border-bottom: 1px solid ${theme.colors.lineGrey};
    content: ${(props) => (props.isAvailable ? null : "''")};
    position: absolute;
    right: 4px;
    top: 4px;
    transform: rotate(-45deg);
    transform-origin: top right;
    width: calc(100% - 1px);
  }

  // When checked, change out of stock indicator to larger, darker cross-out
  &:checked {
    &:after {
      border-bottom: 1px solid ${theme.colors.gravy};
      width: calc(100% + 2px);
      top: 3px;
      right: 3px;
    }
  }
`

// TODO: Update to use NewTag component
export const StyledTag = styled.div`
  color: ${theme.colors.gravy};
  display: inline-block;
  letter-spacing: ${theme.letterSpacing.s};
  font-size: var(--font-size-micro);
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  background-color: initial;
  border: 1px solid ${theme.colors.gravy};
  border-radius: 12.5px;
  width: fit-content;
  padding: 5px 10px;
  margin-left: ${theme.spacing.xs};
`

export const StyledTagText = styled(Text)`
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1;
`

export const StyledText = styled(Text)`
  display: inline;
`

export const StyledLegend = styled.legend`
  display: flex;
  align-items: center;
  min-height: 28px;
`

export const StyledFieldset = styled.fieldset<{ slug?: boolean }>`
  padding: 0;
  border: 0;
`

export const StyledInputContainer = styled.div`
  position: relative;
  /* 44px in the min clickable area on mobile/tablet */
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 44px;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
  }
`
