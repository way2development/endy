import { AnimatePresence } from 'framer-motion'

import {
  StyledAccordionItem,
  StyledAccordionItemHeading,
  StyledButton,
  StyledContent
} from './Accordion.styled'

import { Text } from '../Text'

import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

export interface AccordionItemProps {
  anchorUrl?: string
  heading: string
  content: JSX.Element | JSX.Element[]
  toggleItem: (index: number) => void
  showItem: boolean
  // Index for when there are multiple accordion items in an Accordion list
  index?: number
  // Custom CLOSE icon for accordion item
  icon?: string
}

const closeIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/7c498bc282aed9b4c6685490068af6f2cc4c2e56-48x48.svg'

export const AccordionItem: React.FC<AccordionItemProps> = ({
  anchorUrl,
  content,
  heading,
  // If this is a singular Accordion Item, set the index to 0
  index = 0,
  showItem = false,
  toggleItem,
  icon = closeIcon
}) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <StyledAccordionItem>
      <StyledButton
        data-index={index}
        onClick={() => toggleItem(index)}
        aria-expanded={showItem}
        id={anchorUrl}
        aria-controls={anchorUrl + '-panel'}
        showItem={showItem}
      >
        {/* TODO: Typography/accessibility audit */}
        <StyledAccordionItemHeading
          element={'h2'}
          color={'gravy'}
          variant={'h5'}
        >
          {heading}
        </StyledAccordionItemHeading>
        {/* TODO: Update the icon to the Icon component when ready */}
        {/* Icon must be in CLOSE position for css transition to be accurate */}
        <img src={icon} alt='' />
      </StyledButton>

      {!prefersReducedMotion ? (
        <AnimatePresence initial={false}>
          {showItem && (
            <StyledContent
              initial='collapsed'
              animate='expanded'
              exit='collapsed'
              variants={{
                expanded: { height: 'auto' },
                collapsed: { height: 0 }
              }}
              transition={{ duration: 0.5, ease: 'linear' }}
              id={anchorUrl + '-panel'}
              role='region'
              aria-labelledby={heading}
            >
              <Text variant={'mediumBody'} color={'gravy'} element={'div'}>
                {content}
              </Text>
            </StyledContent>
          )}
        </AnimatePresence>
      ) : (
        showItem && <StyledContent>{content}</StyledContent>
      )}
    </StyledAccordionItem>
  )
}
