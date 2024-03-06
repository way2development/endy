import styled from 'styled-components'
import { Text } from '../Text'
import { mq, theme } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledCard = styled.div`
  box-shadow: 1px 1px 5px 0 rgba(36, 55, 70, 0.3);
  background-color: ${theme.colors.white};
  /* top and side margin required for box-shadow (overflow: hidden property cuts shadow) */
  margin: ${theme.spacing.xs} ${theme.spacing.xs} 0;
  ${mq({
    width: ['306px', '298px', '360px']
  })}
`

export const StyledTextContainer = styled.div(
  ({ isFrench }: { isFrench?: boolean }) => {
    return mq({
      display: ['flex'],
      flexDirection: ['column'],
      padding: [`${theme.spacing.m}`, '', `${theme.spacing.l}`],
      height: isFrench ? ['215px', '', '270px'] : ['205px', '', '240px'],

      ['div:last-child']: {
        height: ['100%'],
        display: ['flex'],
        alignItems: ['flex-end'],
        flex: ['auto']
      }
    })
  }
)

export const StyledText = styled(Text)`
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.s};
`

export const StyledHeader = styled(Text)`
  text-align: center;
`

export const StyledArticleCardsCarousel = styled.div<{
  bgColor: string | undefined
  isReviewsPage: string | string[] | undefined
}>`
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  ${mq({
    paddingTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}
  padding-bottom: ${({ isReviewsPage }) =>
    isReviewsPage != 'showrooms' && isReviewsPage != 'salles-dexposition'
      ? '0'
      : `${theme.spacing.xl}`};
`

export const StyledArticleCardsContainer = styled(StyledPageWidth)`
  ${mq({
    // page spacing only needed on desktop+: [0, 0, '120px']
    paddingLeft: [0, 0].concat(theme.pageMargin.slice(2)),
    paddingRight: [0, 0].concat(theme.pageMargin.slice(2))
  })}
`

export const StyledEmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: ${theme.spacing.xs};
  ${mq({
    cursor: ['grab', 'grab', 'initial']
  })}
`

export const StyledEmblaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;

  ${mq({
    marginLeft: [theme.spacing.xxl, theme.spacing.xxxl, '']
  })}
`
export const StyledDotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: ${theme.spacing.l};
  padding-bottom: ${theme.spacing.l};
`
export const StyledDotButton = styled.button<{ isSelected: boolean }>`
  border: 1.5px solid ${theme.colors.gravy90};
  border-radius: 50%;
  background: ${({ isSelected }) =>
    isSelected ? `${theme.colors.gravy90}` : 'transparent'};
  margin: 0 ${theme.spacing.xs};
  padding: 0;
  width: 12px;
  max-width: 12px;
  height: 12px;
  max-height: 12px;
`
export const StyledUrlArrow = styled.span`
  vertical-align: middle;
  position: relative;
  right: -1px;
  top: 1px;
  transition: all 0.4s ease;
`

export const StyledUrlLabel = styled.div`
  width: fit-content;
  border-bottom: 1px solid ${theme.colors.gravy};
  color: ${theme.colors.gravy};
  transition: all 0.5s ease;
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};

  :hover {
    opacity: 0.7;
    background-color: transparent;

    span {
      right: -4px;
    }
  }

  ${mq({
    fontSize: ['16px', '16px', '19px']
  })}
`
