import styled from 'styled-components'
import { theme } from '../../styles/theme'
import Link from 'next/link'

export const StyledAnchor = styled(Link)`
  display: block;
  border: 1px solid ${theme.colors.lineGrey};
  border-radius: ${theme.borders.borderRadius};
  background-color: ${theme.colors.white70};
  padding: ${theme.spacing.s} ${theme.spacing.m};
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    transition: translate 0.2s ease;
  }

  &:hover img {
    transform: translate(3px);
  }
`
