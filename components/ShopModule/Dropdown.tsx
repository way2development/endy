import { AnimatePresence } from 'framer-motion'

import dictionary from '../../dictionary.json'

import { useEffect, useRef, useState } from 'react'

import {
  StyledDropdownTitle,
  StyledDropdownWrapper,
  StyledNativeSelect,
  StyledSelectButton,
  StyledOptionList,
  StyledListOption,
  StyledOptionText,
  StyledLabelText,
  StyledFlexboxCustom,
  StyledFlexboxNative,
  StyledLabel,
  StyledButton,
  StyledOutOfStockIcon,
  StyledOutOfStockSize
} from './Dropdown.styled'

import { Locale } from 'types/global-types'
import { StyledFieldset } from './ShopModule.styled'
import { SizeVariant, VariantProps } from './ShopModule.types'
import { getLocalizedPrices } from '../../utils/getLocalizedPrice'
import { SaleProps } from 'Interfaces/sales'

interface DropdownProps {
  handleSelect: (
    sizeSelection: string,
    variantId: number | undefined,
    colorSelection?: string
  ) => void
  selectedSizeId: string
  selectedVariantId: number
  selectedColorId?: string
  sizeVariants: SizeVariant[]
  productVariants: VariantProps[]
  locale: Locale
  isMobileDevice: boolean
  sales: SaleProps | undefined
  isOnSale: boolean
  toggleSizeGuide: () => void
  sizeGuide: {
    content: JSX.Element | JSX.Element[]
    heading: string
  }
  hasDropdown: boolean
}

export const Dropdown = ({
  handleSelect,
  selectedSizeId,
  selectedVariantId,
  selectedColorId,
  sizeVariants,
  productVariants,
  locale,
  isMobileDevice,
  sales,
  isOnSale,
  toggleSizeGuide,
  sizeGuide,
  hasDropdown
}: DropdownProps) => {
  const [menuIsOpen, setMenuOpen] = useState(false)
  const groupRef = useRef<HTMLUListElement>(null)

  const localizedDictionary = dictionary[locale]

  const oneSize = sizeVariants.length === 1

  const rulerIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/5eeeeb4c47f3a2be166c116b74de652c511fe312-16x16.svg'

  const sizeVariantsWithStockInfo = sizeVariants.map((sizeVariant) => {
    const productVariant = productVariants.find((variant) => {
      return (
        variant.color === selectedColorId && variant.size === sizeVariant.id
      )
    })

    return {
      ...sizeVariant,
      variantId: productVariant?.id,
      isAvailable: productVariant?.isAvailable
    }
  })

  const currentlySelectedVariant = sizeVariantsWithStockInfo.find(
    (sizeVariant) => {
      return sizeVariant.id === selectedSizeId
    }
  )

  const isOutOfStock = currentlySelectedVariant?.isAvailable === false

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

  const arrowDownIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 12 8'
      width='16px'
      height='16px'
    >
      <path
        d='M11.252 1 6.006 7.29.76 1'
        stroke='#243746'
        strokeWidth='1.5'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )

  const handleSelectClick = () => {
    setMenuOpen(!menuIsOpen)
  }

  const handleOptionClick = (
    selectedSizeId: string,
    selectedVariantId: number | undefined,
    colorSelection?: string,
    isAvailable?: boolean | undefined
  ) => {
    if (!isAvailable && !selectedVariantId) return

    handleSelect(selectedSizeId, selectedVariantId, colorSelection)
    setMenuOpen(false)
  }

  const handleKeyboardEvent = (
    e: React.KeyboardEvent<HTMLLIElement>,
    selectedSizeId: string,
    selectedVariantId: number | undefined,
    colorSelection?: string,
    isAvailable?: boolean | undefined
  ) => {
    if (!isAvailable && !selectedVariantId) return

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
      handleSelect(selectedSizeId, selectedVariantId, colorSelection)
      setMenuOpen(false)
      return
    }

    if (e.key === 'Escape') {
      setMenuOpen(false)
      return
    }
  }

  const getPrice = (productVariant: VariantProps) => {
    const variantPrice =
      sales?.saleType === 'Everything Off' && productVariant.salePrice !== null
        ? productVariant.salePrice
        : productVariant.price

    const [regularPrice, salePrice] = getLocalizedPrices(
      sales,
      variantPrice,
      locale
    )

    return isOnSale ? salePrice : regularPrice
  }

  const OutOfStockTag = (selected?: boolean) => {
    // If item is selected, the OOS tag is semibold
    return (
      <StyledOptionText
        selected={selected && selected}
        color={'gravy80'}
        variant={'largeBody'}
        element={'span'}
      >
        {localizedDictionary.outOfStock}
      </StyledOptionText>
    )
  }

  const NotAvailableTag = () => {
    return (
      <StyledOptionText
        selected={false}
        color={'gravy70'}
        variant={'largeBody'}
        element={'span'}
      >
        {localizedDictionary.notAvailable}
      </StyledOptionText>
    )
  }

  const OutOfStockIcon = ({ isOutOfStock }: { isOutOfStock: boolean }) => {
    return (
      <>
        {isOutOfStock && (
          <StyledOutOfStockIcon
            isOutOfStock={isOutOfStock}
            src='https://cdn.sanity.io/images/d0kd7r9c/production/a088a8b205a86abd716f5e4cf326dfe28753ba42-13x12.svg'
            alt={localizedDictionary.outOfStock}
          />
        )}
      </>
    )
  }

  const nativeDropdown = (
    <>
      {oneSize ? null : (
        <StyledDropdownWrapper>
          <StyledFlexboxNative>
            <StyledNativeSelect
              aria-labelledby='size-select'
              onChange={(e) => {
                handleSelect(e.target.value, selectedVariantId, selectedColorId)
              }}
              value={selectedSizeId}
              id='mobile-default-dropdown'
              name='mobile-default-dropdown'
            >
              {sizeVariantsWithStockInfo.map((sizeVariant) => {
                const productVariant = productVariants.find(
                  (variant) =>
                    variant.size === sizeVariant.id &&
                    variant.color === selectedColorId
                )
                const price = productVariant && getPrice(productVariant)

                const isVariantUnavailable =
                  !sizeVariant.isAvailable && !productVariant

                const isOutOfStock = !sizeVariant.isAvailable && productVariant

                return (
                  <option
                    key={sizeVariant.id}
                    value={sizeVariant.id}
                    disabled={isVariantUnavailable}
                  >
                    {sizeVariant.label}

                    {price && productVariant && !isOutOfStock && ` – ${price}`}

                    {isOutOfStock && ` - ${localizedDictionary.outOfStock}`}
                    {isVariantUnavailable &&
                      ` - ${localizedDictionary.notAvailable}`}
                  </option>
                )
              })}
            </StyledNativeSelect>
            <StyledLabel
              htmlFor='mobile-default-dropdown'
              isOutOfStock={isOutOfStock}
            >
              <StyledOutOfStockSize>
                <OutOfStockIcon isOutOfStock={isOutOfStock} />
                {
                  sizeVariants.find(
                    (sizeVariant) => sizeVariant.id === selectedSizeId
                  )?.label
                }
              </StyledOutOfStockSize>
              <StyledFlexboxCustom>
                {isOutOfStock && OutOfStockTag()}
                {arrowDownIcon}
              </StyledFlexboxCustom>
            </StyledLabel>
          </StyledFlexboxNative>
        </StyledDropdownWrapper>
      )}
    </>
  )

  const customDropdown = (
    <>
      {oneSize ? null : (
        <StyledDropdownWrapper>
          <StyledSelectButton
            aria-labelledby='size-select-title'
            aria-haspopup='listbox'
            onClick={handleSelectClick}
            aria-expanded={menuIsOpen}
            type='button'
            id='size-select-btn'
          >
            <StyledLabelText
              variant={'largeBody'}
              color={'gravy'}
              isOutOfStock={isOutOfStock}
            >
              <OutOfStockIcon isOutOfStock={isOutOfStock} />
              {
                sizeVariants.find(
                  (sizeVariant) => sizeVariant.id === selectedSizeId
                )?.label
              }
            </StyledLabelText>
            <StyledFlexboxCustom>
              {isOutOfStock && OutOfStockTag()}
              {arrowDownIcon}
            </StyledFlexboxCustom>
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
                aria-labelledby='size-select-btn'
              >
                {sizeVariantsWithStockInfo.map((sizeVariant, index) => (
                  <StyledListOption
                    tabIndex={0}
                    role={'option'}
                    onKeyUp={(e) =>
                      handleKeyboardEvent(
                        e,
                        sizeVariant.id,
                        sizeVariant.variantId,
                        selectedColorId,
                        sizeVariant.isAvailable
                      )
                    }
                    onClick={() => {
                      handleOptionClick(
                        sizeVariant.id,
                        sizeVariant.variantId,
                        selectedColorId,
                        sizeVariant.isAvailable
                      )
                    }}
                    key={sizeVariant.id}
                  >
                    <StyledOptionText
                      selected={sizeVariant.id === selectedSizeId}
                      color={!sizeVariant.isAvailable ? 'gravy70' : 'gravy'}
                      variant={'largeBody'}
                    >
                      {sizeVariant.label}
                    </StyledOptionText>

                    {index === 0 ? (
                      // On first item in dropdown, show possible OOS tag and arrow
                      <StyledFlexboxCustom>
                        {!sizeVariant.isAvailable &&
                          OutOfStockTag(sizeVariant.id === selectedSizeId)}
                        {arrowDownIcon}
                      </StyledFlexboxCustom>
                    ) : (
                      <>
                        {/* On subsequent items in dropdown, only show possible OOS tag */}
                        {!sizeVariant.isAvailable &&
                          sizeVariant.variantId &&
                          OutOfStockTag(sizeVariant.id === selectedSizeId)}

                        {/* If variant does not exist, show not available tag */}
                        {!sizeVariant.isAvailable &&
                          !sizeVariant.variantId &&
                          NotAvailableTag()}
                      </>
                    )}
                  </StyledListOption>
                ))}
              </StyledOptionList>
            )}
          </AnimatePresence>
        </StyledDropdownWrapper>
      )}
    </>
  )

  return (
    <>
      {hasDropdown && (
        <StyledFieldset>
          <StyledDropdownTitle
            variant={'smallBody'}
            color={'gravy80'}
            oneSize={oneSize}
          >
            {oneSize ? (
              <span id='size-select-title'>{localizedDictionary.oneSize}</span>
            ) : (
              <span id='size-select-title'>
                {localizedDictionary.chooseYourSize}
              </span>
            )}

            {sizeGuide && (
              <>
                <img src={rulerIcon} alt='' />
                <StyledButton
                  label={localizedDictionary.dimensions}
                  variant='inline'
                  onClick={toggleSizeGuide}
                />
              </>
            )}
          </StyledDropdownTitle>

          {/* Native dropdown only rendered on mobile devices */}
          {isMobileDevice ? nativeDropdown : customDropdown}
        </StyledFieldset>
      )}
    </>
  )
}
