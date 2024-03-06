import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'
import { Text } from '../Text/Text'
import { buttonStyleMixin } from '../Button/Button.styled'

export const StyledSection = styled.section<{ bgColor?: { hex: string } }>`
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor.hex : `${theme.colors.white}`};
`

export const StyledWrapper = styled(StyledPageWidth)(
  ({
    variant,
    position,
    isMLP
  }: {
    variant: string
    position: 'Horizontal' | 'Vertical'
    isMLP?: boolean
  }) => {
    return mq({
      paddingTop: [
        isMLP ? '' : theme.spacing.xl,
        '',
        isMLP ? '' : theme.spacing.xxl
      ],
      paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
      alignItems: ['', '', 'center'],
      display: ['', '', 'flex'],
      textAlign: ['center', 'center', 'left'],
      gap: ['', '', '3rem'],
      flexDirection: [
        position === 'Vertical' ? 'column' : '',
        position === 'Vertical'
          ? 'column'
          : variant === 'Media Left'
          ? 'row-reverse'
          : 'row'
      ]
    })
  }
)

export const StyledTextColumn = styled.div<{
  position: 'Vertical' | 'Horizontal'
}>`
  /* 
    @TODO: revisit heading margin during typography audit.
    Best case scenario, all h2s have the same margins as other h2s, 
    rather than margins being specified per module.
  */
  h2 {
    margin-bottom: ${theme.spacing.l};
    ${mq({
      textAlign: ['center', 'center', 'left']
    })}
  }

  ${({ position }) =>
    mq({
      display: position === 'Vertical' ? 'flex' : '',
      flexDirection: position === 'Vertical' ? 'column' : '',
      alignItems: position === 'Vertical' ? 'center' : '',
      paddingBottom: [`${theme.spacing.xl}`, `${theme.spacing.xl}`, '0'],
      paddingRight: [
        position === 'Vertical' ? `${theme.spacing.l}` : '0',
        position === 'Vertical' ? `${theme.spacing.xxxl}` : '0',
        position === 'Vertical' ? `${theme.spacing.l}` : '0'
      ],
      paddingLeft: [
        position === 'Vertical' ? `${theme.spacing.l}` : '0',
        position === 'Vertical' ? `${theme.spacing.xxxl}` : '0',
        position === 'Vertical' ? `${theme.spacing.l}` : '0'
      ],
      flexGrow: ['', '', '4'],
      maxWidth: ['', '', position === 'Vertical' ? '' : '25rem'], // 25rem = 400px
      width: [
        position === 'Vertical' ? '100%' : '',
        position === 'Vertical' ? '100%' : '',
        position === 'Vertical' ? '95%' : '40%'
      ]
    })}
  ${({ position }) =>
    position === 'Vertical'
      ? `
  > * {
  text-align: center;
  }
  `
      : ''}

  ${({ position }) =>
    position === 'Horizontal'
      ? `
  > * {
  text-align: left;
  }
  `
      : ''}
`

export const StyledCtaContainer = styled.div`
  margin-top: ${theme.spacing.m};
  ${mq({
    textAlign: ['center', '', 'left']
  })}
`

export const StyledMediaColumn = styled.div<{
  position: 'Vertical' | 'Horizontal'
}>`
  position: relative;
  ${({ position }) =>
    mq({
      // lineHeight needed to remove white-space under video media type
      lineHeight: ['0'],
      flexGrow: ['', '', '6'],
      width: [
        position === 'Vertical' ? 'auto' : '',
        position === 'Vertical' ? 'auto' : '',
        position === 'Vertical' ? '100%' : '60%'
      ],
      marginLeft: ['-20px', '-75px', 'auto'],
      marginRight: ['-20px', '-75px', 'auto']
    })}
`

export const StyledImageContainer = styled.div`
  position: relative;
`

export const StyledVideoContainer = styled.div`
  position: relative;
`

export const StyledFeaturedProducts = styled.div`
  position: absolute;
  bottom: ${theme.spacing.l};
  left: ${theme.spacing.l};
`

export const StyledProductLinkContainer = styled.div`
  padding: ${theme.spacing.s} 0;
  border-bottom: 2px solid ${theme.borders.borderColor};
  position: relative;
  z-index: 10;
  text-align: left;
`
export const StyledModalContent = styled.div`
  width: 330px;
  /* TODO: Check if color should be added to design system */
  background-color: #f6f6f4;
  position: absolute;
  bottom: 60px;
  padding: 0 10px;
  box-shadow: 0 2px 5px rgb(36 55 70 / 29%);

  ${mq({
    left: ['-30px', '0', '0']
  })}

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15%;
    width: 0;
    height: 0;
    border: 14px solid transparent;
    border-top-color: #f6f6f4;
    border-bottom: 0;
    margin-left: -10px;
    margin-bottom: -10px;
  }

  /* target last product link container */
  > div:last-child {
    border-bottom: none;
  }
`

export const StyledHeading = styled(Text)<{
  prefersReducedMotion?: boolean
}>`
  font-weight: ${theme.fontWeights.semibold};
  position: relative;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: ${theme.spacing.xxxs};
    left: 0;
    width: 0px;
    transition: ${({ prefersReducedMotion }) =>
      prefersReducedMotion ? 'none' : 'all 0.5s ease-in-out'};
    height: ${theme.spacing.xxxs};
    margin: 1px 0 0;
    opacity: 0;
    background-image: linear-gradient(
      to right,
      ${theme.colors.rubine} 0,
      ${theme.colors.rubine} 100%
    );
  }

  &:hover {
    &::after {
      left: 0;
      width: 100%;
      opacity: 1;
    }
  }
`

export const StyledProductDetails = styled.div`
  margin-left: ${theme.spacing.xs};

  p {
    text-align: left;
  }
`

export const StyledButton = styled.button<{
  variant: string
  isModalOpen: boolean
}>`
  ${buttonStyleMixin}

  ${({ isModalOpen }) =>
    isModalOpen
      ? css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.gravy};

          > svg #icon {
            stroke: ${theme.colors.gravy};
          }
        `
      : css`
          background-color: ${theme.colors.gravy};
          color: ${theme.colors.white};

          > svg #icon {
            stroke: ${theme.colors.white};
          }
        `}

  > span {
    margin-left: ${theme.spacing.xs};
    position: relative;
    bottom: 2px;
  }

  &:hover svg #icon {
    stroke: ${theme.colors.gravy};
  }
`

export const StyledPrice = styled(Text)`
  text-transform: lowercase;
  font-weight: ${theme.fontWeights.semibold};
`
