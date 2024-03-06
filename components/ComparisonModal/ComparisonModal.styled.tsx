import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Button } from '../Button'
import {
  StyledHeading,
  StyledCompetitorWrapper
} from '../VersusCompetitor/VersusCompetitor.styled'
import {
  StyledProductDetailsWrapper,
  StyledProductReview,
  StyledReviewAnchor
} from '../VersusProduct/VersusProduct.styled'
import { StyledProductPill } from '../PromoPill/PromoPill.styled'

export const StyledModalContainer = styled.div<{ bgColor?: { hex: string } }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor.hex : `${theme.colors.offWhite}`};

  ${mq({
    width: ['auto', '', '900px']
  })}

  /* styling of elements below is shared between VersusProduct and VersusCompetitor, which is the reason for the imports  */

  ${StyledCompetitorWrapper} {
    padding-top: ${theme.spacing.l};
    padding-bottom: 0;
  }

  ${StyledHeading} {
    display: none;
  }

  ${StyledProductPill} {
    margin: unset;
  }

  ${StyledProductDetailsWrapper} {
    margin-top: 0;
  }

  ${StyledProductReview}, ${StyledReviewAnchor} {
    margin-top: ${theme.spacing.xs};
  }
`

export const StyledButton = styled(Button)`
  margin: ${theme.spacing.l} 0 0 0 !important;
`

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${theme.spacing.xl};
`
