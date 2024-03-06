import { SaleProps } from '../../Interfaces/sales'
import { Button } from '../Button/Button'
import {
  StyledSubcopy,
  StyledHeading,
  StyledMicrocopy,
  StyledModal,
  StyledModalContainer,
  StyledBackgroundImage,
  StyledClose
} from './ExitModal.styled'
import { PromoPill } from '../PromoPill'
import { BackgroundImageProps } from '../BackgroundImage'
import { getSaleTextVariantColor, getSaleTextHexColor } from '../../utils'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

export interface ExitModalProps {
  heading: string
  subcopy: string
  buttonLabel: string
  pillLabel?: string
  onButtonClick: () => void
  backgroundImage: BackgroundImageProps
  sales: SaleProps
  locale: Locale
  bgColor?: { hex: string }
}

const closeIconGravy =
  'https://cdn.sanity.io/images/d0kd7r9c/production/7c498bc282aed9b4c6685490068af6f2cc4c2e56-48x48.svg'
const closeIconWhite =
  'https://cdn.sanity.io/images/d0kd7r9c/production/ce98a85bfe1ae0c354578d5351f0c1823f258fbd-32x32.svg'

export const ExitModal = ({
  heading,
  subcopy,
  buttonLabel,
  pillLabel,
  onButtonClick,
  backgroundImage,
  sales,
  locale,
  bgColor
}: ExitModalProps) => {
  const localizedDictionary = dictionary[locale]
  const themeColor = sales?.themeColor

  const closeIcon = (themeColor: string | undefined) => {
    if (!themeColor) return closeIconGravy
    if (
      themeColor === '#243746' ||
      themeColor === '#c40058' ||
      themeColor === '#596f8c'
    ) {
      return closeIconWhite
    } else {
      return closeIconGravy
    }
  }
  return (
    <StyledModalContainer>
      <StyledBackgroundImage
        srcHeights={[800, 800, 800]}
        srcWidths={[400, 400, 400]}
        mobileImage={backgroundImage?.mobileImage}
        tabletImage={backgroundImage?.tabletImage}
        desktopImage={backgroundImage?.desktopImage}
      />
      <StyledModal bgColor={bgColor}>
        <StyledClose
          onClick={onButtonClick}
          aria-label={dictionary[locale].closeModal}
        >
          <img src={closeIcon(themeColor)} alt='' />
        </StyledClose>
        <PromoPill
          promoCopy={pillLabel}
          variant={getSaleTextVariantColor(sales?.themeColor)}
          locale={locale}
        />
        <StyledHeading
          color={getSaleTextVariantColor(sales?.themeColor)}
          variant={'h3'}
          borderColor={getSaleTextHexColor(sales?.themeColor)}
        >
          {heading}
        </StyledHeading>
        <StyledSubcopy
          color={getSaleTextVariantColor(sales?.themeColor)}
          variant='mediumBody'
        >
          {subcopy}
        </StyledSubcopy>
        <Button
          label={buttonLabel}
          variant='solid-rubine'
          onClick={onButtonClick}
          className='ExitPopupCTA'
        />
        {sales && (
          <StyledMicrocopy
            color={getSaleTextVariantColor(sales?.themeColor)}
            variant={'micro'}
          >
            {localizedDictionary.termsApply}
          </StyledMicrocopy>
        )}
      </StyledModal>
    </StyledModalContainer>
  )
}
