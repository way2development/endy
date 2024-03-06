import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const ValuePointsBackgroundContainer = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: -150px;

  ${mq({
    height: ['250px', '', '500px'],
    marginBottom: ['-50px', '', '-150px']
  })}
`

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

export const StyledValuePointsGrid = styled.ul`
  display: flex;

  ${mq({
    justifyContent: ['center', 'space-between', 'space-between'],
    flexDirection: ['column', 'row', 'row']
  })}
`

export const StyledGridItem = styled.li`
  display: flex;
  flex-direction: column;

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

export const StyledIconTooltip = styled.div`
  visibility: hidden;
  background: var(--white);
  text-align: left;
  display: block;
  position: absolute;
  padding: 16px;
  border: 1px solid var(--line-grey);
  transition: all 0.2s ease;
  z-index: 10;

  ${mq({
    width: ['223px', '', '275px'],
    left: ['65px', '', '-24px'],
    top: ['38px', '', '67px']
  })}
`

export const StyledCtaLink = styled.a`
  width: fit-content;
  align-self: center;
  margin-top: ${theme.spacing.m};
`

export const StyledHeading = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`
export const StyledValuePointsContainer = styled.div<{
  backgroundColor: string | undefined
  hasBackgroundImage: boolean
}>`
  padding: ${theme.spacing.xxl} 0;
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}

  ${({ hasBackgroundImage }) => hasBackgroundImage && `padding-top: 0;`}
    
  overflow: hidden;
`

export const StyledMicrocopy = styled(Text)`
  padding-top: ${theme.spacing.l};
`
