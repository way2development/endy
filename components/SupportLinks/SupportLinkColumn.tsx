import { Locale } from '../../types/global-types'
import { useState } from 'react'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Text } from '../Text'
import {
  StyledGridItem,
  StyledGridIcon,
  StyledMicrocopy,
  StyledNumber
} from './SupportLinks.styled'
import { Button } from '../Button'
import dictionary from '../../dictionary.json'
import { CtaLink } from '../CtaLink'
import { hasSimilarWords } from '../../utils/grammar'
import { StyledSemibold } from '../../styles/global.styled'

export interface SupportLinkColumnProps {
  subcopy: string
  heading: string
  badgeImage: BadgeImageProps
  locale: Locale
  _key: string
}

declare global {
  interface Window {
    adaEmbed: any
  }
}

export const SupportLinkColumn = ({
  subcopy,
  heading,
  badgeImage,
  locale,
  _key
}: SupportLinkColumnProps) => {
  const [showNumber, setShowNumber] = useState(false)
  const localizedDictionary = dictionary[locale]

  return (
    <StyledGridItem key={_key}>
      <StyledGridIcon>
        {badgeImage && (
          <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
        )}
      </StyledGridIcon>
      <Text color='rubine' variant='h4'>
        {heading}
      </Text>
      <StyledMicrocopy color='gravy' variant='mediumBody'>
        {subcopy}
      </StyledMicrocopy>

      {hasSimilarWords(localizedDictionary.email, heading) && (
        <Text color='gravy' variant='mediumBody'>
          <StyledSemibold>
            <CtaLink
              variant='inline'
              url={`mailto:${localizedDictionary.endyEmail}`}
              label={localizedDictionary.endyEmail}
            />
          </StyledSemibold>
        </Text>
      )}

      {hasSimilarWords(localizedDictionary.callEndy, heading) && (
        <Text color='gravy' variant='mediumBody'>
          <StyledSemibold>
            <Button
              onClick={() => {
                setShowNumber(!showNumber)
              }}
              label={
                <>
                  <span>{localizedDictionary.callEndy}</span>
                  <StyledNumber>
                    {showNumber && localizedDictionary.endyPhoneNumber}
                  </StyledNumber>
                </>
              }
              variant='inline'
            />
          </StyledSemibold>
        </Text>
      )}

      {hasSimilarWords(localizedDictionary.chat, heading) && (
        <Text color='gravy' variant='mediumBody'>
          <StyledSemibold>
            <Button
              onClick={() => window.adaEmbed.toggle()}
              label={localizedDictionary.chatWithSupport}
              variant='inline'
            />
          </StyledSemibold>
        </Text>
      )}
    </StyledGridItem>
  )
}
