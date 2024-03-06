import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

export const StyledTooltip = styled.div`
  cursor: default;
  position: relative;
  display: inline-block;

  :hover > span,
  :active {
    visibility: visible;
  }

  img {
    opacity: 0.7;
    position: relative;
    margin: 0 ${theme.spacing.xxs};
  }
`

export const StyledMessageContainer = styled.span(
  ({
    top,
    right,
    bottom,
    left
  }: {
    top: string | undefined
    right: string | undefined
    bottom: string | undefined
    left: string | undefined
  }) => {
    return mq({
      visibility: ['hidden'],
      background: [`${theme.colors.white}`],
      width: ['185px'],
      display: ['block'],
      position: ['absolute'],
      padding: [`${theme.spacing.s}`],
      border: [`1px solid ${theme.colors.lineGrey}`],
      transition: ['all 0.2s ease'],
      zIndex: [100],
      top: [`${top ? top : '15px'}`],
      right: [`-10px`, `${right ? right : '-185px'}`, '']
    })
  }
)

export const StyledErrorTooltip = styled.div<{
  showTooltip: boolean
  isInline: boolean
  top?: string
  left?: string
}>`
  display: flex;
  background-color: #f6e8e7;
  padding: 0.5rem 1rem;
  opacity: ${({ showTooltip }) => (showTooltip ? 1 : 0)};
  position: absolute;
  top: ${({ top }) => (top ? `${top}` : 'initial')};
  left: ${({ left }) => (left ? `${left}` : 'initial')};
  border: 2px ${theme.colors.errorRed} solid;
  border-radius: 2px;
  box-shadow: 5px 5px 10px 0px rgb(0 0 0 / 20%);
  transition: opacity 0.5s;
  z-index: 89;
  pointer-events: none;
  transform: ${({ isInline }) => (isInline ? '' : 'translateX(-50%)')};

  :after,
  :before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #f6e8e7;
    position: absolute;
    content: '';
    top: -10px;
    left: 10%;
    width: 0;
    height: 0;
  }

  :before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${theme.colors.errorRed};
    border-width: 13px;
    margin-top: -4px;
    margin-left: 3px;
    top: -9px;
  }

  :after {
    margin-top: 0;
    margin-left: 6px;
    border-bottom: 11px solid #f6e8e7;
  }
`
