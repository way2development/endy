import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import dictionary from '../../dictionary.json'
import { usePrefersReducedMotion } from '../../utils'
import { Text } from '../Text/Text'
import { SaleProps } from '../../Interfaces/sales'
import {
  StyledBannerContainer,
  StyledCarouselWrapper,
  StyledCarousel,
  StyledCarouselButton,
  StyledImgContainer,
  StyledMessageContainer,
  StyledCarouselSlide,
  StyledPrevButton,
  StyledLanguageToggleContainer
} from './PencilBanner.styled'
import { Modal } from '../Modal'
import { CustomModal } from '../CustomModal'
import { Locale } from '../../types/global-types'
import { PencilBannerCountdown } from './PencilBannerCountdown'
import { LanguageToggle } from '../LanguageToggle'

interface PencilBannerMessageProps {
  _key: string
  heading: string
  url?: string
  modal?: React.ElementRef<typeof CustomModal>
}

interface PencilBannerProps {
  /**
   * Array of messages to be shown in the banner. Autorotation will start if more than 1 message
   */
  messages: PencilBannerMessageProps[]
  /**
   * Optional array of sales messages to be shown in the banner. Autorotation will start if more than 1 message
   */
  sales?: SaleProps
  /** Select Location */
  locale: Locale
}

const autoplayOptions = {
  delay: 8000,
  stopOnMouseEnter: true,
  stopOnInteraction: false
}

const autoplay = Autoplay(autoplayOptions)
const arrowIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/27d7626209a12cedf2c9279390d55685c128cd21-9x12.svg'

export const PencilBanner = ({
  messages,
  sales,
  locale
}: PencilBannerProps) => {
  const localizedDictionary = dictionary[locale]
  const lastChanceCountdown = PencilBannerCountdown

  const salesMessage = sales?.isLastChance
    ? lastChanceCountdown
    : sales?.pencilBannerMessage
  const allMessages = salesMessage
    ? [
        {
          ...salesMessage,
          _key: 'salesPencilBannerMessage'
        },
        ...messages
      ]
    : messages

  const [activeMessageIndex, setActiveMessageIndex] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [autoplay])
  const prefersReducedMotion = usePrefersReducedMotion()
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)

  // Determine the index of the visible message to determine tabIndex and aria-hidden status of messages
  // Uses built in embla methods to trigger this whenever the slide starts scrolling
  const onScroll = () => {
    const activeMessage = embla?.slidesInView()
    setActiveMessageIndex(activeMessage ? activeMessage[0] : 0)
  }
  embla && embla?.on('scroll', onScroll)

  // Turn off the autoplay if user has a reduced motion setting turned on
  useEffect(() => {
    if (embla && prefersReducedMotion) {
      autoplay.stop()
    }
  }, [embla, prefersReducedMotion])

  // Only show the carousel buttons if there is more than one message
  useEffect(() => {
    if (allMessages?.length > 1) {
      setShowButtons(true)
    }
  }, [allMessages])

  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev()
    autoplay && autoplay.stop()
  }, [embla, autoplay])

  const scrollNext = useCallback(() => {
    embla && embla.scrollNext()
    autoplay && autoplay.stop()
  }, [embla])

  const onFocus = useCallback(() => {
    autoplay && autoplay.stop()
  }, [autoplay])

  const onBlur = useCallback(() => {
    autoplay && autoplay.play()
  }, [autoplay])

  const carouselSlides = allMessages?.map((message, i) => {
    return (
      <StyledCarouselSlide key={message._key} onFocus={onFocus} onBlur={onBlur}>
        {message.url && !message.modal && (
          <Link
            href={message.url}
            tabIndex={i === activeMessageIndex ? 0 : -1}
            aria-hidden={i === activeMessageIndex ? 'false' : 'true'}
          >
            <Text color='white' variant='smallBody'>
              {message.heading}
            </Text>
          </Link>
        )}
        {!message.url && message.modal && (
          <>
            <button
              onClick={() => setShowModal(true)}
              tabIndex={i === activeMessageIndex ? 0 : -1}
              aria-hidden={i === activeMessageIndex ? 'false' : 'true'}
            >
              <Text color='white' variant='smallBody'>
                {message.heading}
              </Text>
            </button>
            <Modal showModal={showModal} onClose={closeModal} locale={locale}>
              {React.cloneElement(message.modal, {
                onButtonClick: closeModal,
                locale
              })}
            </Modal>
          </>
        )}
        {!message.url && !message.modal && (
          <Text color='white' variant='smallBody' element={'div'}>
            {message.heading}
            {message._key === 'salesPencilBannerMessage' &&
              sales?.isLastChance && (
                <PencilBannerCountdown locale={locale} sales={sales} />
              )}
          </Text>
        )}
      </StyledCarouselSlide>
    )
  })

  return (
    <StyledBannerContainer>
      <StyledCarouselWrapper singleMessage={!showButtons}>
        {showButtons && (
          <StyledCarouselButton
            onClick={scrollPrev}
            aria-label={localizedDictionary.prevCarouselButton}
          >
            <StyledImgContainer>
              <StyledPrevButton src={arrowIcon} alt='' />
            </StyledImgContainer>
          </StyledCarouselButton>
        )}
        <StyledCarousel ref={emblaRef}>
          {/* Aria-live off stops users from being constantly alerted to slide changes: 
          https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions */}
          <StyledMessageContainer aria-live='off'>
            {carouselSlides}
          </StyledMessageContainer>
        </StyledCarousel>
        {showButtons && (
          <StyledCarouselButton
            onClick={scrollNext}
            aria-label={localizedDictionary.nextCarouselButton}
          >
            <StyledImgContainer>
              {/* @TODO: replace with icon component */}
              <img src={arrowIcon} alt='' />
            </StyledImgContainer>
          </StyledCarouselButton>
        )}
      </StyledCarouselWrapper>
      <StyledLanguageToggleContainer>
        <LanguageToggle locale={locale} />
      </StyledLanguageToggleContainer>
    </StyledBannerContainer>
  )
}
