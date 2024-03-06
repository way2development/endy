import React, { BaseSyntheticEvent, useState } from 'react'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { useForm } from 'react-hook-form'
import { InputTooltip } from '../Tooltip'
import { isValidEmailCheck } from '../../utils/form'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'
import {
  StyledNewsletterButton,
  StyledNewsletterContainer,
  StyledNewsletterDescription,
  StyledNewsletterInputBox,
  StyledNewsletterTitle,
  StyledNewsletterErrorMessageSpan,
  StyledNewsletterInputWrapper
} from './NewsletterCard.styled'
import { HoneypotField } from '../HoneypotField'

export const NewsletterCard: React.FC<{
  locale: Locale
  isMobile: boolean
}> = ({ locale, isMobile = false }) => {
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
    <StyledNewsletterContainer>
      <StyledNewsletterTitle variant='h5' color='white' element='p'>
        {localizedDictionary.joinOurNewsletter}
      </StyledNewsletterTitle>
      <StyledNewsletterDescription variant='mediumBody' color='white'>
        {localizedDictionary.beTheFirstToKnowBlog}
      </StyledNewsletterDescription>
      <form style={{ width: '100%' }} key='form'>
        <StyledNewsletterInputWrapper>
          <StyledNewsletterInputBox
            id={`${isMobile ? 'mobile-' : ''}newsletter-blog-email`}
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
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
              alt=''
            />
            <StyledNewsletterErrorMessageSpan>
              {tooltipErrorMessage}
            </StyledNewsletterErrorMessageSpan>
          </InputTooltip>
        </StyledNewsletterInputWrapper>
        <StyledNewsletterButton
          label={subscribeButtonMessage}
          variant='solid-gravy'
          onClick={handleSubmit((...params) => onSubmit(...params, locale))}
        />
      </form>
    </StyledNewsletterContainer>
  )
}

export default NewsletterCard
