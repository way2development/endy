import styled from 'styled-components'

import { theme, mq } from '../../styles/theme'

import { StyledButton } from '../Button/Button.styled'
import { Text } from '../Text'
import Link from 'next/link'

// These are copied from Product Card Grid
// I wonder if section/heading styles can be componentized?
export const StyledHeadingContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${theme.spacing.l};
  margin-bottom: ${theme.spacing.xl};
`

export const StyledHeading = styled(Text)`
  ${mq({
    margin: ['0 auto', '0', ''],
    textAlign: ['center', 'left', '']
  })}
`

export const StyledSection = styled.section`
  ${mq({
    marginTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
    marginBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}
`

// @TODO: We may need to add the ability to add "line-through" to our <Text> component
// As this does not use the "priceCrossed" variant in our design system but may be used in body text in other modules.
export const StyledOriginalPrice = styled(Text)<{
  isOnSale?: boolean
}>`
  text-decoration: ${(props) => props.isOnSale && 'line-through'};
  color: ${(props) => props.isOnSale && `${theme.colors.gravy70}`};
`

export const StyledSalePrice = styled(Text)`
  padding-right: ${theme.spacing.xs};
`

export const StyledCard = styled.div`
  box-shadow: 0 2px 5px rgb(36 55 70 / 29%);
  /* Height is necessary to keep all cards the same height in the grid */
  height: 100%;
  position: relative;
`

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* Height is necessary to stretch the content to the full height of the card/grid */
  height: 100%;
`

export const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing.m};
  /* With space-between, height is necessary to keep the button anchored to the bottom of the text/button container. */
  height: 100%;
`

export const StyledTextContainer = styled.div`
  margin-bottom: 1rem;
`

export const StyledAnchor = styled(Link)`
  &:hover {
    h3 {
      color: ${theme.colors.rubine};
    }
  }
`

export const StyledProductTitle = styled(Text)`
  margin: 0;
`

export const StyledCardButton = styled((props) => <StyledButton {...props} />)`
  width: 100%;
`
