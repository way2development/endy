import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Text } from '../Text'
import Link from 'next/link'

export const StyledProductTitle = styled(Text)`
  width: 100%;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.xxs};
`

export const StyledImageContainer = styled.div`
  margin-right: ${theme.spacing.m};

  ${mq({
    maxWidth: ['78px', '120px', ''],
    minWidth: ['78px', '120px', '']
  })}
`

export const StyledBundleItemCard = styled.div`
  display: flex;
  padding-bottom: ${theme.spacing.l};
  border-bottom: 1px solid ${theme.colors.gravy40};

  :not(:last-child) {
    margin-bottom: ${theme.spacing.l};
  }
`

export const StyledSubcopyContainer = styled.div`
  margin-bottom: ${theme.spacing.l};
  text-align: center;
`

export const StyledDescription = styled(Text)`
  text-align: left;

  ${mq({
    marginTop: ['0', theme.spacing.s, theme.spacing.xs]
  })}
`

export const StyledProductReviewsLink = styled(Link)`
  display: flex;
  align-items: center;
`

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledFaqLink = styled(Link)`
  display: block;
  width: fit-content;
  margin: 0 auto;
  text-decoration: underline;
`
