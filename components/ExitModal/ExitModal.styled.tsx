import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledImageContainer } from '../BackgroundImage'

export const StyledModalContainer = styled.div`
  height: 100%;
  display: flex;
  width: 584px;
`

export const StyledBackgroundImage = styled(StyledImageContainer)`
  height: auto;
  background-repeat: no-repeat;
  background-position: left;
  width: 30%;
`

export const StyledHeading = styled(Text)<{ borderColor: string }>`
  padding: ${theme.spacing.s} 0 ${theme.spacing.m} 0;
  margin-bottom: ${theme.spacing.m};
  border-bottom: ${({ borderColor }) =>
    `${theme.borders.borderWidth} solid ${borderColor}`};
`

export const StyledSubcopy = styled(Text)`
  padding-bottom: ${theme.spacing.m};
`

export const StyledMicrocopy = styled(Text)`
  margin-top: ${theme.spacing.s};
`

export const StyledModal = styled.div<{
  maxwidth?: string
  bgColor?: { hex: string }
}>`
  max-width: ${({ maxwidth }) => maxwidth || '50rem'};
  background-color: ${({ bgColor }) => bgColor?.hex};
  text-align: center;
  width: 70.5%;
  padding: ${theme.spacing.l} ${theme.spacing.xxxl};
`
export const StyledClose = styled.button`
  background: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  padding: 0;

  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease;
  }
`
