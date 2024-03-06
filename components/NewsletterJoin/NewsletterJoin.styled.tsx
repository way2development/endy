import styled from 'styled-components'
import { Text } from '../Text'
import { mq, theme } from '../../styles/theme'
import { StyledButton } from '../Button/Button.styled'
//TODO: refactor using theme variables and facepaint where possible.

export const StyledNewsletterJoinWrapper = styled.div`
  display: block;
  padding-left: ${theme.spacing.m};
  margin-bottom: ${theme.spacing.m};

  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`
export const StyledHeaderText = styled(Text)`
  font-family: var(--calibre-semibold);
  font-weight: ${theme.fontWeights.semibold};
  text-align: left;
  padding-bottom: ${theme.spacing.xxs};
`

export const StyledSubtext = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledInput = styled.input`
  width: 100%;
  height: 41px;
  border: 1px solid #ccc;
  border-radius: 2px;
  right: 0;
  bottom: 0px;
  padding: 12.5px 15px;
  ::placeholder {
    color: var(--gravy-70);
    font-size: var(--font-size-micro);
  }
  @media screen and (min-width: 501px) {
    display: flex;
    align-items: center;
  }
`

export const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
`

export const StyledSubscribeButton = styled((props) => (
  <StyledButton {...props} />
))`
  justify-content: center;
  white-space: nowrap;
  height: 41px;
  display: flex;
  align-items: center;
  border-radius: 0 2px 2px 0;

  ${mq({
    maxWidth: ['134px', '', '108px']
  })}
`

export const StyledErrorMessageSpan = styled.span`
  font-family: var(--calibre-semibold);
  font-weight: var(--font-weight-semibold);
  font-size: 1rem;
  padding-left: ${theme.spacing.xs};
`
