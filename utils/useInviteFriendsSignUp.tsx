import { Dispatch, SetStateAction } from 'react'
import { Locale } from '../types/global-types'

// TODO: look into making these environment variables in vercel
export const englishInviteFriendsID = 'WfymM9'
export const frenchInviteFriendsID = 'UriQnr'

export const useInviteFriendsSignUp = (
  data: Record<string, unknown>,
  locale: Locale,
  setButtonMessage: Dispatch<SetStateAction<string>>,
  buttonMessageDefault: string,
  buttonMessageSuccess: string,
  reset: () => void
) => {
  // TODO: consider using ES2017/ES8 async/await
  // TODO: consider refactoring to axios implementation
  fetch('/api/klaviyo/invite-friends', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      listID: locale === 'en' ? englishInviteFriendsID : frenchInviteFriendsID,
      ...data
    })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Fetch error: ${res.statusText}`)
      }
      return res
    })
    .then((res) => res.json())
    .then(() => {
      setButtonMessage(buttonMessageSuccess)
      setTimeout(() => {
        setButtonMessage(buttonMessageDefault)
        reset()
      }, 3000)
    })
    .catch((error) => {
      console.error(error)
    })
}
