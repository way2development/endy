import React, { BaseSyntheticEvent, useState } from 'react'
import {
  StyledHeaderText,
  StyledNewsletterJoinWrapper,
  StyledSubtext,
  StyledInput,
  StyledSubscribeButton,
  StyledInputWrapper,
  StyledErrorMessageSpan
} from './NewsletterJoin.styled'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { InputTooltip } from '../Tooltip'
import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'
import { isValidEmailCheck } from '../../utils/form'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'
import { HoneypotField } from '../HoneypotField'

export const NewsletterJoin: React.FC<{
  locale: Locale
  className?: string
  isMobile: boolean
}> = ({ locale, className, isMobile = false }) => {
  const localizedDictionary = dictionary[locale]

  const [tooltipErrorMessage, setTooltipErrorMessage] = useState('')
  const [subscribeButtonMessage, setSubscribeButtonMessage] = useState(
    localizedDictionary.subscribe
  )
  const [fullNameInputValue, setFullNameInputValue] = useState(false)
  const onSubmit = (
    data: Record<string, unknown>,
    e: BaseSyntheticEvent<object, any, any> | undefined,
    locale: Locale
  ) => {
    data.fullName = fullNameInputValue ? 'true' : ''
    e?.preventDefault()
    return useNewsletterSignUp(
      data,
      locale,
      setTooltipErrorMessage,
      localizedDictionary.emailError,
      setSubscribeButtonMessage,
      localizedDictionary.subscribe,
      reset,
      localizedDictionary.thankYou
    )
  }

  const { handleSubmit, register, reset } = useForm({
    shouldUseNativeValidation: false,
    resolver: async (data) => {
      const isValidEmail = isValidEmailCheck(data.email)
      if (isValidEmail || !data.email) {
        setTooltipErrorMessage('')
        return { values: data, errors: {} }
      } else {
        setTooltipErrorMessage(localizedDictionary.emailError)
        return { values: data, errors: { isInvalidEmail: true } }
      }
    }
  })

  const email = register('email')

  const fullName = register('fullName')

  return (
    <StyledNewsletterJoinWrapper className={className}>
      <StyledHeaderText variant='mediumBody' color='white'>
        {localizedDictionary.signUpForNewsletter}
      </StyledHeaderText>
      <StyledSubtext variant='smallBody' color='white'>
        {localizedDictionary.beTheFirstToKnow}
      </StyledSubtext>
      <form
        style={{ width: '100%' }}
        key='form'
        onSubmit={handleSubmit((...params) => onSubmit(...params, locale))}
      >
        <StyledInputWrapper>
          <StyledVisuallyHiddenLabel htmlFor='email'>
            Email:
          </StyledVisuallyHiddenLabel>
          <StyledInput
            id={`${isMobile ? 'mobile-' : ''}newsletter-email`}
            type='text'
            inputMode='email'
            autoComplete='email'
            placeholder={localizedDictionary.enterEmail}
            {...email}
            onFocus={(e) => {
              if (!e.target.value && tooltipErrorMessage) {
                setTooltipErrorMessage('')
              }
            }}
          />
          <HoneypotField
            inputProps={fullName}
            onChange={setFullNameInputValue}
          />
          <InputTooltip showTooltip={!!tooltipErrorMessage}>
            {/*TODO: update icon to  Icon component when it is ready*/}
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
              alt=''
            />
            <StyledErrorMessageSpan>
              {tooltipErrorMessage}
            </StyledErrorMessageSpan>
          </InputTooltip>
          <StyledSubscribeButton type='submit' variant='solid-rubine'>
            {subscribeButtonMessage}
          </StyledSubscribeButton>
        </StyledInputWrapper>
      </form>
    </StyledNewsletterJoinWrapper>
  )
}

export const MobileNewsletterJoin = styled(NewsletterJoin)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 26px;
  @media screen and (min-width: 901px) {
    display: none;
  }
`
