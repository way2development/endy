import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledBadgeTopRight } from '../../styles/global.styled'
import { StyledTextLink } from '../CtaLink/CtaLink.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { Text } from '../Text'

export const StyledWrapper = styled.div`
  background: ${theme.colors.offWhite};
  position: relative;
`

export const StyledHeadingContainer = styled.div<{
  variant: string
}>`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mq({
    margin: [`${theme.spacing.l}`, '', `${theme.spacing.l} 0`],
    minHeight: ['216px', '170px', 'auto'],
    minWidth: ['auto', '500px'],
    position: ['', 'static', 'absolute'],
    left: ['', 'auto', '50%'],
    transform: ['', 'translateX(auto)', 'translateX(-50%)']
  })}

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V1' &&
    css`
      ${mq({
        margin: [
          `${theme.spacing.l}`,
          '',
          `${theme.spacing.xl} 0 ${theme.spacing.l}`
        ],
        minHeight: ['167px', '99px', 'auto'],
        minWidth: ['auto', 'auto', '626px']
      })}
    `}
  
  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V2' &&
    css`
      ${mq({
        margin: [
          `${theme.spacing.l}`,
          '',
          `${theme.spacing.xl} 0 ${theme.spacing.l}`
        ],
        minHeight: ['167px', '99px', 'auto'],
        minWidth: ['auto', 'auto', '626px']
      })}
    `}
`

export const StyledText = styled(Text)`
  ${mq({
    marginBottom: [`${theme.spacing.l}`, '', `${theme.spacing.xl}`]
  })}
`

export const StyledImageContainer = styled.div`
  ${mq({
    height: ['220px', '450px', '100%']
  })}
`

export const StyledAside = styled.div<{
  variant: string
}>`
  position: relative;
  ${mq({
    display: ['none', 'none', 'block']
  })}

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V1' &&
    css`
      display: block !important;
      ${mq({ height: ['291px', '400px', '100%'] })}
    `}
  
  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V2' &&
    css`
      display: block !important;
      ${mq({ height: ['262px', '300px', '100%'] })}
    `}
`

export const StyledBadge = styled(StyledBadgeTopRight)`
  ${mq({
    display: ['none', 'none', 'block']
  })}
`

export const StyledTextAsideLink = styled.span<{
  variant: string
  color: 'gravy' | 'white'
}>`
  position: absolute;
  z-index: 10;
  bottom: 0;
  margin: ${theme.spacing.l};
  text-decoration: none;
  font-weight: ${theme.fontWeights.semibold};

  ${mq({
    fontSize: ['16px', '16px', '19px']
  })}

  &:last-child {
    margin-bottom: ${theme.spacing.l};
  }

  &:hover {
    opacity: 0.7;
    background-color: transparent;
  }

  &:hover > span {
    right: -3px;
  }

  &:hover > span {
    opacity: 0.7;
    background-color: transparent;
    right: -3px;
  }

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V1' &&
    css`
      position: initial;
      margin: 0;
      width: fit-content;
    `}

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V2' &&
    css`
      position: unset;
    `}

  ${({ color }) =>
    color === 'white'
      ? css`
          color: #ffffff;
          border-bottom: 1px solid #ffffff;
        `
      : css`
          color: #243746;
          border-bottom: 1px solid #243746;
        `}
`

export const StyledSaleAsideContainer = styled.div<{
  variant: string
}>`
  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V1' &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      justify-content: flex-end;
      flex-wrap: wrap;

      span {
        margin: unset;
        margin-bottom: ${theme.spacing.m};
      }

      h3 {
        margin-bottom: ${theme.spacing.m};
      }
    `}

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V2' &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
`

export const StyledBgGradientContainer = styled.div<{
  gradientColor: string | undefined
  variant: string
}>`
  width: 100%;
  ${mq({
    paddingTop: ['4rem', '4rem', '6rem']
  })}

  ${({ gradientColor }) =>
    gradientColor === 'White' &&
    css`
      background: linear-gradient(
        to bottom,
        rgba(246, 246, 244, 0) 0%,
        rgba(246, 246, 244, 0.6) 25%,
        rgba(246, 246, 244, 0.7) 50%,
        rgba(246, 246, 244, 0.85) 75%,
        rgba(246, 246, 244, 1) 100%
      );
    `}

  ${({ gradientColor }) =>
    gradientColor === 'Grey' &&
    css`
      background: linear-gradient(
        to bottom,
        rgba(39, 36, 36, 0) 0%,
        rgba(39, 36, 36, 0.6) 25%,
        rgba(39, 36, 36, 0.7) 50%,
        rgba(39, 36, 36, 0.85) 75%,
        rgba(39, 36, 36, 1) 100%
      );
    `}

    ${({ variant }) =>
    variant === 'Default/Sale Split Screen V2' &&
    css`
      padding-top: initial !important;
    `}
`

export const StyledSaleAsideTextContainer = styled(StyledPageWidth)<{
  variant: string
  isBMSM: boolean | undefined
}>`
  ${mq({
    // page spacing only needed on mobile: ['40px', 0, '0]
    paddingLeft: ['20px', 0, 0].concat(theme.pageMargin.slice(0)),
    paddingRight: ['20px', 0, 0].concat(theme.pageMargin.slice(0))
  })}

  picture {
    ${mq({
      maxWidth: ['142px', '184px', '212px'],
      marginBottom: [`${theme.spacing.m}`, '', `0`]
    })};

    /* BMSM lockup has custom styling from standard */
    ${({ isBMSM }) =>
      isBMSM &&
      css`
        ${mq({ maxWidth: ['375px', '497px', '252px'] })}
      `}
  }

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V1' &&
    css`
      ${mq({
        margin: [
          `0 0 ${theme.spacing.l} 0`,
          `0 ${theme.spacing.xl} ${theme.spacing.l}`,
          `0 ${theme.spacing.l} ${theme.spacing.l}`
        ]
      })}
    `}

  ${({ variant }) =>
    variant === 'Default/Sale Split Screen V2' &&
    css`
      margin: 0 auto;
      text-align: center;

      picture {
        ${mq({
          margin: [`0 auto ${theme.spacing.m}`, '', `0 auto ${theme.spacing.l}`]
        })}
      }

      h2 {
        margin-bottom: 0;
      }
    `}
`
