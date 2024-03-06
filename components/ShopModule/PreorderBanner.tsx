import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text'
import { Locale } from '../../types/global-types'

import dictionary from '../../dictionary.json'

const StyledPreorderBannerContainer = styled.div`
  margin-bottom: ${theme.spacing.m};
`

const StyledPreorderBanner = styled(Text)`
  display: inline-block;
  border-radius: ${theme.borders.borderRadius};
  background-color: ${theme.colors.darkBlue};
  padding: ${theme.spacing.xs} ${theme.spacing.m};

  span {
    text-transform: uppercase;
    font-weight: ${theme.fontWeights.semibold};
  }
`

interface PreorderBannerProps {
  inventoryThreshold?: number
  locale: Locale
}

export const PreorderBanner = ({
  locale,
  inventoryThreshold
}: PreorderBannerProps) => {
  // TODO: Add in low inventory messaging when inventory tracking is available in Sanity. The prop inventoryThreshold will be used to build the condition.

  const localizedDictionary = dictionary[locale]

  return (
    <>
      <StyledPreorderBannerContainer>
        <StyledPreorderBanner
          color={'white'}
          variant={'smallBody'}
          display='inline'
        >
          <span>{localizedDictionary.limitedPreOrder} </span>
          {/* {localizedDictionary.reserveYoursToday} */}
        </StyledPreorderBanner>
      </StyledPreorderBannerContainer>
    </>
  )
}
