import { SaleProps } from '../../Interfaces/sales'
import { LineItemProps } from './CartItem'
import { getSum, getLocalizedPrice } from '../../utils/getLocalizedPrice'
import { Locale } from '../../types/global-types'

import { isProductOnSale } from '../../utils/isProductOnSale'

import {
  StyledThresholdMessage,
  StyledThresholdProgressContainer,
  StyledThresholdCopyContainer,
  StyledThresholdMessageContainer
} from './Cart.styled'

import { ProgressBar } from '../ProgressBar/ProgressBar'

const iconCheckmark =
  'https://cdn.sanity.io/images/d0kd7r9c/production/346aeb5e4f81fc7c0eb5f16f1bf26925dbf452cd-32x32.svg?fit=max&w=600&h=600'

const iconSaleTag =
  'https://cdn.sanity.io/images/d0kd7r9c/production/f3c7c5060a54d20be6f5da42d442aee1ab183d9f-36x32.svg'

interface CartThresholdMessageProps {
  sales: SaleProps
  items: LineItemProps[]
  locale: Locale
}

const BmsmMessage = ({ sales, items, locale }: CartThresholdMessageProps) => {
  if (sales?.saleType !== 'Bmsm') return null

  const firstDiscountThreshold = sales.firstDiscountThreshold || 0
  const secondDiscountThreshold = sales.secondDiscountThreshold || 0
  const firstConditionCopy = sales.sideCartBanner?.firstConditionCopy
  const secondConditionCopy = sales.sideCartBanner?.secondConditionCopy
  const thirdConditionCopy = sales.sideCartBanner?.thirdConditionCopy

  const saleCartTotal = items.reduce((sum, item) => {
    const isOnSale = isProductOnSale(sales, item.productId)
    const itemTotal = isOnSale ? getSum(item.price, item.quantity) : 0
    return sum + itemTotal
  }, 0)

  const isCartDiscounted = saleCartTotal >= firstDiscountThreshold
  const isFirstDiscountApplied =
    saleCartTotal >= firstDiscountThreshold &&
    saleCartTotal < secondDiscountThreshold
  const isSecondDiscountApplied = saleCartTotal >= secondDiscountThreshold
  const isFirstThresholdMet = saleCartTotal >= firstDiscountThreshold
  const firstSpendMoreCount = getLocalizedPrice(
    firstDiscountThreshold - saleCartTotal,
    locale
  )
  const secondSpendMoreCount = getLocalizedPrice(
    secondDiscountThreshold - saleCartTotal,
    locale
  )

  // below message comes from Sanity cart condition fields
  let thresholdMessage
  if (!isCartDiscounted && saleCartTotal > 1) {
    thresholdMessage = firstConditionCopy
  } else if (isFirstDiscountApplied) {
    thresholdMessage = secondConditionCopy
  } else if (isSecondDiscountApplied) {
    thresholdMessage = thirdConditionCopy
  }

  if (!thresholdMessage) return null

  // below includes logic to show target spend message
  let targetSpendMessage
  if (!isCartDiscounted && saleCartTotal > 1) {
    targetSpendMessage =
      locale === 'en'
        ? `Add ${firstSpendMoreCount} to unlock $50 OFF`
        : `Ajoutez ${firstSpendMoreCount} pour obtenir 50 $ de rabais`
  } else if (isFirstDiscountApplied) {
    targetSpendMessage =
      locale === 'en'
        ? `Add ${secondSpendMoreCount} to unlock $100 OFF`
        : `Ajoutez ${secondSpendMoreCount} pour obtenir 100 $ de rabais`
  } else if (isSecondDiscountApplied) {
    targetSpendMessage = null
  }

  return (
    <StyledThresholdMessageContainer
      color={'gravy'}
      variant={'smallBody'}
      element={'div'}
      isCartDiscounted={isCartDiscounted}
    >
      <StyledThresholdProgressContainer>
        <StyledThresholdCopyContainer>
          {/* TODO: Replace with the icon component */}
          {isFirstThresholdMet ? (
            <img src={iconCheckmark} alt='' />
          ) : (
            <img src={iconSaleTag} alt='' />
          )}
          <StyledThresholdMessage>
            {thresholdMessage}
            {targetSpendMessage}
          </StyledThresholdMessage>
        </StyledThresholdCopyContainer>
        <ProgressBar
          sales={sales}
          currentSpend={saleCartTotal}
          isFirstThresholdMet={isFirstThresholdMet}
        />
      </StyledThresholdProgressContainer>
    </StyledThresholdMessageContainer>
  )
}

const LevelUpOfferMessage = ({
  sales,
  items,
  locale
}: CartThresholdMessageProps) => {
  if (sales?.saleType !== 'Level Up Offer') return null

  const firstDiscountForLevelUp = sales.firstDiscountForLevelUp || 0
  const secondDiscountForLevelUp = sales.secondDiscountForLevelUp || 0
  const { firstConditionCopy, secondConditionCopy } = sales.sideCartBanner

  const targetSpend = sales.discountThresholdForLevelUp

  const saleCartTotal = items.reduce((sum, item) => {
    const isOnSale = isProductOnSale(sales, item.productId)
    const itemTotal = isOnSale ? getSum(item.price, item.quantity) : 0
    return sum + itemTotal
  }, 0)

  const isCartDiscounted = firstDiscountForLevelUp > 0
  const isTargetSpendMet = saleCartTotal >= targetSpend
  const spendMoreCount = getLocalizedPrice(targetSpend - saleCartTotal, locale)

  let levelUpMessage = ''

  const levelUpMessageFR =
    sales.discountValueForLevelUp === 'Percentage'
      ? `Achetez ${spendMoreCount} de plus pour obtenir ${secondDiscountForLevelUp}% de rabais!`
      : `Achetez ${spendMoreCount} de plus pour obtenir ${secondDiscountForLevelUp} $ de rabais!`

  const levelUpMessageEN =
    sales.discountValueForLevelUp === 'Percentage'
      ? `Spend ${spendMoreCount} more to get ${secondDiscountForLevelUp}% off!`
      : `Spend ${spendMoreCount} more to get $${secondDiscountForLevelUp} off!`

  const levelUpMessageWithTarget =
    locale === 'fr' ? levelUpMessageFR : levelUpMessageEN

  if (isTargetSpendMet) {
    levelUpMessage = secondConditionCopy
  } else {
    levelUpMessage = firstConditionCopy
  }

  if (!levelUpMessage) return null

  return (
    <StyledThresholdMessageContainer
      color={'gravy'}
      variant={'smallBody'}
      element={'div'}
      isCartDiscounted={isCartDiscounted}
    >
      <StyledThresholdProgressContainer>
        <StyledThresholdCopyContainer>
          {/* TODO: Replace with icon component */}
          {isTargetSpendMet ? (
            <img src={iconCheckmark} alt='' />
          ) : (
            <img src={iconSaleTag} alt='' />
          )}
          <StyledThresholdMessage>
            {levelUpMessage}
            {isTargetSpendMet ? null : levelUpMessageWithTarget}
          </StyledThresholdMessage>
        </StyledThresholdCopyContainer>
        <ProgressBar sales={sales} currentSpend={saleCartTotal} />
      </StyledThresholdProgressContainer>
    </StyledThresholdMessageContainer>
  )
}

export const CartThresholdMessage = ({
  sales,
  items,
  locale
}: CartThresholdMessageProps) => {
  return (
    <>
      <BmsmMessage sales={sales} items={items} locale={locale} />
      <LevelUpOfferMessage sales={sales} items={items} locale={locale} />
    </>
  )
}
