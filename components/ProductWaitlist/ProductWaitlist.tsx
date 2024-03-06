import React, { MouseEvent, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { m, AnimatePresence } from 'framer-motion'
import dictionary from '../../dictionary.json'
import { VariantProps, SizeVariant } from '../ShopModule/ShopModule.types'
import { Locale } from '../../types/global-types'
import { StyledVisuallyHiddenLabel } from '../../styles/global.styled'
import {
  DisclaimerText,
  HeaderText,
  StyledDropdown,
  StyledInput,
  StyledSubscribeButton,
  StyledWaitListWrapper
} from './ProductWaitlist.styled'

export const Waitlist: React.FC<{
  selectedVariantId: number
  outOfStockVariants: VariantProps[]
  klaviyo: string
  postUrl?: string
  locale: Locale
  sizeVariants: SizeVariant[]
}> = ({
  selectedVariantId,
  outOfStockVariants = [],
  klaviyo,
  postUrl = '/api/klaviyo/waitlist-join',
  locale,
  sizeVariants
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm()

  const [selectedOutOfStockVariantId, setSelectedOutOfStockVariantId] =
    useState(selectedVariantId)

  const resetForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
    setError(false)
    setSuccess(false)
    setSubmitting(false)
  }

  const onSubmit = (data: any, e: any) => {
    e.preventDefault()

    if (!selectedOutOfStockVariantId) {
      setError(true)
      return
    }

    setSubmitting(true)
    setError(false)

    axios
      .post(postUrl, {
        accountID: klaviyo,
        variant: selectedOutOfStockVariantId,
        ...data
      })
      .then(() => {
        setSubmitting(false)
        setSuccess(true)
      })
      .catch((error: ErrorEvent) => {
        setSubmitting(false)
        setError(true)
        console.log(error)
      })
  }

  const formAnim = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'linear',
        when: 'beforeChildren'
      }
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'linear',
        when: 'afterChildren'
      }
    }
  }

  const email = register('email', {
    required: 'This field is required.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address.'
    }
  })

  const localizedDictionary = dictionary[locale]

  return (
    <StyledWaitListWrapper>
      <HeaderText variant='largeBody' color='gravy'>
        {localizedDictionary.notifyWhenInStock}
      </HeaderText>
      <AnimatePresence exitBeforeEnter initial={false}>
        {!error && !success && (
          <m.form
            key='form'
            initial='hide'
            animate='show'
            exit='hide'
            variants={formAnim}
            className='form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <StyledVisuallyHiddenLabel htmlFor='wishlistSizeDropdown'>
              {localizedDictionary.chooseYourSize}
            </StyledVisuallyHiddenLabel>
            <StyledDropdown
              name='wishlistSizeDropdown'
              value={selectedOutOfStockVariantId}
              onChange={(e) =>
                setSelectedOutOfStockVariantId(parseInt(e.target.value))
              }
            >
              {outOfStockVariants.map((variant) => {
                const variantSize = sizeVariants.find((sizeVariant) => {
                  return sizeVariant.id === variant.size
                })
                return variantSize ? (
                  <option key={variant.id} value={variant.id}>
                    {variantSize.label}
                  </option>
                ) : null
              })}
            </StyledDropdown>

            <div className='control--group is-inline'>
              <div className={`control${errors.email ? ' has-error' : ''}`}>
                <StyledVisuallyHiddenLabel htmlFor='wishlistEmail'>
                  {localizedDictionary.enterEmail}
                </StyledVisuallyHiddenLabel>
                <StyledInput
                  type='email'
                  inputMode='email'
                  autoComplete='email'
                  placeholder='Email'
                  {...email}
                  onFocus={(e) => {
                    ;(e.target.parentNode as any).classList.add('is-filled')
                  }}
                  onBlur={(e) => {
                    const value = e.target.value
                    email.onBlur(e)
                    ;(e.target.parentNode as any).classList.toggle(
                      'is-filled',
                      value
                    )
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    email.onChange(e)
                    ;(e.target.parentNode as any).classList.toggle(
                      'is-filled',
                      value
                    )
                  }}
                />
                {errors?.email && (
                  <span role='alert' className='control--error'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <StyledSubscribeButton
                variant='solid-rubine'
                type='submit'
                className={`btn is-primary is-large is-block${
                  submitting ? ' is-loading' : ''
                }`}
                disabled={submitting}
              >
                {submitting
                  ? localizedDictionary.wait
                  : localizedDictionary.subscribe}
              </StyledSubscribeButton>
            </div>
          </m.form>
        )}

        {success && (
          <m.div
            key='success'
            initial='hide'
            animate='show'
            exit='hide'
            variants={formAnim}
            className='form--success'
          >
            <div className='form--success-content'>
              {localizedDictionary.thanks}
            </div>
          </m.div>
        )}

        {error && (
          <m.div
            key='error'
            initial='hide'
            animate='show'
            exit='hide'
            variants={formAnim}
            className='form--error'
          >
            <div className='form--error-content'>
              {localizedDictionary.unsuccessfulError}
            </div>
            <div className='form--error-reset'>
              <button className='btn' onClick={(e) => resetForm(e)}>
                {localizedDictionary.tryAgain}
              </button>
            </div>
          </m.div>
        )}

        <DisclaimerText color='gravy' variant='smallBody'>
          *{localizedDictionary.subscribeAgreement}
        </DisclaimerText>
      </AnimatePresence>
    </StyledWaitListWrapper>
  )
}

export default Waitlist
