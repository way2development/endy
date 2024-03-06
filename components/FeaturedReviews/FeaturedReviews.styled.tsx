import { StyledImageContainer } from '../BackgroundImage'
import { StyledCustomer } from '../FeaturedReviewsCard/FeaturedReviewsCard.styled'
import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledReviewsContainer = styled(StyledPageWidth)`
  ${mq({
    // page spacing only needed on desktop+: [0, 0, '120px']
    paddingLeft: [0, 0].concat(theme.pageMargin.slice(2)),
    paddingRight: [0, 0].concat(theme.pageMargin.slice(2))
  })}
`

export const StyledCarouselCard = styled.div`
  display: flex;
  flex-direction: column;
  /* top margin required for box-shadow (overflow: hidden property cuts shadow) */
  margin: ${theme.spacing.xs} ${theme.spacing.l} 0 0;
  box-shadow: 1px 1px 5px 0 rgba(36, 55, 70, 0.3);

  ${mq({
    width: ['100%', '100%', 'calc(100% / 3)']
  })}
`

export const StyledFeaturedReviewContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  /* Review card */
  > div {
    height: 100%;
    min-height: 100%;
    max-width: 100%;
    border-radius: ${theme.borders.borderRadius};
    display: flex;
    flex-direction: column;
    ${mq({
      minWidth: ['300px', '300px', '100%'],
      padding: [
        `${theme.spacing.m}`,
        `${theme.spacing.m}`,
        `${theme.spacing.l}`
      ]
    })}

    /* make StyledCustomer appear in bottom-right */
    p:last-child {
      height: 100%;
      align-items: flex-end;
    }
  }

  ${StyledCustomer} {
    justify-content: flex-end;
  }
`

export const StyledHeading = styled(Text)`
  text-align: center;
  margin: 0 auto;
  ${mq({
    maxWidth: ['500px', '500px', '100%'],
    marginBottom: [
      `${theme.spacing.xl}`,
      `${theme.spacing.xl}`,
      `${theme.spacing.xxl}`
    ]
  })}
`

export const StyledDotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${mq({
    paddingTop: [`${theme.spacing.l}`, `${theme.spacing.l}`, '0']
  })}
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

export const StyledFeaturedCarousel = styled.div<{ bgColor?: { hex: string } }>`
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor.hex : `${theme.colors.offWhite}`};

  ${StyledImageContainer} {
    background-repeat: no-repeat;
    background-position: top center;
    ${mq({
      paddingTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
      paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
    })}
  }
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
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;

  ${mq({
    marginLeft: [theme.spacing.xxl, theme.spacing.xxxl, '']
  })}
`

export const StyledReviewImage = styled.div`
  border-radius: ${theme.borders.borderRadius};
  box-shadow: 0 1px 5px 0 rgba(36, 55, 70, 0.3);
  margin-bottom: ${theme.spacing.s};
  position: relative;
`

export const StyledSocialHandle = styled(Text)`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${theme.spacing.xs} ${theme.spacing.s};
  border-radius: ${theme.borders.borderRadius};
  position: absolute;
  left: ${theme.spacing.m};
  bottom: ${theme.spacing.s};
`
export const StyledCtaContainer = styled.div`
  display: flex;
  justify-content: center;

  ${mq({
    marginTop: [theme.spacing.l, '', theme.spacing.xl]
  })}
`
