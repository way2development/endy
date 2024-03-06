import { Locale } from '../types/global-types'
import { DateTime, Duration } from 'luxon'
import { BlogArticleCardProps } from 'Interfaces/blog'

const TIMEZONE = 'America/Toronto'

export const daysToMilliseconds = (days: number): number => {
  return days * 24 * 60 * 60 * 1000
}

export const getDateDiffInSeconds = (
  endDate: Date,
  startDate: Date
): number => {
  return (+endDate - +startDate) / 1000
}

export const getDateByTimeInET = (hour: number, minutes: number): Date =>
  DateTime.fromObject(
    { hour: hour, minute: minutes },
    { zone: TIMEZONE }
  ).toJSDate()

export const getTimeInET = (date: Date): Date =>
  DateTime.fromJSDate(date).setZone(TIMEZONE).toJSDate()

export const formatSanitySaleStartDate = (date: string): Date => {
  return DateTime.fromISO(date, { zone: TIMEZONE }).toJSDate()
}

export const formatSanitySaleEndDate = (date: string): Date => {
  return DateTime.fromISO(date, { zone: TIMEZONE })
    .plus({ hours: 3 }) // to set countdown timer: {hours: 3} is 3am, {hours: 23.9999} is 11:59:59pm
    .toJSDate()
}

const getDoubleDigitTime = (time: number): string => {
  return time > 0 ? time.toString().padStart(2, '0') : '00'
}

export interface CountdownDate {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export const getDaysHoursMinutes = (second: number): CountdownDate => {
  const duration = Duration.fromObject({ second })
    .shiftTo('seconds', 'minutes', 'hours', 'days')
    .toObject()

  const seconds = getDoubleDigitTime(Math.floor(duration.seconds || 0))
  const minutes = getDoubleDigitTime(Math.floor(duration.minutes || 0))
  const hours = getDoubleDigitTime(Math.floor(duration.hours || 0))
  const days = getDoubleDigitTime(Math.floor(duration.days || 0))

  return {
    days,
    hours,
    minutes,
    seconds
  }
}

export interface DateFormatOptions {
  weekday?: 'long' | 'narrow' | 'short'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'narrow' | 'short'
  day?: 'numeric' | '2-digit'
  timeZone?: string
}

export const getFormattedDate = (
  date: Date | string,
  options: DateFormatOptions,
  locale: Locale
) => {
  // Date picker from Sanity returns dates as strings
  const formattedDate =
    typeof date === 'string'
      ? DateTime.fromISO(date, { zone: TIMEZONE }).toJSDate()
      : date

  return new Date(formattedDate).toLocaleDateString(locale, options)
}

export const getSortedArticlesOfObj = (articles: BlogArticleCardProps[]) => {
  let sortedArticles = articles

  if (articles.length > 1) {
    sortedArticles = articles.sort((objA, objB) => {
      const updatedAtA = new Date(objA.settings.publishedAt)
      const updatedAtB = new Date(objB.settings.publishedAt)
      return updatedAtB.getTime() - updatedAtA.getTime()
    })
  }

  return sortedArticles
}
