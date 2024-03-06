export const updateUnlockOffersLocalStorage = (item: string) => {
  const unlockOffers = localStorage.getItem('unlockOffers')
  if (!unlockOffers) {
    return null
  }
  const unlockOffersStorage = JSON.parse(unlockOffers)
  unlockOffersStorage[item] = true

  localStorage.setItem('unlockOffers', JSON.stringify(unlockOffersStorage))
}