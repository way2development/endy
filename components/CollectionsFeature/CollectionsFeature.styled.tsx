import styled, { css } from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'

import { Text } from '../Text'

export const StyledContainer = styled(StyledPageWidth)`
  ${mq({
    marginTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
    paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}
`

export const StyledImgContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
  /* TODO: Complete box shadow audit and remove var */
  box-shadow: var(--box-shadow);
  position: relative;
  justify-content: center;

  ${mq({
    textAlign: ['center', 'center', 'left'],
    height: ['auto', 'auto', '440px']
  })}
`

export const StyledLifeStyleImgContainer = styled.div`
  ${mq({
    height: ['auto', 'auto', '440px']
  })}

  picture {
    height: 100%;
  }

  img {
    height: 100%;
    object-fit: cover;
    object-position: left;
  }
`

export const StyledHeading = styled(Text)<{ isOnSale?: boolean }>`
  ${({ isOnSale }) =>
    isOnSale
      ? css`
          ${mq({
            marginBottom: [
              `${theme.spacing.xs}`,
              `${theme.spacing.xs}`,
              `${theme.spacing.s}`
            ]
          })}
        `
      : css`
          ${mq({
            marginBottom: [
              `${theme.spacing.m}`,
              `${theme.spacing.m}`,
              `${theme.spacing.l}`
            ]
          })}
        `}
`

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ${mq({
    padding: [
      `${theme.spacing.l} ${theme.spacing.m} 0`,
      `${theme.spacing.l} ${theme.spacing.xxl} 0`,
      '0'
    ],
    marginLeft: ['0', '0', '72px'],
    textAlign: ['center', 'center', 'left'],
    alignItems: ['center', 'center', 'flex-start']
  })}
`

export const StyledMicrocopy = styled(Text)`
  position: absolute;
  bottom: ${theme.spacing.s};
  letter-spacing: ${theme.letterSpacing.s};

  button {
    letter-spacing: ${theme.letterSpacing.s};
  }
`

export const StyledSubcopy = styled(Text)`
  margin-bottom: ${theme.spacing.s};
`

export const StyledPillContainer = styled.div`
  margin: 0;
`

export const StyledMobileMicrocopyContainer = styled.div`
  width: 100%;
  text-align: center;
  height: 88px;
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(
    0deg,
    rgba(39, 36, 36, 0.5) 15%,
    rgba(0, 0, 0, 0) 70%
  );

  ${mq({
    display: ['block', 'block', 'none']
  })}

  ${StyledMicrocopy} {
    width: 100%;
    text-align: center;
  }
`
