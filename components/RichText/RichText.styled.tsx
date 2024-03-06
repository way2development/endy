import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text/Text'

export const StyledChecklistWrapper = styled.div`
  ${mq({
    display: ['flex', 'flex', 'block'],
    justifyContent: ['center', 'initial']
  })}

  li:not(:last-child) {
    margin-bottom: ${theme.spacing.m};
  }
`

export const StyledWrapper = styled.span`
  > *:not(:last-child) {
    display: block;
  }
`

export const StyledCaption = styled(Text)`
  a {
    ${mq({
      fontSize: ['13px', '13px', '16px']
    })}
  }
`
export const StyledHorizontalContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`
