import { FC } from 'react'
import {
  StyledTooltip,
  StyledMessageContainer,
  StyledErrorTooltip
} from './Tooltip.styled'
import { Text } from '../Text'

interface TooltipProps {
  /**
   * Image src for the icon
   */
  icon: string
  /**
   * Text content to show in the tooltip
   */
  text: string
  /**
   * Positioning
   */
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export const Tooltip = ({
  icon,
  text,
  top,
  left,
  right,
  bottom
}: TooltipProps) => {
  return (
    <StyledTooltip>
      <img src={icon} alt='' />
      <StyledMessageContainer
        top={top}
        left={left}
        right={right}
        bottom={bottom}
      >
        <Text variant={'micro'} color={'gravy70'}>
          {text}
        </Text>
      </StyledMessageContainer>
    </StyledTooltip>
  )
}

export const InputTooltip: FC<{
  showTooltip: boolean
  top?: string
  left?: string
  isInline?: boolean
}> = ({ showTooltip, children, top, left, isInline = true }) => {
  return (
    <StyledErrorTooltip
      showTooltip={showTooltip}
      isInline={isInline}
      top={top}
      left={left}
    >
      {children}
    </StyledErrorTooltip>
  )
}
