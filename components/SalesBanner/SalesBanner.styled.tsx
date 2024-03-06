import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { Grid } from '../Grid'
import { PromoPill } from '../PromoPill/PromoPill'

export const StyledSalesBannerContainer = styled.div`
  box-shadow: 0 2px 5px rgb(36 55 70 / 29%);
  ${mq({
    marginTop: [
      `${theme.spacing.xl}`,
      `${theme.spacing.xl}`,
      `${theme.spacing.xxl}`
    ]
  })}
`

export const StyledGrid = styled(Grid)`
  background-color: ${theme.colors.endyBlue};
`

export const StyledLeftContainer = styled.div<{ bgColor: string }>`
  position: relative;
  background-color: ${({ bgColor }) => bgColor};

  ${mq({
    order: ['2', '', '1']
  })}

  #right-pill {
    ${mq({
      visibility: ['hidden', '', 'visible']
    })}
  }
`

export const StyledRightContainer = styled.div<{
  bgColor: string
  isBundleSale: boolean | undefined
}>`
  position: relative;
  background-color: ${({ bgColor }) => bgColor};

  ${mq({
    order: ['1', '', '2']
  })}

  span {
    ${mq({
      visibility: ['visible', '', 'hidden']
    })}
  }

  ${({ isBundleSale }) =>
    isBundleSale &&
    css`
      ${mq({
        display: ['none', 'none', 'block']
      })}
    `}
`

export const StyledOverlappingPillWrap = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
`

export const StyledPromoPill = styled(PromoPill)`
  background-color: ${theme.colors.endyBlue};
`

export const StyledBadgeContainer = styled.div`
  position: absolute;

  ${mq({
    top: [theme.spacing.s, theme.spacing.l, theme.spacing.s],
    right: [theme.spacing.s, theme.spacing.l, theme.spacing.s],
    width: ['4rem', '5rem', '']
  })}
`

export const StyledTextContainer = styled.div<{
  isBundleSale: boolean | undefined
}>`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${mq({
    alignItems: ['center', '', 'left'],
    justifyContent: ['center', '', 'center'],
    padding: [
      `${theme.spacing.l} ${theme.spacing.l} ${theme.spacing.xl}`,
      '',
      `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.l}`
    ]
  })}

  img {
    ${mq({
      marginBottom: [
        `${theme.spacing.xs}`,
        `${theme.spacing.xs}`,
        `${theme.spacing.m}`
      ]
    })}
  }

  ${({ isBundleSale }) =>
    isBundleSale &&
    css`
      ${mq({
        padding: '0',
        paddingTop: `${theme.spacing.l}`
      })}

      /* left & right padding for mobile heading only */
      h2 {
        ${mq({
          padding: [`0 ${theme.spacing.m}`, '0', '']
        })}
      }
    `}
`

export const StyledHeading = styled(Text)`
  margin: ${theme.spacing.xs} 0 ${theme.spacing.m};
  width: 100%;
  ${mq({
    textAlign: ['center', '', 'left']
  })}
`

export const StyledSubcopy = styled(Text)`
  ${mq({
    alignSelf: ['center', '', 'flex-start'],
    textAlign: ['center', '', 'left'],
    marginBottom: [theme.spacing.s, '', '']
  })}

  ul > li:not(:last-child) {
    margin-bottom: ${theme.spacing.xxxs};
  }
`

export const StyledMicrocopy = styled(Text)`
  letter-spacing: ${theme.letterSpacing.s};
  width: 100%;
  ${mq({
    textAlign: ['center', '', 'left']
  })}
`

export const StyledMicrocopyContainer = styled.div<{
  isBundleSale: boolean | undefined
}>`
  width: 100%;

  ${({ isBundleSale }) =>
    isBundleSale &&
    css`
      ${mq({
        display: ['none', 'none', 'block']
      })}
    `}
`

export const StyledImageContainer = styled.div`
  height: 100%;

  picture {
    width: 100%;
    ${mq({
      height: ['auto', 'auto', '100%']
    })}
  }

  img {
    object-fit: cover;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
`

export const StyledTotalValue = styled.div`
  letter-spacing: ${theme.letterSpacing.s};
  padding: ${theme.spacing.s} 0;
  text-transform: uppercase;
  display: flex;
  ${mq({
    display: ['', '', 'none']
  })}

  img {
    margin-right: ${theme.spacing.xxs};
  }
`
