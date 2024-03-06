import styled from 'styled-components'
import { Text } from '../Text'
import { theme } from '../../styles/theme'

export const StyledFigure = styled.figure<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ backgroundColor }) => `${backgroundColor}80`};
  padding: ${theme.spacing.xl};
  margin: 0;
`
export const StyledBlockQuote = styled(Text)`
  margin: 0 0 ${theme.spacing.s};
  font-family: ${theme.fonts.wulkan};
  font-weight: 500;
  font-style: italic;
  line-height: 1.5;
`
export const StyledAuthor = styled.span`
  margin-left: ${theme.spacing.xs};
  color: ${theme.colors.gravy80}!important;
`
export const StyledAuthorContainer = styled.div`
  display: flex;
  align-items: center;
`
