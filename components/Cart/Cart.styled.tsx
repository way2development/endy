import styled, { css } from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Text } from '../Text/Text'
import { m } from 'framer-motion'
import { buttonStyleMixin, StyledButton } from '../Button/Button.styled'
import { StyledProductPill } from '../PromoPill/PromoPill.styled'
import { StyledProductTag } from '../PromoFlag'
import { Button } from 'components/Button'
import Link from 'next/link'

export const StyledCartHeader = styled.div<{ numOfCartItems: number }>`
  background-color: ${theme.colors.offWhite};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.xs};
  border-bottom: ${({ numOfCartItems }) =>
    numOfCartItems === 0 ? `1px solid ${theme.colors.gravy}` : 'none'};
  margin: 0 20px;
`

export const StyledText = styled(Text)`
  margin: 0;
`

export const StyledClose = styled.button`
  background: none;
  border: none;
  padding: 0;
  height: 48px;

  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease;
  }
`

export const StyledSubheading = styled.div`
  background: ${theme.colors.offWhite};
  padding: 14px 20px;
`

export const StyledCart = styled(m.div)`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: #f5f5f0;
  will-change: transform;
  transition: visibility 0.2s 0.8s;
  visibility: hidden;
  overflow-y: scroll;
  z-index: 200;

  ${mq({ maxWidth: ['375px', '475px'] })}

  ${({ active }: { active: boolean }) =>
    active &&
    `
    pointer-events: auto;
    transition-delay: 0s;
    visibility: visible;
  `}
`

export const StyledCartOverlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white};
  opacity: 0.6;
  z-index: 12;
  transition: all 0.45s cubic-bezier(0.29, 0.63, 0.44, 1);
`

// TODO: translate all lifted children styles as styled components.
export const StyledCartOverlayContent = styled.div`
  opacity: 1 !important;
  z-index: 15;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;

  .position-relative {
    position: relative;
  }

  .sp {
    width: 48px;
    height: 48px;
    clear: both;
    margin: 20px auto;
  }

  .sp-circle {
    border: 2px rgba(0, 0, 0, 0.25) solid;
    border-top: 2px ${theme.colors.rubine} solid;
    border-radius: 50%;
    -webkit-animation: spCircRot 0.6s infinite linear;
    animation: spCircRot 0.6s infinite linear;
  }

  @-webkit-keyframes spCircRot {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(359deg);
    }
  }

  @keyframes spCircRot {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  .rubine-checkmark {
    position: absolute;
    height: 32px;
    width: 32px;
    left: 18%;
    top: 28px;
  }
`

export const StyledOverlay = styled.div`
  ${({ active }: { active: boolean }) =>
    active &&
    `
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: ${theme.spacing.s};
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 190;
    transition: all 0.45s cubic-bezier(0.29, 0.63, 0.44, 1);
  `}
`

export const StyledEmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin: ${theme.spacing.m} 0;
    border-radius: 5px;
  }
`

export const StyledImgTextContainer = styled.div`
  margin: ${theme.spacing.xl} 0;
  text-align: center;
`

export const StyledInnerCart = styled.div`
  padding: 0 20px;
`

export const StyledCartItem = styled.div<{
  hasBottomBorder: boolean
}>`
  width: 100%;
  position: relative;

  :last-child {
    border-bottom: 1px solid ${theme.colors.gravy40};
  }
`

export const StyledCartItemsContainer = styled.div`
  background-color: ${theme.colors.white};
  padding: 0 20px;

  div:first-child ${StyledCartItem} {
    border-top: 1px solid ${theme.colors.gravy};
  }
`

export const StyledCartItemInfoContainer = styled.div`
  padding: 10px 20px 10px 10px;
`

export const StyledCartItemSalePriceContainer = styled.div`
  display: flex;
  white-space: nowrap;
`

export const StyledCartItemOriginalPrice = styled(Text)`
  margin-right: ${theme.spacing.xs};
  text-decoration: line-through;
  white-space: nowrap;
`

export const StyledDiscountAmount = styled(Text)`
  text-transform: uppercase;
  letter-spacing: ${theme.letterSpacing.xs};

  ${mq({
    fontSize: ['12px', '', '13px']
  })}
`

export const StyledCartItemHeading = styled(Text)<{
  hasProductSlug: boolean
}>`
  position: relative;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 0px;
    transition: all 0.25s ease-in-out;
    transition-duration: 0.5s;
    height: ${theme.spacing.xxxs};
    margin: 1px 0 0;
    opacity: 0;
    background-image: linear-gradient(
      to right,
      ${theme.colors.rubine} 0,
      ${theme.colors.rubine} 100%
    );
    margin-left: 10px;
  }

  ${({ hasProductSlug }) =>
    hasProductSlug &&
    css`
      &:hover {
        &::after {
          left: 0;
          width: calc(100% - 10px);
          opacity: 1;
        }
      }
    `}
`

export const StyledCartItemVariantContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
`

export const StyledCartItemImgContainer = styled.div`
  width: 122px;
  min-height: 82px;
  margin-right: ${theme.spacing.s};

  picture,
  img {
    width: 122px;
    height: 82px;
  }
`

export const StyledCartItemControls = styled.div<{ hasVariants: boolean }>`
  display: flex;
  justify-content: ${({ hasVariants }) =>
    hasVariants ? 'space-between' : 'flex-end'};
  align-items: center;
  margin: 4px 0 ${theme.spacing.s} 0;
`

export const StyledCartItemControl = styled.div<{
  first?: boolean
  disabled?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: transparent;
  max-width: 100%;
  padding: 0 0.75rem;

  ${({ first }) =>
    first &&
    css`
      border-left: transparent;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;

      button {
        &:hover {
          background: transparent;
          background-image: url('https://cdn.sanity.io/images/d0kd7r9c/production/f93b2d7223528d6a804e01517d6828bdaf068d56-13x3.svg');
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    `}
`

export const StyledDelayedShippingInfoContainer = styled.div`
  background-color: ${theme.colors.darkBlue};
  margin-top: ${theme.spacing.xs};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px ${theme.spacing.s};

  img {
    margin-right: 8px;
  }
`

export const cartControlStyling = css`
  background: none;
  border: none;
  padding: 0;
  height: 100%;

  img {
    display: block;
  }
`

export const StyledRemoveButton = styled.button`
  ${cartControlStyling}

  img {
    opacity: 60%;
  }
`

export const StyledDecreaseButton = styled.button`
  ${cartControlStyling}
`

export const StyledIncreaseButton = styled.button`
  ${cartControlStyling}
`

export const StyledTotals = styled.div`
  padding-top: ${theme.spacing.m};
  display: flex;
  flex-direction: column;
`

export const StyledTotalsRow = styled.div<{
  subtotalRow?: boolean
}>`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${theme.spacing.xs};
  align-items: center;

  h4 {
    margin-bottom: 0;
  }

  ${({ subtotalRow }) =>
    subtotalRow &&
    css`
      margin-top: ${theme.spacing.xxs};
    `}
`

export const StyledCartTotalContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StyledOriginalTotal = styled(Text)`
  color: ${theme.colors.gravy70};
  margin-right: ${theme.spacing.s};
  margin-bottom: 0;
  font-weight: 400;
  text-decoration: line-through;
`

export const StyledCartLink = styled.a<{
  variant: string
}>`
  ${buttonStyleMixin};
  width: 100%;
  border-radius: ${theme.spacing.xxxs};
  box-shadow: none;
  margin-top: ${theme.spacing.m};

  :hover {
    border-color: ${theme.colors.rubine};
    background-color: ${theme.colors.white};
    color: ${theme.colors.rubine};
  }

  img {
    margin-right: ${theme.spacing.xxs};
    position: relative;
    top: 2px;
  }
`

export const StyledCartContainer = styled.div`
  background-color: ${theme.colors.offWhite};
`

export const StyledVariantSelectorHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const StyledProductName = styled(Text)`
  :hover {
    opacity: 0.7;
  }
`

export const StyledCloseVariantSelector = styled(StyledClose)`
  margin-top: -10px;
  margin-right: -5px;
`

export const StyledVariantContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

export const StyledVariant = styled.li<{
  width?: string
}>`
  list-style: none;
  width: calc(${(props) => (props.width ? props.width : '50%')} - 4px);
  margin: ${theme.spacing.xxxs};
`

export const StyledVariantButton = styled.button<{
  isSelected: boolean
  disabled: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: ${theme.spacing.xxxs} solid ${theme.colors.gravy};
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? theme.colors.gravy : 'transparent'};
  border-color: ${theme.colors.gravy};
  text-transform: uppercase;
  padding: 10px 15px;
  width: 100%;
  height: 100%;
  transition: color 0.25s ease-in-out;

  p {
    color: ${(props) =>
      props.isSelected ? theme.colors.white : theme.colors.gravy};
    font-weight: ${(props) => (props.isSelected ? '600' : '')};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      border: ${theme.spacing.xxxs} solid rgba(36, 55, 70, 0.6);

      p {
        opacity: 0.15;
      }
    `}

  :hover {
    background: ${theme.colors.gravy};

    p {
      color: ${theme.colors.white};
    }
  }
`

export const CartCrossSellTitle = styled.div`
  background: ${theme.colors.offWhite};
  padding: ${theme.spacing.m} 20px ${theme.spacing.xxxs};
`

export const StyledEmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: ${theme.colors.offWhite};
  padding: ${theme.spacing.m} 0 ${theme.spacing.l} 20px;
  cursor: grab;
`

export const StyledEmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
`

export const StyledEmblaProgressBoundary = styled.div`
  background-color: ${theme.colors.gravy30};
  height: 2px;
  pointer-events: none;
  overflow: hidden;
  position: relative;
  top: 1px;

  ${mq({
    width: ['335px', '435px', ''] // must be a fixed width
  })}
`

export const StyledEmblaProgressFill = styled.div<{ scrollProgress: number }>`
  height: 4.66px;
  margin-top: ${theme.spacing.m};
  background-color: ${theme.colors.gravy};
  width: ${({ scrollProgress }) => `${scrollProgress}%`};

  ${mq({
    maxWidth: ['335px', '435px', ''] // must match StyledEmblaProgressBoundary width values to stay within bounds
  })}
`

export const StyledCrossSellProduct = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};
  min-width: 150px;
  padding: 0 12px 24px 12px;
  margin: 0 ${theme.spacing.m} ${theme.spacing.l} 0;
  border: 1px solid ${theme.colors.gravy40};
  border-radius: ${theme.borders.borderRadius};
  position: relative; // required for Pill

  ${StyledProductTag} {
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
  }

  picture {
    height: 100%;
    flex: 1 1 12%;
    padding: 8px 0 4px 0;

    img {
      width: 126px;
      height: 73px;
      max-width: 100%;
    }
  }
`

export const StyledCrossSellProductInfo = styled.div`
  flex: 1 1 40%;
`

export const StyledCrossSellItemAdd = styled.div`
  button {
    width: 96px;
    text-transform: initial;
    font-size: 13px;
    letter-spacing: 0;
    padding: 6px 12px;
    white-space: nowrap;
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const StyledCartCrossSellHeading = styled(Text)<{
  hasProductSlug: boolean
}>`
  position: relative;
  width: fit-content;

  ${({ hasProductSlug }) =>
    hasProductSlug &&
    css`
      &:hover {
        &::after {
          left: 0;
          width: 100%;
          opacity: 1;
        }
      }
    `}
`

export const StyledCartBanner = styled.div`
  background-color: ${theme.colors.endyBlue};
  margin-bottom: 20px;
  text-align: center;
  padding: ${theme.spacing.m} 10px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    display: block;
    background: transparent;
    width: 0;
    height: 0;
    bottom: -2.5px;
    border: 18.5px solid transparent;
    border-left-color: ${theme.colors.endyBlue};
    border-left-width: 14px;
    border-radius: 8px;
    transform: rotate(-90deg);
    left: 50%;
    top: -32px;
    margin-left: -18.5px;
  }
`

export const CartErrorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 20px;
`

export const CartResetButton = styled(StyledButton)`
  width: 100%;
  margin-top: ${theme.spacing.l};

  &:hover {
    border-color: ${theme.colors.rubine};
  }
`

export const StyledFreeGiftInfo = styled.div`
  position: absolute;
  display: flex;
  align-items: center;

  /* comment in for Sleep Mask/Mystery Gift offers, comment out for Free Gift sales */
  /* ${mq({
    maxWidth: ['120px', '160px', '140px']
  })} */

  img {
    margin-right: 5px;
  }
`

export const StyledFreeGiftText = styled(Text)`
  text-transform: uppercase;
`

export const StyledEndyCashFreeGift = styled(Text)`
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.rubine};
`

export const StyledEndyCashInfo = styled(Text)`
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.rubine};
`

export const StyledFreeGiftCrossSellPrice = styled(Text)`
  color: ${theme.colors.rubine};
`

export const StyledPreorderLabel = styled(Text)`
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.semibold};
`

export const StyledThresholdMessageContainer = styled(Text)<{
  isCartDiscounted: boolean
}>`
  background-color: ${theme.colors.white};
  padding: 0 20px ${theme.spacing.s};
  text-align: ${({ isCartDiscounted }) =>
    isCartDiscounted ? 'left' : 'center'};
  position: relative;
  display: ${({ isCartDiscounted }) => (isCartDiscounted ? 'flex' : 'block')};

  img {
    margin-right: ${theme.spacing.s};
  }
`

export const StyledThresholdProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.gravy};
  padding-top: ${theme.spacing.s};
`

export const StyledThresholdCopyContainer = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.xxs};
  /* width matches ProgressBar component */
  ${mq({
    width: ['284px', '435px', '']
  })}
`

export const StyledThresholdMessage = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const StyledFreeShipping = styled.div`
  text-align: center;
  background-color: rgba(6, 118, 61, 0.1);
  margin-bottom: ${theme.spacing.s};
  padding: ${theme.spacing.xs};

  ${mq({
    display: ['', '', 'flex'],
    alignItems: ['', '', 'center'],
    justifyContent: ['', '', 'center']
  })}

  > img {
    vertical-align: middle;
    margin-right: ${theme.spacing.xxs};
  }

  > span {
    font-weight: ${theme.fontWeights.semibold};
  }
`

export const StyledMysteryItem = styled.div`
  border: 0.5px solid ${theme.colors.lineGrey};
  width: 100%;
  margin-bottom: 20px;
`

export const StyledMysteryItemHeading = styled(Text)`
  text-transform: uppercase;
  padding-left: 10px;
  padding-top: ${theme.spacing.s};
`

export const StyledMysteryGiftText = styled(Text)`
  color: ${theme.colors.rubine};
  text-transform: uppercase;
`

export const MysteryGiftRemoveBtn = styled.button`
  text-transform: uppercase;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }
`
export const MysteryGiftControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 20px;
`

export const StyledMysteryItemWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.endyBlue40};
  ${mq({
    maxHeight: ['115px', '104px', '133px']
  })}

  picture {
    position: relative;
    bottom: 10px;
    ${mq({
      bottom: ['10px', '17px', '10px']
    })}
  }
`
export const StyledVariantPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const StyledBundleList = styled.ul<{ locale: string }>`
  padding-left: ${theme.spacing.xs};
  text-transform: ${({ locale }) =>
    locale === 'fr' ? `lowercase` : 'initial'};
  li {
    list-style-type: '+';
    padding-inline-start: ${theme.spacing.xxs};
  }
`

export const StyledVariantBundleContainer = styled.div`
  width: 70%;
`

export const StyledBundleBanner = styled.div`
  background-color: ${theme.colors.endyBlue40};
  text-align: center;
  position: relative;
  top: 0;
  width: 100%;
  border: 2px dotted ${theme.colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  margin-top: ${theme.spacing.xs};

  img {
    margin-right: ${theme.spacing.xs};
  }
`

export const StyledCartItemInnerContainer = styled.div`
  margin-top: ${theme.spacing.s};
`

export const StyledSavingsPill = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${theme.spacing.xs};

  ${StyledProductPill} {
    position: relative;
    text-transform: none;
    letter-spacing: 0;
    margin: initial;
    font-size: var(--font-size-small);
  }
`

export const StyledCartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
`

export const StyledChangeQuantity = styled.div`
  display: flex;
  border: 1px solid ${theme.colors.gravy80};
  border-radius: 50px;
  height: 32px;
`

export const StyledEditSize = styled(Button)`
  border-bottom: 1px solid ${theme.colors.gravy80};
  text-decoration: none;
  color: ${theme.colors.gravy80};

  ${mq({
    fontSize: ['13px', '13px', '16px']
  })}
`

export const StyledAffirmRow = styled.div`
  text-align: right;
`

export const StyledStickyCheckout = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${theme.colors.offWhite};
  box-shadow: 0px -3px 3px rgba(36, 55, 70, 0.075);
  z-index: 90;
  padding-bottom: ${theme.spacing.m};
`

export const StyledCrossSellLink = styled(Link)`
  ${StyledCartCrossSellHeading} {
    text-decoration: none;
    background-image: linear-gradient(
      to right,
      ${theme.colors.rubine} 0,
      ${theme.colors.rubine} 100%
    );
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size 0.3s;
    display: inline;
  }

  ${StyledCartCrossSellHeading}:hover, ${StyledCartCrossSellHeading}:focus {
    background-size: 100% 2px;
  }
`
