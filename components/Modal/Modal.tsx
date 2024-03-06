import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import { StyledDialogContentText, StyledClose } from './Modal.styled'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

interface ModalProps {
  showModal: boolean
  children: JSX.Element | JSX.Element[]
  onClose: () => void
  locale: Locale
  isExitModal?: boolean
  isPhotoGridModal?: boolean
}

export const Modal = ({
  children,
  showModal,
  onClose,
  locale,
  isExitModal,
  isPhotoGridModal
}: ModalProps) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const closeIcon = isPhotoGridModal
    ? 'https://cdn.sanity.io/images/d0kd7r9c/production/feff4dcd2b5ded81da0ec94c7da05a1386bcef6b-32x33.svg'
    : 'https://cdn.sanity.io/images/d0kd7r9c/production/7c498bc282aed9b4c6685490068af6f2cc4c2e56-48x48.svg'

  return (
    <Dialog
      onClose={onClose}
      open={showModal}
      scroll={'body'}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      maxWidth={'xl'}
    >
      <StyledDialogContentText>
        {/* TODO: Update the close icon to the Icon component when ready */}
        <StyledClose
          onClick={onClose}
          aria-label={dictionary[locale].closeModal}
          isExitModal={isExitModal}
        >
          <img src={closeIcon} alt='' />
        </StyledClose>

        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          {children}
        </DialogContentText>
      </StyledDialogContentText>
    </Dialog>
  )
}
