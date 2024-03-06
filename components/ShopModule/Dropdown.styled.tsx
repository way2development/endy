import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Text } from '../Text'
import { mq, theme } from '../../styles/theme'
import { Button } from '../Button'

export const StyledDropdownTitle = styled(Text)<{ oneSize: boolean }>`
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  margin-bottom: ${({ oneSize }) => (oneSize ? '0' : `${theme.spacing.s}`)};
  display: flex;
  justify-content: space-between;

  span:first-child {
    flex-grow: 1;
  }

  img {
    margin-right: ${theme.spacing.xxs};
    margin-top: 1px;
  }
`

export const StyledNativeSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 19px;
  color: ${theme.colors.gravy};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lineGrey};
  border-radius: ${theme.borders.borderRadius};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;

  ${mq({
    backgroundRepeat: 'no-repeat',
    fontWeight: ` ${theme.fontWeights.semibold}`,
    width: '100%'
  })}
`

export const StyledDropdownWrapper = styled.div`
  position: relative;
`

export const StyledOptionList = styled(motion.ul)`
  border: 1px solid ${theme.colors.lineGrey};
  border-radius: ${theme.borders.borderRadius};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  left: 0;
  list-style: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
`

export const StyledListOption = styled.li`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.lineGrey};
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${theme.colors.endyBlue};
  }
`

export const StyledOptionText = styled(Text)<{
  selected: boolean | undefined
}>`
  pointer-events: none;
  font-weight: ${(props) =>
    props.selected
      ? `${theme.fontWeights.semibold}`
      : `${theme.fontWeights.regular}`};
`

export const StyledSelectButton = styled.button`
  text-align: left;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.lineGrey};
  border-radius: ${theme.borders.borderRadius};
  padding: ${theme.spacing.xs};
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
`

export const StyledLabelText = styled(Text)<{ isOutOfStock: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${theme.fontWeights.semibold};
  color: ${({ isOutOfStock }) =>
    isOutOfStock ? theme.colors.gravy80 : theme.colors.gravy};
`

export const StyledFlexboxCustom = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`

export const StyledFlexboxNative = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > svg {
    position: absolute;
    right: 18px;
    cursor: pointer;
  }
`

export const StyledLabel = styled.label<{ isOutOfStock: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 19px;
  color: ${({ isOutOfStock }) =>
    isOutOfStock ? theme.colors.gravy80 : theme.colors.gravy};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lineGrey};
  border-radius: ${theme.borders.borderRadius};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq({
    backgroundRepeat: 'no-repeat',
    fontWeight: ` ${theme.fontWeights.semibold}`,
    width: '100%'
  })}
`

export const StyledButton = styled(Button)`
  font-weight: ${theme.fontWeights.regular};
`

export const StyledOutOfStockIcon = styled.img<{ isOutOfStock: boolean }>`
  margin-right: ${({ isOutOfStock }) => isOutOfStock && theme.spacing.xxs};
  height: 16px;
  width: 16px;
  opacity: 0.8;
`
export const StyledOutOfStockSize = styled.span`
  display: flex;
  align-items: center;
`
