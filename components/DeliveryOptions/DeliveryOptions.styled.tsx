import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text/Text'

export const StyledDeliveryOptionsContainer = styled.div`
  transition: opacity 500ms ease-in-out;
  opacity: 1;
  width: 100%;
  border: 1px solid ${theme.colors.lineGrey};
  border-radius: ${theme.borders.borderRadius};
  margin-top: ${theme.spacing.s};
`
export const StyledDeliveryOptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.m};
`

export const StyledDeliveryOptionMessage = styled(Text)`
  width: 100%;
  margin-left: ${theme.spacing.m};
`

export const StyledModalButton = styled.button`
  font-size: var(--font-size-small);
  font-weight: ${theme.fontWeights.regular};
  line-height: var(--line-height-secondary);
  color: ${theme.colors.gravy70};
  cursor: pointer;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  text-decoration: underline;
`
