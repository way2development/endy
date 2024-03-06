export const isValidEmailCheck = (email: string) => {
  const regex =
    /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  return regex.test(email)
}

export const isValidPhoneCheck = (phone: string) => {
  const regex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
  return regex.test(phone)
}

export const formatPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value.replace(/\D/g, '')
  e.target.value = input
}

export const isValidPostalCodeCheck = (postalCode: string) => {
  const postalCodeRegex = new RegExp(
    /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i
  )

  return postalCodeRegex.test(postalCode)
}
