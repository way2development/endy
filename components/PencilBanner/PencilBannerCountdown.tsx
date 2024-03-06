import { useEffect, useState } from 'react'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { SaleProps } from '../../Interfaces/sales'

import {
  StyledTime,
  StyledCountdownText,
  StyledPencilBannerCountdown,
  StyledTimeContainer,
  StyledLabel,
  StyledColon
} from './PencilBanner.styled'
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

export interface PencilBannerCountdownProps {
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
        variant={'smallBody'}
        color={'white'}
        element={'span'}
      >
        {getCountdownSubcopy(time, dictionaryProp, locale)}
      </StyledCountdownText>
    </StyledTime>
  )
}

export const PencilBannerCountdown = ({
  locale,
  sales
}: PencilBannerCountdownProps) => {
  const localizedDictionary = dictionary[locale]
  const [secs, setSecs] = useState(
    (sales && getDateDiffInSeconds(sales?.endDate, new Date())) || 0
  )
  const saleDisplayName =
    sales?.lastChance?.pencilBannerMessage?.pencilBannerSaleName?.toUpperCase()

  useEffect(() => {
    const myInterval = setInterval(() => {
      setSecs(secs - 1)
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  const { days, hours, minutes, seconds } = getDaysHoursMinutes(secs)

  return (
    <StyledPencilBannerCountdown
      variant={'smallBody'}
      color={'white'}
      element={'div'}
    >
      <StyledLabel>{saleDisplayName}</StyledLabel>
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
        <StyledColon>:</StyledColon>
        <Time
          time={minutes}
          dictionaryProp={localizedDictionary.minute}
          locale={locale}
        />
        {/* TODO:  Fix latency issues with seconds not matching the seconds in the hero countdown*/}
        {/* <StyledColon>:</StyledColon>
        <Time time={seconds} dictionaryProp={localizedDictionary.second} /> */}
      </StyledTimeContainer>
    </StyledPencilBannerCountdown>
  )
}
