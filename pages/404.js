import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFoundPage = ({ locale }) => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/', undefined, { shallow: true, locale: locale })
  }, [])

  return null
}

export default NotFoundPage
