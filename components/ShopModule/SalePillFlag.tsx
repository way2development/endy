import {
  StyledSalePillFlagContainer,
  StyledSalePillFlag
} from './ShopModule.styled'
import { getSaleTextVariantColor } from '../../utils'
interface SalePillFlagProps {
  saleType?: string
  secondarySaleType?: string
  saleColor?: string
  microcopy?: string
  secondaryMicroCopy?: string
  isSecondarySaleProduct?: boolean
}

export const SalePillFlag = ({
  saleType,
  secondarySaleType,
  saleColor = '#FFF',
  microcopy,
  secondaryMicroCopy,
  isSecondarySaleProduct
}: SalePillFlagProps) => {
  const showSalePillFlag =
    saleType === 'Percentage' ||
    saleType === 'Fixed Amount' ||
    saleType === 'Buy X Get Y' ||
    saleType === 'Everything Off' ||
    saleType === 'Percentage' ||
    secondarySaleType === 'Percentage' ||
    secondarySaleType === 'Fixed Amount'

  return (
    <>
      {showSalePillFlag && (
        <StyledSalePillFlagContainer>
          <StyledSalePillFlag
            saleColor={saleColor}
            color={getSaleTextVariantColor(saleColor)}
            variant={'mediumBody'}
            display='inline'
          >
            {isSecondarySaleProduct ? secondaryMicroCopy : microcopy}
          </StyledSalePillFlag>
        </StyledSalePillFlagContainer>
      )}
    </>
  )
}
