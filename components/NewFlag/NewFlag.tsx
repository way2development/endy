import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { Text } from '../Text'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { StyledSemiboldUpper } from '../../styles/global.styled'

const StyledFlag = styled(Text)<{ isOnShopModule: boolean }>`
  ${({ isOnShopModule }) =>
    isOnShopModule
      ? `  color: ${theme.colors.gravy};
  display: block;
  letter-spacing: ${theme.letterSpacing.s};
  font-size: var(--font-size-micro);
  font-family: ${theme.fonts.calibre};
  font-weight: ${theme.fontWeights.semibold};
  line-height: normal;
  text-transform: uppercase;
  background-color: 'initial';
  border: 1px solid ${theme.colors.gravy};
  border-radius: 12.5px;
  width: fit-content;
  margin-bottom: 1rem;
  padding: 5px 10px;
  
  `
      : `background-color: ${theme.colors.darkBlue};
  letter-spacing: ${theme.letterSpacing.s};
  padding: ${theme.spacing.xxs} ${theme.spacing.xs};
  border-radius: ${theme.borders.borderRadius};
  margin-left: ${theme.spacing.xs};
  vertical-align: middle;`}
`

interface NewFlagProps {
  /** Selected Location */
  locale: Locale
  /** Determines if new flag should be displayed or not */
  isNewProduct: boolean
  isOnShopModule?: boolean
}

export const NewFlag = ({
  locale,
  isNewProduct,
  isOnShopModule = false
}: NewFlagProps) => {
  return (
    <>
      {isNewProduct && (
        <StyledFlag
          color={'white'}
          display='inline'
          variant='micro'
          isOnShopModule={isOnShopModule}
        >
          <StyledSemiboldUpper>
            {isOnShopModule
              ? dictionary[locale].newProduct
              : dictionary[locale].new}
          </StyledSemiboldUpper>
        </StyledFlag>
      )}
    </>
  )
}
