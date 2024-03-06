import Script from 'next/script'
import { Locale } from '../../types/global-types'

import { ga4 } from './globalAnalyticsScripts'

export interface GlobalAnalyticsProps {
  /** Selected Location **/
  locale: Locale
}

export const GlobalAnalytics = ({ locale }: GlobalAnalyticsProps) => {
  return (
    <>
      <Script async id={'kickdynamic'} strategy={'afterInteractive'}>
        {locale === 'en'
          ? `var kd = kd || []; 
              (function() {
                var scriptId = "kd-js-api";
                  if (document.getElementById(scriptId)) return;
                    var js = document.createElement("script"); js.id = scriptId;
                    js.setAttribute("merchantId", "ENDYEN69MNZQARTCX8S2");
                    js.setAttribute("defer", true);
                    js.src = "https://cdn.kickdynamic.com/kd-lynx-v1.js";
                    var scriptTag = document.getElementsByTagName("script")[0];
                scriptTag.parentNode.insertBefore(js, scriptTag);
              })();`
          : `var kd = kd || []; 
              (function() {
                var scriptId = "kd-js-api";
                  if (document.getElementById(scriptId)) return;
                    var js = document.createElement("script"); js.id = scriptId;
                    js.setAttribute("merchantId", "ENDYFR67I3XU627UP66K");
                    js.setAttribute("defer", true);
                    js.src = "https://cdn.kickdynamic.com/kd-lynx-v1.js";
                    var scriptTag = document.getElementsByTagName("script")[0];
                scriptTag.parentNode.insertBefore(js, scriptTag);
        })();`}
      </Script>
      <Script defer id={'ga4-tag'} strategy={'lazyOnload'}>
        {ga4}
      </Script>
    </>
  )
}
