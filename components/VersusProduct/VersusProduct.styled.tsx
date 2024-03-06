import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { PromoPill } from '../PromoPill'
import Link from 'next/link'

export const StyledProductHeading = styled(Text)<{ order?: number }>`
  margin-bottom: 0;
  margin-top: ${theme.spacing.s};
`

export const StyledPromoPill = styled(PromoPill)<{ order?: number }>`
  order: ${({ order }) => order ?? 'unset'};
`

export const StyledProductDetailsContainer = styled.div<{ order?: number }>`
  order: ${({ order }) => order ?? 'unset'};
  padding-bottom: ${theme.spacing.m};
  margin-bottom: ${theme.spacing.m};
  border-bottom: ${theme.borders.borderWidth} solid ${theme.borders.borderColor};
`

export const StyledProductDetailsInnerContainer = styled.div`
  position: relative;
  :hover h4 span {
    right: -3px;
  }
`

export const StyledPrice = styled(Text)`
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.semibold};
`

export const StyledProductDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.s};
  flex-direction: column;
  align-items: flex-start;

  ${mq({
    marginTop: [
      `${theme.spacing.xs}`,
      `${theme.spacing.l}`,
      `${theme.spacing.l}`
    ]
  })};
`

export const StyledProductReview = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: ${theme.spacing.xxs};
  }
`
// TODO: Typography does not fit within out CTA styles
export const StyledReviewAnchor = styled(Link)`
  color: ${theme.colors.gravy70};
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.7;
    span {
      right: -3px;
    }
  }
`

export const StyledProductAnchor = styled(Link)`
  &:hover {
    span {
      right: -3px;
    }
  }
`

export const StyledRecommendationHeading = styled(Text)`
  ${mq({
    marginBottom: [
      ` ${theme.spacing.xs}`,
      ` ${theme.spacing.s}`,
      ` ${theme.spacing.s}`
    ]
  })};
`

export const StyledRecommendationContainer = styled.div<{ order?: number }>`
  order: ${({ order }) => order ?? 'unset'};
  margin-bottom: ${theme.spacing.m};
  padding-bottom: ${theme.spacing.m};
  border-bottom: ${theme.borders.borderWidth} solid ${theme.borders.borderColor};
`

export const StyledFeatureWrapper = styled.div<{ order?: number }>`
  order: ${({ order }) => order ?? 'unset'};
  ${mq({
    marginBottom: [
      ` ${theme.spacing.m}`,
      ` ${theme.spacing.m}`,
      ` ${theme.spacing.l}`
    ]
  })};
`

export const StyledCtaContainer = styled.div<{ order?: number }>`
  order: ${({ order }) => order ?? 'unset'};
  text-align: center;

  ${mq({
    marginTop: [
      ` ${theme.spacing.l}`,
      ` ${theme.spacing.l}`,
      ` ${theme.spacing.xl}`
    ]
  })};
`
