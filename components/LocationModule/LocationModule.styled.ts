import styled from 'styled-components'
import { Text } from '../Text'
import { mq, theme } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledWrapper = styled(StyledPageWidth)(
  ({ variant }: { variant: string }) => {
    return mq({
      paddingTop: [theme.spacing.xl, '', theme.spacing.xxl],
      paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
      paddingLeft: ['0', '', '75px'],
      paddingRight: ['0', '', '75px'],
      display: ['', '', 'flex'],
      gap: ['', '', '3rem'],
      flexDirection: [variant === 'Media Left' ? 'row-reverse' : 'row']
    })
  }
)

export const StyledHeading = styled(Text)`
  margin-bottom: ${theme.spacing.m};

  ${mq({
    textAlign: ['center', '', 'left']
  })}
`

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p:not(:first-child) {
    ${mq({
      marginTop: [`${theme.spacing.m}`, '0', `${theme.spacing.m}`]
    })}
  }
`

export const StyledMediaColumn = styled.div`
  display: flex;
  align-content: center;
  flex-wrap: wrap;

  ${mq({
    flexGrow: ['', '', '6'],
    width: ['', '', '60%']
  })}
`

export const StyledImageContainer = styled.div`
  position: relative;
`

export const StyledEmail = styled.span`
  display: block;
`

export const StyledTelephone = styled.span`
  display: block;
`

export const StyledStoreInfo = styled.div`
  ${mq({
    display: ['block', 'flex', 'block'],
    gap: ['21px', '', '0'],
    textAlign: ['center', 'left', '']
  })}

  align-items: flex-start;
  justify-content: center;
`

export const StyledCta = styled.div`
  ${mq({
    display: ['flex', '', 'block'],
    justifyContent: ['center', '', ''],

    margin: [
      `${theme.spacing.m} 0 ${theme.spacing.l} 0`,
      '',
      `${theme.spacing.m} 0 0 0`
    ]
  })}
`

export const StyledContactDetails = styled.span`
  display: flex;

  img {
    margin-right: 14px;
  }

  :last-child {
    margin-top: ${theme.spacing.xs};
  }
`

export const StyledContactDetailsText = styled(Text)`
  ${mq({
    display: ['flex', 'block', ''],
    flexDirection: ['column', '', ''],
    alignItems: ['center', '', '']
  })}
`
