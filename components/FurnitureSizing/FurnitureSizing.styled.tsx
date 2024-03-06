import styled from 'styled-components'

import { Text } from '../Text'

import { mq, theme } from '../../styles/theme'

export const StyledSection = styled.section`
  // Target the background image div, a direct child of the section
  > div {
    ${mq({
      paddingTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
      paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
    })}
  }
`

// Wraps text content and image
export const StyledWrapper = styled.div`
  ${mq({
    alignItems: ['', '', 'center'],
    display: ['', '', 'flex'],
    gap: ['', '', '3rem'],
    justifyContent: ['', '', 'space-between'],
    margin: ['0 auto'],
    maxWidth: ['450px', '600px', 'none']
  })}
`

export const StyledDimensionContainer = styled.div`
  ${mq({
    marginBottom: ['', '', '2rem']
  })}
`

export const StyledHeading = styled(Text)`
  text-align: center;

  ${mq({
    textAlign: ['center', 'center', 'left']
  })}
`

// Hide mobile radio buttons on desktop
// position relative is critical here to scope hidden radio buttons
export const StyledMobileButtonGroup = styled.div`
  position: relative;
  ${mq({
    display: ['', '', 'none']
  })}
`

// hide desktop radio buttons on mobile
// position relative is critical here to scope hidden radio buttons
export const StyledDesktopButtonGroup = styled.div`
  position: relative;
  ${mq({
    display: ['none', 'none', 'block']
  })}
`

export const StyledImageContainer = styled.div`
  ${mq({
    display: ['', '', 'flex'],
    width: ['', '', 'calc(50% - 1.5rem)'],
    margin: [`${theme.spacing.xl} auto`, `${theme.spacing.xl} auto`, 0]
  })}
`

export const StyledDimension = styled.div`
  border-bottom: 1px solid ${theme.colors.gravy30};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xxs} 0;
`

export const StyledContentContainer = styled.div`
  ${mq({
    maxWidth: ['', '', '450px'],
    width: ['', '', 'calc(50% - 1.5rem)']
  })}
`
