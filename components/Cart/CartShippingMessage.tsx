import { useEffect, useState } from 'react'
import dictionary from '../../dictionary.json'

import { Locale } from '../../types/global-types'
import { cutOffDate } from '../ReadyToShip/utils'
import { getTimeInET, getDateDiffInSeconds } from '../../lib/time'

import { StyledSubheading } from './Cart.styled'
import { Text } from '../Text/Text'
interface CartShippingMessageProps {
  locale: Locale
  cartError: boolean
}

const CartShippingMessage = ({
  locale,
  cartError
}: CartShippingMessageProps) => {
  const [shippingMessage, setShippingMessage] = useState('')
  const [localDateTime, setLocalDateTime] = useState(new Date())
  const localizedDictionary = dictionary[locale]

  useEffect(() => {
    const id = setInterval(() => setLocalDateTime(new Date()), 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (localDateTime && !cartError) {
      const dateTimeET = getTimeInET(localDateTime)
      // With weekend fulfillment, no longer needed. Variables commented out in case anything changes.
      // const dayOfWeek = dateTimeET.getDay()
      // const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const secondsUntilCutOff =
        getDateDiffInSeconds(cutOffDate, dateTimeET) || 0
      const isBeforeCutOff = secondsUntilCutOff > 0

      if (!isBeforeCutOff) {
        return setShippingMessage(localizedDictionary.cartShippingMessageNext)
      }
      return setShippingMessage(localizedDictionary.cartShippingMessageToday)
    }
    return setShippingMessage(localizedDictionary.cartErrorShippingMessage)
  }, [localDateTime, cartError])

  return (
    <StyledSubheading>
      <Text color='gravy' variant='smallBody'>
        {shippingMessage}
      </Text>
    </StyledSubheading>
  )
}

export default CartShippingMessage
