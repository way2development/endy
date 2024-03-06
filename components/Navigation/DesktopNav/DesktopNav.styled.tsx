import styled from 'styled-components'
import { mq, theme } from '../../../styles/theme'
import { motion } from 'framer-motion'
import { navLinkMixin } from '../Navigation.styled'
import Link from 'next/link'

export const StyledMainMenuList = styled.ul`
  list-style-type: none;

  li:not(:last-child) {
    margin-right: ${theme.spacing.m};
  }

  ${mq({
    display: ['none', 'none', 'flex']
  })}
`

// TODO: Move this to the global styles
export const StyledToolTip = styled.span`
  position: relative;
  cursor: default;
`

export const StyledToolTipText = styled.span`
  visibility: hidden;
  background: ${theme.colors.white};
  position: absolute;
  top: 15px;
  border: 1px solid ${theme.colors.lineGrey};
  z-index: 10;
  padding: 10px;
  right: 0;
  min-width: 10rem;
  line-height: 1;
`

export const StyledExtoleDesktop = styled.button`
  border: none;
  background: none;
  align-items: center;
  transition: all 0.2s ease;

  &:hover ${StyledToolTip} > ${StyledToolTipText} {
    visibility: visible;
  }

  ${StyledToolTip}:hover > ${StyledToolTipText} {
    visibility: auto;
  }

  & > ${StyledToolTip} ${StyledToolTipText} {
    border: solid 1px ${theme.colors.gravy};
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  }

  ${mq({
    display: ['none', 'none', 'flex']
  })}
`

export const StyledDropdown = styled(motion.div)`
  background-color: ${theme.colors.offWhite};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  top: 100%;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgb(36 55 70 / 12%);
  display: flex;
`

export const StyledSubLinksList = styled.ul`
  list-style-type: none;
  display: grid;
  gap: ${theme.spacing.m};
  align-content: center;
  justify-content: center;
  // adjusts number of rows in desktop dropdown for product links
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column;

  a,
  span {
    transition: all 0.5s;
  }

  a:hover {
    color: ${theme.colors.rubine};
  }
`

export const StyledInnerDropdown = styled.div<{
  productLinksLength: number
}>`
  max-width: 990px;
  display: grid;
  grid-template-columns: ${({ productLinksLength }) =>
    productLinksLength > 4 ? '1fr 0.6fr' : '1fr 1.5fr'};
  align-items: start;
`

export const StyledMainMenuBtn = styled.button<{
  isSubLinkActive: boolean
  isDropdownExpanded: boolean
  prefersReducedMotion: boolean
}>`
  background: none;
  border: none;
  align-items: center;
  color: ${theme.colors.gravy};

  ${navLinkMixin}
`
export const StyledMainMenuLink = styled(Link)<{
  isSubLinkActive: boolean
  prefersReducedMotion: boolean
  isSalePage: boolean
}>`
  background: none;
  border: none;
  align-items: center;
  padding: 0 ${theme.spacing.xxs};
  color: ${({ isSalePage }) =>
    isSalePage ? theme.colors.rubine : theme.colors.gravy};

  &:hover {
    text-shadow: -0.75px 0px 0.1px, -0.25px 0px;

    &::before {
      background-color: ${theme.colors.rubine};
      transform: scaleX(1);
    }
  }

  ${navLinkMixin}
`

export const StyledChevronIcon = styled.img`
  margin-left: ${theme.spacing.xxs};
`

export const StyledDesktopNavSideLinks = styled.div`
  height: 100%;

  ${mq({
    display: ['none', 'none', 'flex']
  })}
`
