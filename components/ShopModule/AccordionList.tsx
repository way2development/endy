import { useState, SyntheticEvent } from 'react'

import Typography from '@mui/material/Typography'
import { Text } from '../Text'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  StyledAccordionList
} from './Accordion.styled'

import { StyledSemibold } from '../../styles/global.styled'
export interface AccordionListProps {
  accordionItems: AccordionItemProps[]
}

export interface AccordionItemProps {
  heading: string
  content: JSX.Element | JSX.Element[]
  icon?: string
}

const openIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/1fd737aa5c578398a41e30d5207723fedf52895f-12x13.svg'

const closeIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/c945f900586c7ba11c2cda490662691b748658f7-13x3.svg'

export const AccordionList = ({ accordionItems }: AccordionListProps) => {
  const [isExpanded, setIsExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: SyntheticEvent, updateExpanded: boolean) => {
      setIsExpanded(updateExpanded ? panel : false)
    }

  return (
    <StyledAccordionList>
      {accordionItems.map((item, index) => {
        return (
          <Accordion
            expanded={isExpanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            key={index}
          >
            <AccordionSummary
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Text variant={'mediumBody'} color={'gravy'} element={'span'}>
                <StyledSemibold>{item.heading}</StyledSemibold>
              </Text>
              {/* TODO: Update to icon component when available */}
              <img
                src={isExpanded === `panel${index}` ? closeIcon : openIcon}
                alt=''
              />
            </AccordionSummary>
            <AccordionDetails>
              <Text variant={'mediumBody'} color={'gravy'} element={'div'}>
                {item.content}
              </Text>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </StyledAccordionList>
  )
}
