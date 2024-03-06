import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'

import {
  StyledPriceContainer,
  StyledSalePriceContainer
} from '../ShopModule/ShopModule.styled'

export const StyledStickyBar = styled.div`
  background-color: ${theme.colors.white};
  width: 100%;
  position: fixed;
  z-index: 90;
  /* TODO: Color not included in theme. See if we can use a theme color instead */
  border-bottom: 2px solid #e9e9e9;
  box-shadow: 0px -2px 4px rgb(0 0 0 / 6%);

  ${mq({
    top: ['', '', '58px'],
    bottom: ['0', '0', 'unset'],
    padding: [
      `${theme.spacing.s} 0 ${theme.spacing.xl}`,
      `${theme.spacing.s} 0 ${theme.spacing.xl}`,
      `${theme.spacing.s} 0`
    ]
  })}

  /* TODO: Update Price component to be more flexible with stylings and removed the following Price styles */
  ${StyledPriceContainer} {
    display: inline-block;
    width: unset;
  }

  ${StyledSalePriceContainer} {
    ${mq({
      display: ['block', 'flex', '']
    })}
  }

  ${StyledSalePriceContainer} span, 
  ${StyledPriceContainer} > span {
    ${mq({
      fontSize: ['16px', '16px', '19px']
    })}
  }

  ${StyledPriceContainer} > span {
    color: ${theme.colors.gravy};
    font-weight: ${theme.fontWeights.regular};
  }
`

export const StyledProductTitle = styled(Text)`
  margin-bottom: 0;
`

export const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyledProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  flex-grow: 1;
  width: auto;
`

export const StyledProductPrice = styled.div`
  width: auto;
`

export const StyledButtonContainer = styled.div`
  justify-content: flex-end;
  width: auto;
`
