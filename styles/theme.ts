import facepaint from 'facepaint'

type Theme = {
  [key: string]: any
}

export const theme: Theme = {
  borders: {
    borderRadius: '5px',
    borderWidth: '1px',
    borderColor: 'rgba(36, 55, 70, .2)'
  },
  colors: {
    gravy: '#243746',
    gravy90: '#394b58',
    gravy80: '#505f6b',
    gravy70: '#65737d',
    gravy60: 'rgba(36, 55, 70, 0.6)',
    gravy40: 'rgba(36, 55, 70, 0.4)',
    gravy35: 'rgba(36, 55, 70, 0.35)',
    gravy30: 'rgba(36, 55, 70, 0.3)',
    gravy20: 'rgba(36, 55, 70, 0.2)', // hex code is #D8D8D8
    gravy10: 'rgba(36, 55, 70, 0.1)',
    rubine: '#c40058',
    darkBlue: '#596f8c',
    endyBlue: '#c5dce8',
    endyBlue40: '#e2ebef',
    mint: '#c9ded9',
    starYellow: '#ffd258',
    lineGrey: '#e5e5e0',
    offBlack: '#1d1916',
    offWhite: '#f6f6f4',
    white: '#ffffff',
    white70: 'rgba(255, 255, 255, 0.7)',
    errorRed: '#c61515',
    successGreen: 'rgba(6, 118, 61, 0.8)',
    warningYellow: '#ffd259',
    alpineWhite: '#ffffff', // currently same as regular white
    glacierBlue: '#b2c0cb',
    softSage: '#9BB1A8',
    stormGrey: '#a19ea1',
    saleMauve: '#bf99a6',
    salePeach: '#f6dcc7'
  },
  fonts: {
    wulkan: `'Wulkan', serif`,
    calibre: `'Calibre', 'Helvetica', sans-serif`
  },
  fontWeights: {
    regular: '400',
    semibold: '600',
    bold: '700'
  },
  mediaQuery: {
    tablet: '768px',
    desktop: '1025px',
    largeDesktop: '1440px'
  },
  spacing: {
    xxxs: '0.125rem', // 2px
    xxs: '0.25rem', // 4px
    xs: '0.5rem', // 8px
    s: '0.75rem', // 12px
    m: '1rem', // 16px
    l: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
    xxxl: '4rem' // 64px
  },
  letterSpacing: {
    xs: '0.5px',
    s: '1px',
    m: '2px'
  },
  pageMargin: ['20px', '75px', '75px'],
  transitions: {
    button: 'all 0.25s ease-in-out'
  }
}

// Facepaint: "Write media queries once, use everywhere."
// Documentation: https://github.com/emotion-js/facepaint#styled-components
export const mq = facepaint(
  Object.values(theme.mediaQuery).map((mq) => `@media(min-width: ${mq})`)
)

/*** 
 * Facepaint examples & notes
 
  width: ['', '40%']
  - No width property exists from 0px - 767px
  - Width is 40% for 768px upwards.

  textAlign: ['center', 'left', 'right']
  - Text is aligned 'center' from 0 - 767px
  - Text is aligned 'left' from 768px - 1025px
  - Text is aligned 'right' from 1025px upwards.
  
  * Only use empty strings ('') when...
  - A style does not need to be specified because an CSS default is already applied
  - You need to explicitly remove a style for a specific breakpoint
*/
