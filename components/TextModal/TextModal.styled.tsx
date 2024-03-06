import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledHeading = styled(Text)`
  margin: ${theme.spacing.l} 0 ${theme.spacing.xs};
  text-align: center;
`

export const StyledSecondaryHeading = styled(Text)`
  margin-bottom: ${theme.spacing.m};
  text-align: center;
`

export const StyledHeadingContainer = styled.div`
  margin-bottom: ${theme.spacing.m};
  border-bottom: ${theme.borders.borderWidth} solid ${theme.colors.gravy70};
`

export const StyledSubcopy = styled(Text)`
  padding-bottom: ${theme.spacing.m};
  text-align: left;
`

export const StyledListContainer = styled.div`
  display: block;

  li {
    margin-bottom: ${theme.spacing.s};
    text-align: left;
  }
`

export const StyledMain = styled.div<{
  maxwidth?: string
}>`
  max-width: ${({ maxwidth }) => maxwidth || '50rem'};
  h4 {
    margin-bottom: ${theme.spacing.xs};
  }

  button {
    margin: ${theme.spacing.s} 0;
  }

  span:not(:last-child) {
    display: block;
    margin-bottom: ${theme.spacing.l};
    text-align: left;

    span {
      margin-bottom: ${theme.spacing.xs};
    }
  }

  p > span:last-child {
    text-align: center;
  }

  ${mq({
    padding: [`${theme.spacing.l} ${theme.spacing.m}`, `${theme.spacing.xl}`]
  })}
`

export const StyledCtaContainer = styled.div`
  margin-top: ${theme.spacing.m};
`

export const StyledButtonContainer = styled.div`
  text-align: center;
`
