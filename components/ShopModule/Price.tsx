import dictionary from '../../dictionary.json'

import { Locale } from '../../types/global-types'
import { SaleProps } from '../../Interfaces/sales'

import { StyledVisuallyHidden } from '../../styles/global.styled'
import {
  StyledPriceContainer,
  StyledSalePriceContainer,
  StyledPrice,
  StyledRegularPrice,
  StyledSaleEnds
} from './ShopModule.styled'
import { StyledSemibold } from '../../styles/global.styled'

import { Text } from '../Text'

import {
  getLocalizedPrice,
  getLocalizedSalePrice
} from '../../utils/getLocalizedPrice'

export interface PriceProps {
  variantPrice: number
  variantSalePrice: number
  variantOffSalePrice: number
  qty?: number
  sales?: SaleProps
  locale: Locale
  isOnSale: boolean
  compareAtPrice?: number | null
  productId: number
  isMonthlyPayment?: boolean
  showSaleEnds?: boolean
}
interface RegularPriceProps {
  isOnSale: boolean
  regPriceLabel: string
  price: string
  isMonthlyPayment?: boolean
}

const RegularPrice = ({
  isOnSale,
  regPriceLabel,
  price,
  isMonthlyPayment = false
}: RegularPriceProps) => {
  return (
    <StyledRegularPrice
      variant={isOnSale ? 'priceCrossed' : 'price'}
      color={isOnSale ? 'gravy70' : 'rubine'}
      display='inline'
      isMonthlyPayment={isMonthlyPayment}
    >
      <StyledVisuallyHidden>{regPriceLabel}</StyledVisuallyHidden>
      {price}
    </StyledRegularPrice>
  )
}

export const Price = ({
  variantPrice,
  variantSalePrice,
  variantOffSalePrice,
  qty = 1,
  locale,
  sales,
  isOnSale,
  compareAtPrice,
  productId,
  isMonthlyPayment = false,
  showSaleEnds
}: PriceProps) => {
  const localizedDictionary = dictionary[locale]

  const isSaleActive =
    isOnSale &&
    (sales?.saleType === 'Percentage' ||
      sales?.saleType === 'Fixed Amount' ||
      sales?.saleType === 'Everything Off' ||
      sales?.secondarySaleType === 'Percentage' ||
      sales?.secondarySaleType === 'Fixed Amount' ||
      sales?.saleType === 'Level Up Offer')

  // Compare at Price
  const hasCompareAtPrice = compareAtPrice && compareAtPrice ? true : false
  const calcCompareAtPriceDiscount =
    compareAtPrice && compareAtPrice - variantPrice
  const hasCompareAtPriceDiscount = calcCompareAtPriceDiscount ? true : false

  const isReducedPriceActive =
    hasCompareAtPrice &&
    hasCompareAtPriceDiscount &&
    sales?.saleType !== 'Everything Off'

  let salePrice
  let regularPrice = getLocalizedPrice(variantPrice, locale, qty)

  if (isReducedPriceActive && compareAtPrice) {
    regularPrice = getLocalizedPrice(compareAtPrice, locale, qty)
    salePrice = getLocalizedPrice(variantPrice, locale, qty)
  } else if (sales?.saleType === 'Everything Off' && variantSalePrice > 0) {
    regularPrice = getLocalizedPrice(variantOffSalePrice, locale, qty)
    salePrice = getLocalizedPrice(variantSalePrice, locale, qty)
  } else if (sales && sales?.saleType !== 'Everything Off') {
    salePrice = getLocalizedSalePrice(
      variantPrice,
      sales,
      locale,
      qty,
      productId
    )
  } else {
    regularPrice = getLocalizedPrice(variantPrice, locale, qty)
  }

  const showSalePrice =
    (isSaleActive || isReducedPriceActive) && salePrice !== regularPrice

  //TODO: When sale takedown is at 3am, we need to subtract 1 day from formattedSaleEndDate
  const formattedSaleEndDate = sales?.endDate?.toLocaleString(`${locale}-ca`, {
    month: 'short',
    day: 'numeric'
  })

  return (
    <StyledPriceContainer
      isAffirmAvailable={isMonthlyPayment && locale === 'en'}
      showAPRLineBreak={sales && showSaleEnds}
    >
      {isMonthlyPayment && locale === 'en' && (
        <Text variant='smallBody' color='gravy70'>
          {localizedDictionary.oneTimePayment}
        </Text>
      )}
      {showSalePrice ? (
        <>
          <StyledSalePriceContainer>
            <StyledPrice variant='price' color='rubine' display='inline'>
              <StyledVisuallyHidden>
                {localizedDictionary.salePriceIs}
              </StyledVisuallyHidden>
              {salePrice}
            </StyledPrice>
            <RegularPrice
              isOnSale={showSalePrice}
              regPriceLabel={localizedDictionary.regPriceIs}
              price={regularPrice}
            />
          </StyledSalePriceContainer>
        </>
      ) : (
        <RegularPrice
          isOnSale={showSalePrice}
          regPriceLabel={localizedDictionary.regPriceIs}
          price={regularPrice}
          isMonthlyPayment={isMonthlyPayment}
        />
      )}
      {sales && showSaleEnds && (
        <StyledSaleEnds
          variant='smallBody'
          color='gravy70'
          isSaleOnFR={isOnSale && locale === 'fr'}
        >
          {localizedDictionary.saleEnds}{' '}
          <StyledSemibold>
            {/* {formattedSaleEndDate} */}
            {locale === 'fr' ? '30 nov.' : 'Nov 30'}
          </StyledSemibold>
        </StyledSaleEnds>
      )}
    </StyledPriceContainer>
  )
}
