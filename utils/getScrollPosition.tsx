import { useState, useEffect } from 'react'

export const getScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const updateScrollPosition = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition)
    return () => {
      window.removeEventListener('scroll', updateScrollPosition)
    }
  }, [scrollPosition])

  return scrollPosition
}
