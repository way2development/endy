import styled from 'styled-components'
import { buttonStyleMixin } from '../Button/Button.styled'
import { getColor } from '../../utils'
import { mq, theme } from '../../styles/theme'
import Link from 'next/link'

export const StyledTextLink = styled.a(({ variant }: { variant: string }) => {
  const isInline = variant === 'inline'
  return mq({
    textDecoration: isInline ? 'underline' : 'none',
    color: isInline ? 'inherit' : theme.colors[getColor(variant)],
    transition: 'all 0.5s ease',
    fontSize: isInline ? 'inherit' : ['16px', '16px', '19px'],
    fontFamily: isInline ? 'inherit' : theme.fonts.calibre,
    fontWeight: isInline ? 'inherit' : theme.fontWeights.semibold,
    borderBottom: isInline
      ? '0'
      : `1px solid ${theme.colors[getColor(variant)]}`,
    ':hover': {
      opacity: 0.7,
      backgroundColor: 'transparent',
      span: {
        right: '-3px'
      }
    }
  })
})

export const StyledButtonLink = styled(Link)<{
  variant: string
  disabled: boolean
}>`
  ${buttonStyleMixin}

  &[disabled] {
    background-color: ${theme.colors.lineGrey};
    color: ${theme.colors.gravy};
    border: 1px solid ${theme.colors.gravy80};
    cursor: initial;
    font-weight: ${theme.fontWeights.semibold}!important;
  }
`

export const StyledArrow = styled.span`
  vertical-align: middle;
  position: relative;
  right: ${theme.spacing.xxxs};
  transition: all 0.4s ease;
`
