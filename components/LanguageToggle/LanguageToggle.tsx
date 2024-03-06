import React, { useEffect } from 'react'
import {
  useLocalizedRoutes,
  useUpdateLanguageSetting,
  useLanguageSetting
} from '../../lib/context'
import { useRouter } from 'next/router'
import { Locale } from '../../types/global-types'
import { getLocalizedRouteWithQueryParams } from '../../utils/routeTranslations'
import dictionary from '../../dictionary.json'
import {
  StyledLanguageToggleButton,
  StyledVerticalLine
} from './LanguageToggle.styled'

interface LanguageToggleProps {
  locale: Locale
}

interface LanguageToggleButtonProps {
  locale: Locale
  buttonLabel: string
  isActive: boolean
  englishLabel?: string
  frenchLabel?: string
}

const LanguageToggleButton = ({
  locale,
  englishLabel,
  frenchLabel,
  buttonLabel,
  isActive
}: LanguageToggleButtonProps) => {
  const router = useRouter()
  const { pathname, query } = router
  const updateLanguageSetting = useUpdateLanguageSetting()
  const navigatorLanguage = useLanguageSetting() as null | string
  const translatedRoutes = useLocalizedRoutes()

  useEffect(() => {
    if (navigatorLanguage?.includes('en')) {
      sessionStorage.setItem(
        'siteLanguagePreference',
        JSON.stringify({ prefersEnglish: true })
      )
    }
  }, [navigatorLanguage])

  return (
    <StyledLanguageToggleButton
      onClick={() => {
        router.push(
          { pathname, query },
          locale === 'en'
            ? getLocalizedRouteWithQueryParams(
                query,
                translatedRoutes['fr_route']
              )
            : getLocalizedRouteWithQueryParams(
                query,
                translatedRoutes['en_route']
              ),
          {
            locale: locale === 'en' ? 'fr' : 'en'
          }
        ),
          updateLanguageSetting('en-ca')
      }}
      // TODO: add to dictionary once translation for FR comes in
      aria-label={
        isActive
          ? `Selected Language: ${locale === 'en' ? englishLabel : frenchLabel}`
          : ''
      }
      isActive={isActive}
    >
      {buttonLabel}
    </StyledLanguageToggleButton>
  )
}

export const LanguageToggle = ({ locale }: LanguageToggleProps) => {
  const localizedDictionary = dictionary[locale]
  const router = useRouter()

  return (
    <>
      {/* TODO: Remove once FR Blog is ready to launch */}
      {!/^\/blog/.test(router.pathname) && (
        <>
          <LanguageToggleButton
            locale={locale}
            englishLabel={localizedDictionary.englishLabel}
            buttonLabel='EN'
            isActive={locale === 'en'}
          />
          <StyledVerticalLine></StyledVerticalLine>
          <LanguageToggleButton
            locale={locale}
            frenchLabel={localizedDictionary.frenchLabel}
            buttonLabel='FR'
            isActive={locale === 'fr'}
          />
        </>
      )}
    </>
  )
}
