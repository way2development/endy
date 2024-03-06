import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledCard = styled.div`
  background: #ffffff;
  -ms-box-shadow: 0px 1px 5px rgba(36, 55, 70, 0.3);
  -webkit-box-shadow: 0px 1px 5px rgb(36 55 70 / 30%);
  box-shadow: 0px 1px 5px rgb(36 55 70 / 30%);
  border-radius: 2px;
  position: relative;
  margin: 0 auto;
  padding: ${theme.spacing.xxl};
  text-align: center;
`

export const StyledGrid = styled.ul`
  display: flex;

  ${mq({
    justifyContent: ['center', 'space-between', 'space-between'],
    flexDirection: ['column', 'row', 'row']
  })}
`

export const StyledGridItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mq({
    width: ['100%', '', '33%']
  })}

  :nth-child(2) {
    padding: 0 ${theme.spacing.m};
  }
`

export const StyledGridIcon = styled.div`
  position: relative;
  height: 64px;
  width: 64px;
  margin: ${theme.spacing.l} auto;

  &:hover > div {
    visibility: visible;
  }
`

export const StyledHeading = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`
export const StyledContainer = styled.div<{
  backgroundColor: string | undefined
}>`
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
  padding: ${theme.spacing.xxl} 0;
`

export const StyledMicrocopy = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledNumber = styled.span`
  display: block;
`
