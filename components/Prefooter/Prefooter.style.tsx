import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Text } from '../Text'

export const StyledImgContainer = styled.div`
  width: 100%;
  height: 200px;
  /* TODO: Update breakpoints with global breakpoints once available */
  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1025px) {
    height: 650px;
  }
`

export const StyledPrefooter = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  @media (min-width: 1025px) {
    position: relative;
    margin-bottom: 0;
  }
`

export const StyledTextContainer = styled.div`
  margin: ${theme.spacing.l} 22px 0;

  text-align: center;

  @media (min-width: 1025px) {
    margin-top: ${theme.spacing.xxxl};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`

export const StyledHeading = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledSubcopy = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledDisclaimer = styled(Text)`
  margin: ${theme.spacing.m} 0;
`

export const StyledPillContainer = styled.div<{ color: string | undefined }>`
  position: relative;
  margin-bottom: ${theme.spacing.m};

  span {
    position: relative;
    top: auto;
    right: auto;
    ${({ color }) =>
      color &&
      `
        border: 2px dotted var(--${color});
        color: var(--${color});
      `}
  }
`
