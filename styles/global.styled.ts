import styled, { css } from 'styled-components'
import { mq, theme } from './theme'
import { Text } from '../components/Text'

export const StyledPageWidth = styled.div`
  max-width: 1310px;
  margin-left: auto;
  margin-right: auto;
  ${mq({
    paddingLeft: theme.pageMargin,
    paddingRight: theme.pageMargin
  })}
`

export const StyledSkipLink = styled.a`
  position: absolute !important;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  :focus {
    clip: auto;
    width: auto;
    height: auto;
    margin: 0;
    color: ${theme.colors.gravy};
    background-color: ${theme.colors.white};
    padding: 10px;
    opacity: 1;
    z-index: 10000;
    transition: none;
  }
`

/* VisuallyHidden
-- Used to visually hide the element on screen, but still expose it in the accessibility tree / allow keyboard navigation for screen readers
*/
export const StyledVisuallyHidden = styled.span`
  position: absolute !important;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

/* VisuallyHiddenLabel
-- Used to visually hide a form element label on screen, but still expose it in the accessibility tree
*/

export const StyledVisuallyHiddenLabel = styled.label`
  position: absolute !important;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

/* VisuallyHiddenInput
-- IMPORTANT: you must set position: relative on the parent container
-- Used to hide radio inputs for the variant buttons in product pages
-- Used to hide select inputs when we want to use the native input & mobile wheel on mobile devices, but want to use a custom drop down on a desktop device with a mobile sized viewport
*/
export const StyledVisuallyHiddenInput = styled.input`
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0;
  width: auto;
`

// Lists

export const StyledBulletlist = styled(Text)`
  list-style: disc;
  padding: 0 ${theme.spacing.l};
  padding-bottom: ${theme.spacing.xs};
  margin: 0;
`

const base64Checkmark = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSIxMyIgaGVpZ2h0PSI5IiB2aWV3Ym94PSIwIDAgMTAwIDEwMCI+CiAgICA8cGF0aAogICAgICBkPSdNMTEuNSAxIDUgOCAxLjUgNScKICAgICAgc3Ryb2tlPScjMjQzNzQ2JwogICAgICBzdHJva2VXaWR0aD0nMS41JwogICAgICBmaWxsPSdub25lJwogICAgICBmaWxsUnVsZT0nZXZlbm9kZCcKICAgICAgc3Ryb2tlTGluZWNhcD0ncm91bmQnCiAgICAgIHN0cm9rZUxpbmVqb2luPSdyb3VuZCcKICAgIC8+CiAgPC9zdmc+`

export const StyledChecklist = styled.ul`
  list-style: url(${base64Checkmark});
  padding-left: ${theme.spacing.l};
  text-align: left;
`

export const StyledNumberList = styled.ol`
  padding-left: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xs};
  margin: 0;

  li {
    padding-left: ${theme.spacing.xs};
  }
`
export const StyledAlphabetList = styled.ol`
  list-style-type: upper-alpha;
  padding-left: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xs};
  margin: 0;

  li {
    padding-left: ${theme.spacing.xs};
  }
`

/* Badge 
-- Used to position the svg badge on hero components (ie. MLP, Homepage)
-- Parent container must have position: relative
*/
// TODO: Update to use theme variables
export const StyledBadge = styled.div<{
  position?: string
  badgeVariant?: string
}>`
  img {
    position: absolute;
    transform: rotate(15deg);
    ${mq({
      height: ['90px', '', '120px'],
      width: ['90px', '', '120px'],

      // default position is top-right
      top: [theme.spacing.l, '', theme.spacing.xl],
      right: [theme.spacing.l, '', theme.spacing.xl]
    })}

    ${({ position }) =>
      position === 'Top Right' &&
      css`
        ${mq({
          top: [theme.spacing.l, '', theme.spacing.xl],
          right: [theme.spacing.l, '', theme.spacing.xl]
        })}
      `}

      ${({ position }) =>
      position === 'Top Left' &&
      css`
        ${mq({
          top: [theme.spacing.l, '', theme.spacing.xl],
          left: [theme.spacing.l, '', theme.spacing.xl]
        })}
      `}

      ${({ position }) =>
      position === 'Bottom Right' &&
      css`
        ${mq({
          top: ['auto !important', '', ''],
          bottom: ['var(--spacing-l)', 'var(--spacing-l)', 'var(--spacing-xl)'],
          right: ['var(--spacing-l)', 'var(--spacing-l)', 'var(--spacing-xl)']
        })}
      `}

      ${({ position }) =>
      position === 'Bottom Left' &&
      css`
        ${mq({
          bottom: [theme.spacing.l, '', theme.spacing.xl],
          left: [theme.spacing.l, '', theme.spacing.xl]
        })}
      `}

      ${({ badgeVariant }) =>
      badgeVariant === 'Pill' &&
      css`
        img {
          position: absolute;
          transform: rotate(0deg);
          ${mq({
            height: ['112px', '144px', '177px'],
            width: ['75px', '96px', '119px'],
            top: [theme.spacing.l, '', theme.spacing.xl],
            right: [theme.spacing.l, '', theme.spacing.xl]
          })}
        }
      `}
      
      ${({ badgeVariant }) =>
      badgeVariant === 'Wide Pill' &&
      css`
        img {
          position: absolute;
          transform: rotate(0deg);
          ${mq({
            height: ['78px', '114px', ''],
            width: ['189px', '277px', ''],
            top: [theme.spacing.l, '', theme.spacing.xl],
            right: [theme.spacing.l, '', theme.spacing.xl]
          })}
        }
      `}
  }
`

/* StyledSemiBold
-- Only use for stylistic purposes where text is not semantically important.
-- If text is semantically important, use <strong> tags instead of this style .
*/
export const StyledSemibold = styled.span`
  font-weight: 600;
`

/* Corner Badges
-- Used to position the svg corner badge on components like the Product Carousel and Default Homepage Hero
-- Parent container must have position: relative
*/
export const StyledBadgeTopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  ${mq({
    width: ['9rem', '12.5rem']
  })}
`

export const StyledBadgeTopLeft = styled.div`
  position: absolute;
  z-index: 1;

  ${mq({
    width: ['5rem', '6rem', '9rem'],
    top: ['0.5rem', '1rem'],
    left: ['0.5rem', '1rem']
  })}
`

export const StyledBadgeBottomLeft = styled.div`
  position: absolute;
  bottom: ${theme.spacing.xs};
  left: ${theme.spacing.m};
  z-index: 1;

  ${mq({
    width: ['6rem', '9rem']
  })}
`

/* Split Screen 
-- Used for split screen layouts (ie. Homepage Default and Homepage Sales)
*/
export const StyledSplitScreen = styled.div`
  > div {
    ${mq({
      height: ['', '', '645px']
    })}
  }
  font-weight: ${theme.fontWeights.semibold};
`

/* StyledSemiBoldUpper
-- Only use for stylistic purposes where text is not semantically important.
-- If text is semantically important, use <strong> tags instead of this style.
*/
export const StyledSemiboldUpper = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
`

/* Product Badge
-- Used to style product badges on shop module and comparison page heros
*/
export const StyledProductBadge = styled.div`
  width: 4rem;
  text-align: center;
  margin: 0 auto;
`

/* StyledSemiboldUnderline
-- Only use for stylistic purposes where text is not semantically important.
-- If text is semantically important, use <strong> tags instead of this style.
*/
export const StyledSemiboldUnderline = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  border-bottom: 2px solid ${theme.colors.gravy};
`

/* StyledTextDivider
-- Used for left and right dividers between a heading
*/
export const StyledTextDivider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.xl} 0;

  &::before,
  &::after {
    content: '';
    background-color: ${theme.colors.gravy70};
    flex-grow: 1;

    ${mq({
      height: ['0', '1px']
    })}
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`

/* StyledCartError
-- Used for error messages for add to cart buttons
*/
export const StyledCartError = styled(Text)`
  font-weight: ${theme.fontWeights.semibold};
  margin-top: ${theme.spacing.m};
`
