import { useSmsSignUp } from '../../utils/useSmsSignUp'

export const handleSmsSignup = async (
  data: any,
  setButtonMessage: (value: string) => void,
  setPhoneTooltipErrorMessage: (value: string) => void,
  errorMessage: string,
  successText: string,
  closeModal: () => void
) => {
  const isValidPhone = data.mobileNum.length === 10
  const isInterestedInSmsSignup = data.mobileNum !== ''

  // user is not interested in signing up for sms and leaves input black, close modal
  if (!isInterestedInSmsSignup) {
    setButtonMessage(successText)
    setTimeout(() => {
      closeModal()
    }, 1000)
  }

  // user is interested in signing up for sms, but has invalid phone, show them error message
  if (isInterestedInSmsSignup && !isValidPhone) {
    setPhoneTooltipErrorMessage(errorMessage)
  }

  if (isValidPhone) {
    await useSmsSignUp(data, setButtonMessage, successText, closeModal)
  }
}
