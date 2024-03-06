import { motion } from 'framer-motion'
import styled from 'styled-components'

import { Text } from '../Text'
import { StyledTextBadge } from '../BadgeTile/BadgeTile.styled'

import { mq, theme } from '../../styles/theme'

// Accordion LIST Styles
export const StyledAccordionListSection = styled.section(
  ({ removeMargins }: { removeMargins: boolean }) => {
    return removeMargins
      ? ''
      : mq({
          paddingTop: [theme.spacing.l, theme.spacing.xl, theme.spacing.xxl],
          paddingBottom: [theme.spacing.l, theme.spacing.xl, theme.spacing.xxl]
        })
  }
)

export const StyledHeadingContainer = styled.div`
  text-align: center;
`

export const StyledAccordionsWrapper = styled.div(
  ({ removeMargins }: { removeMargins: boolean }) => {
    return mq({
      width: ['100%', '100%', removeMargins ? '' : '66.6666%'],
      margin: ['', removeMargins ? '' : '0 auto']
    })
  }
)

// Accordion ITEM Styles
export const StyledAccordionItem = styled.div`
  width: 100%;
`
export const StyledButton = styled.button<{ showItem: boolean }>`
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid ${theme.colors.gravy};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  img {
    transform: ${({ showItem }) => (showItem ? 'rotate(0)' : 'rotate(45deg)')};
    transition: 0.5s ease;
  }
`

export const StyledAccordionItemHeading = styled(Text)`
  margin: 0;
  padding: ${theme.spacing.s} 0;
`

export const StyledContent = styled(motion.div)`
  overflow: hidden;
  padding: ${theme.spacing.m} 0;

  ${StyledTextBadge}:last-child {
    margin-bottom: 0;
  }
`
