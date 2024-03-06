import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

export const StyledAnchor = styled.a`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 20px;
  width: fit-content;
  padding-top: ${theme.spacing.xs};

  &:hover {
    opacity: 1;
  }

  /* custom positioning for the tooltip  */
  div:last-of-type {
    ${mq({
      top: ['2.6px', '', '2px']
    })}
  }
`

export const StyledReviewsMicrocopy = styled.p`
  color: ${theme.colors.gravy70};
  font-size: var(--font-size-micro);
  margin: 0 0 0 5px;
`

export const StyledUnderlineLink = styled.span`
  text-decoration: underline;

  :hover {
    opacity: 0.7;
    transition: ${theme.transitions.button};
  }
`
