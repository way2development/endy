import { Dispatch, SetStateAction } from 'react'
import { updateUnlockOffersLocalStorage } from './updateUnlockOffersLocalStorage'

export const useSmsSignUp = async (
  data: Record<string, unknown>,
  setButtonMessage: Dispatch<SetStateAction<string>>,
  successMessage: string,
  closeModal?: () => void
) => {
  try {
    const response = await fetch('/api/klaviyo/sms-signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        mobileNum: `+1${data.mobileNum}`,
        email: data.email
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    if (response.status === 200 || data.email) {
      updateUnlockOffersLocalStorage('isPhoneSubscribed')
      setButtonMessage(successMessage)
    }

    setTimeout(() => {
      closeModal && closeModal()
    }, 1000)
  } catch (err) {
    console.log(err)
  }
}
