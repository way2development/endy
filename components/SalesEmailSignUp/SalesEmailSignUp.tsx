import React, { BaseSyntheticEvent, useState } from 'react'
import {
  StyledSignUpEmailContainer,
  StyledEmailGridColWrapper,
  StyledSignUpOfferTitle,
  StyledSignUpOfferSubText,
  StyledNewsletterInputWrapper,
  StyledNewsletterInputBox,
  StyledNewsletterErrorMessageSpan,
  StyledNewsletterButton,
  StyledSalesImage
} from './SalesEmailSignUp.styled'
import { Grid } from '../Grid'
import { Image, ImageProps } from '../Image'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { useForm } from 'react-hook-form'
import { InputTooltip } from '../Tooltip'
import { Text } from '../Text'
import { isValidEmailCheck } from '../../utils/form'
import { useNewsletterSignUp } from '../../utils/useNewsletterSignUp'

interface SalesEmailSignUpProps {
  locale: Locale
  isMobile: boolean
  heading: string
  subcopy: string
  microcopy: string
  lifestyleImage: ImageProps
}

export const SalesEmailSignUp = ({
  locale,
  isMobile = false,
  heading,
  subcopy,
  microcopy,
  lifestyleImage
}: SalesEmailSignUpProps) => {
  const localizedDictionary = dictionary[locale]

  // If this page is used outside of the SLP, we need to be able to change the source ID from Sanity
  const klaviyoSourceId =
    locale === 'fr' ? 'sale-landing-page-fr' : 'sale-landing-page'

  const [tooltipErrorMessage, setTooltipErrorMessage] = useState('')
  const [subscribeButtonMessage, setSubscribeButtonMessage] = useState(
    localizedDictionary.emailSignUp
  )
  const onSubmit = (
    data: Record<string, unknown>,
    e: BaseSyntheticEvent<object, any, any> | undefined,
    locale: Locale
  ) => {
    e?.preventDefault()
    return useNewsletterSignUp(
      data,
      locale,
      setTooltipErrorMessage,
      localizedDictionary.emailError,
      setSubscribeButtonMessage,
      localizedDictionary.emailSignUp,
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
  const sourceId = register('sourceId')
  return (
    <StyledSignUpEmailContainer>
      <Grid columnRatio={['1', '1', '1:1']} rowGap={['0']} columnGap={['0']}>
        <StyledEmailGridColWrapper>
          <StyledSignUpOfferTitle variant='h3' color='gravy'>
            {heading}
          </StyledSignUpOfferTitle>
          {subcopy && (
            <StyledSignUpOfferSubText variant='smallBody' color='gravy'>
              {subcopy}
            </StyledSignUpOfferSubText>
          )}
          <form style={{ width: '100%' }} key='form'>
            <input type={'hidden'} {...sourceId} value={klaviyoSourceId} />
            <StyledNewsletterInputWrapper>
              <StyledNewsletterInputBox
                id={`${isMobile ? 'mobile-' : ''}email-signup-blog-email`}
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
              <InputTooltip showTooltip={!!tooltipErrorMessage}>
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                  alt=''
                />
                <StyledNewsletterErrorMessageSpan>
                  {tooltipErrorMessage}
                </StyledNewsletterErrorMessageSpan>
              </InputTooltip>
              <StyledNewsletterButton
                label={subscribeButtonMessage}
                variant='solid-gravy'
                onClick={handleSubmit((...params) =>
                  onSubmit(...params, locale)
                )}
              />
            </StyledNewsletterInputWrapper>
          </form>
          <Text variant='micro' color='gravy70'>
            {microcopy}
          </Text>
        </StyledEmailGridColWrapper>
        <StyledSalesImage>
          {lifestyleImage && (
            <Image
              desktopImage={lifestyleImage.desktopImage}
              mobileImage={lifestyleImage.mobileImage}
              tabletImage={lifestyleImage.tabletImage}
              alt={lifestyleImage.alt}
              srcWidths={[768, 1024]}
            />
          )}
        </StyledSalesImage>
      </Grid>
    </StyledSignUpEmailContainer>
  )
}
