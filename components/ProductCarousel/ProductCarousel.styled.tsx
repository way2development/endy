import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'

const carouselContainerMixin = css`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: -10px;
`

const carouselButtonMixin = css`
  background-color: rgba(36, 55, 70, 0.6);
  border: none;
  opacity: 0.7;
  height: 3rem;
  width: 3rem;
  position: absolute;
  top: 50%;
`

export const StyledCarousel = styled.div`
  ${mq({
    display: ['', 'flex', 'block'],
    width: '100%',
    marginBottom: [`${theme.spacing.m}`, `${theme.spacing.m}`, '0']
  })}
`
export const StyledSlides = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;

  ${mq({
    width: ['', '85%', 'auto']
  })}
`

export const StyledViewport = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`

export const StyledInnerCarousel = styled.div`
  ${carouselContainerMixin}
`

export const StyledSlide = styled.div`
  padding-left: 10px;
  min-width: 100%;
  position: relative;
`

export const StyledSlideInner = styled.div`
  position: relative;
  overflow: hidden;

  ${mq({
    height: ['14rem', '26rem']
  })}
`

export const StyledSlideImg = styled.div`
  img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    min-height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }
`

export const StyledThumbPreview = styled.div`
  ${mq({
    width: ['100%', '15%', '100%'],
    paddingTop: [theme.spacing.xs, '0', theme.spacing.xs]
  })}
`

export const StyledInnerThumbPreview = styled.div`
  ${carouselContainerMixin}
  cursor: default;
  margin-left: -8px;

  ${mq({
    display: ['', 'flex'],
    flexDirection: ['', 'column', 'row'],
    height: ['', '100%', '']
  })}
`

export const StyledInnerThumb = styled.button<{ selected: boolean }>`
  touch-action: manipulation;
  cursor: pointer;
  border: ${({ selected }) =>
    selected ? '1px solid rgba(36,55,70,.3)' : '1px solid transparent'};
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: transparent;
  position: relative;
  display: block;
  overflow: hidden;

  ${mq({
    height: ['3rem', `calc((26.25rem / 5) - ${theme.spacing.xxs})`, '6rem']
  })}

  &:hover {
    opacity: ${({ selected }) => (selected ? '1' : '0.6')};
  }
`

export const StyledSlideThumbnail = styled.div<{ selected: boolean }>`
  img {
    position: absolute;
    opacity: ${({ selected }) => (selected ? '1' : '0.4')};
    top: 0;
    bottom: 0;
    left: -10000%;
    right: -10000%;
    margin: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    transform: scale(0.1);
    transition: opacity 0.2s;
    object-fit: cover;
  }
`

export const StyledSlideThumb = styled.div`
  padding-left: ${theme.spacing.xxs};
  min-width: 20%;

  ${mq({
    paddingLeft: [theme.spacing.xxs, theme.spacing.m, theme.spacing.xxs],
    height: ['', '100%'],
    '&:not(:last-child)': {
      paddingBottom: ['0', theme.spacing.xxs, '0']
    }
  })}
`

export const StyledPrevButton = styled.button`
  ${carouselButtonMixin}
  left: 0;
`

export const StyledNextButton = styled.button`
  ${carouselButtonMixin}
  right: 0;

  img {
    transform: rotate(180deg);
  }
`
