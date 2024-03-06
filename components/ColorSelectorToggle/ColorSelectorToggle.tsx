import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { Dispatch, SetStateAction } from 'react'
import { arrowDownIcon, arrowUpIcon } from '../Dropdown/utils'

import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Text } from '../Text/Text'

export const StyledToggleButton = styled.button<{
  isFreeGift: boolean | undefined
}>`
  border: 1px solid #dbdbdb;
  border-radius: ${theme.borders.borderRadius};
  background-color: ${theme.colors.offWhite};
  padding: ${theme.spacing.xs};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: ${({ isFreeGift }) => (isFreeGift ? '123px' : '110px')};
  max-height: 30px;

  svg {
    opacity: 68%;
    margin-left: ${theme.spacing.xs};
  }
`

const StyledButtonContainer = styled.div(
  ({ isFreeGift }: { isFreeGift?: boolean }) => {
    return mq({
      display: isFreeGift ? ['flex'] : ['grid'],
      /* !important required to override the div:last-of-type used in FreeGift.styled.tsx */
      gridArea: isFreeGift ? ['3 / 3 !important'] : ['initial !important'],
      alignSelf: isFreeGift ? ['center'] : ['initial'],
      gridAutoRows: isFreeGift ? ['minmax(max-content, 2fr)'] : ['initial'],
      margin: isFreeGift
        ? [
            `${theme.spacing.m} ${theme.spacing.s} 0 0`,
            `0 ${theme.spacing.s} ${theme.spacing.l} 0`,
            `0 ${theme.spacing.s} ${theme.spacing.xl} 0`
          ]
        : ['initial'],
      justifyContent: ['flex-end']
    })
  }
)

interface ColorSelectorToggleProps {
  selectedColor: string
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  locale: Locale
  isFreeGift?: boolean | undefined
}

export const ColorSelectorToggle = ({
  selectedColor,
  setIsExpanded,
  isExpanded,
  locale,
  isFreeGift
}: ColorSelectorToggleProps) => {
  const localizedDictionary = dictionary[locale]

  return (
    <StyledButtonContainer isFreeGift={isFreeGift}>
      <StyledToggleButton
        id={'color-selector-btn'}
        aria-expanded={isExpanded}
        aria-controls='color-selector-btn'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={`${localizedDictionary.colour}: ${selectedColor}. ${localizedDictionary.expandToChangeColor}`}
        isFreeGift={isFreeGift}
      >
        <Text variant={'micro'} color={'gravy'} element={'span'}>
          {selectedColor}
        </Text>
        {isExpanded ? arrowUpIcon : arrowDownIcon}
      </StyledToggleButton>
    </StyledButtonContainer>
  )
}
