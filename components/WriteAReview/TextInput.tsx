import {
  StyledInputContainer,
  StyledErrorMessageSpan,
  StyledCharacterCount,
  StyledTextAreaContainer
} from './WriteAReview.styled'
import { Text } from '../Text'
import { InputTooltip } from '../Tooltip'
import { UseFormRegisterReturn } from 'react-hook-form'
import React from 'react'

interface InputProps {
  dictionaryString: string
  placeholderText: string
  errorMessage: string
  setErrorMessage: (param: string) => void
  label: string
  register?: UseFormRegisterReturn
  count?: number
  setCount?: (param: number) => void
  val?: string
  setVal?: (param: string) => void
}

export const TextInput = ({
  dictionaryString,
  placeholderText,
  errorMessage,
  setErrorMessage,
  label,
  register,
  count,
  setCount,
  val,
  setVal
}: InputProps) => {
  return (
    <StyledInputContainer>
      <label htmlFor={label}>
        <Text color='gravy' variant='mediumBody' element='span'>
          {dictionaryString}*
        </Text>
      </label>
      {label === 'review' ? (
        <StyledTextAreaContainer>
          <textarea
            id={label}
            placeholder={placeholderText}
            {...register}
            onChange={(e) => {
              if (errorMessage) {
                setErrorMessage('')
              }

              setCount && setCount(e.target.value.length)
            }}
            maxLength={256}
          ></textarea>
          <StyledCharacterCount color='gravy' variant='micro' element='span'>
            {count}/256
          </StyledCharacterCount>
        </StyledTextAreaContainer>
      ) : (
        <input
          type='text'
          id={label}
          placeholder={placeholderText}
          {...register}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage('')
            }

            setVal && setVal(e.target.value)
          }}
          value={val}
        />
      )}

      <InputTooltip showTooltip={!!errorMessage} top='85px' left='15px'>
        {/*TODO: update icon to  Icon component when it is ready*/}
        <img
          src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
          alt=''
        />
        <StyledErrorMessageSpan>
          <strong>{errorMessage}</strong>
        </StyledErrorMessageSpan>
      </InputTooltip>
    </StyledInputContainer>
  )
}
