import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledWrapper = styled.article`
  background-position: center;
  background-size: cover;

  ${mq({
  height: ['144px', '514px', ''],
  position: ['', 'relative', ''],
  display: ['none', 'block', '']
})}
`

export const StyledHeaderText = styled(Text)`
  ${mq({
  marginBottom: [theme.spacing.xs, '', '']
})}
`

export const StyledContentContainer = styled.div`
  border-radius: unset;
  background-color: ${theme.colors.white}d9;
  width: 45%;
  max-width: 460px;
  bottom: 72px;
  left: 48px;
  padding: ${theme.spacing.m} ${theme.spacing.xl};
  position: absolute;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.29);
`
export const StyledContainerWrap = styled.div`
  position: relative;

  h2 {
    margin-bottom: ${theme.spacing.s};
  }
`

export const StyledSubCopyText = styled(Text)`
  ${mq({
  marginBottom: [theme.spacing.xs, '0px', '']
})}
`

export const StyledCtaLinkDiv = styled.div`
  a {
    ${mq({
  padding: ['', `${theme.spacing.s} ${theme.spacing.m}`, '']
})}
  }

  ${mq({
  right: [`${theme.spacing.s}`, '0px', ''],
  position: ['', 'absolute', ''],
  display: ['block', 'inline-block', '']
})}
`
export const StyledImageContainer = styled.div`
  ${mq({
  height: ['100%', '514px', ''],
  display: ['block', 'none', '']
})}

  h2 {
    margin-top: ${theme.spacing.s};
  }
`
