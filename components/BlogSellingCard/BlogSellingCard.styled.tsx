import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledWrapper = styled.div<{ variant: string }>`
  ${mq({
    display: ['block', 'flex !important', ''],
    boxShadow: ['none', '1px 1px 10px -2px rgba(36, 55, 70, 0.3)', '']
  })}

  ${({ variant }) =>
    variant === 'Right' &&
    css`
      flex-direction: row-reverse;
    `}
`

export const StyledImageContainer = styled.div`
  ${mq({
    width: ['100%', '53%', '']
  })}

  picture, picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const StyledContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${mq({
    width: ['90%', '47%', ''],
    margin: ['0 auto -16px', 'initial', ''],
    position: ['relative', 'initial', ''],
    top: ['-40px', 'initial', '']
  })}
`

export const StyledTextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.xl};
  margin-bottom: 0;

  ${mq({
    padding: [`${theme.spacing.l}`, '', `${theme.spacing.xl}`],
    boxShadow: ['1px 1px 10px -2px rgba(36, 55, 70, 0.3)', 'none', '']
  })}

  a {
    width: fit-content;
  }
`

export const StyledText = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`
