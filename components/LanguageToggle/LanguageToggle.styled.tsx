import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

export const StyledLanguageToggleButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  font-weight: ${({ isActive }) =>
    isActive ? theme.fontWeights.bold : theme.fontWeights.regular};

  ${mq({
    color: [theme.colors.gravy, theme.colors.gravy, theme.colors.white],
    padding: [theme.spacing.xxs, '', theme.spacing.xs]
  })}

  :hover {
    opacity: 0.7;
    transition: all 0.5s ease;
  }
`

export const StyledVerticalLine = styled.div`
  width: 1px;
  height: 15px;
  display: inline-block;

  ${mq({
    backgroundColor: [
      theme.colors.gravy,
      theme.colors.gravy,
      theme.colors.white
    ],
    margin: [`0 ${theme.spacing.xxxs}`, '', '']
  })}
`
