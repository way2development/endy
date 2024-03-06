import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledText = styled(Text)`
  margin-right: ${theme.spacing.xxs};
  min-width: 8.15px;
`

export const StyledRatingContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StyledStarHistogram = styled.div`
  display: block;
  width: 193px;
  height: 19px;
  position: relative;
  margin: 0 ${theme.spacing.s} ${theme.spacing.xs};
`

export const StyledGraphBackground = styled.div`
  position: absolute;
  top: 5px;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.lineGrey};
`

export const StyledGraphScore = styled.div<{ graphScore: number }>`
  position: absolute;
  top: 5px;
  height: 100%;
  width: ${({ graphScore }) => graphScore}%;
  background-color: ${theme.colors.rubine};
  max-width: 100%;
`
