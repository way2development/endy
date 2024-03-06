import { StyledRadioContainer } from './WriteAReview.styled'
import { UseFormRegisterReturn } from 'react-hook-form'

interface RadioInputProps {
  label: string
  id: string
  register: UseFormRegisterReturn
}

export const RadioInput = ({ label, id, register }: RadioInputProps) => {
  return (
    <StyledRadioContainer>
      <input type='radio' id={id} value={label} {...register} />
      <label htmlFor={id}>{label}</label>
    </StyledRadioContainer>
  )
}
