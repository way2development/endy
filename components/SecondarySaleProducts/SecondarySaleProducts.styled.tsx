import { mq, theme } from '../../styles/theme'
import styled from 'styled-components'
import { Text } from '../Text'
import { StyledProductPill } from '../PromoPill/PromoPill.styled'

export const StyledSection = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : `${theme.colors.white}`};

  ${mq({
    paddingTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
    paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}

  ${StyledProductPill} {
    position: absolute;
    top: ${theme.spacing.s};
    right: ${theme.spacing.s};
  }
`
export const StyledHeading = styled(Text)`
  overflow: hidden;
  text-align: center;
  line-height: 1.2;
  > span {
    position: relative;
    display: inline-block;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      border-bottom: 1px solid;
      width: 591px;
      margin: 0 ${theme.spacing.l};
    }
    &::before {
      right: 100%;
    }
    &::after {
      left: 100%;
    }
  }

  ${mq({
    marginBottom: [
      `${theme.spacing.l}`,
      `${theme.spacing.xl}`,
      `${theme.spacing.xxl}`
    ]
  })}
`

export const StyledSubcopy = styled.div`
${mq({
  textAlign: ['center', 'left', 'left'],
  paddingTop: [`${theme.spacing.l}`, '0', '0']
})}
button, a {
    font-weight: normal;
    font-size: 14px;
  }
`

export const StyledSecondarySaleHeadingWrapper = styled.div`
  align-items: center;
  margin-bottom: ${theme.spacing.l};
  ${mq({
    borderBottom: ['none', '1px solid #cccccc;', '1px solid #cccccc;']
  })}

  ${mq({
    display: ['block', 'flex', 'flex'],
    paddingBottom: ['0px', `${theme.spacing.l}`, `${theme.spacing.l}`]
  })}

  h2 {
    margin-bottom: 0;
    flex: 0 0 33.33%;

    ${mq({
      flex: ['100%', '0 0 33.33%', '0 0 33.33%'],
      borderRight: ['none', '1px solid #cccccc;', '1px solid #cccccc;'],
      textAlign: ['center', 'left', 'left'],
      paddingRight: ['0px', `${theme.spacing.xl}`, `${theme.spacing.xl}`]
    })}

    span::before {
      content: none;
    }
    span::after {
      content: none;
    }
  }

  p {
    ${mq({
      paddingLeft: ['0px', `${theme.spacing.xl}`, `${theme.spacing.xl}`]
    })}
  }
`