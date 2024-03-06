import { Text } from '../Text'

import {
  StyledSection,
  StyledWrapper,
  StyledHeading,
  StyledListContainer
} from './TermsAndConditions.styled'

import { StyledPageWidth } from '../../styles/global.styled'

interface TermsAndConditionsProps {
  heading: string
  body: HTMLElement | JSX.Element
}

export const TermsAndConditions = ({
  heading,
  body
}: TermsAndConditionsProps) => {
  return (
    <StyledSection id='terms-conditions'>
      <StyledPageWidth>
        <StyledWrapper>
          <StyledHeading variant={'h2'} color={'gravy'}>
            {heading}
          </StyledHeading>
          <StyledListContainer>
            <Text color={'gravy'} variant={'mediumBody'}>
              {body}
            </Text>
          </StyledListContainer>
        </StyledWrapper>
      </StyledPageWidth>
    </StyledSection>
  )
}
