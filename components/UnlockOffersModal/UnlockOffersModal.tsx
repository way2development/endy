import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import {
  StyledCloseModalButton,
  StyledUnlockOffersModal
} from './UnlockOffersModal.styled'
import { SaleProps } from '../../Interfaces/sales'
import { FrenchUnlockOffersContent } from './FrenchUnlockOffersContent'
import { EnglishUnlockOffersContentMobile } from './EnglishUnlockOffersContentMobile'
import { EnglishUnlockOffersContentDesktop } from './EnglishUnlockOffersContentDesktop'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { updateUnlockOffersLocalStorage } from '../../utils/updateUnlockOffersLocalStorage'

interface UnlockOffersModalProps {
  locale: Locale
  isMobile: boolean
  sales?: SaleProps
  setShowUnlockOffersModal: Dispatch<SetStateAction<boolean>>
  showUnlockOffersModal: boolean
}

export const UnlockOffersModal = ({
  locale,
  isMobile,
  sales,
  setShowUnlockOffersModal,
  showUnlockOffersModal
}: UnlockOffersModalProps) => {
  const localizedDictionary = dictionary[locale]
  const isFrench = locale === 'fr'
  // const [active, setActive] = useState(false)
  const [exit, setExit] = useState(false)

  const closeModal = () => {
    updateUnlockOffersLocalStorage('isModalDismissed')
    setExit(true)
    // setActive(false)
    setTimeout(() => {
      setShowUnlockOffersModal(false)
    }, 2000)
  }

  // TODO: Removed <FocusTrap> from Unlock Offers modal, since it interfered with the Extole referal modal. Look into re-adding focus trapping as a tech debt.
  // useEffect(() => {
  //   if (showUnlockOffersModal) {
  //     // Adds a delay in setting the focus trap to 'active' to ensure a tabbable node has rendered
  //     setTimeout(() => {
  //       setActive(true)
  //     }, 2000)
  //   }
  // }, [showUnlockOffersModal])

  return (
    <StyledUnlockOffersModal exit={exit} className='sms-cta-container'>
      <StyledCloseModalButton
        onClick={() => closeModal()}
        aria-label={localizedDictionary.closeUnlockOffersModal}
        className='sms-banner-close'
      >
        <img
          src='https://cdn.sanity.io/images/d0kd7r9c/production/d23cda7673f2b16348e3bd72d5921d20fdbc3b5f-16x16.svg'
          alt=''
        />
      </StyledCloseModalButton>
      {isFrench ? (
        <FrenchUnlockOffersContent
          locale={locale}
          isMobile={isMobile}
          closeModal={closeModal}
          sales={sales}
        />
      ) : (
        <>
          {isMobile ? (
            <EnglishUnlockOffersContentMobile
              sales={sales}
              locale={locale}
              closeModal={closeModal}
              updateUnlockOffersLocalStorage={updateUnlockOffersLocalStorage}
              id='sms-mobile-banner'
            />
          ) : (
            <EnglishUnlockOffersContentDesktop
              sales={sales}
              locale={locale}
              closeModal={closeModal}
            />
          )}
        </>
      )}
    </StyledUnlockOffersModal>
  )
}

export default UnlockOffersModal
