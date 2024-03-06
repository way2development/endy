import { AnimatePresence } from 'framer-motion'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { useEffect, useRef, useState } from 'react'

import {
  StyledDropdownWrapper,
  StyledNativeSelect,
  StyledSelectButton,
  StyledOptionList,
  StyledListOption,
  StyledOptionText,
  StyledFlexboxCustom,
  StyledFlexboxNative,
  StyledLabel,
  StyledText
} from './Dropdown.styled'

import { Text } from '../Text'
import { StyledFieldset } from '../ShopModule/ShopModule.styled'
import { getIsMobileDevice, getLocalizedPrice } from './../../utils'
import { arrowDownIcon, arrowUpIcon } from './utils'

export interface OptionProps {
  label?: string
  id: string
  slug?: string
  isAvailable?: boolean
  price?: number
}
interface DropdownProps {
  label?: string
  // For mobile interactions - use callback functions to add any additional functionality.
  handleChange: (option: string) => void
  // For desktop interactions - use callback functions to add any additional functionality.
  handleClick: (option: string) => void
  options: OptionProps[]
  variant: 'white' | 'offWhite'
  isReviewForm?: boolean
  resetDropdown?: boolean
  selectedOption?: string
  isQuantitySelector?: boolean
  setDropdownSize?: (option: string) => void
  showLabelOnLoad?: boolean
  locale?: Locale
  isCartDropdown?: boolean
}

export const Dropdown = ({
  label,
  handleChange,
  handleClick,
  options,
  variant,
  isReviewForm = false,
  resetDropdown,
  selectedOption,
  isQuantitySelector,
  setDropdownSize,
  showLabelOnLoad = false,
  locale,
  isCartDropdown = false
}: DropdownProps) => {
  const isMobileDevice = getIsMobileDevice()
  const localizedDictionary = locale && dictionary[locale]

  const selectedOptionOnLoad = options.find(
    (option) => option.id === selectedOption
  )

  const [selectedOptionMobile, setSelectedOptionMobile] = useState(
    selectedOptionOnLoad ? selectedOptionOnLoad : options[0]
  )

  const handleSelect = (optionId: string) => {
    const currentOption = options.find((option) => option.id === optionId)

    setSelectedOptionMobile(currentOption ? currentOption : options[0])
    setDropdownSize && setDropdownSize(optionId)
  }

  const nativeDropdown = (
    <>
      <StyledFlexboxNative isCartDropdown={isCartDropdown}>
        <StyledNativeSelect
          aria-labelledby='select-option'
          onChange={(e) => {
            handleChange(e.target.value)
            handleSelect(e.target.value)
          }}
          value={selectedOptionMobile.id}
          id='mobile-default-dropdown'
          name='mobile-default-dropdown'
        >
          {options.map((option) => {
            const isAvailable = option.isAvailable
            const price = option.price
            const localizedPrice =
              price && locale && getLocalizedPrice(price, locale)

            return (
              <option
                key={option.id}
                value={option.id}
                disabled={isCartDropdown && !isAvailable}
              >
                {option.label}
                {isCartDropdown ? ` – ${localizedPrice}` : ''}
                {isCartDropdown && !isAvailable
                  ? ` – ${localizedDictionary?.outOfStock}`
                  : ''}
              </option>
            )
          })}
        </StyledNativeSelect>
        <StyledLabel
          htmlFor='mobile-default-dropdown'
          variant={variant}
          isReviewForm={isReviewForm}
          isCartDropdown={isCartDropdown}
        >
          <StyledText
            variant={'smallBody'}
            color={isReviewForm ? 'gravy70' : 'gravy'}
            element={'span'}
            isQuantitySelector={isQuantitySelector}
          >
            {/* {label && <strong>{label} </strong>}
            {selectedOptionMobile.label} */}

            {showLabelOnLoad && selectedOptionMobile.label ? (
              selectedOptionMobile.label
            ) : (
              <>
                <strong>{label} </strong>
                {selectedOptionMobile.label}
              </>
            )}
          </StyledText>
        </StyledLabel>
        {arrowDownIcon}
      </StyledFlexboxNative>
    </>
  )

  const [menuIsOpen, setMenuOpen] = useState(false)
  const groupRef = useRef<HTMLUListElement>(null)
  const [selectedOptionDesktop, setSelectedOptionDesktop] = useState(
    selectedOptionOnLoad ? selectedOptionOnLoad : options[0]
  )
  const handleSelectClick = () => {
    setMenuOpen(!menuIsOpen)
  }

  const handleKeyboardEvent = (
    e: React.KeyboardEvent<HTMLLIElement>,
    optionId: string
  ) => {
    const currentTarget = e.target as HTMLLIElement
    const nextElement = currentTarget.nextElementSibling as HTMLLIElement
    const previousElement =
      currentTarget.previousElementSibling as HTMLLIElement

    if (e.key === 'ArrowDown') {
      nextElement && nextElement.focus({ preventScroll: true })
    }

    //@TODO: Trap focus without react-trap-focus (due to issues with trap-focus and keyup events)
    // if (e.key === 'Tab') {
    //   if (!nextElement) {
    //     // @ts-ignore
    //     e.target.parentElement.firstChild.focus()
    //   }
    // }

    if (e.key === 'ArrowUp') {
      previousElement && previousElement.focus({ preventScroll: true })
    }

    if (e.key === 'Enter') {
      handleClick(optionId)
      setDropdownSize && setDropdownSize(optionId)

      const currentOption = options.find((option) => option.id === optionId)

      setSelectedOptionDesktop(currentOption ? currentOption : options[0])

      setMenuOpen(false)
      return
    }

    if (e.key === 'Escape') {
      setMenuOpen(false)
      return
    }
  }

  const handleOptionClick = (optionId: string) => {
    handleClick(optionId)
    setDropdownSize && setDropdownSize(optionId)

    const currentOption = options.find((option) => option.id === optionId)

    setSelectedOptionDesktop(currentOption ? currentOption : options[0])

    setMenuOpen(false)
  }

  const onOutsideClick = (e: MouseEvent) => {
    if (groupRef?.current?.contains(e.target as HTMLElement)) return
    setMenuOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick)

    return () => {
      document.removeEventListener('mousedown', onOutsideClick)
    }
  }, [])

  useEffect(() => {
    setSelectedOptionMobile(
      selectedOptionOnLoad ? selectedOptionOnLoad : options[0]
    )
    setSelectedOptionDesktop(
      selectedOptionOnLoad ? selectedOptionOnLoad : options[0]
    )
  }, [resetDropdown, selectedOption, selectedOptionOnLoad])

  const customDropdown = (
    <StyledDropdownWrapper>
      <StyledSelectButton
        aria-labelledby='select-title'
        aria-haspopup='listbox'
        onClick={handleSelectClick}
        aria-expanded={menuIsOpen}
        type='button'
        id='select-btn'
        variant={variant}
        isQuantitySelector={isQuantitySelector}
        isCartDropdown={isCartDropdown}
      >
        <Text
          variant={'smallBody'}
          color={isReviewForm ? 'gravy70' : 'gravy'}
          element={'span'}
        >
          {showLabelOnLoad && selectedOptionDesktop.label ? (
            selectedOptionDesktop.label
          ) : (
            <>
              <strong>{label} </strong>
              {selectedOptionDesktop.label}
            </>
          )}
        </Text>

        <StyledFlexboxCustom>{arrowDownIcon}</StyledFlexboxCustom>
      </StyledSelectButton>
      <AnimatePresence initial={false}>
        {menuIsOpen && (
          <StyledOptionList
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={{
              expanded: {
                height: 'auto',
                transition: { duration: 0.25, ease: 'easeIn' }
              },
              collapsed: {
                transition: { duration: 0.25, ease: 'easeOut' },
                height: '46px'
              }
            }}
            ref={groupRef}
            role='listbox'
            aria-labelledby='select-btn'
            variant={variant}
          >
            {options.map((option, index) => {
              const isSelectedOption = selectedOption === option.id.toString()
              const isAvailable = option.isAvailable
              const isDisabled = isSelectedOption || !isAvailable
              const isDropdownClickEnabled =
                isAvailable === undefined || !isDisabled

              return (
                <StyledListOption
                  value={option.label}
                  tabIndex={0}
                  role={'option'}
                  onKeyUp={(e) =>
                    isDropdownClickEnabled && handleKeyboardEvent(e, option.id)
                  }
                  onClick={() => {
                    isDropdownClickEnabled && handleOptionClick(option.id)
                  }}
                  key={option.id}
                  variant={variant}
                  isQuantitySelector={isQuantitySelector}
                  isDisabled={isCartDropdown && isDisabled}
                  isCartDropdown={isCartDropdown}
                >
                  <StyledOptionText
                    color={'gravy'}
                    variant={'smallBody'}
                    isSelectedOption={isSelectedOption}
                    isAvailable={isAvailable}
                  >
                    {option.label}
                    {isCartDropdown && !isAvailable
                      ? ` - ${localizedDictionary?.outOfStock}`
                      : ''}
                  </StyledOptionText>
                  {index === 0 && (
                    <StyledFlexboxCustom onClick={handleSelectClick}>
                      {arrowUpIcon}
                    </StyledFlexboxCustom>
                  )}
                </StyledListOption>
              )
            })}
          </StyledOptionList>
        )}
      </AnimatePresence>
    </StyledDropdownWrapper>
  )

  return (
    <StyledFieldset slug={isReviewForm || isCartDropdown}>
      {/* Native dropdown only rendered on mobile devices */}
      {isMobileDevice ? nativeDropdown : customDropdown}
    </StyledFieldset>
  )
}
