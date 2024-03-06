import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledProductPill } from '../PromoPill/PromoPill.styled'
import { Text } from '../Text'
import { StyledBadge, StyledPageWidth } from '../../styles/global.styled'

export const StyledHeroContainer = styled.div`
  width: 100%;
  position: relative;
  /* background image */
  > div {
    background-position: top;
    align-items: center;
    padding: 0;
    ${mq({
      minHeight: ['', '', '500px'],
      display: ['', '', 'flex']
    })}
  }
`
export const StyledLifeStyleImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* TODO: is there a better way to have the lifestyle image bleed out of StyledPageWidth? */
  ${mq({
    marginLeft: ['-20px', '-75px', 'auto'],
    marginRight: ['-20px', '-75px', 'auto'],
    paddingLeft: ['0', '0', `${theme.spacing.xl}`],
    position: ['', '', 'absolute'],
    top: ['', '', '0'],
    right: ['', '', '0'],
    height: ['', '', '100%'],
    width: ['', '', '65%'],
    maxWidth: ['', '', '1000px']
  })}
  /* Lifestyle Image */
  picture {
    width: 100%;
    ${mq({
      height: ['auto', 'auto', '100%']
    })}
    img {
      object-fit: cover;
      object-position: top left;
      height: 100%;
      width: 100%;
    }
  }
`
export const StyledTextContainer = styled.div<{
  hasSubcopy: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${mq({
    textAlign: ['center', 'center', 'left'],
    marginRight: ['0', '', `${theme.spacing.m}`] // TODO: added for the Black Friday Sale 1123; remove after!
  })}

  ${({ hasSubcopy }) =>
    hasSubcopy
      ? css`
          padding: ${theme.spacing.m} 0;
        `
      : css`
          ${mq({
            padding: [
              `${theme.spacing.xl} ${theme.spacing.m}`,
              `${theme.spacing.xl} ${theme.spacing.m}`,
              `${theme.spacing.xl} ${theme.spacing.l}`
            ]
          })}
        `}

  h1 {
    margin-bottom: ${theme.spacing.m};
  }

  ${StyledProductPill} {
    ${mq({
      margin: ['auto', 'auto', 'unset'],
      marginBottom: [
        `${theme.spacing.s}`,
        `${theme.spacing.s}`,
        `${theme.spacing.s}`
      ]
    })}
  }
`

export const StyledCountdownTimer = styled.div`
  padding: ${theme.spacing.m} 0 ${theme.spacing.l};
  display: flex;
  ${mq({
    justifyContent: ['center', 'center', 'flex-start']
  })}
`

export const StyledSubcopyImageContainer = styled.div`
  img {
    padding-bottom: ${theme.spacing.m};
    max-width: 270px;

    ${mq({
      margin: ['0 auto', '', 'initial']
    })}
  }
`

export const StyledSubcopy = styled.div<{ hasCountdown: boolean }>`
  ${({ hasCountdown }) =>
    hasCountdown
      ? css`
          ${mq({
            paddingBottom: [`${theme.spacing.l}`, ``, `${theme.spacing.xl}`]
          })}
        `
      : css`
          ${mq({
            paddingBottom: [
              `${theme.spacing.l}`,
              `${theme.spacing.l}`,
              `${theme.spacing.xl}`
            ]
          })}
        `}
`

export const StyledMicrocopy = styled(Text)`
  ${mq({
    margin: ['auto', 'auto', 'unset'],
    marginTop: [
      `${theme.spacing.m}`,
      `${theme.spacing.m}`,
      `${theme.spacing.m}`
    ]
  })}
`

// use if sales badge requires custom styling
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
          height: ['116px', '149px', '176px'],
          width: ['74px', '95px', '112px'],
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
          height: ['65px', '100px', ''],
          width: ['158px', '245px', ''],
          top: [theme.spacing.l, '', theme.spacing.xl],
          right: [theme.spacing.l, '', theme.spacing.xl]
        })}
      }
    `}
`

export const StyledWrapper = styled(StyledPageWidth)`
  ${mq({
    display: ['', '', 'flex'],
    height: ['', '', '100%'],
    alignItems: ['', '', 'center']
  })};
`
