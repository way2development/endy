import { Text } from '../Text'
import { theme } from '../../styles/theme'
import styled from 'styled-components'

export const StyledText = styled(Text)`
  text-transform: uppercase;
  letter-spacing: ${theme.letterSpacing.m};
  margin-right: ${theme.spacing.m};
`
export const StyledSocialIcons = styled.ul`
  display: flex;
  li {
    list-style: none;
    margin-right: ${theme.spacing.m};
    &:last-child {
      margin-right: 0;
    }
  }

  img {
    opacity: 70%;
    &:hover {
      opacity: 60%;
    }
  }
`

export const SocialSharesContainer = styled.div`
  display: flex;
`
