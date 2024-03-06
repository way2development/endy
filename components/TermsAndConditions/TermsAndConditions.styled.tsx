import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledSection = styled.div`
  background-color: ${theme.colors.offWhite};
  ${mq({
    padding: [
      `${theme.spacing.xl} 0`,
      `${theme.spacing.l} 0`,
      `${theme.spacing.l} 0`
    ]
  })}
`

export const StyledWrapper = styled.div`
  margin: 0 auto;
  ${mq({
    width: ['100%', '100%', '66.6666%']
  })}
`

export const StyledHeading = styled(Text)`
  margin-bottom: ${theme.spacing.l};
  text-align: center;
`

export const StyledListContainer = styled.div`
  display: block;

  li {
    margin-bottom: ${theme.spacing.s};
    text-align: left;
  }
`
