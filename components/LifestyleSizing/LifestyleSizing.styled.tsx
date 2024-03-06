import styled from 'styled-components'

import { Text } from '../Text'

import { mq, theme } from '../../styles/theme'

export const StyledSection = styled.section`
  ${mq({
    marginTop: ['32px', '32px', '48px']
  })}
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
    gap: ['', '', '6rem'],
    justifyContent: ['', '', 'space-between']
  })}
`

export const StyledContentContainer = styled.div`
  ${mq({
    textAlign: ['center', 'center', 'left'],
    maxWidth: ['', '', '400px']
  })}
`

export const StyledHeading = styled(Text)`
  ${mq({
    marginBottom: [
      `${theme.spacing.m}`,
      `${theme.spacing.m}`,
      `${theme.spacing.xl}`
    ]
  })}
`

export const StyledSubcopy = styled(Text)<{ numOptions: number }>`
  ${mq({
    //@TODO: Fix non-critical typescript bug with props, for now ignore.
    marginBottom: [
      `${theme.spacing.m}`,
      `${theme.spacing.m}`,
      //@ts-ignore
      (props) => (props.numOptions > 1 ? theme.spacing.m : 0)
    ]
  })}
`

export const StyledImageGroup = styled.div<{ numImages: number }>`
  ${mq({
    //@TODO: Fix non-critical typescript bug with props, for now ignore.
    //@ts-ignore
    gap: [(props) => (props.numImages === 2 ? '4rem' : `${theme.spacing.m}`)],
    display: ['flex'],
    flexDirection: ['column', 'row'],
    justifyContent: ['', 'center'],
    width: ['', '', '100%']
  })}
`

export const StyledRoomLayout = styled.div`
  ${mq({
    textAlign: 'center'
  })}
`

export const StyledImageContainer = styled.div`
  ${mq({
    display: ['', '', 'flex'],
    maxWidth: ['255px', '310px'],
    marginRight: 'auto',
    marginLeft: 'auto'
  })}
`

export const StyledImageLabel = styled(Text)`
  ${mq({
    fontWeight: theme.fontWeights.semibold,
    margin: [
      `${theme.spacing.xs} auto 0 auto`,
      `${theme.spacing.xs} auto 0 auto`
    ],
    maxWidth: ['', '140px', '180px']
  })}
`

// Hide mobile radio buttons on desktop
export const StyledMobileButtonGroup = styled.div`
  ${mq({
    display: ['', '', 'none'],
    marginTop: [`${theme.spacing.l}`]
  })}
`

// hide desktop radio buttons on mobile
export const StyledDesktopButtonGroup = styled.div`
  ${mq({
    display: ['none', 'none', 'block'],
    marginTop: ['', '', `${theme.spacing.xxxl}`]
  })}
`

export const StyledVariantLabel = styled.label<{ selected: boolean }>`
  background: ${(props) => (props.selected ? theme.colors.gravy : '')};
  border: 1px solid;
  border-color: ${theme.colors.gravy};
  color: ${(props) =>
    props.selected ? theme.colors.white : theme.colors.gravy};
  font-weight: 600;
  margin-bottom: 0;
  padding: ${theme.spacing.s};
  text-align: center;
  text-transform: uppercase;
  transition: var(--btn-transition);
  /* Required to anchor the location of the hidden input with the label  */
  position: relative;

  &:hover {
    background: ${theme.colors.gravy};
    color: ${theme.colors.white};
  }
`

export const StyledFieldset = styled.fieldset`
  display: grid;
  grid-gap: ${theme.spacing.m};
  grid-template-columns: 1fr 1fr;
`
