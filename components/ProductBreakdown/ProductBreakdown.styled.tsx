import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

import { Text } from '../Text'

export const StyledSection = styled.section`
  // Target the background image div, a direct child of the section
  > div {
    ${mq({
      paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
      paddingTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
    })}
  }
`

export const StyledHeadingContainer = styled.div`
  text-align: center;
  padding-bottom: 0 !important;
`

export const StyledToggleContainer = styled.button<{
  showDefaultProduct: boolean
}>`
  width: 222px;
  height: 48px;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  border-radius: 24px;
  border: none;
  background-color: ${theme.colors.gravy10};
  position: relative;

  ::before {
    content: '';
    position: absolute;
    transition: left 0.15s ease, right 0.15s ease;
    background-color: ${theme.colors.gravy};
    height: 44px;
    width: 111px;
    border-radius: 24px;
    left: ${({ showDefaultProduct }) => (showDefaultProduct ? '1%' : `49%`)};
  }
`

export const StyledToggleLeft = styled(Text)<{
  showDefaultProduct: boolean
}>`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: ${({ showDefaultProduct }) =>
    showDefaultProduct
      ? `${theme.fontWeights.semibold}`
      : `${theme.fontWeights.regular}`};
  color: ${({ showDefaultProduct }) =>
    showDefaultProduct ? `${theme.colors.white}` : `${theme.colors.gravy}`};
  letter-spacing: ${theme.letterSpacing.s};
  vertical-align: middle;
  margin: 0 auto;
  z-index: 10;
`

export const StyledToggleRight = styled(Text)<{
  showDefaultProduct: boolean
}>`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: ${({ showDefaultProduct }) =>
    showDefaultProduct
      ? `${theme.fontWeights.regular}`
      : `${theme.fontWeights.semibold}`};
  color: ${({ showDefaultProduct }) =>
    showDefaultProduct ? `${theme.colors.gravy}` : `${theme.colors.white}`};
  letter-spacing: ${theme.letterSpacing.s};
  vertical-align: middle;
  margin: 0 auto;
  z-index: 10;
`

export const StyledButtonContainer = styled.div<{
  active: boolean
  lineAnimation: boolean
  x: number
  y: number
}>`
  left: ${(props) => (props.y ? `${props.x}%` : '')};
  position: absolute;
  right: 0;
  top: ${(props) => (props.y ? `${props.y}%` : '')};

  /* TODO: 
  While in progress on this module, Facepaint was not removing the line animation for small and medium screen widths  
  Use facepaint to show :after on desktop only
  */
  @media only screen and (min-width: 1025px) {
    :after {
      border-bottom: 2px solid ${theme.colors.rubine};
      content: ${(props) =>
        props.active && props.lineAnimation ? "''" : 'none'};
      left: 30px;
      position: absolute;
      transition: all 0.15s ease;
      top: 50%;
      width: ${(props) => (props.active ? '100%' : '0')};
    }
  }
`

export const StyledHotspotButton = styled.button<{
  active: boolean
}>`
  background: ${(props) =>
    props.active ? theme.colors.rubine : theme.colors.white};
  border: 2px solid ${theme.colors.rubine};
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(36, 55, 70, 0.5);
  color: ${(props) =>
    props.active ? theme.colors.white : theme.colors.rubine};
  height: 30px;
  width: 30px;
  position: relative;
  padding: 0;
  transition: ${theme.transitions.button};

  &:hover {
    background: ${theme.colors.rubine};
    color: ${theme.colors.white};
  }
`

export const StyledFlex = styled.div`
  ${mq({
    display: ['', '', 'flex'],
    alignItems: ['', '', 'center']
  })}
`

export const StyledImageWrapper = styled.div`
  ${mq({
    width: ['', '', '60%']
  })}
`

export const StyledImageContainer = styled.div`
  position: relative;
`

export const StyledPicture = styled.picture`
  display: block;
`

export const StyledImage = styled.img`
  display: block;
`

export const StyledContentContainer = styled.div`
  ${mq({
    marginTop: [`${theme.spacing.l}`, `${theme.spacing.l}`, '0'],
    width: ['', '', '40%']
  })}

  height: 100%;
  position: relative;
`

export const StyledContent = styled.div<{
  active: boolean
}>`
  ${mq({
    alignItems: ['', 'center', ''],
    display: ['', 'flex', 'block'],
    gap: ['', `${theme.spacing.l}`, ''],
    paddingLeft: ['', '', `${theme.spacing.xxxl}`]
  })}

  display: block;
  left: 0;
  opacity: ${(props) => (props.active ? '1' : '0')};
  position: ${(props) => (props.active ? 'relative' : 'absolute')};
  top: 0;
  transition: 0.15s ease-out opacity;
  z-index: ${(props) => (props.active ? '80' : '0')};

  // contains flexed text and optional image content
  div {
    ${mq({
      [':not(:only-child)']: {
        width: ['', '50%', '100%']
      }
    })}

    picture {
      ${mq({
        padding: [`0 ${theme.spacing.xxs}`, '0', '']
      })}
    }
  }
`

export const StyledSubtext = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledMicrocopy = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`
