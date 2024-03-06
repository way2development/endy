import { useState } from 'react'
import { Locale } from '../../types/global-types'
import { Review, ReviewProps } from '../CustomerReviews/Review'
import { Modal } from '../Modal'
import {
  StyledGrid,
  StyledImg,
  StyledReviewContentContainer,
  StyledButton,
  StyledModalContainer
} from './PhotoGrid.styled'

interface PhotoGridProps {
  imgUrls: string[]
  review: ReviewProps
  locale: Locale
}

export const PhotoGrid = ({ imgUrls, review, locale }: PhotoGridProps) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <Modal
        showModal={showModal}
        onClose={closeModal}
        locale={locale}
        isPhotoGridModal={true}
      >
        <StyledModalContainer>
          <img
            src='https://cdn.sanity.io/images/d0kd7r9c/development/fdeb2287a7c885736dbbaf47513c74166c53fef7-756x488.jpg'
            alt=''
          />
          <StyledReviewContentContainer>
            <Review locale={locale} review={review} />
          </StyledReviewContentContainer>
        </StyledModalContainer>
      </Modal>
      <StyledGrid
        columnRatio={['1:1:1:1']}
        rowGap={'0.5rem'}
        columnGap={'0.5rem'}
      >
        {imgUrls.map((img) => {
          return (
            <StyledButton key={img} onClick={() => setShowModal(true)}>
              <StyledImg src={img} alt='' />
            </StyledButton>
          )
        })}
      </StyledGrid>
    </>
  )
}
