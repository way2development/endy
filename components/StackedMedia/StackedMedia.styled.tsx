import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledSection = styled.section<{ bgColor?: { hex: string } }>`
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor.hex : `${theme.colors.white}`};
`

export const StyledWrapper = styled(StyledPageWidth)`
  ${mq({
    paddingTop: [theme.spacing.m, '', theme.spacing.l],
    paddingBottom: [theme.spacing.m, '', theme.spacing.l]
  })}
`

export const StyledStackedMedia = styled.div`
  display: flex;
  flex-direction: column;

  :not(:last-child) {
    ${mq({
      margin: [`0 0 ${theme.spacing.xl} 0`, `0 ${theme.spacing.xl} 0 0`]
    })}
  }
`

export const StyledStackedMediaContainer = styled.div`
  display: flex;
  justify-content: center;

  // Override to target div children of .plyr in order to remove the built-in css background: linear-gradient styling
  .plyr > div {
    background: none;
  }

  ${mq({
    flexDirection: ['column', 'row']
  })}
`

export const StyledHeading = styled(Text)`
  margin-bottom: 0;
  text-align: center;
`

export const StyledSubheading = styled(Text)`
  margin: ${theme.spacing.m} 0;
`

export const StyledTextContainer = styled.div`
  ${mq({
    display: ['none', 'block'],
    textAlign: ['left', 'center']
  })}
`
export const StyledAccordionContainer = styled.div`
  ${mq({
    display: ['block', 'none']
  })}
`
