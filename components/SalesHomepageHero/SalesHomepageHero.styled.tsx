import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledSplitScreen, StyledBadge } from '../../styles/global.styled'
import { Text } from '../Text'

export const StyledSaleContent = styled.div`
  h1 {
    margin: 0 auto ${theme.spacing.xs};
    ${mq({
      maxWidth: ['', '', '437px']
    })}
  }

  picture {
    width: min(80%, 720px);
    margin: 0 auto;
    padding-bottom: ${theme.spacing.xs};
    padding-top: ${theme.spacing.s};
  }
`

export const StyledSubcopy = styled.div`
  margin-bottom: ${theme.spacing.m};
  text-align: center;

  picture {
    padding-top: 0;
  }

  img {
    margin: 0 auto;
    max-width: 330px;
  }

  /* TODO: Sketch file typography does not fit within current typography font sizes. Review once typography has been added to codebase. */
  ${mq({
    fontSize: [' 1.25rem', ' 1.25rem', '1.375rem']
  })}
`

export const StyledImgContainer = styled.div`
  position: relative;
`

export const StyledSplitScreenMicrocopy = styled(Text)`
  margin: ${theme.spacing.m} auto 0;
`

export const StyledMicrocopy = styled(Text)`
  margin: 0 auto;
  height: 1rem;

  ${mq({
    padding: [`${theme.spacing.m} 0 ${theme.spacing.xl}`, ``, ``]
  })}
`

export const StyledInnerWrapper = styled.div`
  text-align: center;
  height: 100%;
  flex-direction: column;
  padding-bottom: ${theme.spacing.m};
  ${mq({
    display: ['', '', 'flex'],
    justifyContent: ['', '', 'center'],
    alignItems: ['', '', 'center']
  })}
`

export const StyledBadgeVariant = styled(StyledBadge)<{
  badgeVariant?: string
}>`
  ${({ badgeVariant }) =>
    badgeVariant === 'Pill' &&
    css`
      img {
        position: absolute;
        transform: rotate(0deg);
        ${mq({
          height: ['112px', '144px', '177px'],
          width: ['75px', '96px', '119px'],
          top: [theme.spacing.l, '', theme.spacing.xl],
          right: [theme.spacing.l, '', theme.spacing.xl]
        })}
      }
    `}

  ${({ badgeVariant }) =>
    badgeVariant === 'Wide Pill' &&
    css`
      img {
        position: absolute;
        transform: rotate(0deg);
        ${mq({
          height: ['65px', '114px', ''],
          width: ['158px', '277px', ''],
          top: [theme.spacing.m, '', theme.spacing.xl],
          right: [theme.spacing.m, '', theme.spacing.xl]
        })}
      }
    `}
`

// Styles for Split Screen Layout
export const StyledSplitScreenContainer = styled(StyledSplitScreen)`
  ${StyledSaleContent} {
    padding: ${theme.spacing.m};
  }
  ${StyledImgContainer} {
    ${mq({
      height: ['240px', '450px', '100%']
    })}
  }
`

// Styles for One Block Layouts (Faded & Solid)
export const StyledOneBlockContainer = styled.div<{
  variant: string
}>`
  position: relative;
  text-align: center;
  ${({ variant }) =>
    variant === 'One Block Fade' &&
    css`
      /* Background Image */
      > div {
        ${mq({
          paddingBottom: ['0', theme.spacing.xl, theme.spacing.xl],
          paddingTop: [theme.spacing.s, '', theme.spacing.m]
        })}
      }
    `}
  ${({ variant }) =>
    variant === 'One Block' &&
    css`
      /* Background Image */
      > div {
        ${mq({
          paddingBottom: ['0', theme.spacing.xl, theme.spacing.xl],
          paddingTop: [theme.spacing.s, '', theme.spacing.m]
        })}
      }
    `}
  ${StyledSaleContent} {
    padding: 0 ${theme.spacing.m};
    position: relative;
    bottom: -1rem;
    z-index: 10;
    button {
      margin-bottom: ${theme.spacing.m};
    }
  }

  ${StyledImgContainer} {
    margin: 0 auto;
    ${({ variant }) =>
      variant === 'One Block Fade' &&
      css`
        max-width: 1200px;
        width: auto;
        ${mq({
          marginLeft: ['-20px', 'auto', ''],
          marginRight: ['-20px', 'auto', ''],
          height: ['334px', '312px', '520px']
        })}
        }
      `}
    ${({ variant }) =>
      variant === 'One Block' &&
      css`
        max-width: 1200px;
        width: auto;
        ${mq({
          marginLeft: ['-20px', 'auto', ''],
          marginRight: ['-20px', 'auto', ''],
          height: ['240px', '284px', '556px']
        })}
      `}
  }
`
