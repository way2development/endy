import React, { useState } from 'react'

import dictionary from '../../dictionary.json'
import { StyledSemibold } from '../../styles/global.styled'
import { Locale } from '../../types/global-types'
import { getLocalizedAffirmPrice } from '../../utils'
import { SaleProps } from '../../Interfaces/sales'

import { CustomModal } from '../CustomModal'
import { Modal } from '../Modal'
import { Text } from '../Text'

import {
  StyledButton,
  StyledAffirmContainer,
  StyledUnderline,
  StyledAPR
} from './ProductAffirm.styled'

export interface ProductAffirmProps {
  /**Variant price */
  variantPrice: number
  /** Select Location */
  locale: Locale
  /** Modal with Affirm information */
  modal: React.ElementRef<typeof CustomModal>
  isMonthlyPayment: boolean
  isSaleOnFR: boolean
  showAPRLineBreak: boolean | undefined
  sales?: SaleProps
  qty: number
}

interface AffirmLinkProps {
  affirmLogo: string
  price: string
  locale: Locale
  isMonthly: boolean
  showAPRLineBreak: boolean | undefined
}

const AffirmLink = ({
  affirmLogo,
  price,
  locale,
  isMonthly,
  showAPRLineBreak
}: AffirmLinkProps) => {
  const localizedDictionary = dictionary[locale]
  return (
    <Text display='inline' variant='smallBody' color='gravy70'>
      {isMonthly ? (
        <>
          Or only{' '}
          <Text variant='largeBody' color='gravy'>
            <StyledSemibold>{price}/mo</StyledSemibold>
          </Text>{' '}
          with{' '}
          <StyledUnderline>
            <img src={affirmLogo} alt={localizedDictionary.affirmLearnMore} />{' '}
            financing
          </StyledUnderline>{' '}
          <StyledAPR showAPRLineBreak={showAPRLineBreak}>at 0% APR.</StyledAPR>
        </>
      ) : (
        <>
          Or use{' '}
          <StyledUnderline>
            <img src={affirmLogo} alt={localizedDictionary.affirmLearnMore} />{' '}
            to pay 4 interest-free payments
          </StyledUnderline>{' '}
          of <StyledSemibold>{price}</StyledSemibold>.
        </>
      )}
    </Text>
  )
}

export const ProductAffirm = ({
  variantPrice = 0,
  locale,
  modal,
  isMonthlyPayment,
  isSaleOnFR,
  showAPRLineBreak,
  sales,
  qty
}: ProductAffirmProps) => {
  const localizedDictionary = dictionary[locale]
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)

  const price = getLocalizedAffirmPrice(variantPrice, sales, locale, qty)

  const affirmLogo =
    'https://cdn.sanity.io/images/d0kd7r9c/production/cadb20e2292a5591f3e835dd8908864f2d376cc1-40x16.svg'

  const screenReaderText =
    locale === 'fr'
      ? `Option de crédit`
      : `Or ${price} monthly with affirm financing. ${localizedDictionary.affirmLearnMore}`

  return (
    <StyledAffirmContainer
      isAffirmAvailable={locale === 'en'}
      showAPRLineBreak={showAPRLineBreak}
    >
      {modal && (
        <Modal showModal={showModal} onClose={closeModal} locale={locale}>
          {React.cloneElement(modal, { onButtonClick: closeModal, locale })}
        </Modal>
      )}
      {isMonthlyPayment && (
        <StyledButton
          aria-label={screenReaderText}
          onClick={() => {
            setShowModal(true)
          }}
          isSaleOnFR={isSaleOnFR}
        >
          {locale === 'fr' ? (
            <StyledUnderline>{'*Option de crédit'}</StyledUnderline>
          ) : (
            <AffirmLink
              affirmLogo={affirmLogo}
              price={price}
              locale={locale}
              isMonthly={isMonthlyPayment}
              showAPRLineBreak={showAPRLineBreak}
            />
          )}
        </StyledButton>
      )}
    </StyledAffirmContainer>
  )
}
