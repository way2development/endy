import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

import { Text } from '../Text'

export const StyledSection = styled.section`
 ${mq({
  marginTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
  marginBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
})}
`

export const StyledHeadingContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${theme.spacing.l};
  padding-bottom: ${theme.spacing.s};
  border-bottom: ${theme.borders.borderWidth} solid rgba(36, 56, 71, 0.5);
  ${mq({
  marginBottom: [theme.spacing.m, theme.spacing.m, theme.spacing.xl]
})}
`

export const StyledHeading = styled(Text)`
  margin: 0;
`

export const StyledImageContainer = styled.div<{
  spanValue: number
}>`
  border-radius: 2px;
  box-shadow: -1px 1px 3px rgba(36, 55, 70, 0.29);
  grid-column: ${(props) => `span ${props.spanValue}`};

  picture {
    height: 100%;
  }

  img {
    border-radius: 2px;
    height: 100%;
    object-fit: cover;
  }
`

// Don't show a placeholder image on mobile
export const StyledPlaceholderContainer = styled(StyledImageContainer)`
  ${mq({
  display: ['block', 'block', 'block']
})}
`

// Don't show a highlight image on desktop
export const StyledHighlightContainer = styled(StyledImageContainer)`
  ${mq({
  display: ['block', 'block', 'block']
})}
`
