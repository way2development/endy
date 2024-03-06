import React, { useState, BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'

import { useSmsSignUp } from '../../utils/useSmsSignUp'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'

import {
  isValidEmailCheck,
  isValidPhoneCheck,
  formatPhoneNumber
} from '../../utils/form'

import { Text } from '../Text'
import { InputTooltip } from '../Tooltip'

import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import {
  StyledFormWrapper,
  StyledHeading,
  StyledSubcopy,
  StyledInput,
  StyledCheckbox,
  StyledCheckboxWrapper,
  StyledCheckboxLabel,
  StyledInputWrapper,
  StyledSubscribeButton,
  StyledButtonContainer
} from './SalesSignUp.styled'

import {
  StyledInputIcon,
  StyledErrorMessageSpan,
  StyledInputsWrapper
} from '../UnlockOffersModal/UnlockOffersModal.styled'

interface SignUpFormProps {
  ctaLabel: string
  heading: string
  subcopy?: string
  locale: Locale
  microcopy: string
  showPhoneNumberSignUp: boolean
  showConsentCheckbox?: boolean
  klaviyoSourceId: string
}

export const SignUpForm = ({
  ctaLabel,
  heading,
  subcopy,
  locale,
  microcopy,
  showPhoneNumberSignUp,
  showConsentCheckbox,
  klaviyoSourceId
}: SignUpFormProps) => {
  const localizedDictionary = dictionary[locale]

  const [emailTooltipErrorMessage, setEmailTooltipErrorMessage] = useState('')
  const [phoneTooltipErrorMessage, setPhoneTooltipErrorMessage] = useState('')
  const [
    emailConditionsTooltipErrorMessage,
    setEmailConditionsTooltipErrorMessage
  ] = useState('')
  const [
    phoneConditionsTooltipErrorMessage,
    setPhoneConditionsTooltipErrorMessage
  ] = useState('')
  const [buttonMessage, setButtonMessage] = useState(ctaLabel)

  const [isEmailConditionsChecked, setIsEmailConditionsChecked] =
    useState(false)

  const [isPhoneConditionsChecked, setIsPhoneConditionsChecked] =
    useState(false)

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false
  })

  const email = register('email')
  const mobileNum = register('mobileNum')
  const sourceId = register('sourceId')
  const onSubmit = (
    data: Record<string, string>,
    e: BaseSyntheticEvent<object, any, any> | undefined,
    locale: Locale
  ) => {
    e?.preventDefault()

    const isValidEmail = isValidEmailCheck(data?.email)
    const isValidPhone = isValidPhoneCheck(data?.mobileNum)

    if (isValidEmail) {
      setEmailTooltipErrorMessage('')
    } else {
      setEmailTooltipErrorMessage(localizedDictionary.emailError)
    }

    if (isValidPhone) {
      setPhoneTooltipErrorMessage('')
    } else {
      setPhoneTooltipErrorMessage(localizedDictionary.phoneError)
    }

    if (isEmailConditionsChecked || !showConsentCheckbox) {
      setEmailConditionsTooltipErrorMessage('')
    } else {
      setEmailConditionsTooltipErrorMessage(localizedDictionary.conditionsError)
    }

    if (isPhoneConditionsChecked) {
      setPhoneConditionsTooltipErrorMessage('')
    } else {
      setPhoneConditionsTooltipErrorMessage(localizedDictionary.conditionsError)
    }

    const isConditionsChecked =
      isEmailConditionsChecked && isPhoneConditionsChecked

    if (
      (isValidEmail && isValidPhone && isConditionsChecked) ||
      (!showPhoneNumberSignUp &&
        isValidEmail &&
        (isEmailConditionsChecked || !showConsentCheckbox))
    ) {
      useNewsletterSignUp(
        data,
        locale,
        setEmailTooltipErrorMessage,
        localizedDictionary.emailError,
        setButtonMessage,
        localizedDictionary.signUp,
        reset,
        localizedDictionary.unlockOffersModalOffSaleSuccess
      )

      if (showPhoneNumberSignUp) {
        useSmsSignUp(
          data,
          setButtonMessage,
          localizedDictionary.unlockOffersModalOffSaleSuccess
        )
      }

      // Resetting the form is on a delay within useNewsletterSignUp()
      setTimeout(() => {
        setIsEmailConditionsChecked(false)
        setIsPhoneConditionsChecked(false)
      }, 3000)
    }
  }

  return (
    <StyledFormWrapper>
      <StyledHeading color={'gravy'} variant={'h3'}>
        {heading}
      </StyledHeading>
      <StyledSubcopy color={'gravy'} variant={'mediumBody'}>
        {subcopy}
      </StyledSubcopy>
      <form onSubmit={handleSubmit((...params) => onSubmit(...params, locale))}>
        <input type={'hidden'} {...sourceId} value={klaviyoSourceId} />
        <StyledInputsWrapper>
          <StyledInputWrapper>
            <StyledVisuallyHiddenLabel htmlFor='email'>
              {localizedDictionary.email}
            </StyledVisuallyHiddenLabel>
            <StyledInput
              id={`newsletter-email`}
              type='text'
              inputMode='email'
              autoComplete='email'
              placeholder={localizedDictionary.enterEmail}
              {...email}
              onChange={() => {
                if (emailTooltipErrorMessage) {
                  setEmailTooltipErrorMessage('')
                }
              }}
            />

            <StyledInputIcon
              src='https://cdn.sanity.io/images/d0kd7r9c/production/4837e5c76f746342ad31fde1cf3a945294d0d3fc-13x11.svg'
              alt=''
            />
            <InputTooltip showTooltip={!!emailTooltipErrorMessage}>
              {/*TODO: update icon to  Icon component when it is ready*/}
              <img
                src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                alt=''
              />
              <StyledErrorMessageSpan>
                <strong>{emailTooltipErrorMessage}</strong>
              </StyledErrorMessageSpan>
            </InputTooltip>
          </StyledInputWrapper>

          {showConsentCheckbox && (
            <>
              <StyledCheckboxWrapper>
                <StyledCheckbox
                  type='checkbox'
                  id='emailConditions'
                  onChange={(e) => {
                    setIsEmailConditionsChecked(e.target.checked)
                    if (emailConditionsTooltipErrorMessage) {
                      setEmailConditionsTooltipErrorMessage('')
                    }
                  }}
                  checked={isEmailConditionsChecked}
                />
                <StyledCheckboxLabel htmlFor='emailConditions'>
                  <Text
                    variant={'smallBody'}
                    color={'gravy80'}
                    element={'span'}
                  >
                    {localizedDictionary.emailConditions}
                  </Text>
                </StyledCheckboxLabel>
                <InputTooltip
                  showTooltip={!!emailConditionsTooltipErrorMessage}
                >
                  {/*TODO: update icon to  Icon component when it is ready*/}
                  <img
                    src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                    alt=''
                  />
                  <StyledErrorMessageSpan>
                    <strong>{emailConditionsTooltipErrorMessage}</strong>
                  </StyledErrorMessageSpan>
                </InputTooltip>
              </StyledCheckboxWrapper>
            </>
          )}

          {showPhoneNumberSignUp && (
            <>
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
                  onChange={(e) => {
                    if (phoneTooltipErrorMessage) {
                      setPhoneTooltipErrorMessage('')
                    }
                    formatPhoneNumber(e)
                  }}
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

              <StyledCheckboxWrapper>
                <StyledCheckbox
                  type='checkbox'
                  id='phoneConditions'
                  onChange={(e) => {
                    setIsPhoneConditionsChecked(e.target.checked)
                    if (phoneConditionsTooltipErrorMessage) {
                      setPhoneConditionsTooltipErrorMessage('')
                    }
                  }}
                  checked={isPhoneConditionsChecked}
                />
                <StyledCheckboxLabel htmlFor='phoneConditions'>
                  <Text
                    variant={'smallBody'}
                    color={'gravy80'}
                    element={'span'}
                  >
                    {localizedDictionary.smsConditions}
                  </Text>
                </StyledCheckboxLabel>
                <InputTooltip
                  showTooltip={!!phoneConditionsTooltipErrorMessage}
                >
                  {/*TODO: update icon to  Icon component when it is ready*/}
                  <img
                    src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                    alt=''
                  />
                  <StyledErrorMessageSpan>
                    <strong>{phoneConditionsTooltipErrorMessage}</strong>
                  </StyledErrorMessageSpan>
                </InputTooltip>
              </StyledCheckboxWrapper>
            </>
          )}
        </StyledInputsWrapper>

        <StyledButtonContainer>
          <StyledSubscribeButton variant='solid-gravy'>
            {buttonMessage}
          </StyledSubscribeButton>
        </StyledButtonContainer>

        <Text variant={'micro'} color={'gravy80'}>
          {microcopy}
        </Text>
      </form>
    </StyledFormWrapper>
  )
}
