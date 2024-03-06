import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import '../styles/index.css'
import { isBrowser } from '@lib/helpers'
import {
  SiteContextProvider,
  useSiteContext,
  useUpdateLocation,
  useUpdateLanguageSetting,
  useLanguageSetting
} from '@lib/context'

import { IpregistryClient } from '@ipregistry/client'

import { v4 as uuidv4 } from 'uuid'
import { setCookie, getCookie } from '../utils/cookies.ts'

const client = new IpregistryClient(process.env.IPREGISTRY_API_KEY)
const isProduction =
  process.env.NODE_ENV === 'production' && process.env.BUILD_ENV !== 'draft'
const isStaticSite = process.env.NODE_ENV === 'production'

const Site = ({ Component, pageProps }) => {
  const updateUserLocation = useUpdateLocation()
  const updateLanguageSetting = useUpdateLanguageSetting()
  const navigatorLanguage = useLanguageSetting()
  const context = useSiteContext()

  useEffect(() => {
    // TODO: Rename these later
    async function fetchUserLocation() {
      // Only call the Ipregistry API if user location is not already in state
      if (client && !context.userLocation) {
        const response = await client.originLookup()
        const locationData = response?.data?.location

        if (locationData) {
          updateUserLocation({
            city: locationData.city,
            province: locationData.region?.name,
            postalFSA: locationData.postal
          })
        }
      }
    }

    fetchUserLocation()
  }, [client])

  useEffect(() => {
    const siteLanguagePreference = JSON.parse(
      sessionStorage.getItem('siteLanguagePreference')
    )

    updateLanguageSetting(
      siteLanguagePreference?.prefersEnglish
        ? 'en-ca'
        : window.navigator.navigatorLanguage || window.navigator.language
    )
  }, [])

  const { data } = pageProps

  // intelligently add focus states if keyboard is used
  const handleFirstTab = (event) => {
    if (event.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add('is-tabbing')
        window.removeEventListener('keydown', handleFirstTab)
      }
    }
  }

  useEffect(() => {
    // TODO: use alternative to document.querySelector
    document.querySelector('body').style.width = '100%'

    window.addEventListener('keydown', handleFirstTab)
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  const pageID = useMemo(() => data?.page?.id, [data])

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => {
            document.body.classList.remove('overflow-hidden')
          }}
        >
          <Component {...pageProps} key={pageID} />
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}

const PromoCodeSelect = ({
  sales,
  selectedSaleId,
  updateSelectedSaleId,
  isLastChance,
  updateIsLastChance
}) => {
  return (
    <div
      style={{
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 'bold',
        display: 'flex',
        position: 'fixed',
        zIndex: 99999,
        bottom: '4.5rem',
        left: '0.5rem'
      }}
    >
      <div>
        <label htmlFor='sales'>Active Promo Code:</label>
        <select
          name='sales'
          id='sales'
          value={selectedSaleId}
          onChange={(e) => {
            return updateSelectedSaleId(e.target.value)
          }}
          style={{ padding: 0 }}
        >
          <option disabled value='default'>
            -- select promo code --
          </option>
          <option key='none' value='none'>
            None
          </option>
          {sales?.map((sale) => {
            const isDraft = sale._id.includes('drafts.')
            return (
              <option key={sale._id} value={sale._id}>
                {isDraft && 'draft - '}
                {sale.promoCode}
              </option>
            )
          })}
        </select>
      </div>
      <div style={{ borderLeft: '1px grey solid', paddingLeft: '12px' }}>
        <label htmlFor='isLastChance'>Last Chance:</label>
        <input
          type='checkbox'
          id='isLastChance'
          name='isLastChance'
          checked={isLastChance}
          onClick={(e) => {
            updateIsLastChance(e.target.checked)
          }}
        />
      </div>
    </div>
  )
}

const PreviewTag = ({ isPreviewMode, slug, router }) => {
  return (
    <div
      style={{
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 'bold',
        position: 'fixed',
        zIndex: 99999,
        bottom: '0.5rem',
        left: '0.5rem'
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          display: 'inline-block',
          border: `1px solid ${isPreviewMode ? 'green' : 'red'}`,
          backgroundColor: isPreviewMode ? 'green' : 'red',
          borderRadius: '100%'
        }}
      ></span>{' '}
      Live Preview |{' '}
      <button
        onClick={() => {
          router.push(
            `/api/${isPreviewMode ? 'exit-preview' : 'preview'}?secret=${
              process.env.SANITY_PREVIEW_SECRET
            }&slug=${slug}`
          )
        }}
      >
        {isPreviewMode ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  )
}

// Site wrapped with Context Providers
const MyApp = ({ Component, pageProps }) => {
  const { data, isPreviewMode } = pageProps
  const [selectedSaleId, updateSelectedSaleId] = useState('default')
  const router = useRouter()
  const [isLastChance, updateIsLastChance] = useState()

  useEffect(() => {
    const uuid = getCookie('uuid') || uuidv4()

    if (uuid) {
      setCookie('uuid', uuid, 90)
    }
  }, [])

  // Preserve Promo Code selection between refreshes
  useEffect(() => {
    if (!isProduction) {
      updateSelectedSaleId(localStorage.getItem('selectedSaleId') || 'default')
      updateIsLastChance(localStorage.getItem('isLastChance') || false)
    }
  }, [])

  useEffect(() => {
    if (!isProduction) {
      localStorage.setItem('selectedSaleId', selectedSaleId)
    }
  }, [selectedSaleId])

  useEffect(() => {
    if (!isProduction) {
      localStorage.setItem('isLastChance', isLastChance)
    }
  }, [isLastChance])

  return (
    <>
      <ThemeProvider enableSystem={false} disableTransitionOnChange>
        <SiteContextProvider data={{ ...data?.site }}>
          {!isProduction && data && (
            <>
              {isStaticSite && (
                <PreviewTag
                  isPreviewMode={isPreviewMode}
                  slug={`/${router?.state?.locale}${router?.state?.asPath}`}
                  router={router}
                />
              )}
              <PromoCodeSelect
                sales={data.sales}
                selectedSaleId={selectedSaleId}
                updateSelectedSaleId={updateSelectedSaleId}
                isLastChance={isLastChance}
                updateIsLastChance={updateIsLastChance}
              />
            </>
          )}
          <Site
            Component={Component}
            pageProps={{ ...pageProps, selectedSaleId, isLastChance }}
            router={router}
          />
        </SiteContextProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
