import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import {
  StyledSalePriceContainer,
  StyledPriceContainer
} from '../ShopModule/ShopModule.styled'
import { Text } from '../Text'
import Link from 'next/link'

export const StyledPrefooterContainer = styled.div`
  ${mq({
    padding: [`${theme.spacing.xl} 0`, '', `${theme.spacing.xxl} 0`]
  })}
`

export const StyledProductsContainer = styled.div`
  ${mq({
    display: ['block', 'grid', ''],
    gridTemplateColumns: ['', 'repeat(5, 1fr)', ''],
    ['a:first-child']: {
      gridColumn: ['', '1 / 4', '']
    },
    ['a:last-child']: {
      gridColumn: ['', '4 / 6', '']
    }
  })}
`

export const StyledProductCardLink = styled(Link)`
  position: relative;
  transition: all 0.5s;

  ${mq({
    display: ['flex', '', ''],
    flexDirection: ['column', '', '']
  })}

  &:hover {
    opacity: 0.7;
  }

  :not(:last-child) {
    ${mq({
      marginRight: ['', `${theme.spacing.m}`, `${theme.spacing.xl}`],
      marginBottom: [`${theme.spacing.l}`, '', '']
    })}
  }
`

export const StyledProductInfo = styled.div`
  justify-content: space-between;

  ${mq({
    display: ['', '', 'flex'],
    margin: [`${theme.spacing.xs} 0 0 0`, '', '']
  })}

  h3 {
    margin-bottom: 0;
  }
`

export const StyledFrom = styled(Text)`
  margin-right: ${theme.spacing.xxs};
`

export const StyledPriceInfo = styled.div`
  display: flex;
  align-items: center;

  ${StyledPriceContainer} {
    padding: 0;
    display: inline;
  }

  ${StyledPriceContainer} span {
    color: ${theme.colors.gravy};
    font-weight: ${theme.fontWeights.regular};
  }

  ${StyledSalePriceContainer} span:first-child {
    color: ${theme.colors.rubine};
    margin-right: 0;
    font-weight: ${theme.fontWeights.semibold};
  }

  ${StyledSalePriceContainer} span, ${StyledPriceContainer} span {
    ${mq({
      fontSize: ['16px', '16px', '19px']
    })}
  }
`
