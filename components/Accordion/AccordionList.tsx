import { Fragment, useEffect, useState } from 'react'

import { StyledPageWidth } from '../../styles/global.styled'

import { AccordionItem, AccordionItemProps } from './AccordionItem'
import {
  StyledAccordionListSection,
  StyledAccordionsWrapper,
  StyledHeadingContainer
} from './Accordion.styled'

import { Text } from '../Text'
import { theme } from '../../styles/theme'

interface AccordionListProps {
  accordionItems: AccordionItemProps[]
  removeMargins?: boolean
  heading?: string
  bgColor?: { hex: string }
}
export const AccordionList = ({
  accordionItems,
  removeMargins = false,
  heading,
  bgColor
}: AccordionListProps) => {
  const [accordions, setAccordions] = useState(accordionItems)

  useEffect(() => {
    // get anchor ID from URL hash
    const anchorId = window.location.hash.slice(1)

    if (anchorId) {
      // Find the accordion button that corresponds to the hash
      const anchorEl = document.getElementById(anchorId)

      if (anchorEl) {
        const index = Number(anchorEl.getAttribute('data-index'))
        toggleItem(index)
      }
    }
  }, [])

  const toggleItem = (index: number) => {
    const accordionItemsCopy = [...accordionItems]
    const itemClicked = accordionItemsCopy[index]

    if (itemClicked) {
      itemClicked.showItem = !itemClicked.showItem
      accordionItemsCopy[index] = itemClicked

      setAccordions(accordionItemsCopy)
    }
  }
  const Container = removeMargins ? Fragment : StyledPageWidth
  return (
    <StyledAccordionListSection
      removeMargins={removeMargins}
      style={{
        backgroundColor: bgColor ? bgColor.hex : `${theme.colors.offWhite}`
      }}
    >
      <Container>
        {heading && (
          <StyledHeadingContainer>
            <Text variant={'h2'} color={'rubine'}>
              {heading}
            </Text>
          </StyledHeadingContainer>
        )}
        <StyledAccordionsWrapper removeMargins={removeMargins}>
          {accordions.map((item, index) => {
            return (
              <AccordionItem
                {...item}
                anchorUrl={item.anchorUrl}
                key={item.heading}
                index={index}
                showItem={item.showItem}
                toggleItem={toggleItem}
              />
            )
          })}
        </StyledAccordionsWrapper>
      </Container>
    </StyledAccordionListSection>
  )
}
