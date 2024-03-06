import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'
import { StyledProductTag } from '../PromoFlag/PromoFlag'
import { Text } from '../Text'

export const StyledWrapper = styled(StyledPageWidth)`
  ${mq({
    marginTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
    marginBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}
`

export const StyledHeadingWrapper = styled.div`
  text-align: center;
`

export const StyledHeadingContainer = styled.div`
  ${mq({
    overflow: ['', '', 'hidden'],

    ['> h2']: {
      position: ['', '', 'relative'],
      display: ['', '', 'inline-block'],

      // Horizontal rule behind heading
      [':before, :after']: {
        content: ['', '', "''"],
        position: 'absolute',
        top: '50%',
        width: '9999px',
        height: '1px',
        background: theme.colors.gravy,
        right: '100%',
        marginRight: '15px'
      },

      ['&:after']: {
        left: '100%',
        marginLeft: '15px'
      }
    }
  })}
`

export const StyledTextileAnchor = styled.span`
  position: relative;
  display: block;
  opacity: 1;
  transition: 0.3s;
  /* TODO: height property values can be removed when UX/UI supply new images with corresponding resolution to fit new grid dimensions */
  height: 100%;

  &:hover {
    opacity: 0.7;
  }

  picture {
    height: 100%;

    img {
      height: 100%;
    }
  }
`

export const StyledPrimaryTextile = styled.div`
  ${mq({
    gridColumn: ['span 2', 'span 2', 'span 1'],
    gridRow: ['1', '1', 'span 2']
  })}
`

export const StyledSecondaryTextile = styled.div`
  ${mq({
    gridColumn: ['1', '1', '2'],
    gridRow: ['2', '2', '1']
  })}
`

export const StyledTertiaryTextile = styled.div`
  grid-column: 2;
  grid-row: 2;
`

export const StyledText = styled(Text)`
  line-height: 1.2;
`

export const StyledProductHeading = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  padding: ${theme.spacing.m} ${theme.spacing.m} ${theme.spacing.l};
`

export const StyledCtaContainer = styled.div`
  ${mq({
    display: ['none', 'none', 'inline-block'],
    position: ['', '', 'relative'],

    // Border under decorative shop link
    [':after']: {
      bottom: '2px',
      borderBottom: `1px solid ${theme.colors.gravy}`,
      content: "''",
      position: 'absolute',
      width: '100%'
    }
  })}
`
export const StyledPromoFlagContainer = styled.div`
  position: absolute;
  top: -14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const StyledPromoFlag = styled(StyledProductTag)<{
  bgColor: string
  color: string
}>`
  color: ${({ color }) => color && color};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  position: static;
  ${mq({
    padding: [`${theme.spacing.xxxs} 14px`, `${theme.spacing.xxs} 14px`, '']
  })}
`
