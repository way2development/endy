import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const StyledTextBadge = styled.div`
  display: flex;
  margin: ${theme.spacing.l} 0;
`
export const StyledIconBadge = styled.div`
  margin-right: ${theme.spacing.m};
`
export const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  h4 {
    margin-bottom: 0;
  }

  p {
    margin: 0;
  }
`
