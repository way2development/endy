import { useEffect, useState } from 'react'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import {
  StyledSaleCountdownTimer,
  StyledTime,
  StyledCountdownText,
  StyledColon,
  StyledLabel,
  StyledTimeContainer
} from './SaleCountdownTimer.styled'
import { getDaysHoursMinutes, getDateDiffInSeconds } from '../../lib/time'
import { SaleProps } from '../../Interfaces/sales'
import { getTextHexColor } from '../../utils/getSaleTextColor'

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

interface SaleCountdownTimerProps {
  /** Copy that appears before the countdown timer  */
  heading: string
  sales: SaleProps
  locale: Locale
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
      <StyledCountdownText isFrench={locale === 'fr'}>
        {getCountdownSubcopy(time, dictionaryProp, locale)}
      </StyledCountdownText>
    </StyledTime>
  )
}

export const SaleCountdownTimer = ({
  heading,
  sales,
  locale
}: SaleCountdownTimerProps) => {
  const localizedDictionary = dictionary[locale]
  const [secs, setSecs] = useState(
    getDateDiffInSeconds(sales?.endDate, new Date()) || 0
  )

  useEffect(() => {
    const myInterval = setInterval(() => {
      setSecs((secs) => secs - 1)
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [secs])

  const { days, hours, minutes, seconds } = getDaysHoursMinutes(secs)

  return (
    <StyledSaleCountdownTimer
      variant={'h2'}
      color={sales?.textColor}
      element={'div'}
    >
      <StyledLabel borderColor={getTextHexColor(sales?.textColor, 30)}>
        {heading}
      </StyledLabel>
      <StyledTimeContainer borderColor={getTextHexColor(sales?.textColor, 30)}>
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
        <StyledColon>:</StyledColon>
        <Time
          time={seconds}
          dictionaryProp={localizedDictionary.second}
          locale={locale}
        />
      </StyledTimeContainer>
    </StyledSaleCountdownTimer>
  )
}
