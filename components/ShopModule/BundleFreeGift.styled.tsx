import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Text } from '../Text/Text'
import { StyledChecklist } from '../../styles/global.styled'

// bundle card item styling
export const StyledBundleItemCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${theme.spacing.m} ${theme.spacing.xs};
  position: relative;
`
// Adds Borders to bundle item cards
export const StyledGridContainer = styled.div`
  border-top: 1px solid ${theme.colors.gravy40};
  border-bottom: 1px solid ${theme.colors.gravy40};

  /* Targets bundle cards to add borders */
  > div > div:nth-child(odd) {
    border-right: 1px solid ${theme.colors.gravy40};
  }

  > div > div:first-child {
    ${mq({
      borderBottom: [
        `1px solid ${theme.colors.gravy40}`,
        'none',
        `1px solid ${theme.colors.gravy40}`
      ]
    })}
  }

  > div > div:nth-child(2) {
    ${mq({
      borderBottom: [
        `1px solid ${theme.colors.gravy40}`,
        'none',
        `1px solid ${theme.colors.gravy40}`
      ],
      borderRight: ['none', `1px solid ${theme.colors.gravy40}`, 'none']
    })}
  }
`

export const StyledBundleItemQuantity = styled(Text)`
  position: absolute;
  background-color: ${theme.colors.gravy70};
  text-align: center;
  font-weight: ${theme.fontWeights.semibold};
  border-radius: 12px;
  height: 20px;
  width: 32px;

  ${mq({
    top: [`${theme.spacing.xs}`, '', `${theme.spacing.s}`],
    right: [`${theme.spacing.xs}`, '', `${theme.spacing.s}`]
  })}
`

export const StyledBundleItemTitle = styled(Text)`
  text-align: center;
`

// bundle module styling
export const StyledBundleModuleContainer = styled.div`
  background-color: ${theme.colors.endyBlue40};
  border: 2px dotted ${theme.colors.darkBlue};
  border-radius: ${theme.borders.borderRadius};
  position: relative;
  margin-top: ${theme.spacing.xl};
`

export const StyledBundleHeading = styled(Text)`
  text-align: center;
  margin: ${theme.spacing.m} 0 ${theme.spacing.s};
  font-weight: ${theme.fontWeights.semibold};
`

export const StyledBundleChecklist = styled(Text)`
  ${StyledChecklist} {
    li {
      margin-bottom: ${theme.spacing.xxs};
    }
  }
`

export const StyledValueContainer = styled.div`
  display: flex;
  justify-content: center;

  /* targets gift icon */
  img {
    margin-right: 6px;
  }
`
export const StyledBundleDescription = styled(Text)`
  margin: ${theme.spacing.s} ${theme.spacing.m};

  /* targets checklist wrapper from RTE */
  span > div {
    justify-content: flex-start;
  }

  ul > li:not(:last-child) {
    margin-bottom: ${theme.spacing.xxxs};
  }
`

export const StyledTotalValue = styled.div`
  border-top: 1px solid ${theme.colors.gravy40};
  letter-spacing: ${theme.letterSpacing.s};
  padding: ${theme.spacing.s} 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;

  img {
    margin-right: ${theme.spacing.xs};
  }
`
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

export const StyledModalButton = styled.button`
  border: none;
  background-color: transparent;
  margin: 0 auto;

  picture img {
    ${mq({
      maxHeight: ['74px', '91px', ''],
      maxWidth: ['120px', '137px', '']
    })}
  }
`
