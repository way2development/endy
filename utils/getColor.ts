export const getColor = (variant: string) => {
  const variantArr = variant.split('-')
  return variantArr[variantArr.length - 1]
}
