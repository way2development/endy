import { StyledButton, StyledTextButton } from './Button.styled'

export interface ButtonProps {
  /**
   * Optional click handler
   */
  onClick: () => void
  /**
   * Option to disable button (defaults to false)
   */
  isDisabled?: boolean
  /**
   * Must provide label description
   */
  label?: string | JSX.Element
  /**
   * Different variants to choose from
   */
  variant:
    | 'solid-rubine'
    | 'solid-gravy'
    | 'hollow-rubine'
    | 'hollow-gravy'
    | 'hollow-white'
    | 'block-line-gravy'
    | 'block-line-white'
    | 'inline'
  /**
   * Optional HTML classes to add to button. Commonly used for GTM
   */
  className?: string
}

export const Button = ({
  label,
  variant,
  isDisabled = false,
  onClick,
  className
}: ButtonProps) => {
  return (
    <>
      {variant !== 'inline' && !variant.includes('block-line') ? (
        <StyledButton
          type='button'
          variant={variant}
          onClick={onClick}
          disabled={isDisabled}
          className={className}
        >
          {label}
        </StyledButton>
      ) : (
        <StyledTextButton
          type='button'
          variant={variant}
          onClick={onClick}
          disabled={isDisabled}
          className={className}
        >
          {label}
        </StyledTextButton>
      )}
    </>
  )
}
