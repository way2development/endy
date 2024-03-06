import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { StyledVisuallyHidden } from '../../styles/global.styled'

import styled from 'styled-components'
import { theme } from '../../styles/theme'

const StyledLoadingIcon = styled.div`
  width: 32px;
  height: 32px;
  border: 2px rgba(0, 0, 0, 0.25) solid;
  border-top: 2px ${theme.colors.rubine} solid;
  border-radius: 50%;
  margin: ${theme.spacing.m} auto;
  -webkit-animation: rotateCircle 0.6s infinite linear;
  animation: rotateCircle 0.6s infinite linear;

  @keyframes rotateCircle {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(359deg);
    }
  }
`

const StyledLoadingSpinnerContainer = styled.div`
  padding: ${theme.spacing.m};
`

interface LoadingSpinnerProps {
  locale: Locale
}

export const LoadingSpinner = ({ locale }: LoadingSpinnerProps) => {
  return (
    <StyledLoadingSpinnerContainer>
      <StyledVisuallyHidden role='alert' aria-live='assertive'>
        {dictionary[locale].contentIsLoading}
      </StyledVisuallyHidden>
      <StyledLoadingIcon></StyledLoadingIcon>
    </StyledLoadingSpinnerContainer>
  )
}
