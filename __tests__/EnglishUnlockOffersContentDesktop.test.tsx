import { render, screen, fireEvent, act } from '@testing-library/react'
import { EnglishUnlockOffersContentDesktop } from '../components/UnlockOffersModal/EnglishUnlockOffersContentDesktop'
import { LOCALE } from '../types/global-types'
import * as useNewsletterSignUp from '../utils/useNewsletterSignUp'
import * as isValidEmailCheck from '../utils/form'

const closeModal = (): void => {
  return undefined
}

describe('EnglishUnlockOffersContentDesktop Component Test', () => {
  it('should render EnglishUnlockOffersContentDesktop with correct text', () => {
    render(
      <EnglishUnlockOffersContentDesktop
        locale={LOCALE.EN}
        closeModal={closeModal}
      />
    )

    expect(screen.getByText('Get 10% Off')).toBeInTheDocument()
  })

  it('Modal should display correct button texts when user inserts correct email but no phone number', async () => {
    jest
      .spyOn(useNewsletterSignUp, 'useNewsletterSignUp')
      .mockImplementation(async () => undefined)

    jest
      .spyOn(isValidEmailCheck, 'isValidEmailCheck')
      .mockImplementation(() => true)

    const { getByText } = render(
      <EnglishUnlockOffersContentDesktop
        locale={LOCALE.EN}
        closeModal={closeModal}
      />
    )

    const continueButton = getByText('Continue')
    await act(async () => {
      fireEvent.click(continueButton)
    })

    const completeButton = getByText('Complete your signup')

    expect(completeButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(completeButton)
    })

    const ThankYouText = getByText('Thank you & stay tuned!')

    expect(ThankYouText).toBeInTheDocument()
  })
})
