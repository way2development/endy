import { useEffect } from 'react'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { Dropdown } from '../Dropdown/Dropdown'

interface QuantitySelectorProps {
  hasQuantitySelector?: boolean | null
  locale: Locale
  setQty: (qty: number) => void
}

export const QuantitySelector = ({
  hasQuantitySelector,
  locale,
  setQty
}: QuantitySelectorProps) => {
  const localizedDictionary = dictionary[locale]
  if (!hasQuantitySelector) return null
  const options = [
    {
      id: `${localizedDictionary.individual}`,
      label: `${localizedDictionary.individual}`
    },
    {
      id: `${localizedDictionary.setOfTwo}`,
      label: `${localizedDictionary.setOfTwo}`
    }
  ]

  // if the page has the quantity selector component, qty defaults to the first option in the array
  const optionOnLoad = hasQuantitySelector ? options[0].id : null

  const optionLabelToNumber = (item: string) => {
    if (item === `${localizedDictionary.setOfTwo}`) {
      return 2
    } else if (item === `${localizedDictionary.individual}`) {
      return 1
    }
    return 1
  }

  useEffect(() => {
    setQty(optionOnLoad === `${localizedDictionary.setOfTwo}` ? 2 : 1)
  }, [])

  // Mobile
  const handleOptionChange = (optionID: string) => {
    const currentOption = options.find((option) => option.id === optionID)

    if (currentOption === undefined) return null

    setQty(optionLabelToNumber(currentOption.id))
  }

  // Desktop
  const handleOptionClick = (optionID: string) => {
    const currentOption = options.find((option) => option.id === optionID)

    if (currentOption === undefined) return null

    setQty(optionLabelToNumber(currentOption.id))
  }

  return (
    <>
      {hasQuantitySelector && (
        <Dropdown
          handleChange={(option) => handleOptionChange(option)}
          handleClick={(option) => handleOptionClick(option)}
          options={options}
          variant={'white'}
          isQuantitySelector={true}
        />
      )}
    </>
  )
}
