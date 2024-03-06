import styled, { keyframes, css } from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text/Text'
import { StyledButton } from '../Button/Button.styled'

const slideInLeft = keyframes`
  0% {
    -webkit-transform: translate3d(-110%, 0, 0);
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`

const slideOutLeft = keyframes`
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    transform: translate3d(-120%, 0, 0);
    -webkit-transform: translate3d(-120%, 0, 0);
  }
`

const slideInUp = keyframes`
  0% {
    visibility: hidden;
    -webkit-transform: translate3d(0, 110%, 0);
    transform: translate3d(0, 110%, 0);
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`

const slideOutDown = keyframes`
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  100% {
    -webkit-transform: translate3d(0, 110%, 0);
    transform: translate3d(0, 110%, 0);
  }
`

export const StyledText = styled(Text)`
  margin: ${theme.spacing.xs} 0;
`

export const StyledHR = styled.hr`
  margin: 0 auto;
  border: 0;
  border-bottom: ${theme.borders.borderWidth} solid ${theme.colors.white};
  opacity: 0.5;
  width: 80px;
  text-align: center;
`

export const StyledUnlockOffersModal = styled.div<{
  exit: boolean
}>`
  background: ${theme.colors.darkBlue};
  position: fixed;
  z-index: 200;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
  animation-name: ${slideInUp};
  animation-duration: 2s;

  ${({ exit }) =>
    exit &&
    css`
      animation-name: ${slideOutDown};
      animation-duration: 2s;
    `}

  @media (min-width: 768px) {
    bottom: ${theme.spacing.m};
    left: ${theme.spacing.m};
    width: 474px;
    background-image: none;
    animation-name: ${slideInLeft};
    animation-duration: 2s;

    ${({ exit }) =>
      exit &&
      css`
        animation-name: ${slideOutLeft};
        animation-duration: 2s;
      `}
  }
`

export const StyledUnlockOffersModalHeading = styled(Text)<{
  marginBottom?: string
  step?: number
  isSaleMessageOn?: boolean
}>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')};
  padding: ${({ step, isSaleMessageOn }) =>
    step === 1 && isSaleMessageOn ? '0' : `${theme.spacing.m} 0 0`};
`

export const StyledUnlockOffersModalSubcopy = styled(Text)`
  display: block;
  padding: ${theme.spacing.m} 0;
`

export const StyledUnlockOffersModalHeader = styled.div`
  position: relative;
  padding: ${theme.spacing.l} ${theme.spacing.l} 0;
`

export const StyledUnlockOffersBackgroundImageDesktop = styled.img`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  width: 100%;
  z-index: -1;
`

export const StyledUnlockOffersMicrocopyContainer = styled.div`
  padding: 0 ${theme.spacing.l} ${theme.spacing.l};
`

export const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledInputWrapper = styled.div`
  position: relative;
`

export const StyledInput = styled.input`
  width: 100%;
  border: ${theme.borders.borderWidth} solid ${theme.borders.borderColor};
  border-radius: ${theme.borders.borderRadius};
  right: 0;
  bottom: 0;
  padding: 12.5px 15px 12.5px 35px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: ${theme.spacing.s};
  ::placeholder {
    color: ${theme.colors.gravy70};
    font-size: var(--font-size-micro);
  }
`

export const StyledInputIcon = styled.img`
  position: absolute;
  top: 17px;
  left: 15px;
`

export const StyledErrorMessageSpan = styled.span`
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.spacing.semibold};
  font-size: ${theme.spacing.m};
  padding-left: ${theme.spacing.xs};
`

export const StyledSubscribeButton = styled(StyledButton)`
  justify-content: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
  border-radius: 0 ${theme.borders.borderRadius} ${theme.borders.borderRadius} 0;
  width: 100%;
  margin-bottom: ${theme.spacing.s};
  padding: 12.5px 15px;

  img {
    margin-right: ${theme.spacing.s};
  }

  @media (min-width: 768px) {
    margin-bottom: ${theme.spacing.m};
  }
`

export const StyledCloseModalButton = styled.button`
  position: absolute;
  right: 0px;
  height: 48px;
  width: 48px;
  display: inline-block;
  top: 0;
  padding: 9px;
  cursor: pointer;
  margin: 11px;
  z-index: 100;
  background: transparent;
  border: none;
`

export const StyledStepCounter = styled(Text)<{ step?: number }>`
  margin-bottom: ${({ step }) => (step === 1 ? '0' : `${theme.spacing.s}`)};
  text-transform: uppercase;
`

export const StyledLink = styled.a`
  color: ${theme.colors.white};
  text-decoration: underline;
  text-decoration-color: ${theme.colors.white};
`
export const StyledDisclaimer = styled(Text)`
  margin: ${theme.spacing.m} 0;
`

export const StyledAnchor = styled.a`
  color: ${theme.colors.white};
  text-decoration: underline;
`
