import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledWrapper = styled.section`
  ${mq({
    marginTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}
`

export const StyledHeading = styled(Text)<{ maxWidth: string[] }>`
  text-align: center;
  margin: 0 ${theme.spacing.m};

  ${mq({
    paddingBottom: [
      `${theme.spacing.l}`,
      `${theme.spacing.l}`,
      `${theme.spacing.l}`
    ]
  })};

  ${({ maxWidth }) => css`
    ${mq({
      maxWidth: maxWidth
    })};
  `};
`

export const StyledBadge = styled.div<{ paddingBottom: boolean }>`
  margin-top: ${theme.spacing.xs};
  max-width: 200px;
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? `${theme.spacing.l}` : '0'};
`

export const StyledCallOut = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mq({
    padding: [
      `${theme.spacing.xl} 0 ${theme.spacing.xl}`,
      `${theme.spacing.xl} 0 ${theme.spacing.xl}`,
      `${theme.spacing.xxl} 0 ${theme.spacing.xxl}`
    ]
  })}
`

export const StyledCalloutPost = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
`

export const StyledMicrocopy = styled(Text)`
  text-align: center;
  margin: 0 ${theme.spacing.m};
  ${mq({
    marginTop: [
      `${theme.spacing.m}`,
      `${theme.spacing.m}`,
      `${theme.spacing.s}`
    ],
    maxWidth: ['330px', '550px', '650px']
  })}
`
