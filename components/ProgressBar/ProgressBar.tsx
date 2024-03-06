import { SaleProps } from '../../Interfaces/sales'

import {
  StyledContainer,
  StyledBarBackground,
  StyledCurrentSpend
} from './ProgressBar.styled'

interface ProgressBarProps {
  // props used in progressBarFill calculation
  sales: SaleProps
  currentSpend: number
  isFirstThresholdMet?: boolean
}

export const ProgressBar = ({
  sales,
  currentSpend,
  isFirstThresholdMet
}: ProgressBarProps) => {
  const targetSpendLevelUp = sales.discountThresholdForLevelUp
  const bmsmSecondThreshold = sales.secondDiscountThreshold || 0
  const isBmsm = sales.saleType === 'Bmsm'

  const progressBarFill =
    sales.saleType === 'Level Up Offer'
      ? (currentSpend / targetSpendLevelUp) * 100
      : (currentSpend / bmsmSecondThreshold) * 100

  return (
    <StyledContainer isBmsm={isBmsm} isFirstThresholdMet={isFirstThresholdMet}>
      <StyledBarBackground />
      <StyledCurrentSpend currentSpend={progressBarFill} />
    </StyledContainer>
  )
}
