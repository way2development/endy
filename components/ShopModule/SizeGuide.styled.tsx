import styled from 'styled-components'
import { theme } from '../../styles/theme'
import Drawer from '@mui/material/Drawer'
import { mq } from '../../styles/theme'
import { Text } from '../Text'

export const StyledDrawer = styled(Drawer)`
  && {
    & .MuiPaper-root {
      background-color: ${theme.colors.offWhite};
      padding: ${theme.spacing.m} ${theme.spacing.xl};
      ${mq({
        width: ['100%', '', '600px']
      })};
    }

    & .MuiBackdrop-root {
      background-color: ${theme.colors.gravy60};
    }
  }
`

export const StyledUnderline = styled.div`
  position: relative;
  border-bottom: 1px solid ${theme.colors.gravy70};
  margin-top: ${theme.spacing.m};
`

export const StyledCloseContainer = styled(Text)`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.m};
`

export const StyledClose = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;

  img {
    transition: 0.5s ease;
  }
`
export const StyledBack = styled.button`
  background: none;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
    transition: ${theme.transitions.button};
  }
`
export const StyledSizingText = styled(Text)`
  div {
    grid-template-columns: 1fr 1fr;
    row-gap: ${theme.spacing.m};
    margin-bottom: 1rem;
  }
`

export const StyledHeading = styled(Text)`
  ${mq({
    marginBottom: [`${theme.spacing.m}`, '', `${theme.spacing.l}`]
  })};
`
