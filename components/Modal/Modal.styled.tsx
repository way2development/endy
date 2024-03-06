import styled from 'styled-components'
import DialogContentText from '@mui/material/DialogContentText'
export const StyledClose = styled.button<{
  isExitModal?: boolean
}>`
  background: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  padding: 0;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  ${({ isExitModal }) =>
    isExitModal &&
    `
    display: none;
  `}
`
export const StyledDialogContentText = styled(DialogContentText)`
  button {
    text-align: center;
  }
`
