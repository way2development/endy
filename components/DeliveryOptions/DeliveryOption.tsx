import React from 'react'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import {
  StyledDeliveryOptionContainer,
  StyledModalButton,
  StyledDeliveryOptionMessage
} from './DeliveryOptions.styled'

interface IDeliveryOptionProps {
  locale: Locale
  message: string | React.ReactElement
  setShowShippingModal: (val: boolean) => void
  disableFreeShipping: boolean
  deliveryType: 'standard' | 'sameDay' | 'whiteGlove'
}

export const DeliveryOption = ({
  locale,
  message,
  setShowShippingModal,
  disableFreeShipping,
  deliveryType
}: IDeliveryOptionProps) => {
  const localizedDictionary = dictionary[locale]
    const imageUrl = {
      standard: 'https://cdn.sanity.io/images/d0kd7r9c/production/d5c93654da06d16f0b1e504349ab1413231ae550-28x28.svg',
      sameDay: 'https://cdn.sanity.io/images/d0kd7r9c/production/2223e0ce4bc587bbea72330a5f880f842df15f06-28x28.svg',
      whiteGlove: 'https://cdn.sanity.io/images/d0kd7r9c/production/e4dcb0578c01c7d3e7a4849fa8d450f5d7f9e3aa-28x28.svg'
    }[deliveryType]

  return (
    <StyledDeliveryOptionContainer>
      {/* TODO: Update with icon component */}
      <img
        src={imageUrl}
        alt=''
      />

      <StyledDeliveryOptionMessage color='gravy80' variant='smallBody'>
        {message}{' '}
        <StyledModalButton
          onClick={(event) => {
            event.preventDefault()
            setShowShippingModal(true)
          }}
        >
          <span className='sr-only'>
            {disableFreeShipping
              ? localizedDictionary.shippingLearn
              : localizedDictionary.freeShippingLearn}
          </span>

          {localizedDictionary.shippingOptionsLearn}
        </StyledModalButton>
      </StyledDeliveryOptionMessage>
    </StyledDeliveryOptionContainer>
  )
}
