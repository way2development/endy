// This is a Sanity only component! It is necessary for Modals to be added to Rich Text
import React, { useState } from 'react';
import { Button } from '../Button'
import { TextModal } from '../TextModal'
import { Modal } from '../Modal'
import { Locale } from '../../types/global-types'
import { CustomModal } from '../CustomModal';


interface ModalInlineButtonProps {
  modal: React.ElementRef<typeof TextModal | typeof CustomModal>
  label: string
  locale: Locale
}

export const ModalInlineButton = ({
  modal,
  label,
  locale
}: ModalInlineButtonProps) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  return (
    <>
      <Modal showModal={showModal} onClose={closeModal} locale={locale}>
        {React.cloneElement(modal, { onButtonClick: closeModal })}
      </Modal>
      <Button variant='inline' label={label} onClick={() => setShowModal(true)}/>
    </>
  )
}
