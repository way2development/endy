import { useState, useEffect } from 'react'
import Link from 'next/link'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import {
  getProductNameWithoutArticles,
  lowercaseFirstLetter
} from '../../utils/grammar'

import { Image } from '../Image'
import { Price } from '../ShopModule/Price'
import { getLocalizedPrice } from '../../utils/getLocalizedPrice'
import { Text } from '../Text'
import { StyledSemibold } from '../../styles/global.styled'

import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'
import { SaleProps } from '../../Interfaces/sales'

import {
  isProductOnSale,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'

import { ColorSelectorDropdown } from '../ColorSelectorDropdown'
import { ColorSelectorToggle } from '../ColorSelectorToggle'
import {
  doesProductHaveCompareAtPrice,
  getDiscountPillCopy
} from '../../utils/compareAtPrice'

import {
  StyledInput,
  StyledLabel,
  StyledToggle,
  StyledLabelContainer,
  StyledUpsellProductsSection,
  StyledUpsellProductCard,
  StyledImageContainer,
  StyledProductDetails,
  StyledText,
  StyledPriceWrapper,
  StyledColorSelectorToggle,
  StyledProductCardWrapper,
  StyledCompareAtPriceBanner,
  StyledFixedAmountSaleBanner
} from './UpsellProducts.styled'

interface UpsellProductsProps {
  locale: Locale
  products: ProductProps[]
  variants: VariantProps[]
  sales?: SaleProps
  toggleSelectUpsellItem: (variant: VariantProps) => void
  updateUpsellItemVariant: (
    currentVariant: VariantProps,
    updatedVariant: VariantProps
  ) => void
  selectedProductVariant: VariantProps
  cartItems: { id: number; quantity: number }[]
  oneSize: boolean
}

interface UpsellProductCardProps {
  product: ProductProps
  variant: VariantProps
  toggleSelectUpsellItem: (variant: VariantProps) => void
  updateUpsellItemVariant: (
    currentVariant: VariantProps,
    updatedVariant: VariantProps
  ) => void
  selectedProductVariant: VariantProps
  sales?: SaleProps
  locale: Locale
  cartItems: { id: number; quantity: number }[]
}

interface CompareAtPriceBannerProps {
  locale: Locale
  product: ProductProps
  selectedVariant: VariantProps
}

const UpsellImage = ({
  selectedVariant
}: {
  selectedVariant: VariantProps
}) => {
  return (
    <>
      {selectedVariant?.images?.upsellImage && (
        <Image
          desktopImage={selectedVariant?.images?.upsellImage?.desktopImage}
          tabletImage={selectedVariant?.images?.upsellImage?.tabletImage}
          mobileImage={selectedVariant?.images?.upsellImage?.mobileImage}
          srcWidths={[768, 1024]}
        />
      )}
    </>
  )
}

const CompareAtPriceBanner = ({
  locale,
  product,
  selectedVariant
}: CompareAtPriceBannerProps) => {
  const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)

  if (!hasVariantWithDiscount) return null

  const localizedDictionary = dictionary[locale]
  const variantCompareAtPrice = selectedVariant.compareAtPrice

  let pillCopy

  if (hasVariantWithDiscount && !variantCompareAtPrice) {
    pillCopy =
      locale === 'fr'
        ? `${localizedDictionary.limitedTimeOnly}: Solde sur certains produits`
        : `${localizedDictionary.limitedTimeOnly}: Save on select items`
  }

  if (hasVariantWithDiscount && variantCompareAtPrice) {
    pillCopy = getDiscountPillCopy(
      variantCompareAtPrice,
      selectedVariant.price,
      locale
    )
  }

  return (
    <StyledCompareAtPriceBanner>
      <Text color={'gravy'} variant={'smallBody'} element={'span'}>
        {/* TODO: Replace with icon component when ready */}
        <img
          src='https://cdn.sanity.io/images/d0kd7r9c/production/6c2f25eadf607e00bfd5d593d64ec0ea9a489be8-16x16.svg'
          alt=''
        />
        <StyledSemibold>{pillCopy}</StyledSemibold>
      </Text>
    </StyledCompareAtPriceBanner>
  )
}

const UpsellProductCard = ({
  product,
  variant,
  selectedProductVariant,
  toggleSelectUpsellItem,
  updateUpsellItemVariant,
  cartItems,
  locale,
  sales
}: UpsellProductCardProps) => {
  const localizedDictionary = dictionary[locale]

  const [isChecked, setIsChecked] = useState(false)
  const [isColorSelectorExpanded, setIsColorSelectorExpanded] = useState(false)

  const [selectedVariant, setSelectedVariant] = useState(variant)

  const hasColorVariants = product.colorVariants?.length > 0 ? true : false

  const isOnSale = sales ? isProductOnSale(sales, product.id) : false
  const isFixedAmountSaleProduct =
    sales?.saleType === 'Fixed Amount' &&
    isProductOnSale(sales, product.id) &&
    !isSecondarySaleProduct(sales, product.id)

  const fixedAmountSalePrice = sales?.discountValue
  let fixedAmountSaleBannerCopy

  if (fixedAmountSalePrice) {
    fixedAmountSaleBannerCopy =
      locale === 'en'
        ? `Limited Time Only: ${getLocalizedPrice(
            fixedAmountSalePrice,
            locale
          )} Off`
        : `Pour un temps limité : rabais de ${getLocalizedPrice(
            fixedAmountSalePrice,
            locale
          )}`
  }

  useEffect(() => {
    // if product variant has changed, reset upsells
    if (!cartItems.some((item) => item.id === selectedProductVariant.id)) {
      setIsChecked(false)
      setSelectedVariant(variant)
    }
  }, [selectedProductVariant])

  const handleChange = () => {
    setIsChecked(!isChecked)
    toggleSelectUpsellItem(selectedVariant)
  }

  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsChecked(!isChecked)
      toggleSelectUpsellItem(selectedVariant)
    }
  }

  const updateColorVariant = (
    selectedSizeId: string,
    variantId?: number | undefined,
    colorSelection?: string | undefined
  ) => {
    const currentVariant = selectedVariant

    const newVariant = product.variants.find((variant) => {
      const isValidSize = variant.size === selectedSizeId
      const isValidColor = variant.color === colorSelection

      return isValidSize && isValidColor
    })

    if (newVariant) {
      setSelectedVariant(newVariant)
      if (isChecked) {
        updateUpsellItemVariant(currentVariant, newVariant)
      }
    }
  }

  const selectedColor = product?.colorVariants?.find(
    (colorVariant) => colorVariant.id === selectedVariant.color
  )?.label

  const formattedProductName = lowercaseFirstLetter(product.name)

  const heading =
    locale === 'fr'
      ? `${localizedDictionary.add} : ${formattedProductName}`
      : `${localizedDictionary.add} ${getProductNameWithoutArticles(
          product.name
        )}`

  return (
    <StyledUpsellProductCard>
      <CompareAtPriceBanner
        locale={locale}
        product={product}
        selectedVariant={selectedVariant}
      />
      {isOnSale && isFixedAmountSaleProduct && (
        <StyledFixedAmountSaleBanner>
          <Text color={'gravy'} variant={'smallBody'} element={'span'}>
            {/* TODO: Replace with icon component when ready */}
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/6c2f25eadf607e00bfd5d593d64ec0ea9a489be8-16x16.svg'
              alt=''
            />
            <StyledSemibold>{fixedAmountSaleBannerCopy}</StyledSemibold>
          </Text>
        </StyledFixedAmountSaleBanner>
      )}
      <StyledProductCardWrapper>
        <StyledProductDetails>
          <StyledImageContainer>
            {product.slug ? (
              <Link href={`/products${product.slug}`} locale={locale}>
                <UpsellImage selectedVariant={selectedVariant} />
              </Link>
            ) : (
              <UpsellImage selectedVariant={selectedVariant} />
            )}
          </StyledImageContainer>

          <StyledLabelContainer>
            <StyledText
              display={'inline'}
              variant={'mediumBody'}
              color={'gravy'}
              locale={locale}
            >
              {product.slug ? (
                <Link href={`/products${product.slug}`} locale={locale}>
                  <strong>{heading}</strong>
                </Link>
              ) : (
                <strong>{heading}</strong>
              )}
            </StyledText>
            <StyledPriceWrapper>
              <Price
                variantSalePrice={
                  product?.variants[0]?.salePrice
                    ? product?.variants[0]?.salePrice
                    : 0
                }
                variantOffSalePrice={
                  product?.variants[0]?.offSalePrice
                    ? product?.variants[0]?.offSalePrice
                    : selectedVariant.price
                }
                variantPrice={selectedVariant.price}
                compareAtPrice={
                  selectedVariant?.compareAtPrice > 0
                    ? selectedVariant?.compareAtPrice
                    : null
                }
                locale={locale}
                sales={sales}
                isOnSale={isOnSale}
                productId={product.id}
              />
            </StyledPriceWrapper>
          </StyledLabelContainer>
        </StyledProductDetails>

        <StyledLabel htmlFor={`${selectedVariant.id}`}>
          <StyledInput
            type='checkbox'
            name='upsell'
            id={`${selectedVariant.id}`}
            checked={isChecked}
            aria-checked={isChecked}
            onChange={() => handleChange()}
            onKeyUp={(e) => handleKeyboardEvent(e)}
            aria-label={`${localizedDictionary.add} ${product.name}`}
          />
          <StyledToggle isChecked={isChecked} />

          {hasColorVariants && (
            <StyledColorSelectorToggle>
              <ColorSelectorToggle
                isExpanded={isColorSelectorExpanded}
                setIsExpanded={setIsColorSelectorExpanded}
                selectedColor={
                  selectedColor ? selectedColor : selectedVariant.color
                }
                locale={locale}
              />
            </StyledColorSelectorToggle>
          )}
        </StyledLabel>
      </StyledProductCardWrapper>

      {hasColorVariants && (
        <ColorSelectorDropdown
          handleSelect={updateColorVariant}
          selectedSizeId={selectedVariant.size}
          selectedColorId={selectedVariant.color}
          colorVariants={product.colorVariants}
          productVariants={product.variants}
          locale={locale}
          hidePopularBadge
          isDropdown={product ? true : false}
          isExpanded={isColorSelectorExpanded}
          productSlug={product.slug}
        />
      )}
    </StyledUpsellProductCard>
  )
}
export const UpsellProducts = ({
  products,
  variants,
  toggleSelectUpsellItem,
  updateUpsellItemVariant,
  selectedProductVariant,
  sales,
  locale,
  cartItems
}: UpsellProductsProps) => {
  const getProductById = (id: number) => {
    return products.find((product) => product.id === id)
  }

  return (
    <StyledUpsellProductsSection>
      {variants.map((variant) => {
        const product = variant ? getProductById(variant.productId) : null

        return (
          <div key={variant.id}>
            {product && variant && (
              <UpsellProductCard
                product={product}
                locale={locale}
                variant={variant}
                toggleSelectUpsellItem={toggleSelectUpsellItem}
                updateUpsellItemVariant={updateUpsellItemVariant}
                selectedProductVariant={selectedProductVariant}
                sales={sales}
                cartItems={cartItems}
              />
            )}
          </div>
        )
      })}
    </StyledUpsellProductsSection>
  )
}
