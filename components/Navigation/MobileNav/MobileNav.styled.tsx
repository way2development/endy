import styled from 'styled-components'
import { motion } from 'framer-motion'
import { mq, theme } from '../../../styles/theme'
import { Text } from '../../Text'
import Link from 'next/link'

export const StyledMobileMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  background: ${theme.colors.white};
  // TODO: Replace hard-coded pencil banner height with dynamic value.
  height: calc((100vh - 100%) - 61px);
  width: 100%;
  flex-direction: column;
  list-style-type: none;
  left: 0;
  right: 0;
  overflow-y: scroll;

  ${mq({
    display: ['flex', 'flex', 'none']
  })}
`

export const StyledHamburgerMenuBtn = styled.button`
  background: none;
  border: none;
  position: relative;
  z-index: 100;
  padding: 0;
  width: 1.75rem;

  ${mq({
    display: ['flex', 'flex', 'none']
  })}
`
export const StyledMobileMenuItem = styled(Text)`
  border-bottom: 1px solid ${theme.colors.lineGrey};
`
export const StyledMainMobileBtn = styled.button<{
  activeDropdown: boolean
  isSubLinkActive: boolean
}>`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${theme.spacing.s} ${theme.spacing.m};
  font-size: inherit;
  font-weight: ${({ activeDropdown, isSubLinkActive }) =>
    activeDropdown || isSubLinkActive
      ? `${theme.fontWeights.semibold}`
      : `${theme.fontWeights.regular}`};
`

export const StyledMainMobileLink = styled(Link)<{
  activeDropdown: boolean
  isSubLinkActive: boolean
  isSalePage: boolean
}>`
  color: ${({ isSalePage }) =>
    isSalePage ? theme.colors.rubine : theme.colors.gravy};
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${theme.spacing.s} ${theme.spacing.m};
  font-size: inherit;
  font-weight: ${({ activeDropdown, isSubLinkActive }) =>
    activeDropdown || isSubLinkActive
      ? `${theme.fontWeights.semibold}`
      : `${theme.fontWeights.regular}`};
`

export const StyledMobileDropdown = styled(motion.ul)`
  background-color: ${theme.colors.offWhite};
  padding: ${theme.spacing.m};
  list-style-type: none;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  > li:not(:last-child) {
    margin-bottom: ${theme.spacing.m};
  }
`

export const StyledCtaMobileText = styled(Text)`
  border-bottom: 1px solid rgba(36, 55, 70, 0.15);
  padding-bottom: ${theme.spacing.m};
`

export const StyledMobileSideLinks = styled.div`
  a {
    text-transform: capitalize;
    color: ${theme.colors.gravy70};
  }

  button {
    background: none;
    text-transform: uppercase;
    border: none;
  }
`
export const StyledGlobeIcon = styled.img`
  opacity: 0.7;
  margin-right: ${theme.spacing.xxs};
`

export const StyledExtoleMobileButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.m};
  text-decoration: none;
  border: none;
  background: none;
  color: ${theme.colors.gravy70};
  font-size: inherit;
  letter-spacing: var(--letter-spacing-1px);
  font-family: inherit;
`
