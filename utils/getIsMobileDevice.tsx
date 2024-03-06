import { useEffect, useState } from 'react'

// getIsMobileDevice
// Use userAgent to detect if the site is being viewed on a mobile device
export function getIsMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(true)

  useEffect(() => {
    setIsMobileDevice(/Mobi|Android/i.test(navigator.userAgent))
  })

  return isMobileDevice
}
