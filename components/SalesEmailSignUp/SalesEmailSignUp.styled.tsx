import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { Button } from '../Button'

export const StyledSignUpEmailContainer = styled.div`
  background-color: ${theme.colors.offWhite};
  border: 2px dotted ${theme.colors.gravy70};
  ${mq({
    margin: [
      `${theme.spacing.xl} 0`,
      `${theme.spacing.xl} 0`,
      `${theme.spacing.xxl} 0`
    ]
  })}
`

export const StyledEmailGridColWrapper = styled.div`
  padding: ${theme.spacing.l};
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mq({
    padding: [
      `${theme.spacing.l} ${theme.spacing.m}`,
      `${theme.spacing.l}`,
      `${theme.spacing.xxl}`
    ]
  })}
`

export const StyledNewsletterInputWrapper = styled.div`
  position: relative;
  display: flex;

  button {
    white-space: nowrap;
  }
`

export const StyledNewsletterInputBox = styled.input`
  padding: ${theme.spacing.s} ${theme.spacing.m};
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px 0px 0px 3px;
  margin-bottom: ${theme.spacing.m};
  ::placeholder {
    color: ${theme.colors.gravy70};
    font-size: var(--font-size-small);
  }
`

export const StyledNewsletterErrorMessageSpan = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  padding-left: ${theme.spacing.xs};
`

export const StyledNewsletterButton = styled(Button)`
  border-radius: 0px 3px 3px 0px;
  margin-bottom: ${theme.spacing.m};
`

export const StyledSignUpOfferTitle = styled(Text)`
  margin-bottom: ${theme.spacing.m};
  ${mq({
    textAlign: ['center', '', 'left']
  })}
`

export const StyledSignUpOfferSubText = styled(Text)`
  margin-bottom: ${theme.spacing.s};
  ${mq({
    textAlign: ['center', '', 'left']
  })}
`

export const StyledLink = styled.a`
  text-decoration: underline;
  text-decoration-color: ${theme.colors.gravy70};
`

export const StyledSalesImage = styled.div`
  picture,
  picture img {
    height: 100%;
    object-fit: cover;
  }
`
