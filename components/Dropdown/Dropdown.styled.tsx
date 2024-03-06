import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Text } from '../Text'
import { mq, theme } from '../../styles/theme'

export const StyledNativeSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: ${theme.colors.gravy};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gravy40};
  border-radius: ${theme.borders.borderRadius};
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;

  ${mq({
    backgroundRepeat: 'no-repeat',
    fontWeight: ` ${theme.fontWeights.semibold}`,
    textTransform: 'uppercase',
    width: '100%'
  })}
`

export const StyledDropdownWrapper = styled.div`
  position: relative;
`

export const StyledOptionList = styled(motion.ul)<{
  variant: 'white' | 'offWhite'
}>`
  border: 1px solid ${theme.colors.gravy40};
  background: ${({ variant }) =>
    variant === 'offWhite'
      ? `${theme.colors.offWhite}`
      : `${theme.colors.white}`};
  border-radius: ${theme.borders.borderRadius};
  left: 0;
  list-style: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;

  &:last-child {
    border-bottom: none;
  }
`

export const StyledListOption = styled.li<{
  variant: 'white' | 'offWhite'
  isQuantitySelector: boolean | undefined
  isDisabled?: boolean
  isCartDropdown?: boolean
}>`
  background-color: ${({ variant }) =>
    variant === 'offWhite'
      ? `${theme.colors.offWhite}`
      : `${theme.colors.white}`};
  border-bottom: 1px solid ${theme.colors.gravy40};
  padding: ${({ isCartDropdown }) =>
    isCartDropdown
      ? `0 ${theme.spacing.xs} 0 ${theme.spacing.s}`
      : `${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ isCartDropdown }) => (isCartDropdown ? '32px' : '48px')};

  &:hover {
    /* Endy Blue at 10% */
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'none' : 'rgba(156, 199, 221, 0.1)'};
  }

  p {
    font-size: ${({ isQuantitySelector }) =>
      isQuantitySelector ? '19px' : '16px'};
  }
`

export const StyledOptionText = styled(Text)<{
  isSelectedOption: boolean
  isAvailable: boolean | undefined
}>`
  pointer-events: none;

  font-weight: ${({ isSelectedOption }) => isSelectedOption && 'bold'};
  color: ${({ isAvailable }) =>
    isAvailable ? theme.colors.gravy : theme.colors.gravy80};
`

export const StyledSelectButton = styled.button<{
  variant: 'white' | 'offWhite'
  isQuantitySelector: boolean | undefined
  isCartDropdown?: boolean
}>`
  text-align: left;
  background: ${({ variant }) =>
    variant === 'offWhite'
      ? `${theme.colors.offWhite}`
      : `${theme.colors.white}`};
  border: 1px solid ${theme.colors.gravy40};
  border-radius: ${theme.borders.borderRadius};
  padding: ${({ isCartDropdown }) =>
    isCartDropdown
      ? `0 ${theme.spacing.xs} 0 ${theme.spacing.s}`
      : `${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${({ isCartDropdown }) => (isCartDropdown ? '100%' : '48px')};
  width: ${({ isCartDropdown }) => (isCartDropdown ? '152px' : '100%')};
  height: ${({ isCartDropdown }) => isCartDropdown && '32px'};

  span {
    font-size: ${({ isQuantitySelector }) =>
      isQuantitySelector ? '19px' : '16px'};
    font-weight: ${({ isQuantitySelector }) =>
      isQuantitySelector
        ? `${theme.fontWeights.semibold}`
        : `${theme.fontWeights.regular}`};
  }
`

export const StyledLabelText = styled(Text)`
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.semibold};
`

export const StyledFlexboxCustom = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`

export const StyledFlexboxNative = styled.div<{
  isCartDropdown?: boolean
}>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${({ isCartDropdown }) => (isCartDropdown ? '152px' : '100%')};
  height: ${({ isCartDropdown }) => (isCartDropdown ? '32px' : 'initial')};

  > svg {
    position: absolute;
    right: 18px;
    cursor: pointer;
  }
`

export const StyledLabel = styled.label<{
  variant: 'white' | 'offWhite'
  isReviewForm: boolean
  isCartDropdown: boolean
}>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: ${({ isReviewForm }) => (isReviewForm ? '13px' : '19px')};
  color: ${theme.colors.gravy};
  background-color: ${({ variant }) =>
    variant === 'offWhite'
      ? `${theme.colors.offWhite}`
      : `${theme.colors.white}`};
  border: 1px solid ${theme.colors.gravy40};
  border-radius: ${theme.borders.borderRadius};
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  min-height: ${({ isCartDropdown }) => (isCartDropdown ? '32px' : '48px')};
  display: flex;
  align-items: center;
  width: 100%;

  ${mq({
    backgroundRepeat: 'no-repeat',
    width: '100%'
  })}
`

export const StyledText = styled(Text)<{
  isQuantitySelector: boolean | undefined
}>`
  font-size: ${({ isQuantitySelector }) =>
    isQuantitySelector ? '19px' : '13px'};
  font-weight: ${({ isQuantitySelector }) =>
    isQuantitySelector
      ? `${theme.fontWeights.semibold}`
      : `${theme.fontWeights.regular}`};
`
