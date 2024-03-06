export const optimizeStyle = `.async-hide { opacity: 0 !important}`

export const optimizeScript = `
  (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  })(window,document.documentElement,'async-hide','dataLayer',1000,
  {'GTM-PRKSGXB':true});
`

export const ga = `
  window['GoogleAnalyticsObject'] = 'ga';
  window['ga'] = window['ga'] || function() {
    (window['ga'].q = window['ga'].q || []).push(arguments)
  };
`

export const adwords = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-59164246-1');
  gtag('config', 'AW-1007324636');
`
