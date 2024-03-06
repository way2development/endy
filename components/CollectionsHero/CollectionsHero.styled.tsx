import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'
import { StyledProductPill } from '../PromoPill/PromoPill.styled'

// TODO: Microcopy does not fit into text component styles.
export const StyledMicrocopy = styled(Text)`
  letter-spacing: ${theme.letterSpacing.s};
  position: absolute;
  bottom: 0.75rem;

  button {
    letter-spacing: ${theme.letterSpacing.s};
  }
`

export const StyledHeroContainer = styled.div`
  ${mq({
    position: ['static', 'static', 'relative'],
    height: ['auto', 'auto', '330px']
  })}

  ${StyledPageWidth} {
    ${mq({
      height: ['auto', 'auto', '100%']
    })}

    /* Grid */
    > div {
      height: 100%;
      ${mq({
        position: ['relative', 'relative', 'static']
      })}
    }
  }

  ${StyledProductPill} {
    ${mq({
      margin: ['auto', 'auto', '0'],
      marginBottom: [
        `${theme.spacing.s}`,
        `${theme.spacing.xs}`,
        `${theme.spacing.xs}`
      ]
    })}
  }
`

export const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledWrapper = styled.div<{ hasPromoPill: boolean }>`
  text-align: center;
  padding: ${theme.spacing.l} ${theme.spacing.m} 0;
  position: relative;

  ${mq({
    textAlign: ['center', 'center', 'left'],
    padding: [
      `${theme.spacing.m} ${theme.spacing.m} 0`,
      `${theme.spacing.l} ${theme.spacing.m} 0`,
      `0 ${theme.spacing.m}`
    ]
  })}

  ${({ hasPromoPill }) =>
    hasPromoPill
      ? css`
          ${mq({
            marginTop: ['0', '0', theme.spacing.xxl]
          })}
        `
      : css`
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}

  ${StyledMicrocopy} {
    max-width: 400px;
    ${mq({
      display: ['none', 'none', 'block']
    })}
  }
`

export const StyledHeading = styled(Text)`
  margin: ${theme.spacing.s} 0 ${theme.spacing.xs};
`

export const StyledMobileMicrocopyContainer = styled.div`
  width: auto;
  text-align: center;
  height: 88px;
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(
    0deg,
    rgba(39, 36, 36, 0.75) 50%,
    rgba(0, 0, 0, 0) 100%
  );

  ${mq({
    display: ['block', 'block', 'none'],
    left: ['-20px', '-75px', '0'],
    right: ['-20px', '-75px', '0']
  })}

  ${StyledMicrocopy} {
    width: 100%;
    text-align: center;
  }
`

export const StyledImageContainer = styled.div`
  top: 0;
  right: 0;

  ${mq({
    position: ['static', 'static', 'absolute'],
    minHeight: ['auto', 'auto', '330px'],
    /* TODO: is there a better way to have the lifestyle image bleed out of StyledPageWidth? */
    marginLeft: ['-20px', '-75px', 'auto'],
    marginRight: ['-20px', '-75px', 'auto']
  })}

  img {
    object-fit: cover;
    object-position: left;
    ${mq({
      height: ['auto', 'auto', '330px'],
      maxWidth: ['', '100%', '595px']
    })}
  }
`

export const StyledBadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  ${mq({
    marginTop: [
      `${theme.spacing.s}`,
      `${theme.spacing.m}`,
      `${theme.spacing.m}`
    ]
  })}
`
export const StyledComparisonBadgeWrapper = styled.div`
  width: 100%;
  max-width: 335px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq({
    margin: ['0 auto', '0 auto', 'unset']
  })}
`
