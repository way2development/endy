import { StyledVisuallyHiddenInput } from '../../styles/global.styled'
import { UseFormRegisterReturn } from 'react-hook-form'

interface HoneypotFieldProps {
  inputProps: UseFormRegisterReturn
  onChange: (value: boolean) => void
}

export const HoneypotField = ({ inputProps, onChange }: HoneypotFieldProps) => {
  return (
    <StyledVisuallyHiddenInput
      id='fullName'
      type='text'
      {...inputProps}
      onChange={(e) => onChange(true)}
    />
  )
}
