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
      margin: 0 20px;
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

export const StyledSubcopy = styled(Text)`
  margin-bottom: ${theme.spacing.l};
  text-align: center;
`
