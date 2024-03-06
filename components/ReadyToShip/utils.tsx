import { Dispatch, SetStateAction } from 'react'

import {
  getTimeInET,
  getDateByTimeInET,
  getDateDiffInSeconds,
  getDaysHoursMinutes,
  CountdownDate
} from '../../lib/time'

import { Locale } from '../../types/global-types'

import { StyledEstimatedDeliveryDate } from './ReadyToShip.styled'

// All Shipping logic uses ET but arrival date is displayed in user's local time

// Standard Delivery cut-off
const CUTOFF_HOUR = 13
const CUTOFF_MINUTES = 45

// Same-Day Delivery cut-off
const SAME_DAY_CUT_OFF_HOUR = 10
const SAME_DAY_CUT_OFF_MINUTES = 30

export const cutOffDate = getDateByTimeInET(CUTOFF_HOUR, CUTOFF_MINUTES)
export const sameDayCutOffDate = getDateByTimeInET(
  SAME_DAY_CUT_OFF_HOUR,
  SAME_DAY_CUT_OFF_MINUTES
)

export const getMessageByLocation = (
  isBeforeCutOff: boolean,
  isSameDayDelivery: boolean,
  estimatedDeliveryDate: string,
  localDateTime: Date,
  setMessage: Dispatch<SetStateAction<string | React.ReactElement>>,
  locale: Locale,
  disableFreeShipping: boolean
) => {
  // Convert user's local time to ET to calculate shipping time
  const dateTimeET = getTimeInET(localDateTime)
  const cutOffMoment = isSameDayDelivery ? sameDayCutOffDate : cutOffDate
  const secondsUntilCutOff = getDateDiffInSeconds(cutOffMoment, dateTimeET) || 0
  const formattedCutOffTime = getDaysHoursMinutes(secondsUntilCutOff)

  const localizedShippingMessage =
    locale === 'fr'
      ? getShippingMessageInFrench(
          isBeforeCutOff,
          isSameDayDelivery,
          estimatedDeliveryDate,
          formattedCutOffTime,
          disableFreeShipping
        )
      : getShippingMessageInEnglish(
          isBeforeCutOff,
          isSameDayDelivery,
          estimatedDeliveryDate,
          formattedCutOffTime,
          disableFreeShipping
        )

  setMessage(localizedShippingMessage)
}

// TODO: Confirm shipping message copy for English and French
const getShippingMessageInEnglish = (
  isBeforeCutOff: boolean,
  isSameDayDelivery: boolean,
  estimatedDeliveryDate: string,
  formattedCutOffTime: CountdownDate,
  disableFreeShipping: boolean
) => {
  let sameDayDeliveryMessage = ''
  let comingDayDeliveryMessage = ''

  // determines if 'free' verbiage should be included in sameDayDeliveryMessage
  // Same day shipping is only free during certain promotions and should not be linked
  // to the disableFreeShipping boolean as coming day shipping is often free when same day is not
  sameDayDeliveryMessage = 'and get it '

  // determines if 'free' verbiage should be included in comingDayDeliveryMessage
  disableFreeShipping
    ? (comingDayDeliveryMessage = 'for delivery ')
    : (comingDayDeliveryMessage = 'for FREE delivery ')

  if (isBeforeCutOff) {
    return (
      <>
        Order within{' '}
        <strong>
          {formattedCutOffTime.hours}&nbsp;h&nbsp;
          {formattedCutOffTime.minutes}
          &nbsp;mins
        </strong>{' '}
        {isSameDayDelivery ? sameDayDeliveryMessage : comingDayDeliveryMessage}
        <StyledEstimatedDeliveryDate>
          {estimatedDeliveryDate}
        </StyledEstimatedDeliveryDate>
        .
      </>
    )
  } else {
    return (
      <>
        {disableFreeShipping
          ? 'Order now for delivery by'
          : 'Order now for FREE delivery by'}{' '}
        <StyledEstimatedDeliveryDate>
          {estimatedDeliveryDate}
        </StyledEstimatedDeliveryDate>
        .
      </>
    )
  }
}

const getShippingMessageInFrench = (
  isBeforeCutOff: boolean,
  isSameDayDelivery: boolean,
  estimatedDeliveryDate: string,
  formattedCutOffTime: CountdownDate,
  disableFreeShipping: boolean
) => {
  if (isBeforeCutOff) {
    let sameDayDeliveryMessage = ''
    let comingDayDeliveryMessage = ''

    // determines if 'free' verbiage should be included in sameDayDeliveryMessage
    disableFreeShipping
      ? (sameDayDeliveryMessage = 'pour profiter de la livraison aujourd’hui, ')
      : (sameDayDeliveryMessage =
          'pour profiter de la livraison gratuite aujourd’hui, ')

    // determines if 'free' verbiage should be included in comingDayDeliveryMessage
    disableFreeShipping
      ? (comingDayDeliveryMessage = 'pour une livraison ')
      : (comingDayDeliveryMessage = 'pour une livraison gratuite ')

    return (
      <>
        Commandez d’ici{' '}
        <strong>
          {' '}
          {formattedCutOffTime.hours}&nbsp;h {formattedCutOffTime.minutes}
          &nbsp;min
        </strong>{' '}
        {isSameDayDelivery ? sameDayDeliveryMessage : comingDayDeliveryMessage}
        <StyledEstimatedDeliveryDate>
          {estimatedDeliveryDate}
        </StyledEstimatedDeliveryDate>
        En savoir plus sur nos options de livraison.
      </>
    )
  } else {
    return (
      <>
        {disableFreeShipping
          ? 'Commandez maintenant pour une livraison le'
          : 'Commandez maintenant pour une livraison gratuite le'}{' '}
        <StyledEstimatedDeliveryDate>
          {estimatedDeliveryDate}
        </StyledEstimatedDeliveryDate>
        .
      </>
    )
  }
}
