import { useEffect, useState } from 'react'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { SaleProps } from '../../Interfaces/sales'

import {
  StyledTime,
  StyledCountdownText,
  StyledPromoPillCountdown,
  StyledTimeContainer,
  StyledLabel,
  StyledColon
} from './PromoPill.styled'
import { getDaysHoursMinutes, getDateDiffInSeconds } from '../../lib/time'

const getCountdownSubcopy = (
  text: string,
  dictionaryProp: string,
  locale: Locale
) => {
  return locale === 'fr'
    ? parseInt(text) !== 1 && dictionaryProp === 'jour'
      ? `${dictionaryProp}s`
      : dictionaryProp
    : parseInt(text) === 1
    ? dictionaryProp
    : `${dictionaryProp}s`
}

export interface PromoPillCountdownProps {
  /** Incoming sale end date from Sanity  */
  locale: Locale
  sales?: SaleProps
}

interface TimeProps {
  time: string
  dictionaryProp: string
  locale: Locale
}

const Time = ({ time, dictionaryProp, locale }: TimeProps) => {
  return (
    <StyledTime>
      <span>{time}</span>
      <StyledCountdownText
        isFrench={locale === 'fr'}
        variant={'micro'}
        color={'gravy'}
        element={'span'}
      >
        {getCountdownSubcopy(time, dictionaryProp, locale)}
      </StyledCountdownText>
    </StyledTime>
  )
}

export const PromoPillCountdown = ({
  locale,
  sales
}: PromoPillCountdownProps) => {
  const localizedDictionary = dictionary[locale]
  const [secs, setSecs] = useState(
    (sales && getDateDiffInSeconds(sales?.endDate, new Date())) || 0
  )

  // TODO: Create a custom hook for this useEffect so that it can be reused and centralized
  useEffect(() => {
    const myInterval = setInterval(() => {
      setSecs(secs - 1)
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  const { days, hours } = getDaysHoursMinutes(secs)

  return (
    <StyledPromoPillCountdown variant={'micro'} color={'gravy'} element={'div'}>
      <StyledLabel>{localizedDictionary.saleEndsIn}</StyledLabel>
      <StyledTimeContainer>
        <Time
          time={days}
          dictionaryProp={localizedDictionary.day}
          locale={locale}
        />
        <StyledColon>:</StyledColon>
        <Time
          time={hours}
          dictionaryProp={localizedDictionary.hour}
          locale={locale}
        />
      </StyledTimeContainer>
    </StyledPromoPillCountdown>
  )
}
