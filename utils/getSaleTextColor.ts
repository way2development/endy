// function takes in sale themeColor or bgColor to determine if the text should be white or gravy
// TODO : our text colors are no longer determinant on the sale themeColor (since we always use endyBlue40: '#e2ebef'). Tech debt to remove the getSaleTextVariantColor, getSaleTextHexColor, and getSaleTextRBGAColor helper functions
const hexColors = ['#243746', '#c40058', '#596f8c']

export const getSaleTextVariantColor = (bgColor: string | undefined) => {
  if (!bgColor) return 'gravy'
  if (hexColors.includes(bgColor)) {
    return 'white'
  } else {
    return 'gravy'
  }
}

export const getSaleTextHexColor = (bgColor: string | undefined) => {
  if (!bgColor) return '#243746'

  if (hexColors.includes(bgColor)) {
    return '#ffffff'
  } else {
    return '#243746'
  }
}

export const getSaleTextRBGAColor = (bgColor: string | undefined) => {
  if (!bgColor) return '#243746'

  if (hexColors.includes(bgColor)) {
    return 'rgba(255, 255, 255, 0.3)'
  } else {
    return 'rgba(36, 55, 70, 0.3)'
  }
}

// this is a new function that should stay after the TODO is complete. It translates 'gravy' and 'white' to their hex values with an optional opacity parameter.
export const getTextHexColor = (textColor: string, opacity?: number) => {
  if (textColor === 'gravy') {
    return '#243746' + (opacity ? opacity : '')
  } else if (textColor === 'white') {
    return '#ffffff' + (opacity ? opacity : '')
  } else {
    return '#243746'
  }
}
