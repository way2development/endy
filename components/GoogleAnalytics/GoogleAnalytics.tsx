import Script from 'next/script'

import { ga, adwords } from './googleAnalyticsScripts'

export const NoScriptGoogleRemarketing = () => (
  <>
    <noscript>
      <div style={{ display: 'inline' }}>
        <img
          height='1'
          width='1'
          style={{ borderStyle: 'none' }}
          alt=''
          src='//googleads.g.doubleclick.net/pagead/viewthroughconversion/1007324636/?value=0&amp;guid=ON&amp;script=0'
        />
      </div>
    </noscript>
  </>
)

export const NoScriptGTM = () => (
  <>
    <noscript>
      <iframe
        title='Google Tag Manager'
        src='https://www.googletagmanager.com/ns.html?id=GTM-K5R2BC2'
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  </>
)

export const NoScriptGoogleOff = () => (
  <>
    <noscript>
      <a href='https://www.adtector.com'>
        <img
          style={{ visibility: 'hidden' }}
          src='https://adtector.com/pix.png'
          alt='Click Fraud Protection'
          aria-label='Learn more about Click Fraud Protection services'
        />
      </a>
    </noscript>
  </>
)

export const GoogleAnalytics = () => (
  <>
    <Script defer id={'google-analytics'} strategy={'afterInteractive'}>
      {ga}
    </Script>
    {/* GOOGLE OFF */}
    <Script
      defer
      id={'google-off'}
      strategy={'afterInteractive'}
      src='https://adtector.com/tectScript.js'
    ></Script>
    <Script
      defer
      id={'google-off-tracking'}
      strategy={'lazyOnload'}
      dangerouslySetInnerHTML={{
        __html: `RunTector(44);`
      }}
    ></Script>
  </>
)
