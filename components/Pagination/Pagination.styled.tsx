import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

interface StyledPaginationProps {
  dynamicPadding?: string
}

export const StyledIndex = styled(Text)`
  ${mq({
    textAlign: ['center', 'center', 'left'],
    marginBottom: ['', '', `${theme.spacing.s}`]
  })}
`

export const StyledPagination = styled.div<StyledPaginationProps>`
  padding: ${({ dynamicPadding }) => dynamicPadding || theme.spacing.l} 0 0;
`

export const StyledPaginationButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq({
    marginTop: [`${theme.spacing.m}`, '0', '0']
  })}
`

export const StyledPaginationButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  display: flex;

  &:hover {
    opacity: 0.6;
  }
`

export const StyledPageNumberContainer = styled.div`
  display: flex;
  margin-left: ${theme.spacing.l};

  button {
    min-width: ${theme.spacing.xl};
  }
`

export const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${mq({
    flexDirection: ['column', 'row', '']
  })}
`
