import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import {
  StyledSalePriceContainer,
  StyledPriceContainer
} from '../ShopModule/ShopModule.styled'
import { StyledSemibold } from '../../styles/global.styled'
import Link from 'next/link'

export const navLinkMixin = css<{
  isSubLinkActive?: boolean
  isDropdownExpanded?: boolean
  prefersReducedMotion?: boolean
}>`
  display: flex;
  position: relative;
  font-family: ${theme.fonts.calibre};
  line-height: 1.5;
  text-decoration: none;
  transition: ${({ prefersReducedMotion }) =>
    prefersReducedMotion ? 'none' : 'text-shadow 0.5s'};
  text-shadow: ${({ isSubLinkActive }) =>
    isSubLinkActive ? '-0.75px 0px 0.1px, -0.25px 0px' : 'none'};

  ${mq({
    height: ['auto', 'auto', '100%'],
    fontSize: ['16px', '', '19px']
  })}

  &:hover {
    ${mq({
      textShadow: ['none', 'none', '-0.75px 0px 0.1px, -0.25px 0px']
    })}
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 4px;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.rubine};
    transform: scaleX(0);
    transition: ${({ prefersReducedMotion }) =>
      prefersReducedMotion ? 'none' : 'all 0.5s'};
  }

  &:hover::before {
    ${mq({
      transform: ['scaleX(0)', 'scaleX(0)', 'scaleX(1)']
    })}
  }

  ${({ isSubLinkActive }) =>
    isSubLinkActive &&
    css`
      &::before {
        background-color: ${theme.colors.gravy70};
        transform: scaleX(1);
      }
    `}

  ${({ isDropdownExpanded }) =>
    isDropdownExpanded &&
    css`
      text-shadow: -0.75px 0px 0.1px, -0.25px 0px;

      &::before {
        background-color: ${theme.colors.rubine};
        transform: scaleX(1);
      }
    `}
`

export const StyledHomeLink = styled(Link)`
  width: 8rem;
  transition: all 0.5s;

  img {
    display: block;
  }

  ${mq({
    position: ['relative', 'relative', 'static'],
    zIndex: ['100', '100', 'auto']
  })}

  :hover {
    ${mq({
      opacity: ['1', '1', '0.6']
    })}
  }
`

export const StyledFeatureLink = styled(Link)<{ features: number }>`
  div {
    transition: all 0.5s;
  }

  :hover div {
    ${mq({
      opacity: ['1', '1', '0.7']
    })}
  }

  ${({ features }) => css`
    :last-child {
      ${mq({
        display: features >= 2 && ['none', 'flex', 'flex']
      })}
    }
  `}
`

export const StyledFeatureContent = styled.div`
  position: relative;
  ${StyledSemibold} {
    white-space: nowrap;
  }

  ${StyledPriceContainer} {
    padding: 0;
    display: inline;
  }

  ${StyledSalePriceContainer} {
    display: inline;
  }

  ${StyledSalePriceContainer} span, ${StyledPriceContainer} span {
    color: ${theme.colors.gravy80};
    font-weight: normal;

    ${mq({
      fontSize: ['13px', '13px', `${theme.spacing.m}`]
    })}
  }
`

export const StyledFrom = styled.span<{ productTitle: string }>`
  ${mq({
    margin: ['0 3px', '0 3px', '0 3px 0 0']
  })}
`

export const StyledFeatureCopy = styled(Text)<{ productTitle?: string }>`
  display: block;
  width: 100%;
  margin-top: ${theme.spacing.xxs};

  ${mq({
    display: ['flex', 'flex', 'block']
  })}
`

export const StyledFromPriceContainer = styled.div`
  width: 100%;
`

export const StyledSubLink = styled.span<{ isSubLinkActive: boolean }>`
  display: flex;
  font-weight: ${({ isSubLinkActive }) =>
    isSubLinkActive && `${theme.fontWeights.semibold}`};
`

export const StyledNav = styled.nav`
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.97);
  transition: all 0.25s ease;
  padding: 0 ${theme.spacing.s};
  position: sticky;
  top: 0;
  display: flex;
  z-index: 100;

  ${mq({
    boxShadow: ['none', 'none', '0px 2px 5px rgb(36 55 70 / 12%)'],
    padding: [
      `0 ${theme.spacing.s}`,
      `0 ${theme.spacing.s}`,
      `0 ${theme.spacing.m} 0 0`
    ],
    alignItems: ['center', 'center', 'stretch']
  })}

  /* TODO: use facepaint to only show after pseudo selector from mobile to desktop */
  @media only screen and (max-width: 1025px) {
    :after {
      content: '';
      box-shadow: 0px 2px 5px rgb(36 55 70 / 12%);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
`

export const StyledDesktopNavSide = styled.div`
  display: flex;
  align-items: center;
`

export const StyledSideLink = styled.span<{
  prefersReducedMotion?: boolean
  showOnDesktop?: boolean
}>`
  ${navLinkMixin}
  align-items: center;
  padding: ${theme.spacing.xs};

  ${({ showOnDesktop }) => css`
    ${mq({
      display: !showOnDesktop && ['flex', 'flex', 'none']
    })}
  `}
`

export const StyledCartButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: inherit;
  border: none;
  transition: all 0.5s;
  padding: 0;

  ${mq({
    position: ['relative', 'relative', 'static'],
    zIndex: ['100', '100', 'auto'],
    marginLeft: ['0', ' ', `${theme.spacing.m}`]
  })}

  :hover {
    ${mq({
      opacity: ['1', '1', '0.6']
    })}
  }
`

export const StyledCartCount = styled(Text)`
  position: absolute;
  top: 2px;
  left: 5px;
  width: 20px;
`

export const StyledFeatures = styled.div`
  display: flex;

  > *:not(:last-child) {
    margin-right: ${theme.spacing.m};
  }
`

export const StyledCtaLink = styled.span`
  :hover span {
    ${mq({
      borderBottom: [
        `2px solid ${theme.colors.gravy}`,
        `2px solid ${theme.colors.gravy}`,
        `2px solid ${theme.colors.rubine}`
      ]
    })}
  }
`
export const StyledLanguageToggleContainer = styled.div`
  position: absolute;
  align-items: center;
  z-index: 1;

  ${mq({
    display: ['flex', '', 'none'],
    right: ['2.95rem', '3.5rem', '']
  })}
`
