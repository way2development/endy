import styled from 'styled-components'
import { Text } from '../Text'
import { theme, mq } from '../../styles/theme'
import { Button } from '../Button'

export const StyledNewsletterInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StyledNewsletterErrorMessageSpan = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  padding-left: ${theme.spacing.xs};
`

export const StyledNewsletterContainer = styled.div`
  background-image: url('https://cdn.sanity.io/images/d0kd7r9c/production/e959ccc8aaf8300d22f5c4ac119e4305df8a48be-758x690.jpg');
  background-size: cover;
  height: 345px;
  width: 100%;
  padding: ${theme.spacing.m};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const StyledNewsletterTitle = styled(Text)`
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.white};
  ${mq({
    textAlign: ['', 'center', 'left']
  })}
`

export const StyledNewsletterDescription = styled(Text)`
  margin: 0px 0px ${theme.spacing.m} 0px;
  color: ${theme.colors.white};
  ${mq({
    textAlign: ['', 'center', 'left']
  })}
`

export const StyledNewsletterInputBox = styled.input`
  padding: ${theme.spacing.s} ${theme.spacing.m};
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: ${theme.borders.borderRadius};
  margin-bottom: ${theme.spacing.m};
  ::placeholder {
    color: ${theme.colors.gravy70};
    font-size: var(--font-size-p);
  }
`

export const StyledNewsletterButton = styled(Button)`
  padding: ${theme.spacing.s} ${theme.spacing.m};
  width: 100%;
`
