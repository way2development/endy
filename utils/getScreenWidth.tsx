import { useState, useEffect } from 'react'

export const getScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth))

    return () =>
      window.removeEventListener('resize', () =>
        setScreenWidth(window.innerWidth)
      )
  }, [screenWidth])
  return screenWidth
}
