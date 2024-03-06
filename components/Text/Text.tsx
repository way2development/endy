import React from 'react' // Required for Rich Text Editor (RTE)
import { TypographyVariants } from './Text.styled'

type Color =
  | 'gravy'
  | 'gravy90'
  | 'gravy80'
  | 'gravy70'
  | 'rubine'
  | 'white'
  | 'errorRed'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'largeBody'
  | 'mediumBody'
  | 'smallBody'
  | 'micro'
  | 'displaySerif'
  | 'displaySans'
  | 'price'
  | 'priceCrossed'
  | 'caption'

interface TypographyProps {
  element?: string
  display?: 'block' | 'inline'
  color: Color | string
  variant: Variant
  className?: string
  // className prop listed to enable extending styles with Styled Components
  // https://styled-components.com/docs/basics#styling-any-component
}

export const Text: React.FC<TypographyProps> = ({
  element,
  display = 'block',
  className,
  children,
  color = 'gravy',
  variant = 'mediumBody'
}) => {
  const TypographyComponent = TypographyVariants[variant]
  const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(variant)

  return (
    <TypographyComponent
      className={className}
      color={color}
      as={!isHeading && display === 'inline' ? 'span' : element}
    >
      {children}
    </TypographyComponent>
  )
}
