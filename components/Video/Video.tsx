import React from 'react'
import { useRef } from 'react'
import styled, { css } from 'styled-components'
import Plyr, { APITypes } from 'plyr-react'
import 'plyr-react/plyr.css'
import { theme } from '../../styles/theme'

export interface VideoProps {
  variant: 'standard' | 'mini'
  src: string
}

const StyledContainer = styled.div<{ variant: 'standard' | 'mini' }>`
  --plyr-color-main: ${theme.colors.rubine};
  --plyr-video-background: transparent;
  position: relative;
  width: 100%;

  // Overriding third party .plyr class min-width
  // so 2 videos side-by-side do not create horizontal scroll on mobile
  .plyr {
    min-width: 0;
    /* Removes black borders from video player */
    clip-path: inset(1px 1px);
  }

  ${({ variant }) =>
    variant === 'mini'
      ? css`
          button {
            --plyr-control-icon-size: 16px;
            position: absolute;
            background: ${theme.colors.white};
            color: ${theme.colors.gravy};
            border-color: ${theme.colors.gravy};
            border-radius: var(--plyr-control-icon-size);
            bottom: 1rem;
            right: 1rem;
          }
        `
      : ''}
`

// React.memo is a solve for issue where any update to State causes plyr to re-render
export const Video = React.memo(({ variant, src }: VideoProps) => {
  const miniOptions = {
    controls: ['play'],
    muted: true,
    hideControls: false
  }

  const standardOptions = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'captions',
      'fullscreen'
    ]
  }

  const plyrProps = {
    source: {
      type: 'video' as any,
      sources: [
        {
          src,
          type: 'video/mp4'
        }
      ]
    },
    options: variant === 'mini' ? miniOptions : standardOptions
  }
  const ref = useRef<APITypes>(null)
  return (
    <StyledContainer variant={variant}>
      <Plyr {...plyrProps} ref={ref} />
    </StyledContainer>
  )
})

// required since an arrow function doesn't give the component a displayName
Video.displayName = 'Video'
