import { styled as styledMui } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

import { theme } from '../../styles/theme'
import styled from 'styled-components'

export const Accordion = styledMui((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  backgroundColor: `${theme.colors.offWhite}`,
  borderBottom: `1px solid ${theme.borders.borderColor}`,

  '& .Mui-focusVisible': {
    backgroundColor: `${theme.colors.offWhite}`,
    outline: '5px auto rgb(50, 115, 220)'
  }
}))

export const AccordionSummary = styledMui((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  backgroundColor: `${theme.colors.offWhite}`,
  padding: 0,
  paddingRight: `${theme.spacing.m}`,

  '& .MuiAccordionSummary-content': {
    justifyContent: 'space-between'
  }
}))

export const AccordionDetails = styledMui(MuiAccordionDetails)(() => ({
  padding: 0,
  backgroundColor: `${theme.colors.offWhite}`,
  marginBottom: `${theme.spacing.m}`,
  button: {
    textAlign: 'left'
  }
}))

export const StyledAccordionList = styled.div`
  margin-bottom: ${theme.spacing.m};
`
