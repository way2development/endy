import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'
import { StyledButton } from '../Button/Button.styled'
import { StyledImageContainer } from '../BackgroundImage'

export const StyledSection = styled.section<{
  bgColor?: { hex: string }
  formType: 'Invite Friends' | 'Newsletter Sign Up'
}>`
  position: relative;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor.hex : `${theme.colors.white}`};

  ${({ formType }) =>
    formType === 'Newsletter Sign Up' &&
    css`
      margin-top: ${theme.spacing.m};
      ${mq({
        height: ['42rem', '', 'auto']
      })}
    `}

  ${({ formType }) =>
    formType === 'Invite Friends' &&
    css`
      ${mq({
        height: ['46rem', '', 'auto']
      })}
    `}

  div {
    background-size: cover;
    ${mq({
      backgroundPosition: ['center', 'bottom right', '']
    })}
  }

  > ${StyledImageContainer} {
    ${mq({
      backgroundImage: ['none', 'none', '']
    })}
  }
`

export const StyledMobileBackgroundImage = styled.div`
  ${StyledImageContainer} {
    position: absolute;
    top: 0;
  }
`

export const StyledMobileContainer = styled.div`
  ${mq({
    display: ['block', 'block', 'none']
  })}
`

export const StyledDesktopContainer = styled.div`
  ${mq({
    display: ['none', 'none', 'block']
  })}
`

export const StyledContainer = styled.div<{
  formType: 'Invite Friends' | 'Newsletter Sign Up'
}>`
  ${({ formType }) =>
    formType === 'Invite Friends' &&
    css`
      padding-bottom: ${theme.spacing.xxxl};
      ${mq({
        paddingTop: ['', '', `${theme.spacing.xl}`]
      })}
    `}
`
export const StyledWrapper = styled(StyledPageWidth)<{
  lifestyleImagePosition: 'Left' | 'Right'
}>`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: ${({ lifestyleImagePosition }) =>
    lifestyleImagePosition === 'Left' ? 'row-reverse' : 'row'};
`

export const StyledFormContainer = styled.div(
  ({ formType }: { formType: 'Invite Friends' | 'Newsletter Sign Up' }) => {
    return mq({
      zIndex: ['10'],
      margin: ['0 0', '', `${theme.spacing.xxxl} 0`],
      position: ['absolute', '', 'relative'],
      top: [`auto`, '', ''],
      bottom:
        formType === 'Invite Friends'
          ? [`${theme.spacing.xl}`, `${theme.spacing.xxxl}`, 'auto']
          : ['0', `${theme.spacing.xxxl}`, 'auto'],
      left:
        formType === 'Invite Friends'
          ? [`${theme.spacing.xl}`, '', 'auto']
          : [`${theme.spacing.m}`, `${theme.spacing.xl}`, 'auto'],
      right:
        formType === 'Invite Friends'
          ? [`${theme.spacing.xl}`, '', 'auto']
          : [`${theme.spacing.m}`, `${theme.spacing.xl}`, 'auto']
    })
  }
)

export const StyledFormWrapper = styled.div`
  background-color: ${theme.colors.offWhite};
  padding: ${theme.spacing.l} ${theme.spacing.xl};
  box-shadow: 0 2px 5px rgb(36 55 70 / 29%);
  ${mq({
    margin: ['0 0', '', `${theme.spacing.xxxl} 0`]
  })}
`

export const StyledDesktopFormContainer = styled.div<{
  lifestyleImagePosition: 'Left' | 'Right'
  formType: 'Invite Friends' | 'Newsletter Sign Up'
}>`
  z-index: 10;
  margin-left: ${({ lifestyleImagePosition }) =>
    lifestyleImagePosition === 'Left' ? `-${theme.spacing.xl}` : 'unset'};

  ${({ formType }) =>
    formType === 'Newsletter Sign Up' &&
    css`
      ${mq({
        width: ['100%', '100%', '800px']
      })}
    `}

  ${({ formType }) =>
    formType === 'Invite Friends' &&
    css`
      ${mq({
        width: ['100%', '100%', '47%']
      })}
    `}
`

export const StyledDesktopImageContainer = styled.div<{
  lifestyleImagePosition: 'Left' | 'Right'
  formType: 'Invite Friends' | 'Newsletter Sign Up'
}>`
  width: ${({ formType }) =>
    formType === 'Newsletter Sign Up' ? '100%' : '70%'};
  position: ${({ formType }) =>
    formType === 'Newsletter Sign Up' ? 'relative' : 'initial'};
  top: ${({ formType }) =>
    formType === 'Newsletter Sign Up' ? '-1rem' : 'unset'};
  margin-left: ${({ lifestyleImagePosition }) =>
    lifestyleImagePosition === 'Left' ? 'unset' : `-${theme.spacing.xxxl}`};
  padding: ${({ formType }) =>
    formType === 'Invite Friends' ? `${theme.spacing.xl} 0` : '0'};

  ${mq({
    display: ['none', 'none', 'block']
  })}
`

export const StyledMobileOverlayImage = styled.div`
  width: 100%;
  margin-bottom: -50px;
  position: relative;
  z-index: 5;
  ${mq({
    display: ['block', 'block', 'none'],
    height: ['250px', '400px', '']
  })}
`

export const StyledHeading = styled(Text)`
  text-align: center;
  max-width: 320px;
  margin: 0 auto ${theme.spacing.m};
`

export const StyledSubcopy = styled(Text)`
  margin-bottom: ${theme.spacing.m};
  ${mq({
    textAlign: ['center', 'center', 'left']
  })}
`

export const StyledMicrocopy = styled(Text)`
  ${mq({
    textAlign: ['center', 'center', 'left']
  })}
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
  margin-bottom: ${theme.spacing.m};
  ::placeholder {
    color: ${theme.colors.gravy70};
    font-size: var(--font-size-small);
  }
`

export const StyledInviteForm = styled.div`
  position: relative;
  z-index: 10;

  input {
    padding: ${theme.spacing.s};
  }
`

export const StyledCheckbox = styled.input`
  accent-color: ${theme.borders.borderColor};
  margin-top: 6px;
  margin-right: ${theme.spacing.xs};
`

export const StyledCheckboxWrapper = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.m};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const StyledCheckboxLabel = styled.label`
  text-align: left;
`

export const StyledButtonContainer = styled.div`
  text-align: center;
`

export const StyledSubscribeButton = styled((props) => (
  <StyledButton {...props} />
))`
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.m};
`

export const StyledInviteFormContainer = styled.div`
  position: relative;
  z-index: 10;
  ${mq({
    paddingBottom: [`${theme.spacing.xl}`, `${theme.spacing.xl}`, '0']
  })}
`

export const StyledMobileWrapper = styled.div`
  padding-bottom: ${theme.spacing.xl};
`
