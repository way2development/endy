import styled, { css } from 'styled-components'
import { theme, mq } from '../../styles/theme'

export const StyledBadgeTooltip = styled.div`
  visibility: hidden;
`

export const StyledBadgeContainer = styled.div<{ tooltip: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;

  ${({ tooltip }) =>
    tooltip &&
    css`
      cursor: default;
      position: relative;
      display: inline-block;

      &:hover {
        ${StyledBadgeTooltip} {
          visibility: visible;
        }
      }

      ${StyledBadgeTooltip} {
        background: var(--white);
        width: 225px;
        display: block;
        position: absolute;
        padding: ${theme.spacing.m};
        border: 1px solid var(--line-grey);
        transition: all 0.2s ease;
        z-index: 10;
        ${mq({
          right: ['-40px', '-145px', '-210px'],
          top: ['96px', '42px', '90px']
        })}
      }
    `}
`

export const StyledLink = styled.a<{ tooltip: boolean }>`
  background-color: transparent;
  border: none;
  &:hover {
    opacity: ${({ tooltip }) => (tooltip ? '1' : '0.7')};
  }
`
