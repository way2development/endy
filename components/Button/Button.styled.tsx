import styled, { css } from 'styled-components'
import { getColor } from '../../utils'
import { mq, theme } from '../../styles/theme'

const getVariantType = (variant: string) => {
  return variant.split('-')[0]
}

export const buttonStyleMixin = css<{ variant: string; disabled?: boolean }>`
  ${({ variant }) =>
    css<{ variant: string }>`
      font-family: ${theme.fonts.calibre};
      font-weight: ${theme.fontWeights.semibold};
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: var(--letter-spacing-1px);
      text-align: center;
      ${getVariantType(variant) === 'solid'
        ? `background-color: ${theme.colors[getColor(variant)]}`
        : 'background-color: transparent'};
      color: ${getVariantType(variant) === 'solid'
        ? theme.colors.white
        : theme.colors[getColor(variant)]};
      border: ${getVariantType(variant) === 'solid'
        ? `2px solid transparent`
        : `2px solid ${theme.colors[getColor(variant)]}80`};
      border-radius: ${theme.borders.borderRadius};
      padding: var(--btn-padding-top-bottom-default)
        var(--btn-padding-left-right-default);
      -webkit-transition: var(--btn-transition);
      -moz-transition: var(--btn-transition);
      -ms-transition: var(--btn-transition);
      -o-transition: var(--btn-transition);
      transition: var(--btn-transition);
      box-shadow: 0px 2px 4px rgba(36, 55, 70, 0.5);

      :hover {
        background-color: ${theme.colors.white};
        border-color: ${theme.colors.white};
        color: ${getColor(variant) === 'white'
          ? theme.colors.gravy
          : theme.colors[getColor(variant)]};
      }

      :hover,
      :focus {
        opacity: 1;
      }
    `}
`

export const StyledTextButton = styled.button(
  ({ variant }: { variant: string }) => {
    const isInline = variant === 'inline'
    return mq({
      padding: 0,
      border: 'none',
      textDecoration: 'underline',
      color: isInline ? 'inherit' : theme.colors[getColor(variant)],
      transition: 'all 0.5s ease',
      background: 'none',
      fontSize: isInline ? 'inherit' : ['16px', '16px', '19px'],
      fontFamily: isInline ? 'inherit' : theme.fonts.calibre,
      ':hover': {
        opacity: 0.7
      }
    })
  }
)

export const StyledButton = styled.button<{
  variant: string
  disabled?: boolean
}>`
  ${buttonStyleMixin}

  &[disabled],
  &[disabled]:hover {
    background-color: ${theme.colors.lineGrey};
    color: ${theme.colors.gravy};
    border: 2px solid ${theme.colors.lineGrey};
  }
`
