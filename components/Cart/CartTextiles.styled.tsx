import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { StyledProductPill } from '../PromoPill/PromoPill.styled'

export const StyledWrapper = styled.div`
  margin-top: 1rem;
`

export const StyledTextileAnchor = styled.span`
  position: relative;
  display: block;
  opacity: 1;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }

  picture {
    img {
      margin: 0;
    }
  }

  ${StyledProductPill} {
    position: absolute;
    top: -10px;
    right: 50%;
    transform: translateX(50%);
  }
`

export const StyledPrimaryTextile = styled.div`
  grid-column: span 2;
  grid-row: 1;
`

export const StyledSecondaryTextile = styled.div`
  grid-column: 1;
  grid-row: 2;
`

export const StyledTertiaryTextile = styled.div`
  grid-column: 2;
  grid-row: 2;
`

export const StyledProductHeading = styled.div<{ isOnSale: boolean }>`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  padding: ${({ isOnSale }) =>
    isOnSale
      ? `${theme.spacing.s} ${theme.spacing.m} 0`
      : `${theme.spacing.xs} ${theme.spacing.m} 0`};
`
