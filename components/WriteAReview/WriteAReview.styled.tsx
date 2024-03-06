import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import Rating from '@mui/material/Rating'
import { StyledButton } from '../Button/Button.styled'
import { motion } from 'framer-motion'
import { ProductPdpProps } from '../CustomerReviews'
import { ProductDropdownProps } from './WriteAReview'

export const StyledRow = styled.div`
  display: flex;
  width: 100%;
  ${mq({
    flexDirection: ['column', 'row', '']
  })}

  > *:not(:last-child) {
    ${mq({
      marginRight: [0, theme.spacing.l, '']
    })}
  }
`

export const StyledSleeperSubheading = styled(Text)`
  margin-bottom: ${theme.spacing.s};
`

export const StyledRatingSubheading = styled(Text)`
  margin-bottom: ${theme.spacing.s};
`

export const StyledInputContainer = styled.div<{
  productDropdown?: ProductPdpProps | ProductDropdownProps[]
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  ${({ productDropdown }) => css`
    ${mq({
      width: productDropdown && ['100%', 'calc(100%/2)', ''],
      flexGrow: !productDropdown && ['1', '', '']
    })};
  `}

  ${mq({
    marginBottom: [theme.spacing.m, 0, '']
  })}


  label:first-child {
    ${mq({
      marginBottom: [theme.spacing.xs, theme.spacing.s, '']
    })}
  }

  input {
    min-height: 48px;
  }

  input,
  textarea {
    height: 100%;
    border: ${theme.borders.borderWidth} solid ${theme.colors.gravy40};
    border-radius: ${theme.borders.borderRadius};
    padding: ${theme.spacing.s};

    ${mq({
      fontSize: ['13px', '13px', '16px']
    })}
  }

  textarea::placeholder,
  input::placeholder {
    color: ${theme.colors.gravy70};
    opacity: 1;
  }
`

export const StyledHeading = styled(Text)`
  text-align: center;
`

export const StyledSleeperContainer = styled.div`
  display: block;

  ${mq({
    marginBottom: [theme.spacing.m, theme.spacing.l, '']
  })}
`

export const StyledRadioContainer = styled.div`
  display: block;

  input {
    margin: 0 ${theme.spacing.s} ${theme.spacing.s} 0;
    accent-color: ${theme.colors.gravy};
  }

  label {
    color: ${theme.colors.gravy80};

    ${mq({
      fontSize: ['13px', '13px', '16px']
    })}
  }
`

export const StyledSubmitButton = styled((props) => (
  <StyledButton {...props} />
))`
  text-align: center;
`

export const StyledClose = styled.button<{ showReviewForm: boolean }>`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${theme.spacing.s};
  top: ${theme.spacing.s};

  img {
    transform: ${({ showReviewForm }) =>
      showReviewForm ? 'rotate(0)' : 'rotate(45deg)'};
    transition: 0.5s ease;
  }
`
export const StyledRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacing.m};
  position: relative;
`

export const StyledStars = styled(Rating)`
  > label:not(:last-child) {
    margin-right: 2px;
  }
`
export const StyledForm = styled.form`
  > *:not(:last-child) {
    ${mq({
      marginBottom: ['', theme.spacing.l, '']
    })}
  }
`

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledMotionDiv = styled(motion.div)<{ showReviewForm: boolean }>`
  background-color: ${theme.colors.offWhite};
  border: ${theme.borders.borderWidth} solid ${theme.borders.borderColor};
  border-radius: ${theme.borders.borderRadius};
  position: relative;
  margin-bottom: ${({ showReviewForm }) =>
    showReviewForm ? `${theme.spacing.xl}` : ''};

  ${mq({
    padding: [
      `${theme.spacing.m} ${theme.spacing.m}`,
      `${theme.spacing.xl} ${theme.spacing.l}`,
      ''
    ]
  })};
`
export const StyledErrorMessageSpan = styled.span`
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.spacing.semibold};
  font-size: ${theme.spacing.m};
  padding-left: ${theme.spacing.xs};
`
export const StyledServerErrorMessage = styled.p`
  color: ${theme.colors.errorRed};
  text-align: center;
`
export const StyledCharacterCount = styled(Text)`
  text-align: right;
  position: absolute;
  bottom: 2px;
  right: 10px;
`

export const StyledTextAreaContainer = styled.div`
  position: relative;
  display: flex;

  textarea {
    width: 100%;
    resize: vertical;
  }
`
