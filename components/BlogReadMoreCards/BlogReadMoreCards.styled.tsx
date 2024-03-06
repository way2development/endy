import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledCardLink = styled.a`
  cursor: pointer;
  :hover,
  :focus {
    opacity: 0.6;
  }
`

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${theme.spacing.l};
`

export const StyledCardHeading = styled(Text)`
  ${mq({
    marginBottom: [`${theme.spacing.xs}`, '', `${theme.spacing.m}`]
  })};
`

export const StyledHeading = styled(Text)`
  padding: ${theme.spacing.xl} 0 ${theme.spacing.xs};
  border-bottom: 1px solid ${theme.colors.gravy}30;
`

export const StyledDate = styled(Text)`
  text-transform: uppercase;
  margin-bottom: 0;
`

export const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.s} 0 ${theme.spacing.m};

  a {
    line-height: initial;
  }
`

export const StyledBlogReadMoreCardContainer = styled.div`
  ${mq({
    display: ['block', 'grid', 'block'],
    gridTemplateColumns: ['', '1fr 1fr', 'initial'],
    columnGap: ['', `${theme.spacing.xl}`, 'initial'],
    alignItems: ['', 'flex-end', 'initial'],

    ['a:first-child']: {
      gridColumn: ['', '1 / 3', 'initial']
    }
  })}
`
