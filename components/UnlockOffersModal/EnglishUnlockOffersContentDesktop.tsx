import { useState, useEffect } from 'react'
import { Locale } from '../../types/global-types'
import { formatPhoneNumber, isValidEmailCheck } from '../../utils/form'
import { useForm } from 'react-hook-form'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'
import dictionary from '../../dictionary.json'

import {
  StyledHR,
  StyledInputIcon,
  StyledErrorMessageSpan,
  StyledInput,
  StyledInputsWrapper,
  StyledInputWrapper,
  StyledSubscribeButton,
  StyledText,
  StyledUnlockOffersModalHeading,
  StyledUnlockOffersModalSubcopy,
  StyledUnlockOffersBackgroundImageDesktop,
  StyledUnlockOffersMicrocopyContainer,
  StyledUnlockOffersModalHeader,
  StyledStepCounter,
  StyledLink,
  StyledDisclaimer,
  StyledAnchor
} from './UnlockOffersModal.styled'
import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'
import { InputTooltip } from '../Tooltip'
import { SaleProps } from '../../Interfaces/sales'
import { handleSmsSignup } from './utils'
import { HoneypotField } from '../HoneypotField'

const backgroundImage =
  'https://cdn.sanity.io/images/d0kd7r9c/production/26184d6ac57ef85f9857c4301e1787149dca27cf-810x300.webp'

interface EnglishUnlockOffersContentDesktopProps {
  locale: Locale
  sales?: SaleProps
  closeModal: () => void
}

export const EnglishUnlockOffersContentDesktop = ({
  locale,
  sales,
  closeModal
}: EnglishUnlockOffersContentDesktopProps) => {
  const localizedDictionary = dictionary[locale]
  const [tooltipErrorMessage, setTooltipErrorMessage] = useState('')
  const [phoneTooltipErrorMessage, setPhoneTooltipErrorMessage] = useState('')

  const [buttonMessage, setButtonMessage] = useState(
    localizedDictionary.unlockOffersModalOffSaleCTA
  )
  const [headingMessage, setHeadingMessage] = useState('')
  const [subcopyMessage, setSubcopyMessage] = useState('')
  const [disclaimerMessage, setDisclaimerMessage] = useState('')

  const [emailInputValue, setEmailInputValue] = useState('')
  const [phoneInputValue, setPhoneInputValue] = useState('')
  const [fullNameInputValue, setFullNameInputValue] = useState(false)
  const [step, setStep] = useState(1)

  const privacyPolicyUrl = 'https://ca.endy.com/pages/privacy-policy'

  const handlePhoneInput = (e: any) => {
    setPhoneInputValue(e.target.value)
  }

  const clearInput = () => {
    setPhoneInputValue('')
  }
  // to turn the sales messaging copy on/off, comment the whole useEffect in/out
  useEffect(() => {
    if (sales?.unlockOffer) {
      setHeadingMessage(sales.unlockOffer.desktopHeading)
      setSubcopyMessage(sales.unlockOffer.subcopy)
      setButtonMessage('Continue')
      setDisclaimerMessage(
        localizedDictionary.unlockOffersModalOffSaleDisclaimerStepOne
      )

      if (step === 2) {
        setHeadingMessage('Almost There...')
        clearInput()
        setSubcopyMessage(
          'Sign up for texts to be the first to know about our latest launches, exclusive offers, and more good stuff!'
        )
        setButtonMessage('Complete your signup')
        setDisclaimerMessage(
          localizedDictionary.unlockOffersModalOffSaleDisclaimerStepTwo
        )
      }
    } else {
      if (step === 2) {
        setSubcopyMessage(localizedDictionary.unlockOffersModalOffSaleSubcopy)
        clearInput()
        setButtonMessage('Complete your signup')
        setDisclaimerMessage(
          localizedDictionary.unlockOffersModalOffSaleDisclaimerStepTwo
        )
      } else {
        setButtonMessage('Continue')
        setHeadingMessage(localizedDictionary.unlockOffersModalOffSaleHeading)
        setSubcopyMessage(localizedDictionary.unlockOffersModalOffSaleSubcopy)
        setDisclaimerMessage(
          localizedDictionary.unlockOffersModalOffSaleDisclaimerStepOne
        )
      }
    }
  }, [sales, step])

  // comment this useEffect in/out when turning the sale messaging copy off/on
  // useEffect(() => {
  //   setSubcopyMessage(localizedDictionary.unlockOffersModalOffSaleSubcopy)
  //   if (step === 2) {
  //     clearInput()
  //     setButtonMessage('Complete your signup')
  //     setDisclaimerMessage(
  //       localizedDictionary.unlockOffersModalOffSaleDisclaimerStepTwo
  //     )
  //   } else {
  //     setButtonMessage('Continue')
  //     setHeadingMessage(localizedDictionary.unlockOffersModalOffSaleHeading)
  //     setDisclaimerMessage(
  //       localizedDictionary.unlockOffersModalOffSaleDisclaimerStepOne
  //     )
  //   }
  // }, [step])

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false
  })

  const email = register('email')
  const mobileNum = register('mobileNum')
  const fullName = register('fullName')

  return (
    <>
      <StyledUnlockOffersModalHeader>
        {sales ? (
          <>
            <StyledUnlockOffersModalHeading
              color={'white'}
              variant={'h1'}
              element={'h4'}
            >
              {headingMessage}
            </StyledUnlockOffersModalHeading>
            <StyledUnlockOffersModalSubcopy
              color={'white'}
              variant={'mediumBody'}
            >
              {subcopyMessage}
            </StyledUnlockOffersModalSubcopy>
            <StyledHR />
          </>
        ) : (
          <div>
            <StyledUnlockOffersModalHeading color={'white'} variant={'h4'}>
              <StyledText color={'white'} variant={'h1'} element={'h4'}>
                {localizedDictionary.unlockOffersModalOffSaleHeading}
              </StyledText>
              <StyledText color={'white'} variant={'mediumBody'}>
                {localizedDictionary.unlockOffersModalOffSaleSubcopy}
              </StyledText>
            </StyledUnlockOffersModalHeading>
          </div>
        )}

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
                View our Terms & Privacy.
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
              <StyledSubscribeButton type='submit' variant='solid-rubine'>
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
                  maxLength={10}
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
                  {/* TODO: update icon to  Icon component when it is ready */}
                  <img
                    src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                    alt=''
                  />
                  <StyledErrorMessageSpan>
                    <strong>{phoneTooltipErrorMessage}</strong>
                  </StyledErrorMessageSpan>
                </InputTooltip>
              </StyledInputWrapper>
              <StyledSubscribeButton type='submit' variant='solid-rubine'>
                {buttonMessage}
              </StyledSubscribeButton>
            </StyledInputsWrapper>
          </form>
        )}

        <StyledStepCounter variant={'micro'} color={'white'}>
          <strong aria-label={`Step ${step} of 2`}>Step {step}/2</strong>
        </StyledStepCounter>
      </StyledUnlockOffersMicrocopyContainer>
    </>
  )
}

export default EnglishUnlockOffersContentDesktop
