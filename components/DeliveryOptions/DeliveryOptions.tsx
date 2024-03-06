import React from 'react'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { DeliveryOption } from './DeliveryOption'
import { Tabs, TabList, Tab, TabPanel } from '../Tabs'

import { StyledDeliveryOptionsContainer } from './DeliveryOptions.styled'

interface IDeliveryOptionsProp {
  isStandardAvailable: boolean
  isSameDayAvailable: boolean
  isWhiteGloveAvailable: boolean
  isError: boolean
  locale: Locale
  message: string | React.ReactElement
  sameDayMessage: string | React.ReactElement
  errorMessage: string | React.ReactElement
  setShowShippingModal: (val: boolean) => void
  disableFreeShipping: boolean
}

export const DeliveryOptions = ({
  isStandardAvailable,
  isSameDayAvailable,
  isWhiteGloveAvailable,
  isError,
  message,
  sameDayMessage,
  errorMessage,
  locale,
  setShowShippingModal,
  disableFreeShipping
}: IDeliveryOptionsProp) => {
  const localizedDictionary = dictionary[locale]

  if (isError) {
    return (
      <StyledDeliveryOptionsContainer>
        <DeliveryOption
          locale={locale}
          message={errorMessage}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='standard'
        />
      </StyledDeliveryOptionsContainer>
    )
  }

  if (!isSameDayAvailable && !isWhiteGloveAvailable) {
    // Only show the standard delivery when same day delivery isn't available.
    return (
      <StyledDeliveryOptionsContainer>
        <DeliveryOption
          locale={locale}
          message={message}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='standard'
        />
      </StyledDeliveryOptionsContainer>
    )
  }

  if (isStandardAvailable && !isSameDayAvailable && isWhiteGloveAvailable) {
    return (
    <Tabs initialActiveTab='standard-delivery'>
      <TabList>
        <Tab id='standard-delivery'>
          {disableFreeShipping
            ? localizedDictionary['shipping']
            : localizedDictionary['freeShipping']}
        </Tab>
        <Tab id='white-glove-delivery'>
          {localizedDictionary['whiteGloveDelivery']}
        </Tab>
      </TabList>

      <TabPanel id='standard-delivery'>
        <DeliveryOption
          locale={locale}
          message={message}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='standard'
        />
      </TabPanel>

      <TabPanel id='white-glove-delivery'>
        <DeliveryOption
          locale={locale}
          message={localizedDictionary['whiteGloveMessage']}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='whiteGlove'
        />
      </TabPanel>
    </Tabs>
    )
  }

  if (!isStandardAvailable && !isSameDayAvailable && isWhiteGloveAvailable) {
    return (
    <Tabs initialActiveTab='white-glove-delivery'>
      <TabList>
        <Tab id='white-glove-delivery'>
          {localizedDictionary['whiteGloveDelivery']}
        </Tab>
      </TabList>

      <TabPanel id='white-glove-delivery'>
        <DeliveryOption
          locale={locale}
          message={localizedDictionary['whiteGloveOnlyMessage']}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='whiteGlove'
        />
      </TabPanel>
    </Tabs>
    )
  }


  if (isSameDayAvailable && !isWhiteGloveAvailable) {
    return (
    <Tabs initialActiveTab='standard-delivery'>
      <TabList>
        <Tab id='standard-delivery'>
          {disableFreeShipping
            ? localizedDictionary['shipping']
            : localizedDictionary['freeShipping']}
        </Tab>
        <Tab id='same-day-delivery'>
          {localizedDictionary['sameDayDelivery']}
        </Tab>
      </TabList>

      <TabPanel id='standard-delivery'>
        <DeliveryOption
          locale={locale}
          message={message}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='standard'
        />
      </TabPanel>

      <TabPanel id='same-day-delivery'>
        <DeliveryOption
          locale={locale}
          message={sameDayMessage}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='sameDay'
        />
      </TabPanel>
    </Tabs>
        )
  }

  return (
    <Tabs initialActiveTab='standard-delivery'>
      <TabList>
        <Tab id='standard-delivery'>
          {disableFreeShipping
            ? localizedDictionary['shipping']
            : localizedDictionary['freeShipping']}
        </Tab>
        <Tab id='same-day-delivery'>
          {localizedDictionary['sameDayDelivery']}
        </Tab>
        <Tab id='white-glove-delivery'>
          {localizedDictionary['whiteGloveDelivery']}
        </Tab>
      </TabList>

      <TabPanel id='standard-delivery'>
        <DeliveryOption
          locale={locale}
          message={message}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='standard'
        />
      </TabPanel>

      <TabPanel id='same-day-delivery'>
        <DeliveryOption
          locale={locale}
          message={sameDayMessage}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='sameDay'
        />
      </TabPanel>

      <TabPanel id='white-glove-delivery'>
        <DeliveryOption
          locale={locale}
          message={localizedDictionary['whiteGloveMessage']}
          setShowShippingModal={setShowShippingModal}
          disableFreeShipping={disableFreeShipping}
          deliveryType='whiteGlove'
        />
      </TabPanel>
    </Tabs>
  )
}
