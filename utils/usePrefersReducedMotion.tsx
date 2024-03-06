import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

// Custom React hook to determine if users have a user setting to reduce motion
// This hook specifically works with Nextjs and supports SSR
export function usePrefersReducedMotion() {
  // Default to no-animations, since we don't know what the
  // user's preference is on the server.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    // Set the true initial value, now that we're on the client:
    setPrefersReducedMotion(!window.matchMedia(QUERY).matches)

    // Register our event listener
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }

    // conditional to check matchMedia browser compatibility
    if (mediaQueryList?.addEventListener) {
      mediaQueryList.addEventListener('change', listener)
    }

    return () => {
      // conditional to check matchMedia browser compatibility
      if (mediaQueryList?.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener)
      }
    }
  }, [])

  return prefersReducedMotion
}
