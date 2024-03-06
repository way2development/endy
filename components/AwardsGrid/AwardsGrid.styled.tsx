import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledContainer = styled(StyledPageWidth)<{
  currentQuerySlug: string
  excludedSlugs: string[]
}>`
  padding-top: ${theme.spacing.l};
  padding-bottom: ${({ currentQuerySlug, excludedSlugs }) =>
    excludedSlugs.includes(currentQuerySlug) ? theme.spacing.l : '0'};
`

export const StyledBadgeContainer = styled.div(
  ({ showOnMobile }: { showOnMobile: boolean }) => {
    return mq({
      display: [showOnMobile ? 'block' : 'none', 'block'],
      '&:hover > span': {
        visibility: 'visible'
      },
      position: 'relative',
      maxHeight: '110px',

      ['img']: {
        height: ['100%']
      }
    })
  }
)

export const StyledTooltip = styled.span`
  background: ${theme.colors.white};
  color: ${theme.colors.gravy80};
  border: 1px solid ${theme.colors.lineGrey};
  display: block;
  padding: ${theme.spacing.s};
  position: absolute;
  text-align: center;
  transition: all 0.2s ease;
  visibility: hidden;
  width: 100%;
  z-index: 20;
`
