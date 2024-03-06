import { useState } from 'react'
import Link from 'next/link'

import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { ProductProps, VariantProps } from './ShopModule.types'
import { SaleProps } from '../../Interfaces/sales'
import { getLocalizedPrice } from '../../utils'

import { PromoPill } from '../PromoPill'
import { Image } from '../Image'
import { Text } from '../Text/Text'
import { ColorSelectorDropdown } from '../ColorSelectorDropdown'
import { ColorSelectorToggle } from '../ColorSelectorToggle'

import {
  StyledContentContainer,
  StyledFlexContainer,
  StyledFreeGiftDetails,
  StyledFreeText,
  StyledGiftWithColorContainer,
  StyledImageContainer,
  StyledPrice,
  StyledPromoPillContainer,
  StyledSwatchesPriceContainer,
  StyledText,
  StyledToggle,
  StyledWrapper
} from './FreeGift.styled'

interface FreeGiftProps {
  locale: Locale
  freeGift?: ProductProps | null
  sales: SaleProps
  product: ProductProps
  freeGiftVariant?: VariantProps
  updateFreeGiftVariant: (
    selectedSizeId: string,
    variantId?: number | undefined,
    color?: string | undefined
  ) => void
}

export const FreeGift = ({
  locale,
  freeGift,
  sales,
  // product,
  freeGiftVariant,
  updateFreeGiftVariant
}: FreeGiftProps) => {
  if (!freeGiftVariant || !freeGift) {
    return null
  }

  const localizedDictionary = dictionary[locale]

  const isAvailable = freeGiftVariant?.isAvailable

  const hasColorSelector = freeGift.colorVariants?.length > 0 ? true : false

  // const sizeVariant = freeGift.sizeVariants.find((variant) => {
  //   return variant.id === freeGiftVariant.size
  // })

  const { freeGiftImage } = freeGiftVariant?.images || freeGift?.images || {}

  const freeGiftPerBuyItem = sales?.customerGetsQuantity
    ? sales?.customerGetsQuantity
    : 1

  const freeGiftPrice = freeGiftVariant?.price * freeGiftPerBuyItem

  // const freeGiftCopyLink =
  //   locale === 'fr'
  //     ? `${freeGift.name.toLowerCase()} GRATUITE (taille ${sizeVariant?.label})`
  //     : `FREE ${sizeVariant?.label} ${freeGift.name}`

  //  code below for single sku products ( i.e. one size/variant/color)
  const freeGiftCopyLink = freeGift.name.replace('Endy', '')

  // Spelling of the word 'free' in french is dependant on the context of the sentence which is different from the dictionary
  // const freeText = locale === 'fr' ? `Gratuit` : `Free`
  const freeText = locale === 'fr' ? `0 $` : `$0`

  const freePillowText = freeGift.title.includes('Memory')
    ? `${localizedDictionary.freeMemoryFoamPillows}`
    : `${localizedDictionary.freeCustomizablePillows}`

  const checkmarkIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/1877edd0df80d9e1456f77ca6dbb52d94d413976-12x12.svg'

  // Endy Cash sale logic
  const isEndyCash = sales?.displayName.includes('Endy Cash')
  const endyCashPillCopy = locale === 'fr' ? 'dollars endy' : 'endy cash'
  const endyCashHeaderCopy =
    locale === 'fr'
      ? `Obtenez ${getLocalizedPrice(freeGiftPrice, locale)}`
      : `Earn ${getLocalizedPrice(freeGiftPrice, locale)}`
  const endyCashSubcopy =
    locale === 'fr'
      ? 'Applicable à un prochain achat'
      : 'Redeem on your next purchase'
  const endyCashFreeText = locale === 'fr' ? `Gratuit` : `Free`

  const FreeGiftDetails = () => {
    return (
      <StyledFreeGiftDetails hasColorSelector={hasColorSelector}>
        <StyledText variant={'mediumBody'} color={'rubine'} locale={locale}>
          <strong>
            {isEndyCash ? endyCashHeaderCopy : localizedDictionary.freeGiftWith}
            {/* {getProductNameWithoutArticles(product.name)} */}
          </strong>
        </StyledText>
        {/* TODO: Refactor to avoid repetition */}
        {freeGift.productType === 'Pillow' ? (
          <Text variant={'mediumBody'} color={'gravy'}>
            <Link href={`/products${freeGift.slug}`} locale={locale}>
              {freePillowText}
            </Link>
          </Text>
        ) : (
          <Text variant={'mediumBody'} color={'gravy'}>
            {isEndyCash ? (
              endyCashSubcopy
            ) : (
              <Link href={`/products${freeGift.slug}`} locale={locale}>
                {freeGiftCopyLink}
              </Link>
            )}
          </Text>
        )}
        <StyledFreeText
          variant={'mediumBody'}
          color={'gravy'}
          hasColorSelector={hasColorSelector}
        >
          {isEndyCash ? endyCashFreeText : freeText}
          {isAvailable ? (
            <StyledPrice>
              {getLocalizedPrice(freeGiftPrice, locale)}
            </StyledPrice>
          ) : (
            <span>
              {''} — {''}
              {localizedDictionary.outOfStock}
            </span>
          )}
        </StyledFreeText>
      </StyledFreeGiftDetails>
    )
  }

  const FreeGiftImage = () => {
    return (
      <StyledImageContainer hasColorSelector={hasColorSelector}>
        {isEndyCash ? (
          freeGiftImage && (
            <Image
              desktopImage={freeGiftImage?.desktopImage}
              tabletImage={freeGiftImage?.desktopImage}
              mobileImage={freeGiftImage?.mobileImage}
              alt={freeGiftImage?.alt}
              srcWidths={[768, 1024]}
            />
          )
        ) : (
          <Link
            href={`/products${freeGift.slug}`}
            locale={locale}
            aria-label={localizedDictionary.freeGiftProductLink}
          >
            {freeGiftImage && (
              <Image
                desktopImage={freeGiftImage?.desktopImage}
                tabletImage={freeGiftImage?.desktopImage}
                mobileImage={freeGiftImage?.mobileImage}
                alt={freeGiftImage?.alt}
                srcWidths={[768, 1024]}
              />
            )}
          </Link>
        )}
      </StyledImageContainer>
    )
  }

  const FreeGiftToggle = () => {
    return (
      <StyledToggle locale={locale} hasColorSelector={hasColorSelector}>
        <Text variant={'micro'} color={'white'}>
          <strong>{localizedDictionary.included}</strong>
        </Text>
        <img src={checkmarkIcon} alt='' />
      </StyledToggle>
    )
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const selectedColor = freeGift?.colorVariants?.find(
    (colorVariant) => colorVariant.id === freeGiftVariant.color
  )?.label

  return (
    <StyledWrapper
      bgColor={sales?.themeColor}
      hasColorSelector={hasColorSelector}
    >
      {hasColorSelector ? (
        <StyledGiftWithColorContainer>
          <StyledPromoPillContainer locale={locale}>
            <PromoPill
              variant='gravy'
              promoCopy={'promo'}
              borderStyle={'none'}
              bgColor={sales?.themeColor}
              locale={locale}
            />
          </StyledPromoPillContainer>

          <FreeGiftDetails />
          <FreeGiftImage />

          <FreeGiftToggle />
          <StyledSwatchesPriceContainer variant={'mediumBody'} color={'gravy'}>
            {freeText}
            {isAvailable ? (
              <StyledPrice>
                {getLocalizedPrice(freeGiftPrice, locale)}
              </StyledPrice>
            ) : (
              <span>
                {''} — {''}
                {localizedDictionary.outOfStock}
              </span>
            )}
          </StyledSwatchesPriceContainer>

          <ColorSelectorToggle
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            selectedColor={
              selectedColor ? selectedColor : freeGiftVariant.color
            }
            locale={locale}
            isFreeGift={true}
          />

          <ColorSelectorDropdown
            handleSelect={updateFreeGiftVariant}
            selectedSizeId={freeGiftVariant.size}
            selectedColorId={freeGiftVariant.color}
            colorVariants={freeGift.colorVariants}
            productVariants={freeGift.variants}
            locale={locale}
            hidePopularBadge
            isDropdown={freeGift ? true : false}
            isExpanded={isExpanded}
            productSlug={freeGift.slug}
          />
        </StyledGiftWithColorContainer>
      ) : (
        <StyledFlexContainer>
          <FreeGiftImage />
          <StyledContentContainer>
            <FreeGiftToggle />
            <StyledPromoPillContainer locale={locale}>
              <PromoPill
                variant='gravy'
                promoCopy={isEndyCash ? endyCashPillCopy : 'promo'}
                borderStyle={'none'}
                bgColor={sales?.themeColor}
                locale={locale}
              />
            </StyledPromoPillContainer>
            <FreeGiftDetails />
          </StyledContentContainer>
        </StyledFlexContainer>
      )}
    </StyledWrapper>
  )
}
