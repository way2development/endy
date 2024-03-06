import React, { useEffect, useState, useContext } from 'react'
import Script from 'next/script'
import dictionary from '../dictionary.json'
import { isBrowser } from '../lib/helpers'

const HeadElevar = () => {
  return (
    <>
      {/* Initialization Script - Must be available before any data layer pushes occur */}
      <Script
        type='text/javascript'
        id='initialize-elevar-data-layer-object'
        dangerouslySetInnerHTML={{
          __html: `window.ElevarDataLayer = window.ElevarDataLayer ?? []`
        }}
      />

      <Script
        type='module'
        id='initialize-elevar-data-layer'
        dangerouslySetInnerHTML={{
          __html: `try {
            const response = await fetch("https://shopify-gtm-suite.getelevar.com/configs/7ac0a78ba38394698dcb31465f1fc35561e48cc2/config.json");
            const config = await response.json();
            const scriptUrl = config.script_src_custom_pages;
        
            if (scriptUrl) {
              const { handler } = await import(scriptUrl);
              await handler(config);
            }
          } catch (error) {
            console.error("Elevar Error:", error);
          }`
        }}
      />
    </>
  )
}

export default HeadElevar
