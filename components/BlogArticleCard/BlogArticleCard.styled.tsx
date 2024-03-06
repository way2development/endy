import styled from 'styled-components'
import { Text } from '../Text'
import { mq, theme } from '../../styles/theme'
import { Pagination } from '../Pagination'
import Link from 'next/link'

export const StyledCardLink = styled(Link)`
  padding-bottom: ${theme.spacing.xl};

  :hover {
    opacity: 0.7;
  }
`

export const StyledBlogsCardContainer = styled.div`
  ${mq({
    display: ['flex'],
    flexDirection: ['column'],
    paddingTop: [`${theme.spacing.m}`, '', `${theme.spacing.l}`],

    ['div:last-child']: {
      height: ['100%'],
      display: ['flex'],
      alignItems: ['flex-end'],
      flex: ['auto']
    }
  })}
`

export const StyledFormattedDate = styled(Text)`
  margin-bottom: ${theme.spacing.s};
  letter-spacing: ${theme.letterSpacing.s};
  text-transform: uppercase;
`

export const StyledHeader = styled(Text)`
  margin-bottom: ${theme.spacing.s};
`

export const StyledSubcopyText = styled(Text)`
  margin-bottom: ${theme.spacing.xs};
`

export const StyledGridContainer = styled.section`
  position: relative;

  & > div > div {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 0;
  }

  padding-bottom: ${theme.spacing.xl};

  ${mq({
    paddingTop: [`${theme.spacing.xl}`, `${theme.spacing.xxl}`, ''],
    paddingBottom: [`${theme.spacing.xl}`, `${theme.spacing.xl}`, '']
  })}
`

export const StyledPagination = styled(Pagination)`
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
`
