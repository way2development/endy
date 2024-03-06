import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

import { StyledButton } from '../Button/Button.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { Text } from '../Text'
import Link from 'next/link'
import { StyledButtonLink } from '../CtaLink/CtaLink.styled'

export const StyledSection = styled.section`
  background-color: ${theme.colors.offWhite};
  ${mq({
    paddingBottom: [`${theme.spacing.xl}`, ``, `${theme.spacing.xxl}`]
  })}

  /* The carousel is outside of the page margins on mobile/tablet */
  ${StyledPageWidth} {
    ${mq({
      paddingLeft: ['0', '0', `${theme.pageMargin[2]}`],
      paddingRight: ['0', '0', `${theme.pageMargin[2]}`],
      paddingTop: ['0', '0', `${theme.spacing.l}`]
    })}
  }
`
export const StyledProductBadges = styled.div`
  ${mq({
    marginTop: ['0', '0', `${theme.spacing.l}`]
  })}
`

export const StyledContainer = styled.div`
  width: 100%;
  ${mq({
    paddingLeft: [`${theme.pageMargin[0]}`, `${theme.pageMargin[1]}`, '0'],
    paddingRight: [`${theme.pageMargin[0]}`, `${theme.pageMargin[1]}`, '0']
  })}

  ${StyledProductBadges} {
    ${mq({
      display: ['block', 'block', 'none']
    })}
  }
`

export const StyledProductCarouselContainer = styled.div`
  top: 82px;
  align-self: start;
  z-index: 10;
  ${mq({
    position: ['', '', 'sticky']
  })}

  ${StyledProductBadges} {
    ${mq({
      display: ['none', 'none', 'block']
    })}
  }
`

export const StyledHeading = styled(Text)`
  margin: 0;
  font-size: var(--font-size-h2);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.rubine};

  span {
    margin-bottom: 10px;
  }
`
// Tagline
export const StyledSubheading = styled(Text)`
  margin: 0;
  display: none;
  font-size: var(--font-size-h5);
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};
  line-height: var(--line-height-secondary);

  @media screen and (min-width: 501px) {
    display: block;
  }
`

export const StyledLongDescription = styled.div`
  padding-bottom: ${theme.spacing.l};
  border-bottom: 1px solid ${theme.borders.borderColor};

  ${mq({
    marginTop: [
      `${theme.spacing.m}`,
      `${theme.spacing.m}`,
      `${theme.spacing.l}`
    ]
  })}
`

export const StyledProductDetailHeading = styled(Text)`
  ${mq({
    marginBottom: [
      `${theme.spacing.xxs}`,
      `${theme.spacing.xxs}`,
      `${theme.spacing.xs}`
    ]
  })}
`

export const StyledPriceContainer = styled.div<{
  isAffirmAvailable: boolean
  showAPRLineBreak: boolean | undefined
}>`
  ${({ isAffirmAvailable }) =>
    isAffirmAvailable &&
    `
    margin: 0;
  width: calc(100% / 2);
  `}

  ${({ showAPRLineBreak }) => !showAPRLineBreak && `width 40%`}
`

export const StyledSalePriceContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap; // required because when sale price includes cents, it breaks outside container causing illegible overlap

  /* targets crossed out price */
  span:last-child {
    margin-left: 6.5px;
  }
`

export const StyledPriceDesktop = styled.div<{ isAffirmAvailable: boolean }>`
  border-bottom: ${({ isAffirmAvailable }) =>
    isAffirmAvailable ? `1px ${theme.colors.gravy20} solid` : ''};
  position: relative;
  display: flex;
  margin: ${theme.spacing.m} 0;
`

export const StyledShopButton = styled((props) => <StyledButton {...props} />)`
  width: 100%;
  margin-top: ${theme.spacing.m};
`

// @TODO: clean up / use global fieldset reset in global-styles.css
export const StyledFieldset = styled.fieldset<{ slug?: boolean }>`
  padding: 0;
  margin: ${({ slug }) => (slug ? '0' : `${theme.spacing.s} 0 0`)};
  border: 0;
`

export const StyledSalePillFlagContainer = styled.div`
  margin: ${theme.spacing.m} 0;
`

export const StyledSalePillFlag = styled(Text)<{ saleColor?: string }>`
  display: inline-block;
  border-radius: 30px;
  background-color: ${({ saleColor }) => `${saleColor}`};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${theme.fontWeights.semibold};
  border: dotted 2px ${theme.colors.darkBlue};
  ${mq({
    padding: [`2px ${theme.spacing.s}`, ``, `2px ${theme.spacing.m}`]
  })}
`

export const StyledFreeGiftLink = styled(Link)<{
  color: string
  bgColor: string | undefined
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ color }) => `${color}`};
  background-color: ${({ bgColor }) =>
    bgColor ? `${bgColor}` : `${theme.colors.endyBlue}`};
  border: 2px dotted ${theme.colors.darkBlue};
  border-radius: ${theme.borders.borderRadius};
  margin: ${theme.spacing.s} 0;
  cursor: pointer;
  width: 100%;

  ${mq({
    padding: [
      `${theme.spacing.xs} ${theme.spacing.xs}`,
      `${theme.spacing.xs} ${theme.spacing.m}`,
      ''
    ]
  })}

  img:last-of-type {
    transition: translate 0.2s ease;
  }

  &:hover img:last-of-type {
    transform: translate(3px);
  }
`

export const StyledFreeGiftText = styled(Text)`
  justify-content: flex-start;
  flex-grow: 1;
  ${mq({
    marginLeft: [
      `${theme.spacing.xs}`,
      `${theme.spacing.m}`,
      `${theme.spacing.m}`
    ]
  })}
`

export const StyledAdditionalInfo = styled(Text)`
  ${mq({
    marginTop: [`${theme.spacing.s}`, '', `${theme.spacing.m}`]
  })}
`

export const StyledComparisonInfo = styled(Text)`
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.m};
`

export const StyledExtoleBtn = styled.button`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  border-radius: ${theme.borders.borderRadius};
  margin: ${theme.spacing.s} 0;
  background: none;
  border: none;
  width: 100%;

  span {
    padding: ${theme.spacing.s};
    width: 100%;
    display: flex;
  }
`

export const StyledVerticalLine = styled.div<{
  showAPRLineBreak: boolean | undefined
}>`
  border-left: 1px solid ${theme.colors.gravy20};
  height: 100%;
  position: absolute;
  left: ${({ showAPRLineBreak }) => (showAPRLineBreak ? '50%' : '40%')};
  margin-left: -3px;
  top: 0;
`

export const StyledPrice = styled(Text)`
  line-height: 1;
`

export const StyledRegularPrice = styled(Text)<{ isMonthlyPayment: boolean }>`
  line-height: 1;
  ${({ isMonthlyPayment }) => isMonthlyPayment && `line-height: 1`}
`

export const StyledSaleEnds = styled(Text)<{ isSaleOnFR: boolean }>`
  margin-right: ${({ isSaleOnFR }) =>
    isSaleOnFR ? `${theme.spacing.s}` : '0'};
`

export const StyledOutboundLinks = styled.div`
  a:not(:last-child) {
    margin-bottom: ${theme.spacing.m};
  }
  a:last-child {
    ${mq({
      marginBottom: [theme.spacing.l, '', theme.spacing.m]
    })}
  }
`

export const StyledProductTypeContainer = styled.div`
  margin: ${theme.spacing.l} ${theme.spacing.s} ${theme.spacing.s} 0;

  ${StyledButtonLink} {
    margin-right: ${theme.spacing.s};
    min-width: 116px;
    font-weight: ${theme.fontWeights.regular};
    box-shadow: none;
    border: 1px solid ${theme.colors.gravy80};
  }
`
