import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { StyledButton } from '../Button/Button.styled'

export const StyledShippingMessage = styled.div`
  padding-top: ${theme.spacing.s};
`

export const StyledIndicator = styled.span`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-right: ${theme.spacing.xxs};
  background-color: ${(props) => props.color};
`

export const StyledForm = styled.form`
  width: 100%;

  legend {
    width: 100%;
    > div {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  input {
    border-radius: ${theme.borders.borderRadius};
    min-height: 48px;
    border: 1px solid ${theme.borders.borderColor};
    border-right: none;
    width: 100%;
    color: ${theme.colors.gravy70};
  }
`
export const StyledSubmitButton = styled(StyledButton)`
  display: inline-block;
  border-radius: 0px 5px 5px 0px;
  box-shadow: none;
`

export const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${theme.spacing.s} 0;
`

export const StyledEstimatedDeliveryDate = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  white-space: nowrap;
`

export const StyledToggleButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  text-decoration: underline;
  color: ${theme.colors.gravy};
  text-decoration: underline;
  transition: all 0.5s ease;
  ${mq({
  fontSize: ['13px', '13px', '16px']
})}
`
