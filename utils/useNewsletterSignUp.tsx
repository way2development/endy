import { Dispatch, SetStateAction } from 'react'
import { Locale } from '../types/global-types'
import { updateUnlockOffersLocalStorage } from './updateUnlockOffersLocalStorage'
import { googleAnalytics } from '../components/GoogleAnalytics/analytics'
import axios from 'axios'

// TODO: look into making these environment variables in vercel
export const englishNewsletterID = 'P2cxdf'
export const frenchNewsletterID = 'YAFTR8'

export const useNewsletterSignUp = async (
  data: Record<string, unknown>,
  locale: Locale,
  setTooltipErrorMessage: Dispatch<SetStateAction<string>>,
  errorMessage: string,
  setButtonMessage: Dispatch<SetStateAction<string>>,
  buttonMessageDefault: string,
  reset: () => void,
  buttonMessageSuccess?: string
) => {
  if (!data.email) {
    setTooltipErrorMessage(errorMessage)
  }

  return await axios
    .post(
      '/api/klaviyo/newsletter-join',
      {
        listID: locale === 'en' ? englishNewsletterID : frenchNewsletterID,
        ...data
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(() => {
      googleAnalytics.signupForNewsletter('Footer Newsletter')
      updateUnlockOffersLocalStorage('isEmailSubscribed')
      buttonMessageSuccess && setButtonMessage(buttonMessageSuccess)
      setTimeout(() => {
        setButtonMessage(buttonMessageDefault)
        reset()
      }, 3000)
    })
    .catch((error) => {
      console.error(error)
      throw error
    })
}
