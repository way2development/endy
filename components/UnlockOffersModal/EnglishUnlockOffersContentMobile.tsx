import React, { useState, useEffect } from 'react'
import { Locale } from '../../types/global-types'
import { isValidEmailCheck, formatPhoneNumber } from '../../utils/form'
import { useForm } from 'react-hook-form'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'
import dictionary from '../../dictionary.json'

import {
  StyledInputIcon,
  StyledErrorMessageSpan,
  StyledInput,
  StyledInputsWrapper,
  StyledInputWrapper,
  StyledStepCounter,
  StyledSubscribeButton,
  StyledUnlockOffersModalHeading,
  StyledUnlockOffersBackgroundImageDesktop,
  StyledUnlockOffersMicrocopyContainer,
  StyledUnlockOffersModalHeader,
  StyledDisclaimer,
  StyledLink,
  StyledText,
  StyledAnchor
} from './UnlockOffersModal.styled'
import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'
import { InputTooltip } from '../Tooltip'
import { SaleProps } from '../../Interfaces/sales'
import { handleSmsSignup } from './utils'
import { HoneypotField } from '../HoneypotField'

const backgroundImage =
  'https://cdn.sanity.io/images/d0kd7r9c/production/26184d6ac57ef85f9857c4301e1787149dca27cf-810x300.webp'

interface EnglishUnlockOffersContentMobileProps {
  locale: Locale
  sales?: SaleProps
  closeModal: () => void
  updateUnlockOffersLocalStorage: (keyName: string) => void
  id?: string
}

export const EnglishUnlockOffersContentMobile = ({
  locale,
  sales,
  closeModal,
  updateUnlockOffersLocalStorage,
  id
}: EnglishUnlockOffersContentMobileProps) => {
  const localizedDictionary = dictionary[locale]
  const [tooltipErrorMessage, setTooltipErrorMessage] = useState('')
  const [buttonMessage, setButtonMessage] = useState(
    localizedDictionary.unlockOffersModalOffSaleCTA
  )
  const [headingMessage, setHeadingMessage] = useState('')
  const [subcopyMessage, setSubcopyMessage] = useState('')
  const [disclaimerMessage, setDisclaimerMessage] = useState('')

  const [phoneTooltipErrorMessage, setPhoneTooltipErrorMessage] = useState('')
  const [phoneInputValue, setPhoneInputValue] = useState('')
  const [emailInputValue, setEmailInputValue] = useState('')
  const [fullNameInputValue, setFullNameInputValue] = useState(false)
  const [step, setStep] = useState(1)

  const privacyPolicyUrl = 'https://ca.endy.com/pages/privacy-policy'

  // As this component is English only, strings were not added to the dictionary as there isn't a French version
  // TODO: refactor the nested IF statements for cleaner code and better readability

  // to turn the sales messaging copy on/off, comment the whole useEffect back in/out
  useEffect(() => {
    if (sales?.unlockOffer) {
      setHeadingMessage(sales.unlockOffer.mobileHeading)
      setSubcopyMessage(sales.unlockOffer.subcopy)
      setDisclaimerMessage(
        localizedDictionary.unlockOffersModalOffSaleDisclaimerStepOne
      )

      if (step === 2) {
        setButtonMessage('Complete your signup')
        setHeadingMessage('Almost there...')
        setSubcopyMessage(
          'Sign up for texts to be the first to know about our latest launches, exclusive offers, and more good stuff!'
        )
        setDisclaimerMessage(
          localizedDictionary.unlockOffersModalOffSaleDisclaimerStepTwo
        )
      }
    } else {
      if (step === 1) {
        setButtonMessage('Continue')
        setHeadingMessage(
          sales?.unlockOffer ? sales.unlockOffer.mobileHeading : ''
        )
        setDisclaimerMessage(
          localizedDictionary.unlockOffersModalOffSaleDisclaimerStepOne
        )
      } else if (step === 2) {
        setButtonMessage('Complete your signup')
        setHeadingMessage('Almost there...')
        setDisclaimerMessage(
          localizedDictionary.unlockOffersModalOffSaleDisclaimerStepTwo
        )
      }
    }
  }, [sales, step])

  // comment this useEffect out/in when turning the sale messaging copy on/off
  // useEffect(() => {
  //   if (step === 1) {
  //     setButtonMessage('Continue')
  //     // setHeadingMessage('Unlock')
  //     setDisclaimerMessage(
  //       localizedDictionary.unlockOffersModalOffSaleDisclaimerStepOne
  //     )
  //   } else if (step === 2) {
  //     setButtonMessage('Complete your signup')
  //     setHeadingMessage('Almost there...')
  //     setDisclaimerMessage(
  //       localizedDictionary.unlockOffersModalOffSaleDisclaimerStepTwo
  //     )
  //   }
  // }, [step])

  const handlePhoneInput = (e: any) => {
    setPhoneInputValue(e.target.value)
  }

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false
  })

  const email = register('email')
  const mobileNum = register('mobileNum')
  const fullName = register('fullName')

  return (
    <div id={id}>
      <StyledUnlockOffersModalHeader>
        <StyledUnlockOffersModalHeading
          color={'white'}
          variant={'h2'}
          step={step}
          isSaleMessageOn={headingMessage !== sales?.unlockOffer?.mobileHeading}
        >
          {headingMessage}
          {sales && (
            <StyledText color={'white'} variant={'smallBody'}>
              {subcopyMessage}
            </StyledText>
          )}
          {step === 1 && headingMessage !== sales?.unlockOffer?.mobileHeading && (
            <>
              <StyledText color={'white'} variant={'h1'} element={'h4'}>
                {localizedDictionary.unlockOffersModalOffSaleHeading}
              </StyledText>
              <StyledText color={'white'} variant={'mediumBody'}>
                {localizedDictionary.unlockOffersModalOffSaleSubcopy}
              </StyledText>
            </>
          )}
        </StyledUnlockOffersModalHeading>

        <StyledDisclaimer color={'white'} variant={'micro'}>
          {disclaimerMessage}{' '}
          <>
            {step === 1 ? (
              <StyledLink
                href={privacyPolicyUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                View Privacy
              </StyledLink>
            ) : (
              <StyledLink
                href={privacyPolicyUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                View Terms & Privacy.
              </StyledLink>
            )}{' '}
            {localizedDictionary.unlockOffersModalContact}
            <StyledAnchor href={`mailto:${localizedDictionary.endyEmail}`}>
              {localizedDictionary.endyEmail}
            </StyledAnchor>
            . {localizedDictionary.cannotBeCombined}
          </>
        </StyledDisclaimer>

        <StyledUnlockOffersBackgroundImageDesktop
          src={backgroundImage}
          alt=''
        />
      </StyledUnlockOffersModalHeader>
      <StyledUnlockOffersMicrocopyContainer>
        {step === 1 ? (
          <form
            style={{ width: '100%' }}
            key='form'
            onSubmit={handleSubmit(async (params) => {
              params.fullName = fullNameInputValue

              if (!isValidEmailCheck(emailInputValue)) {
                setTooltipErrorMessage(localizedDictionary.emailError)
              } else {
                await useNewsletterSignUp(
                  params,
                  locale,
                  setTooltipErrorMessage,
                  localizedDictionary.emailError,
                  setButtonMessage,
                  localizedDictionary.signUp,
                  reset
                ).then(() => {
                  setStep(2)
                })
              }
            })}
          >
            <StyledInputsWrapper>
              <StyledInputWrapper>
                <StyledVisuallyHiddenLabel htmlFor='email'>
                  Email:
                </StyledVisuallyHiddenLabel>
                <StyledInput
                  id={`newsletter-email`}
                  type='text'
                  inputMode='email'
                  autoComplete='email'
                  placeholder={localizedDictionary.enterEmail}
                  {...email}
                  onChange={(e) => {
                    setEmailInputValue(e.target.value)
                    if (tooltipErrorMessage) {
                      setTooltipErrorMessage('')
                    }
                  }}
                  value={emailInputValue}
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
              <StyledSubscribeButton
                type='submit'
                variant='solid-rubine'
                className='sms-banner-continue-btn'
              >
                {buttonMessage}
              </StyledSubscribeButton>
            </StyledInputsWrapper>
          </form>
        ) : (
          <form
            style={{ width: '100%' }}
            key='form'
            onSubmit={handleSubmit(async (params) => {
              params.email = emailInputValue
              params.fullName = fullNameInputValue

              await handleSmsSignup(
                params,
                setButtonMessage,
                setPhoneTooltipErrorMessage,
                localizedDictionary.phoneError,
                localizedDictionary.unlockOffersModalOffSaleSuccess,
                closeModal
              )
            })}
          >
            <StyledInputsWrapper>
              <StyledInputWrapper>
                <StyledVisuallyHiddenLabel htmlFor='mobileNum'>
                  Phone number:
                </StyledVisuallyHiddenLabel>
                <StyledInput
                  id={`newsletter-phone`}
                  type='tel'
                  inputMode='tel'
                  autoComplete='tel'
                  placeholder={'Enter your phone number'}
                  {...mobileNum}
                  value={phoneInputValue}
                  onChange={(e) => {
                    if (phoneTooltipErrorMessage) {
                      setPhoneTooltipErrorMessage('')
                    }
                    formatPhoneNumber(e)
                    handlePhoneInput(e)
                  }}
                />
                <HoneypotField
                  inputProps={fullName}
                  onChange={setFullNameInputValue}
                />
                <StyledInputIcon
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/f9bc3efe4a22e0b865912d8f9b5110290b04638c-10x13.svg'
                  alt=''
                />
                <InputTooltip showTooltip={!!phoneTooltipErrorMessage}>
                  {/*TODO: update icon to  Icon component when it is ready*/}
                  <img
                    src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                    alt=''
                  />
                  <StyledErrorMessageSpan>
                    <strong>{phoneTooltipErrorMessage}</strong>
                  </StyledErrorMessageSpan>
                </InputTooltip>
              </StyledInputWrapper>
              <StyledSubscribeButton
                type='submit'
                variant='solid-rubine'
                className='sms-banner-one-tap-btn'
              >
                {buttonMessage}
              </StyledSubscribeButton>
            </StyledInputsWrapper>
          </form>
        )}

        <StyledStepCounter variant={'micro'} color={'white'} step={step}>
          <strong aria-label={`Step ${step} of 2`}>Step {step}/2</strong>
        </StyledStepCounter>
      </StyledUnlockOffersMicrocopyContainer>
    </div>
  )
}

export default EnglishUnlockOffersContentMobile
