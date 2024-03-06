import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'

export const StyledWrapper = styled.header`
  ${mq({
    height: ['auto', '', '100%'],
    paddingTop: [`${theme.spacing.l}`, '', `${theme.spacing.xxl}`]
  })}
`

export const StyledImageContainer = styled.div`
  ${mq({
    margin: ['0 -20px', '0 -75px', 'initial']
  })}
`

export const StyledNavListItem = styled.li`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }
`

export const StyledNavList = styled.ul<{ isBreadcrumb?: boolean }>`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${theme.spacing.xxl};

  ${StyledNavListItem} {
    ${({ isBreadcrumb }) =>
      isBreadcrumb
        ? css`
            :not(:last-child):after {
              content: '–';
              padding: 0 5px;
            }
          `
        : css`
            padding: 0 ${theme.spacing.s};
          `}
  }
`
