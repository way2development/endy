import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledSaleBanner = styled.div<{
  bgColor?: string
  showCountdown?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  margin: ${({ showCountdown }) =>
    showCountdown ? `${theme.spacing.xl} 0` : `${theme.spacing.m} 0`};
  border-radius: ${theme.borders.borderRadius};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  border: 2px dotted ${theme.colors.darkBlue};

  img {
    ${mq({
      marginRight: [`${theme.spacing.xs}`, `${theme.spacing.xs}`, '']
    })}
  }

  ${mq({
    padding: [`${theme.spacing.s}`, `${theme.spacing.m}`, '']
  })}
`

export const StyledText = styled(Text)`
  /* As per the UX, the font-size is mediumBody on desktop and smallBody on mobile/tablet. */
  ${mq({ fontSize: ['13px', '13px', '19px'] })}

  /* As per UX, the font-size for the mobile/tablet modal button is 12px. */
  button {
    ${mq({ fontSize: ['12px', '12px', '19px'] })}
  }
`

export const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const StyledSaleMessageContainer = styled.div<{
  hasMysteryGift: boolean
}>`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: ${({ hasMysteryGift }) =>
    hasMysteryGift ? `${theme.spacing.s}` : 0};
`

export const StyledSpecialOfferContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${theme.colors.gravy20};
  padding-top: ${theme.spacing.s};
  position: relative;
`

// TODO: Make this a reusable global component
export const StyledPromoPillContainer = styled.div<{
  locale: string
}>`
  /* span block is custom styling for PromoPill */
  > span {
    margin-left: unset;
    margin-right: unset;
    background-color: ${theme.colors.endyBlue40};
    border-style: dotted;
    border-color: ${theme.colors.darkBlue};
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
  }

  span {
    font-weight: ${theme.fontWeights.semibold};
  }
`
