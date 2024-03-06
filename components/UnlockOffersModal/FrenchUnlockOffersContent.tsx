import { useState, BaseSyntheticEvent } from 'react'
import { Locale } from '../../types/global-types'
import { isValidEmailCheck } from '../../utils/form'
import { useForm } from 'react-hook-form'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'
import dictionary from '../../dictionary.json'
import { SaleProps } from '../../Interfaces/sales'

import {
  StyledInputIcon,
  StyledErrorMessageSpan,
  StyledInput,
  StyledInputsWrapper,
  StyledInputWrapper,
  StyledSubscribeButton,
  StyledUnlockOffersModalHeading,
  StyledUnlockOffersModalSubcopy,
  StyledUnlockOffersBackgroundImageDesktop,
  StyledUnlockOffersMicrocopyContainer,
  StyledUnlockOffersModalHeader,
  StyledText,
  StyledLink,
  StyledAnchor,
  StyledHR
} from './UnlockOffersModal.styled'
import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'
import { InputTooltip } from '../Tooltip'
import { HoneypotField } from '../HoneypotField'

const backgroundImage =
  'https://cdn.sanity.io/images/d0kd7r9c/production/d38a0a7082f1ed36c38ba643c79b71937964dfb5-404x140.svg'

const privacyPolicyUrl =
  'https://qc.endy.com/pages/politique-de-confidentialite'

interface FrenchUnlockOffersContentProps {
  locale: Locale
  isMobile: boolean
  sales?: SaleProps
  closeModal: () => void
}

export const FrenchUnlockOffersContent = ({
  locale,
  isMobile,
  sales,
  closeModal
}: FrenchUnlockOffersContentProps) => {
  const localizedDictionary = dictionary[locale]
  const [tooltipErrorMessage, setTooltipErrorMessage] = useState('')
  const [buttonMessage, setButtonMessage] = useState(
    localizedDictionary.unlockOffersModalOffSaleCTA
  )
  const [fullNameInputValue, setFullNameInputValue] = useState(false)

  const onSubmit = (
    data: Record<string, string>,
    e: BaseSyntheticEvent<object, any, any> | undefined,
    locale: Locale
  ) => {
    data.fullName = fullNameInputValue ? 'true' : ''
    const isValidEmail = isValidEmailCheck(data?.email)
    if (isValidEmail) {
      setTooltipErrorMessage('')
    } else {
      setTooltipErrorMessage(localizedDictionary.emailError)
    }

    e?.preventDefault()
    if (isValidEmail) {
      useNewsletterSignUp(
        data,
        locale,
        setTooltipErrorMessage,
        localizedDictionary.emailError,
        setButtonMessage,
        localizedDictionary.signUp,
        reset,
        localizedDictionary.thankYou
      )
      setTimeout(() => {
        closeModal()
      }, 1000)
    }
  }

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false
  })

  const email = register('email')
  const fullName = register('fullName')

  return (
    <>
      <StyledUnlockOffersModalHeader>
        <StyledUnlockOffersModalHeading
          color={'white'}
          variant={'h4'}
          marginBottom={isMobile ? '1rem' : '0'}
        >
          {sales ? (
            <StyledText color={'white'} variant={'h2'} element={'h4'}>
              {sales.unlockOffer.desktopHeading}
            </StyledText>
          ) : (
            <StyledText color={'white'} variant={'h1'} element={'h4'}>
              {localizedDictionary.unlockOffersModalOffSaleHeading}
            </StyledText>
          )}
          {sales ? (
            <>
              <StyledText color={'white'} variant={'mediumBody'}>
                {sales.unlockOffer.subcopy}
              </StyledText>
              <StyledHR />
            </>
          ) : (
            <StyledText color={'white'} variant={'mediumBody'}>
              {localizedDictionary.unlockOffersModalOffSaleSubcopy}
            </StyledText>
          )}
        </StyledUnlockOffersModalHeading>
        <StyledUnlockOffersModalSubcopy color={'white'} variant={'micro'}>
          {localizedDictionary.unlockOffersModalOffSaleDisclaimer}{' '}
          <StyledLink
            href={privacyPolicyUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            Voir la politique de confidentialité.
          </StyledLink>{' '}
          {localizedDictionary.unlockOffersModalContact}
          <StyledAnchor href={`mailto:${localizedDictionary.endyEmail}`}>
            {localizedDictionary.endyEmail}
          </StyledAnchor>
          . {localizedDictionary.cannotBeCombined}
        </StyledUnlockOffersModalSubcopy>
        <StyledUnlockOffersBackgroundImageDesktop
          src={backgroundImage}
          alt=''
        />
      </StyledUnlockOffersModalHeader>
      <StyledUnlockOffersMicrocopyContainer>
        <form
          style={{ width: '100%' }}
          key='form'
          onSubmit={handleSubmit((...params) => onSubmit(...params, locale))}
        >
          <StyledInputsWrapper>
            <StyledInputWrapper>
              <StyledVisuallyHiddenLabel htmlFor='email'>
                {localizedDictionary.email}:
              </StyledVisuallyHiddenLabel>
              <StyledInput
                id={`newsletter-email`}
                type='text'
                inputMode='email'
                autoComplete='email'
                placeholder={localizedDictionary.enterEmail}
                {...email}
                onChange={() => {
                  if (tooltipErrorMessage) {
                    setTooltipErrorMessage('')
                  }
                }}
              />
              <HoneypotField
                inputProps={fullName}
                onChange={setFullNameInputValue}
              />
              <StyledInputIcon
                src='https://cdn.sanity.io/images/d0kd7r9c/production/4837e5c76f746342ad31fde1cf3a945294d0d3fc-13x11.svg'
                alt=''
              />
              <InputTooltip showTooltip={!!tooltipErrorMessage}>
                {/*TODO: update icon to  Icon component when it is ready*/}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                  alt=''
                />
                <StyledErrorMessageSpan>
                  <strong>{tooltipErrorMessage}</strong>
                </StyledErrorMessageSpan>
              </InputTooltip>
            </StyledInputWrapper>
            <StyledSubscribeButton type='submit' variant='solid-rubine'>
              {buttonMessage}
            </StyledSubscribeButton>
          </StyledInputsWrapper>
        </form>
      </StyledUnlockOffersMicrocopyContainer>
    </>
  )
}

export default FrenchUnlockOffersContent
