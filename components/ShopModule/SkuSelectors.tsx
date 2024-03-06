import React from 'react'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { VariantProps, ProductProps } from './ShopModule.types'
import {
  StyledInputContainer,
  StyledRadio,
  StyledLabel,
  StyledLegendSizeGuideContainer,
  StyledSizeGuideGroup,
  StyledButton
} from './SkuSelectors.styled'
import {
  StyledSemiboldUpper,
  StyledVisuallyHidden
} from '../../styles/global.styled'
import { StyledLegend, StyledText } from './Swatches.styled'
import { StyledFieldset } from './ShopModule.styled'
import { Image } from '../Image'

const rulerIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/5eeeeb4c47f3a2be166c116b74de652c511fe312-16x16.svg'

interface SkuSelectorProps {
  product: ProductProps
  productVariants: VariantProps[]
  selectedSizeId: string
  productSlug: string
  handleSelect: (
    sizeSelection: string,
    variantId?: number,
    colorSelection?: string
  ) => void
  selectedColorId: string | undefined
  toggleSizeGuide: () => void
  sizeGuide: {
    content: JSX.Element | JSX.Element[]
    heading: string
  }
}

interface SkuSelectorsProps extends SkuSelectorProps {
  locale: Locale
  hasSkuSelector: boolean
}

interface OutOfStockMessagingProps {
  productVariants: VariantProps[]
  selectedSizeId: string
  outOfStock: string
}

const SkuSelector = ({
  productVariants,
  selectedSizeId,
  productSlug,
  handleSelect,
  selectedColorId
}: SkuSelectorProps) => {
  const prefix = productSlug.replace('/', '')

  const handleChange = (skuSelection: string) => {
    const selectedColorVariantId = productVariants.find((variant) => {
      return variant.title === `${skuSelection} / ${selectedColorId}`
    })?.id

    selectedColorVariantId &&
      handleSelect(skuSelection, selectedColorVariantId, selectedColorId)
  }

  return (
    <>
      {productVariants.map((variant) => {
        return (
          <>
            {variant?.images?.skuSelectorImage && (
              <StyledLabel
                htmlFor={`${prefix}-${variant.size}`}
                key={variant.id}
                isOutOfStock={!variant.isAvailable}
                checked={variant.size === selectedSizeId}
              >
                <StyledVisuallyHidden>{variant.size}</StyledVisuallyHidden>
                <StyledRadio
                  type='radio'
                  id={`${prefix}-${variant.size}`}
                  name={`${prefix}-sku`}
                  value={variant.size}
                  onChange={(e) => handleChange(e.target.value)}
                  checked={variant.size === selectedSizeId}
                  isOutOfStock={!variant.isAvailable}
                />
                <Image
                  desktopImage={variant.images.skuSelectorImage.desktopImage}
                  mobileImage={variant.images.skuSelectorImage.mobileImage}
                  tabletImage={variant.images.skuSelectorImage.tabletImage}
                  alt={variant.images.skuSelectorImage.alt}
                  srcWidths={[306, 298, 378]}
                />
              </StyledLabel>
            )}
          </>
        )
      })}
    </>
  )
}

const OutOfStockMessaging = ({
  productVariants,
  selectedSizeId,
  outOfStock
}: OutOfStockMessagingProps) => {
  return (
    <>
      {productVariants.map((variant) => {
        const isOutOfStock = !variant.isAvailable
        return (
          variant.size === selectedSizeId &&
          isOutOfStock && (
            <StyledText
              color={'gravy80'}
              variant={'smallBody'}
              key={variant.id}
            >
              {outOfStock}
            </StyledText>
          )
        )
      })}
    </>
  )
}

export const SkuSelectors = ({
  product,
  selectedSizeId,
  productVariants,
  locale,
  productSlug,
  hasSkuSelector,
  selectedColorId,
  handleSelect,
  toggleSizeGuide,
  sizeGuide
}: SkuSelectorsProps) => {
  const localizedDictionary = dictionary[locale]

  const selectedSizeLabel = product.sizeVariants?.find(
    (sizeLabel) => sizeLabel.id === selectedSizeId
  )?.label

  return (
    <>
      {hasSkuSelector && (
        <StyledFieldset>
          <StyledLegendSizeGuideContainer>
            <StyledLegend>
              <StyledVisuallyHidden>
                {dictionary.en.chooseYourColor}
              </StyledVisuallyHidden>
              <StyledText color={'gravy80'} variant={'smallBody'}>
                <StyledSemiboldUpper>
                  {localizedDictionary.configuration} — {''}
                </StyledSemiboldUpper>
                {selectedSizeLabel}
              </StyledText>
            </StyledLegend>

            {/* TODO: break out SizeGuide into it's own file */}
            {sizeGuide && (
              <StyledSizeGuideGroup>
                <img src={rulerIcon} alt='' />
                <StyledText color={'gravy80'} variant={'smallBody'}>
                  <StyledButton
                    label={localizedDictionary.dimensions}
                    variant='inline'
                    onClick={toggleSizeGuide}
                  />
                </StyledText>
              </StyledSizeGuideGroup>
            )}
          </StyledLegendSizeGuideContainer>
          <OutOfStockMessaging
            productVariants={productVariants}
            selectedSizeId={selectedSizeId}
            outOfStock={localizedDictionary.outOfStock}
          />

          <StyledInputContainer>
            <SkuSelector
              product={product}
              productVariants={productVariants}
              selectedSizeId={selectedSizeId}
              productSlug={productSlug}
              handleSelect={handleSelect}
              selectedColorId={selectedColorId}
              toggleSizeGuide={toggleSizeGuide}
              sizeGuide={sizeGuide}
            />
          </StyledInputContainer>
        </StyledFieldset>
      )}
    </>
  )
}
