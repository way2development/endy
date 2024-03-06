import dictionary from '../../dictionary.json'
import {
  StyledSemiboldUpper,
  StyledVisuallyHidden
} from '../../styles/global.styled'
import { Locale } from '../../types/global-types'

import {
  StyledLegend,
  StyledText,
  StyledSwatchWrapper,
  StyledInputContainer,
  StyledRadio,
  StyledTag,
  StyledTagText,
  StyledFieldset
} from './Swatches.styled'

import { ColorVariant, VariantProps } from './ShopModule.types'

interface SwatchesProps {
  selectedSizeId: string
  selectedColorId: string
  colorVariants: ColorVariant[]
  productVariants: VariantProps[]
  handleSelect: (
    sizeSelection: string,
    variantId?: number,
    colorSelection?: string
  ) => void
  locale: Locale
  hidePopularBadge?: boolean
  isDropdown?: boolean
  productSlug: string
}

export const Swatches = ({
  selectedColorId,
  selectedSizeId,
  colorVariants,
  handleSelect,
  productVariants,
  locale,
  hidePopularBadge = false,
  isDropdown = false,
  productSlug
}: SwatchesProps) => {
  const localizedDictionary = dictionary[locale]
  const prefix = productSlug?.replace('/', '')

  const handleChange = (colorSelection: string) => {
    const selectedColorVariantId = productVariants.find((variant) => {
      return variant.title === `${selectedSizeId} / ${colorSelection}`
    })?.id

    selectedColorVariantId &&
      handleSelect(selectedSizeId, selectedColorVariantId, colorSelection)
  }

  const colorVariantsWithStockInfo =
    colorVariants?.map((colorVariant) => {
      const productVariant = productVariants.find((variant) => {
        return (
          variant.color === colorVariant.id && variant.size === selectedSizeId
        )
      })

      return {
        ...colorVariant,
        isAvailable: productVariant?.isAvailable
      }
    }) || []

  const selectedColorLabel = colorVariants?.find(
    (colorVariant) => colorVariant.id === selectedColorId
  )?.label

  const hasSwatchesFlag = (copy: string) => {
    return productVariants.find((productVariant) => {
      return (
        selectedColorId === productVariant.color &&
        productVariant.swatchesFlag === copy
      )
    })
  }

  const PopularTag = () => (
    <StyledTag>
      <StyledTagText color={'gravy'} variant={'micro'}>
        {localizedDictionary.popular}
      </StyledTagText>
    </StyledTag>
  )

  const NewTag = () => (
    <StyledTag>
      <StyledTagText color={'gravy'} variant={'micro'}>
        {localizedDictionary.new}
      </StyledTagText>
    </StyledTag>
  )

  return (
    <StyledFieldset>
      {!isDropdown && (
        <StyledLegend>
          <StyledVisuallyHidden>
            {dictionary.en.chooseYourColor}
          </StyledVisuallyHidden>
          <StyledText color={'gravy80'} variant={'smallBody'}>
            <StyledSemiboldUpper>
              {localizedDictionary.colour} — {''}
            </StyledSemiboldUpper>
            {selectedColorLabel}
          </StyledText>

          {hasSwatchesFlag(dictionary['en'].popular) &&
            !hidePopularBadge &&
            colorVariantsWithStockInfo.length > 1 && <PopularTag />}

          {hasSwatchesFlag(dictionary['en'].new) && <NewTag />}
        </StyledLegend>
      )}

      <StyledSwatchWrapper isFreeGift={isDropdown}>
        {colorVariantsWithStockInfo.length &&
          colorVariantsWithStockInfo.map((colorVariant) => {
            return (
              <StyledInputContainer key={`${prefix}-${colorVariant.id}`}>
                <StyledRadio
                  isAvailable={colorVariant.isAvailable}
                  color={colorVariant.color}
                  type='radio'
                  name={`${prefix}-swatch`}
                  id={`${prefix}-${colorVariant.id}`}
                  checked={colorVariant.id === selectedColorId}
                  value={colorVariant.id}
                  onChange={(e) => handleChange(e.target.value)}
                  isFreeGift={isDropdown}
                />
                <label htmlFor={`${prefix}-${colorVariant.id}`}>
                  <StyledVisuallyHidden>
                    {colorVariant.label}
                  </StyledVisuallyHidden>
                </label>
              </StyledInputContainer>
            )
          })}
      </StyledSwatchWrapper>
    </StyledFieldset>
  )
}
