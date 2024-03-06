import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Text } from '../Text/Text'
import { StyledImageContainer } from '../BackgroundImage'
import { Button } from '../Button'

export const StyledModalContainer = styled.div`
  height: 100%;
  display: flex;

  ${mq({
    width: ['auto', '', '900px'],
    flexDirection: ['column', '', 'row']
  })}
`

export const StyledBackgroundImage = styled(StyledImageContainer)`
  background-repeat: no-repeat;
  width: 100%;

  ${mq({
    height: ['145px', '', 'auto'],
    backgroundPosition: ['center', '', 'right']
  })}
`

export const StyledAffirm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.s} auto;
`

export const StyledFooter = styled.div`
  background-color: ${theme.colors.offWhite};
  padding: ${theme.spacing.m};
  text-align: left;
  max-width: 49rem;
`

export const StyledBadge = styled.div`
  display: flex;
  margin-left: ${theme.spacing.xxs};
  width: 5rem;
`

export const StyledPublishedDate = styled(Text)`
  letter-spacing: ${theme.letterSpacing.s};
  color: ${theme.colors.gravy70};
  text-align: left;
`
export const StyledButton = styled(Button)`
  margin: ${theme.spacing.l} 0 0 0 !important;
`

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledBody = styled.div`
  > div > div {
    padding-bottom: ${theme.spacing.m};
    border-bottom: 2px solid ${theme.colors.gravy20};
    text-align: left;
  }
`
