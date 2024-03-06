import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledBannerContainer = styled.div`
  align-items: center;
  background-color: ${theme.colors.gravy};
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  position: relative;
  height: auto;

  ${mq({
    maxHeight: ['', '', '54px']
  })}
`

export const StyledCarouselWrapper = styled.div(
  ({ singleMessage }: { singleMessage: boolean }) => {
    return mq({
      alignItems: 'center',
      display: 'flex',
      justifyContent: singleMessage ? 'center' : 'space-between',
      width: ['100%', '', singleMessage ? '100%' : '80%']
    })
  }
)

export const StyledCarouselButton = styled.button`
  background-color: ${theme.colors.gravy30};
  border: none;
  color: ${theme.colors.white};
  padding: ${theme.spacing.l};
`

export const StyledImgContainer = styled.div`
  align-items: center;
  display: flex;
  height: auto;
  width: 10px;

  img {
    width: 100%;
  }
`

export const StyledPrevButton = styled.img`
  transform: rotate(180deg);
`

export const StyledCarousel = styled.div`
  overflow: hidden;
`

export const StyledMessageContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${theme.spacing.xxxs};

  text-align: center;
  width: 100%;
`

export const StyledCarouselSlide = styled.div`
  ${mq({
    padding: [
      `${theme.spacing.xs} 0`,
      `${theme.spacing.xs} 0`,
      `${theme.spacing.l} 0`
    ]
  })}

  flex: 0 0 100%;
  position: relative;

  a {
    color: ${theme.colors.white};
  }

  button {
    background-color: ${theme.colors.gravy30};
    border: none;
    color: ${theme.colors.white};
  }
`

export const StyledLanguageToggle = styled.div`
  font-size: var(--font-size-small);
  letter-spacing: var(--letter-spacing-1px);
  padding-right: ${theme.spacing.l};
  position: absolute;
  right: 0;
  text-transform: uppercase;

  ${mq({ display: ['none', '', 'block'] })}

  button {
    background: none;
    text-transform: uppercase;
    border: none;
  }
`

export const StyledTime = styled.div`
  display: flex;
  align-items: center;
`

export const StyledCountdownText = styled(Text)<{ isFrench: boolean }>`
  text-transform: uppercase;
  letter-spacing: ${theme.letterSpacing.s};
  padding-left: ${theme.spacing.xxs};

  ${({ isFrench }) => isFrench && `text-transform: initial;`}
`
export const StyledPencilBannerCountdown = styled(Text)`
  font-weight: ${theme.fontWeights.semibold};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

export const StyledTimeContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledLabel = styled.div`
  padding-right: ${theme.spacing.xxs};
`

export const StyledColon = styled.div`
  padding: 0 ${theme.spacing.xxs};
`
export const StyledLanguageToggleContainer = styled.div`
  position: absolute;
  right: ${theme.spacing.m};
  align-items: center;

  ${mq({
    display: ['none', '', 'flex']
  })};
`
