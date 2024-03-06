import { StyledVisuallyHiddenInput } from 'styles/global.styled'
import { mq, theme } from '../../styles/theme'
import styled, { css } from 'styled-components'
import { Text } from '../Text'
import {
  StyledSalePriceContainer,
  StyledPriceContainer,
  StyledPrice
} from '../ShopModule/ShopModule.styled'

import { StyledSwatchesContainer } from '../ColorSelectorDropdown/ColorSelectorDropdown'
import { Locale } from '../../types/global-types'

export const StyledUpsellProductCard = styled.div`
  padding: ${theme.spacing.m} 0;
  border-bottom: ${theme.borders.borderWidth} solid ${theme.colors.lineGrey};

  ${StyledSwatchesContainer} {
    background-color: ${theme.colors.offWhite};
    border-radius: ${theme.borders.borderRadius};
    margin-top: ${theme.spacing.xs};
    padding: ${theme.spacing.xxs} ${theme.spacing.m};
  }
`

export const StyledUpsellProductsSection = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borders.borderRadius};
  border: ${theme.borders.borderWidth} solid ${theme.colors.gravy20};
  border-bottom: ${theme.borders.borderWidth} solid ${theme.colors.gravy20};
  margin-top: ${theme.spacing.m};
  padding: 0 ${theme.spacing.m};

  /* Remove border */
  > div:last-child > div:last-child {
    border: 0;
  }
`

export const StyledImageContainer = styled.div`
  img {
    border-radius: ${theme.borders.borderRadius};
    object-fit: cover;

    ${mq({
      height: ['64px', '73px', ''],
      /* min- and max- widths are required to resolve issue with image container shrinking/growing */
      minWidth: ['80px', '126px', '100px'],
      maxWidth: ['80px', '126px', '100px']
    })}
  }
`

export const StyledToggle = styled.span<{
  isChecked: boolean
}>`
  --offset: ${theme.spacing.xxxs};
  --diameter: ${theme.spacing.m};

  display: inline-flex;
  align-items: center;
  width: calc(var(--diameter) * 2 + var(--offset) * 2);
  height: calc(var(--diameter) + ${theme.spacing.xxs});
  position: relative;
  border-radius: 10px;
  background: ${(props) =>
    props.isChecked ? theme.colors.gravy : theme.colors.gravy30};
  transition: 250ms transform ease-in-out;

  // toggle circle
  ::before {
    content: '';
    z-index: 2;
    position: absolute;
    top: 50%;
    left: var(--offset);
    width: var(--diameter);
    height: var(--diameter);
    border-radius: 50%;
    background-color: ${theme.colors.white};
    transform: ${(props) =>
      props.isChecked ? 'translate(100%, -50%)' : 'translate(0, -50%)'};
    transition: inherit;
  }

  /* Toggle Icons */
  ::after {
    z-index: 3;
    display: block;
    width: var(--diameter);
    height: var(--diameter);
    position: absolute;
    top: 50%;
    transform: ${(props) =>
      props.isChecked ? 'translate(100%, -50%)' : 'translate(0, -50%)'};
    transition: inherit;
  }

  /* Plus Icon */
  ${({ isChecked }) =>
    !isChecked &&
    css`
      ::after {
        content: '';
        background: url('https://cdn.sanity.io/images/d0kd7r9c/production/6547c264b9710dc73c0e6d05010283649e9a348b-12x13.svg')
          center center no-repeat;
        left: var(--offset);
      }
    `}

  /* Minus Icon */
  ${({ isChecked }) =>
    isChecked &&
    css`
      ::after {
        content: '';
        background: url('https://cdn.sanity.io/images/d0kd7r9c/production/a0150eaff4816c75cbc32d879ffb2cf260743638-16x16.svg')
          center center no-repeat;
        left: var(--offset);
      }
    `}
`

export const StyledInput = styled(StyledVisuallyHiddenInput)`
  &:focus-visible {
    + ${StyledToggle} {
      outline: 1px auto -webkit-focus-ring-color;
      outline-offset: ${theme.spacing.xxxs};
    }
  }
`

export const StyledProductDetails = styled.div`
  display: flex;
`

export const StyledText = styled(Text)<{ locale: Locale }>`
  text-transform: ${({ locale }) => (locale === 'fr' ? 'unset' : 'capitalize')};
  line-height: 1;
`

export const StyledLabel = styled.label`
  cursor: pointer;
  width: 48px;
  height: 25px;
  display: flex;
  justify-content: flex-end;

  :focus-visible {
    span {
      outline: 1px dotted #212121;
      outline: 1px auto -webkit-focus-ring-color;
      outline-offset: 2px;
    }
  }
`

export const StyledProductCardWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  margin: 0;
`

export const StyledLabelContainer = styled.div`
  margin-left: ${theme.spacing.s};
`

// @TODO: Revisit when refactoring <Price> component styles to be more generic
export const StyledPriceWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  margin-top: ${theme.spacing.xxs};

  ${StyledPriceContainer} {
    padding: 0;
    display: inline;
    width: auto;
  }

  ${StyledSalePriceContainer} {
    ${mq({
      display: ['flex', 'block'],
      flexDirection: ['column', ''],
      alignItems: ['flex-start', '']
    })}
  }

  span {
    ${mq({
      fontSize: ['16px', '16px', '19px']
    })}
  }

  // Sale price is first child when it exists
  ${StyledPrice} {
    color: ${theme.colors.rubine};
  }

  span:first-child {
    &:before {
      content: '+';
    }
  }

  // Regular price
  span:last-child {
    line-height: 1.2;
    color: ${theme.colors.gravy};
    ${mq({
      marginLeft: ['0', `${theme.spacing.xxs}`]
    })}
  }
`

export const StyledColorSelectorToggle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

export const StyledCompareAtPriceBanner = styled.div`
  border-radius: ${theme.borders.borderRadius};
  border: 2px dotted ${theme.colors.gravy};
  padding: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.m};

  span {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: ${theme.spacing.xs};
  }
`
export const StyledFixedAmountSaleBanner = styled.div`
  border-radius: ${theme.borders.borderRadius};
  border: 2px dotted ${theme.colors.gravy};
  padding: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.m};
  background-color: ${theme.colors.endyBlue40};

  span {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: ${theme.spacing.xs};
  }
`
