import React, { useState, BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'

import { useInviteFriendsSignUp } from '../../utils/useInviteFriendsSignUp'

import { isValidEmailCheck } from '../../utils/form'

import { Text } from '../Text'
import { InputTooltip } from '../Tooltip'

import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import {
  StyledInviteForm,
  StyledFormWrapper,
  StyledHeading,
  StyledSubcopy,
  StyledInput,
  StyledInputWrapper,
  StyledSubscribeButton,
  StyledButtonContainer
} from './SalesSignUp.styled'

import {
  StyledErrorMessageSpan,
  StyledInputsWrapper
} from '../UnlockOffersModal/UnlockOffersModal.styled'

interface InviteFormProps {
  ctaLabel: string
  heading: string
  subcopy?: string
  locale: Locale
  microcopy: string
  klaviyoSourceId: string
}

export const InviteForm = ({
  ctaLabel,
  heading,
  subcopy,
  locale,
  microcopy,
  klaviyoSourceId
}: InviteFormProps) => {
  const localizedDictionary = dictionary[locale]

  const [nameTooltipErrorMessage, setNameTooltipErrorMessage] = useState('')

  const [referrerTooltipErrorMessage, setReferrerTooltipErrorMessage] =
    useState('')

  const [
    advocateEmailTooltipErrorMessage,
    setAdvocateEmailTooltipErrorMessage
  ] = useState('')
  const [emailTooltipErrorMessage, setEmailTooltipErrorMessage] = useState('')

  const [buttonMessage, setButtonMessage] = useState(ctaLabel)

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false
  })

  const email = register('email')
  const name = register('name')
  const advocateEmail = register('advocateEmail')
  const referrer = register('referrer')
  const sourceId = register('sourceId')

  const onSubmit = (
    data: Record<string, string>,
    e: BaseSyntheticEvent<object, any, any> | undefined,
    locale: Locale
  ) => {
    e?.preventDefault()

    const isValidEmail = isValidEmailCheck(data?.email)
    const isValidAdvocateEmail = isValidEmailCheck(data?.advocateEmail)

    if (isValidEmail) {
      setEmailTooltipErrorMessage('')
    } else {
      setEmailTooltipErrorMessage(localizedDictionary.emailError)
    }

    if (isValidAdvocateEmail) {
      setAdvocateEmailTooltipErrorMessage('')
    } else {
      setAdvocateEmailTooltipErrorMessage(localizedDictionary.emailError)
    }

    if (data?.name !== '') {
      setNameTooltipErrorMessage('')
    } else {
      setNameTooltipErrorMessage(localizedDictionary.fieldRequired)
    }

    if (data?.referrer !== '') {
      setReferrerTooltipErrorMessage('')
    } else {
      setReferrerTooltipErrorMessage(localizedDictionary.fieldRequired)
    }

    if (isValidEmail && isValidAdvocateEmail) {
      useInviteFriendsSignUp(
        data,
        locale,
        setButtonMessage,
        localizedDictionary.signUp,
        localizedDictionary.unlockOffersModalOffSaleSuccess,
        reset
      )
    }
  }

  return (
    <StyledInviteForm>
      <StyledFormWrapper>
        <StyledHeading color={'gravy'} variant={'h3'}>
          {heading}
        </StyledHeading>
        {subcopy && (
          <StyledSubcopy color={'gravy'} variant={'mediumBody'}>
            {subcopy}
          </StyledSubcopy>
        )}
        <form
          onSubmit={handleSubmit((...params) => onSubmit(...params, locale))}
        >
          <input type={'hidden'} {...sourceId} value={klaviyoSourceId} />
          <StyledInputsWrapper>
            <StyledInputWrapper>
              <StyledVisuallyHiddenLabel htmlFor='referrer'>
                {localizedDictionary.yourName}
              </StyledVisuallyHiddenLabel>
              <StyledInput
                id={'referrer'}
                type='text'
                placeholder={localizedDictionary.yourName}
                {...referrer}
                onChange={() => {
                  if (referrerTooltipErrorMessage) {
                    setReferrerTooltipErrorMessage('')
                  }
                }}
              />
              <InputTooltip showTooltip={!!referrerTooltipErrorMessage}>
                {/*TODO: update icon to  Icon component when it is ready*/}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                  alt=''
                />
                <StyledErrorMessageSpan>
                  <strong>{referrerTooltipErrorMessage}</strong>
                </StyledErrorMessageSpan>
              </InputTooltip>
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledVisuallyHiddenLabel htmlFor='advocateEmail'>
                {localizedDictionary.yourEmail}
              </StyledVisuallyHiddenLabel>
              <StyledInput
                id={'advocateEmail'}
                type='text'
                inputMode='email'
                autoComplete='email'
                placeholder={localizedDictionary.yourEmail}
                {...advocateEmail}
                onChange={() => {
                  if (advocateEmailTooltipErrorMessage) {
                    setAdvocateEmailTooltipErrorMessage('')
                  }
                }}
              />
              <InputTooltip showTooltip={!!advocateEmailTooltipErrorMessage}>
                {/*TODO: update icon to  Icon component when it is ready*/}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                  alt=''
                />
                <StyledErrorMessageSpan>
                  <strong>{advocateEmailTooltipErrorMessage}</strong>
                </StyledErrorMessageSpan>
              </InputTooltip>
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledVisuallyHiddenLabel htmlFor='name'>
                {localizedDictionary.yourFriendsName}
              </StyledVisuallyHiddenLabel>
              <StyledInput
                id={'name'}
                type='text'
                placeholder={localizedDictionary.yourFriendsName}
                {...name}
                onChange={() => {
                  if (nameTooltipErrorMessage) {
                    setNameTooltipErrorMessage('')
                  }
                }}
              />
              <InputTooltip showTooltip={!!nameTooltipErrorMessage}>
                {/*TODO: update icon to  Icon component when it is ready*/}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                  alt=''
                />
                <StyledErrorMessageSpan>
                  <strong>{nameTooltipErrorMessage}</strong>
                </StyledErrorMessageSpan>
              </InputTooltip>
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledVisuallyHiddenLabel htmlFor='email'>
                {localizedDictionary.email}
              </StyledVisuallyHiddenLabel>
              <StyledInput
                id={'email'}
                type='text'
                inputMode='email'
                autoComplete='email'
                placeholder={localizedDictionary.yourFriendsEmail}
                {...email}
                onChange={() => {
                  if (emailTooltipErrorMessage) {
                    setEmailTooltipErrorMessage('')
                  }
                }}
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
          </StyledInputsWrapper>

          <StyledButtonContainer>
            <StyledSubscribeButton variant='solid-rubine'>
              {buttonMessage}
            </StyledSubscribeButton>
          </StyledButtonContainer>

          <Text variant={'micro'} color={'gravy80'}>
            {microcopy}
          </Text>
        </form>
      </StyledFormWrapper>
    </StyledInviteForm>
  )
}
