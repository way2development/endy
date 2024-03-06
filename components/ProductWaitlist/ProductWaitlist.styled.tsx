import styled from 'styled-components'
import { StyledButton } from '../Button/Button.styled'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledWaitListWrapper = styled.div`
  height: 360px;
  padding: 30px 40px;
  ${mq({
    width: ['auto', '460px', '460px']
  })}
`

export const StyledSubscribeButton = styled(StyledButton)`
  width: 100%;
  margin-top: ${theme.spacing.m};
`
export const DisclaimerText = styled(Text)`
  text-align: left;
  margin: 14px 0;
`

export const HeaderText = styled(Text)`
  font-family: var(--calibre-semibold);
  font-weight: ${theme.fontWeights.semibold};
  text-align: left;
  margin-bottom: ${theme.spacing.m};
`

export const StyledInput = styled.input`
  font-size: 18px;
  width: 100%;
  height: 46px;
  border: 1px solid #ccc;
  ::placeholder {
    color: #757575;
  }
`

export const StyledDropdown = styled.select`
  width: 100%;
  height: 46px;
  border: 1px solid #ccc;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: ${theme.spacing.m};
`
