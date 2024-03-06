// Removes articles from product names in order to form proper sentences
export const getProductNameWithoutArticles = (productName: string) => {
  return productName
    .replace(/The |Le |La |L' |Endy/g, '')
    .trim()
    .toLowerCase()
}

export const hasSimilarWords = (sentence1: string, sentence2: string) => {
  const wordSet1 = new Set(sentence1.toLowerCase().split(/\W+/))
  const wordSet2 = new Set(sentence2?.toLowerCase().split(/\W+/))
  return [...wordSet1].some((word) => wordSet2.has(word))
}

export const lowercaseFirstLetter = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1)
}
