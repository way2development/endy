import styled from 'styled-components'
import { Text } from '../Text'
import { theme } from '../../styles/theme'

export const StyledReview = styled.div`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.m};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > *:not(:last-child) {
    margin-bottom: ${theme.spacing.m};
  }
`

export const StyledHeading = styled(Text)`
  margin-bottom: 0;
  max-width: 70%;
`

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledCustomer = styled(Text)`
  display: flex;
`

export const StyledLocation = styled.img`
  margin: 0 ${theme.spacing.xxs} 0 ${theme.spacing.xs};
`

export const StyledPillContainer = styled.div`
  margin: unset !important;

  span {
    margin: unset;
    margin-bottom: ${theme.spacing.m};
  }
`
