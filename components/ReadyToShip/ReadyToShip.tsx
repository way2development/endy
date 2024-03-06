import React, { useState, useEffect, BaseSyntheticEvent } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { DateTime } from 'luxon'
import { getFormattedDate } from '../../lib/time'

import { theme } from '../../styles/theme'
import {
  StyledIndicator,
  StyledShippingMessage,
  StyledToggleButton,
  StyledForm,
  StyledSubmitButton,
  StyledFlexContainer
} from './ReadyToShip.styled'

import { Text } from '../Text'
import { DeliveryOptions } from '../DeliveryOptions'

import { getMessageByLocation } from './utils'
import { isValidPostalCodeCheck } from '../../utils/form'

// Tracking
import { googleAnalytics } from '../GoogleAnalytics/analytics'
export interface ReadyToShipProps {
  /** User location data return from ipregistry api  */
  userLocation?: IUserLocation
  /** Whether the product is available or out of stock  */
  isAvailable: boolean
  /** Whether the product is a preorder or not  */
  isPreorder?: boolean
  /** If product is a preorder, the associated shipping date  */
  preorderShippingDate?: string
  /** Site language  */
  locale: Locale
  /** Selected variant sku to get estimated delivery date */
  selectedSku: string
  /** Set visibility of Modal with shipping information */
  setShowShippingModal: (val: boolean) => void
  /** Selected variant ID to get estimated delivery date */
  selectedVariantId: number
  disableFreeShipping: boolean
}

export interface IUserLocation {
  city: string
  province: string
  postalFSA: string
}

const getTimeStamp = (date: string) => {
  const timeStamp = date.split('-')

  const year = parseInt(timeStamp[0])
  const month = parseInt(timeStamp[1])
  const day = parseInt(timeStamp[2])

  return new Date(DateTime.local(year, month, day).toJSDate())
}

const ReadyToShip = ({
  userLocation,
  selectedSku,
  selectedVariantId,
  isAvailable,
  isPreorder,
  preorderShippingDate,
  locale,
  setShowShippingModal,
  disableFreeShipping
}: ReadyToShipProps) => {
  const localizedDictionary = dictionary[locale]

  const [localDateTime, setLocalDateTime] = useState(new Date())

  const [isBeforeCutOff, setIsBeforeCutOff] = useState(true)
  const [isStandardAvailable, setIsStandardAvailable] = useState(false)
  const [isSameDayAvailable, setIsSameDayAvailable] = useState(false)
  const [isNonPreorderAvailable, setIsNonPreorderAvailable] = useState(false);
  const [isWhiteGloveAvailable, setIsWhiteGloveAvailable] = useState(false)
  const [postalFSA, setPostalFSA] = useState('')

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [showPostalCodeForm, setShowPostalCodeForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState<string | React.ReactElement>('')
  const [sameDayMessage, setSameDayMessage] =
    useState<string | React.ReactElement>('')

  // Update the date every second so the countdown live updates
  useEffect(() => {
    if (isBeforeCutOff) {
      const id = setInterval(() => setLocalDateTime(new Date()), 1000)
      return () => {
        clearInterval(id)
      }
    }
  }, [isBeforeCutOff])

  const fetchEstimatedDelivery = async (sku: string, postalFSA: string) => {
    if (!postalFSA) return setIsError(true)

    // Always set the new postal code if it's provided.
    setPostalFSA(postalFSA)

    try {
      const {
        data: { estimated_delivery, error }
      } = await axios.post(
        'https://endysleep-listener-production.herokuapp.com/shopify/api/estimated_deliveries/',
        {
          estimated_delivery: {
            postal_code: postalFSA,
            locale: locale,
            variant: {
              variant_id: selectedVariantId,
              sku: sku
            }
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const deliveryDateTimeStamp = getTimeStamp(`${estimated_delivery.date}`)

      const formattedDeliveryDate = getFormattedDate(
        deliveryDateTimeStamp,
        {
          weekday: 'long',
          month: locale === 'fr' ? 'long' : 'short',
          day: 'numeric'
        },
        locale
      )

      setIsBeforeCutOff(estimated_delivery.before_cutoff)
      setIsStandardAvailable(estimated_delivery.standard_available)
      setIsSameDayAvailable(estimated_delivery.same_day_available)
      setIsWhiteGloveAvailable(estimated_delivery.white_glove_available)

      // If product is preorder, show preorder messaging
      if (isPreorder && preorderShippingDate) {
        const shippingDate = getFormattedDate(
          preorderShippingDate,
          { month: 'long', day: 'numeric' },
          locale
        )
        setMessage(`${dictionary[locale].rtsPreorderMessage} ${shippingDate}†`)
      } else {
        getMessageByLocation(
          estimated_delivery.before_cutoff,
          false,
          formattedDeliveryDate,
          localDateTime,
          setMessage,
          locale,
          disableFreeShipping
        )

        getMessageByLocation(
          estimated_delivery.same_day_available,
          true,
          localizedDictionary['today'],
          localDateTime,
          setSameDayMessage,
          locale,
          disableFreeShipping
        )
      }

      setShowPostalCodeForm(false)
      setIsError(false)
    } catch (error) {
      if (error.response) {
        setShowPostalCodeForm(false)
        setMessage(error.response.data.error)
        setIsError(false)
      } else {
        console.error(error)
        setIsError(true)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (userLocation?.postalFSA) {
      setPostalFSA(userLocation?.postalFSA)
    }
  }, [userLocation?.postalFSA])

  useEffect(() => {
    // If the product is unavailable, always show the out of stock message
    if (!isAvailable) {
      if (locale !== 'en') {
        return setMessage(dictionary[locale].rtsOutOfStockMessage)
      }
      return setMessage(dictionary[locale].rtsOutOfStockMessage)
    }

    if (isAvailable && postalFSA) {
      fetchEstimatedDelivery(selectedSku, postalFSA)
    } else {
      toggleForm()
    }
  }, [selectedSku, postalFSA])
  
  useEffect(() => {
      setIsNonPreorderAvailable(!isPreorder && isAvailable);
      }, [isPreorder, isAvailable]);

  const onSubmit = (
    data: Record<string, string>,
    e: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault()

    const formattedInputValue = data?.postalCode
      .toUpperCase()
      .replace(/\s/g, '')

    const isValidPostalCode = isValidPostalCodeCheck(formattedInputValue)

    const postalCodeFSA = formattedInputValue.substring(0, 3)

    if (isValidPostalCode) {
      fetchEstimatedDelivery(selectedSku, postalCodeFSA)
      toggleForm()
    } else {
      setErrorMessage(localizedDictionary.enterValidPostalCode)
    }

    googleAnalytics.updateEstimatedDelivery('update_edd', postalCodeFSA)
  }

  const { handleSubmit, register } = useForm({
    shouldUseNativeValidation: false
  })

  const postalCode = register('postalCode')

  const toggleForm = () => {
    setErrorMessage('')
    setShowPostalCodeForm(!showPostalCodeForm)
  }

  return (
    <StyledShippingMessage>
      {!isLoading && (
        <>
          {!showPostalCodeForm && (
            <div>
              <StyledIndicator
                color={
                  isNonPreorderAvailable
                    ? theme.colors.successGreen
                    : theme.colors.errorRed
                }
              ></StyledIndicator>
              {disableFreeShipping ? (
                <Text color={'gravy70'} variant={'smallBody'} element={'span'}>
                  {isNonPreorderAvailable
                    ? localizedDictionary.inStockPaidDeliveryOptionsFor
                    : localizedDictionary.outOfStockPaidDeliveryOptionsFor}{' '}
                  <strong>{postalFSA}</strong> |{' '}
                </Text>
              ) : (
                <Text color={'gravy70'} variant={'smallBody'} element={'span'}>
                  {isNonPreorderAvailable
                    ? localizedDictionary.inStockFreeDeliveryOptionsFor
                    : localizedDictionary.outOfStockFreeDeliveryOptionsFor}{' '}
                  <strong>{postalFSA}</strong> |{' '}
                </Text>
              )}
              <StyledToggleButton
                onClick={() => toggleForm()}
                aria-label={`${localizedDictionary.change} ${localizedDictionary.postalCode}`}
              >
                {localizedDictionary.change}
              </StyledToggleButton>
            </div>
          )}
          {showPostalCodeForm && (
            <StyledForm
              onSubmit={handleSubmit((...params) => onSubmit(...params))}
            >
              <legend>
                <div>
                  <Text
                    color={'gravy70'}
                    variant={'smallBody'}
                    element={'span'}
                  >
                    <label htmlFor='postalCodeInput'>
                      {localizedDictionary.enterPostalCodeToSeeDeliveryOptions}
                    </label>
                  </Text>
                  <StyledToggleButton onClick={() => toggleForm()}>
                    {localizedDictionary.cancel}
                  </StyledToggleButton>
                </div>
              </legend>
              <StyledFlexContainer>
                <input
                  type='text'
                  inputMode='text'
                  {...postalCode}
                  id='postalCodeInput'
                  onChange={() => {
                    if (errorMessage) {
                      setErrorMessage('')
                    }
                  }}
                />
                <StyledSubmitButton variant='solid-gravy' type='submit'>
                  {localizedDictionary.update}
                </StyledSubmitButton>
              </StyledFlexContainer>
              <Text variant={'smallBody'} color={'errorRed'}>
                {errorMessage}
              </Text>
            </StyledForm>
          )}

          {!showPostalCodeForm && (
            <DeliveryOptions
              locale={locale}
              isStandardAvailable={isStandardAvailable}
              isSameDayAvailable={isSameDayAvailable}
              isWhiteGloveAvailable={isWhiteGloveAvailable}
              isError={isError}
              message={message}
              sameDayMessage={sameDayMessage}
              errorMessage={localizedDictionary.deliveryOptionsUnavailable}
              setShowShippingModal={setShowShippingModal}
              disableFreeShipping={disableFreeShipping}
            />
          )}
        </>
      )}
    </StyledShippingMessage>
  )
}

export default ReadyToShip
