import styled from 'styled-components'
import { theme, mq } from '../../../styles/theme'
import { Text } from '../../Text'

export const StyledFooterMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${mq({
    textAlign: ['center', '', 'left'],
    paddingTop: [`${theme.spacing.m}`, '', 'initial']
  })}

  &:nth-of-type(3) {
    ${mq({
      gridRowStart: ['3', 'initial', ''],
      gridRowEnd: ['3', 'initial', ''],
      borderTop: ['initial', `1px solid ${theme.colors.white}30`, 'initial'],
      borderBottom: ['initial', `1px solid ${theme.colors.white}30`, 'initial']
    })}
  }

  &:nth-of-type(4) {
    ${mq({
      gridRowStart: ['4', 'initial', ''],
      gridRowEnd: ['4', 'initial', ''],
      borderTop: [`1px solid ${theme.colors.white}30`, '', 'initial'],
      borderBottom: [`1px solid ${theme.colors.white}30`, '', 'initial']
    })}
  }
`

export const StyledMenu = styled.ul`
  width: 100%;
  list-style: none;
`

export const StyledLinkListHeading = styled(Text)`
  font-size: 16px !important;
  font-weight: ${theme.fontWeights.semibold};
  padding-bottom: ${theme.spacing.xs};
`

export const StyledLinkList = styled.li`
  width: 100%;
  ${mq({
    padding: [`${theme.spacing.m} 0`, '', `0 0 ${theme.spacing.s}`]
  })}
`

export const StyledLinkItem = styled.a`
  display: inline-block;
  color: ${theme.colors.white};

  &:hover {
    text-decoration: underline;
  }
`

export const StyledExtoleFooterButton = styled.button`
  text-decoration: none;
  border: none;
  background: none;
  color: ${theme.colors.white};
  font-size: inherit;
  font-family: inherit;
  text-align: left;

  ${mq({
    padding: [`${theme.spacing.m} 0`, '', `0 ${theme.spacing.m} 0 0`],
    textAlign: ['center', '', 'left'],
    height: ['initial', '100%', 'initial']
  })}

  span {
    width: 100%;
  }

  &:hover {
    text-decoration: underline;
  }
`
