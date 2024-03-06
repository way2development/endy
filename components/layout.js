import React, { useState, useEffect, useRef } from 'react'
import { buildPageProps } from '@lib/buildPage'
import Cart from './Cart/Cart'
import HeadSEO from './head-seo'
import HeadElevar from './head-elevar'
import { Modal } from './Modal'

import SiteHead from './SiteHead/SiteHead'

import {
  GoogleAnalytics,
  NoScriptGoogleRemarketing,
  NoScriptGTM,
  NoScriptGoogleOff
} from './GoogleAnalytics'
import { GlobalAnalytics } from './GlobalAnalytics'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { UnlockOffersModal } from './UnlockOffersModal'
import { StyledSkipLink } from '../styles/global.styled'
import { getIsMobileDevice } from '../utils/getIsMobileDevice'
import { isSaleActive } from '../utils/sales.ts'
import { setCookie, getCookie } from '../utils/cookies.ts'
import styled from 'styled-components'
import dictionary from '../dictionary.json'

const StyledMain = styled.main`
  background-color: ${({ backgroundColor }) =>
    backgroundColor && `${backgroundColor}`};
`

const Layout = ({
  page = {},
  global = {},
  schema,
  children,
  data,
  locale,
  sales,
  backgroundColor,
  productStickyBarRef,
  showStickyBar
}) => {
  const { footer, pencilBanner, navigation, settings } = global
  const { links, groups, badgeImage } = navigation.props
  const {
    logo,
    languages,
    menuHeading1,
    menuList1,
    menuHeading2,
    menuList2,
    menuHeading3,
    menuList3,
    socialIcons,
    digiCertImg,
    subfooterLinks
  } = footer.props
  const [showUnlockOffersModal, setShowUnlockOffersModal] = useState(false)
  const [unlockOffersData, setUnlockOffersData] = useState({})
  const [showExitModal, setShowExitModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const extoleRef = useRef(null)
  const extoleMobileRef = useRef(null)
  const [isLastChance, setIsLastChance] = useState(false)
  const localizedDictionary = dictionary[locale]

  useEffect(() => {
    setIsLastChance(sales?.isLastChance)
  }, [sales?.isLastChance])

  useEffect(() => {
    // prettier-ignore
    (function(c,e,k,l,a){c[e]=c[e]||{};for(c[e].q=c[e].q||[];a<l.length;)k(l[a++],c[e])})(window,"extole",function(c,e){e[c]=e[c]||function(){e.q.push([c,arguments])}},["createZone"],0);

    if (locale == 'en') {
      window.extole.createZone({
        name: 'global_footer',
        element: extoleRef.current
      })

      if (extoleMobileRef.current) {
        window.extole.createZone({
          name: 'mobile_header',
          element: extoleMobileRef.current
        })
      }
    }
  }, [showMobileMenu])

  useEffect(() => {
    if (unlockOffersData?.isModalDismissed === false) {
      setTimeout(() => {
        setShowUnlockOffersModal(true)
      }, 10000)
    }
  }, [unlockOffersData])

  useEffect(() => {
    const unlockOffersStorage = JSON.parse(localStorage.getItem('unlockOffers'))

    if (!unlockOffersStorage) {
      const storageProps = {
        isEmailSubscribed: false,
        isPhoneSubscribed: false,
        isModalDismissed: false
      }
      setUnlockOffersData(storageProps)
      localStorage.setItem('unlockOffers', JSON.stringify(storageProps))
    } else {
      setUnlockOffersData(unlockOffersStorage)
    }

    const exitModalStorage = JSON.parse(localStorage.getItem('exitModal'))

    // create local storage for the exit modal if it doesn't exist and if a sale is active
    if (!exitModalStorage && sales) {
      const storageProps = {
        hasSeenMainModal: false,
        hasSeenLCModal: false
      }

      return localStorage.setItem('exitModal', JSON.stringify(storageProps))
    }

    // remove exit modal local storage if the storage exists and the sale is inactive
    if (!sales && !isSaleActive(sales?.startDate, sales?.endDate)) {
      localStorage.removeItem('exitModal')
    }
  }, [])

  const updateLocaleStorage = (e) => {
    const exitModalStorage = JSON.parse(localStorage.getItem('exitModal'))

    // If there's no sale or no local storage for the exit modal, exit this function
    if (!sales || exitModalStorage === null) return

    // Show main sale exit modal
    if (e.clientY < 10 && !exitModalStorage.hasSeenMainModal) {
      setShowExitModal(true)
      exitModalStorage.hasSeenMainModal = true
      localStorage.setItem('exitModal', JSON.stringify(exitModalStorage))
    }
    // Capture discount from URL Param
    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const promoCode = urlParams.has('discount') && urlParams.get('discount')

    if (promoCode) {
      setCookie('promoCode', promoCode, 1)
    }
    // Show last chance sale exit modal
    if (
      e.clientY < 10 &&
      sales?.isLastChance &&
      !exitModalStorage.hasSeenLCModal
    ) {
      setShowExitModal(true)
      exitModalStorage.hasSeenLCModal = true
      localStorage.setItem('exitModal', JSON.stringify(exitModalStorage))
    }
  }

  const references = data
    ? Object.keys(data.references || {}).reduce((allReferences, type) => {
        return allReferences.concat(data.references[type])
      }, [])
    : []

  const crossSellRankings = data?.global?.crossSellRankings
    ? buildPageProps(data.global.crossSellRankings, {
        locale,
        references
      })
    : {}

  const specialOffers = data?.global?.specialOffers
    ? buildPageProps(data.global.specialOffers, {
        locale,
        references
      })
    : {}

  const isMobile = getIsMobileDevice()

  const hasExitModal = sales?.modals?.exitModal !== undefined

  return (
    <div onMouseOut={(e) => updateLocaleStorage(e)}>
      <HeadElevar />
      <SiteHead />
      <HeadSEO page={page} settings={settings} schema={schema} />
      <Cart
        references={references}
        products={data?.references?.products}
        productVariants={data?.references?.productVariants}
        textiles={global?.shopSettings?.cartTextiles}
        crossSellRankings={crossSellRankings}
        specialOffers={specialOffers}
        locale={locale}
        sales={sales}
      />
      {/* TODO: See if we can consolidate into 1 null check. hasExitModal and isLastChance checks might be redundant */}
      {sales && hasExitModal && (
        <Modal
          showModal={showExitModal}
          onClose={() => setShowExitModal(false)}
          locale={locale}
          isExitModal={true}
        >
          {isLastChance && sales?.lastChance?.exitModal
            ? React.cloneElement(sales?.lastChance?.exitModal, {
                onButtonClick: () => setShowExitModal(false),
                locale
              })
            : React.cloneElement(sales?.modals?.exitModal, {
                onButtonClick: () => setShowExitModal(false),
                locale
              })}
        </Modal>
      )}
      <StyledSkipLink href={`#content`}>
        {localizedDictionary.skipLink}
      </StyledSkipLink>
      {pencilBanner}
      <Navigation
        links={links}
        groups={groups}
        badgeImage={badgeImage}
        sales={sales}
        locale={locale}
        extoleRef={extoleRef}
        extoleMobileRef={extoleMobileRef}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      <StyledMain id='content' backgroundColor={backgroundColor}>
        {children}
      </StyledMain>
      <Footer
        logo={logo}
        languages={languages}
        menuHeading1={menuHeading1}
        menuList1={menuList1}
        menuHeading2={menuHeading2}
        menuList2={menuList2}
        menuHeading3={menuHeading3}
        menuList3={menuList3}
        socialIcons={socialIcons}
        digiCertImg={digiCertImg}
        subfooterLinks={subfooterLinks}
        locale={locale}
        extoleRef={extoleRef}
      />
      {showUnlockOffersModal && (
        <UnlockOffersModal
          locale={locale}
          isMobile={isMobile}
          sales={sales}
          setShowUnlockOffersModal={setShowUnlockOffersModal}
          showUnlockOffersModal={showUnlockOffersModal}
        />
      )}
      <GoogleAnalytics />
      <GlobalAnalytics locale={locale} />
      <NoScriptGoogleOff />
    </div>
  )
}

export default Layout
