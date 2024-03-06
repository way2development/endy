import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { ColorVariant, VariantProps } from '../ShopModule/ShopModule.types'

import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

import { Swatches } from '../ShopModule/Swatches'

import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { StyledVisuallyHidden } from '../../styles/global.styled'

export const StyledSwatchesContainer = styled.div`
  background-color: ${theme.colors.white}80;
  padding: ${theme.spacing.xxs} ${theme.spacing.xs};
  width: 100%;
`
interface ColorSelectorDropdownProps {
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
  isExpanded: boolean
  productSlug: string
}

export const ColorSelectorDropdown = ({
  selectedColorId,
  selectedSizeId,
  colorVariants,
  handleSelect,
  productVariants,
  locale,
  hidePopularBadge = false,
  isDropdown = false,
  isExpanded,
  productSlug
}: ColorSelectorDropdownProps) => {
  const localizedDictionary = dictionary[locale]
  const prefersReducedMotion = usePrefersReducedMotion()

  const motionVariants = {
    enter: {
      opacity: 1,
      y: 0,
      display: 'block'
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.3
      },
      transitionEnd: {
        display: 'none'
      }
    }
  }

  const animateProps = {
    initial: 'exit',
    animate: 'enter',
    exit: 'exit',
    transition: { easeIn: [0.17, 0.67, 0.83, 0.67] }
  }

  const motionProps = !prefersReducedMotion ? animateProps : {}

  return (
    <>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div {...motionProps} variants={motionVariants}>
            <StyledVisuallyHidden>
              {localizedDictionary.chooseYourColor}
            </StyledVisuallyHidden>
            <StyledSwatchesContainer>
              <Swatches
                handleSelect={handleSelect}
                selectedSizeId={selectedSizeId}
                selectedColorId={selectedColorId}
                colorVariants={colorVariants}
                productVariants={productVariants}
                locale={locale}
                hidePopularBadge={hidePopularBadge}
                isDropdown={isDropdown}
                productSlug={productSlug}
              />
            </StyledSwatchesContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
