import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledGrid } from '../Grid'
import { Locale } from '../../types/global-types'

export const StyledCustomerReviews = styled.div`
  ${mq({
    marginTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
    marginBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}

  ${StyledGrid} {
    padding: ${theme.spacing.l} 0;
    border-bottom: ${theme.borders.borderWidth} solid
      ${theme.borders.borderColor};
  }
`

export const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StyledReviewsHeader = styled.div`
  padding-bottom: ${theme.spacing.xl};

  ${mq({
    flexDirection: ['column-reverse', 'column-reverse', 'row'],
    alignItems: ['center', 'center', 'center']
  })};
`

export const StyledHeading = styled(Text)`
  margin-bottom: 0;
  ${mq({
    textAlign: ['center', '', 'left'],
    marginRight: ['', `${theme.spacing.m}`, `${theme.spacing.l}`],
    marginBottom: [`${theme.spacing.m}`, '0', '0']
  })}
`

export const StyledRating = styled(Text)`
  margin-bottom: 0;
  margin-right: ${theme.spacing.xs};
`

export const StyledRatingMicrocopy = styled(Text)`
  letter-spacing: ${theme.letterSpacing.s};
  text-transform: uppercase;

  ${mq({
    margin: [`${theme.spacing.s} 0`, `${theme.spacing.s} 0`, '0']
  })}
`

export const StyledCustomerDetails = styled.ul`
  list-style-type: none;
  position: relative;

  img {
    vertical-align: middle;
  }
`
export const StyledReviewContainer = styled.div`
  ${mq({
    borderRight: [
      'none',
      'none',
      `${theme.borders.borderWidth} solid ${theme.borders.borderColor}`
    ],
    margin: [
      `0 0 ${theme.spacing.m} 0`,
      `0 0 ${theme.spacing.m} 0`,
      `0 ${theme.spacing.xxs} 0 0`
    ]
  })}
`

export const StyledPostedDate = styled(Text)`
  margin-bottom: ${theme.spacing.s};
`

export const StyledReviewTitle = styled(Text)`
  margin: ${theme.spacing.xs} 0 ${theme.spacing.s};
`

export const StyledVerifiedBuyer = styled(Text)`
  top: 0;
  right: 0;

  ${mq({
    position: ['absolute', 'absolute', 'static']
  })}
`

export const StyledReviewContent = styled(Text)`
  min-height: 100px;
`

export const StyledVotingButton = styled.button`
  border: none;
  background: none;
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }
`

export const StyledVotingForm = styled.form`
  display: flex;
  justify-content: flex-end;
`
export const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

export const StyledVotingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > legend {
    margin-right: ${theme.spacing.s};
  }

  button:not(:last-child) {
    display: block;
    margin-right: ${theme.spacing.s};
  }
`

export const StyledErrorMessage = styled(Text)`
  margin: ${theme.spacing.l} auto;
  text-align: center;
`

export const StyledSearchInput = styled.input`
  background-color: ${theme.colors.offWhite};
  border: 1px solid ${theme.colors.gravy40};
  border-radius: ${theme.borders.borderRadius};
  padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.xs};
  width: 100%;
  min-height: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.m};

  &::placeholder {
    color: ${theme.colors.gravy80};
    opacity: 1;
  }
`

export const StyledInputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: ${theme.spacing.m};
    top: ${theme.spacing.m};
    bottom: ${theme.spacing.m};
  }
`

export const StyledRatingContainer = styled.div`
  display: flex;

  ${mq({
    flexDirection: ['column', 'row', ''],
    alignItems: ['center', 'row', 'flex-end']
  })}

  > *:not(:last-child) {
    ${mq({
      marginRight: [0, theme.spacing.xl, ''],
      marginBottom: [theme.spacing.s, '', 0]
    })}
  }
`

export const StyledRatingWrapper = styled.div`
  min-width: 230px;
  ${mq({
    textAlign: ['center', 'left', '']
  })}
`
export const StyledButtonDesktopContainer = styled.div`
  margin-top: ${theme.spacing.l};

  ${mq({
    display: ['none', 'block', '']
  })}
`

export const StyledButtonMobileContainer = styled.div`
  ${mq({
    display: ['block', 'none', ''],
    marginTop: [theme.spacing.s, '', 0]
  })}
`

export const StyledFilterSection = styled.div`
  ${mq({
    width: ['100%', '100%', '50%']
  })}
`

export const StyledFilterTitle = styled(Text)`
  margin: ${theme.spacing.m} 0;
`

export const StyledFilterHeading = styled.div`
  display: flex;
  justify-content: space-between;
`
export const StyledDropdownFilter = styled.div`
  ${mq({
    width: ['100%', '50%', '50%'],
    minWidth: ['', '', '275px']
  })}
`
export const StyledSleepPositionDropdownFilter = styled.div<{
  locale: Locale
}>`
  /* Copy is longer in French */
  ${({ locale }) =>
    locale === 'fr' &&
    css`
      ${mq({
        minWidth: ['100%', '48%', '350px']
      })}
    `}

  ${({ locale }) =>
    locale === 'en' &&
    css`
      ${mq({
        minWidth: ['100%', '48%', '275px']
      })}
    `}
`

export const StyledDropdownContainer = styled.div`
  display: flex;

  ${mq({
    flexWrap: ['wrap', 'wrap', 'unset'],
    justifyContent: ['space-between', 'space-between', 'space-between']
  })}

  ${StyledDropdownFilter} {
    ${mq({
      marginRight: ['', '', `${theme.spacing.l}`]
    })}
  }

  > div:first-child {
    ${mq({
      marginBottom: [`${theme.spacing.m}`, `${theme.spacing.m}`, '0']
    })}
  }
`

export const StyledKeywordButton = styled.button<{
  isSelected: boolean
}>`
  background-color: #e5e5e0;
  color: ${theme.colors.gravy};
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${theme.colors.gravy}` : `2px solid #e5e5e0`};
  border-radius: ${theme.borders.borderRadius};
  padding: ${theme.spacing.s} ${theme.spacing.m};
  letter-spacing: ${theme.letterSpacing.m};
  margin-bottom: ${theme.spacing.s};
  margin-right: ${theme.spacing.s};
  font-weight: ${({ isSelected }) =>
    isSelected
      ? `${theme.fontWeights.semibold}`
      : `${theme.fontWeights.regular}`};

  &:hover {
    border: 2px solid ${theme.colors.gravy};
    font-weight: ${theme.fontWeights.semibold};
  }
`

export const StyledNoResults = styled(Text)`
  text-align: center;
  margin-top: ${theme.spacing.l};
`

export const StyledTotalResultsContainer = styled.div`
  margin: ${theme.spacing.l} 0;
  border-bottom: ${theme.borders.borderWidth} solid ${theme.borders.borderColor};
`

export const StyledTotalResults = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledReviewHeaderContainer = styled.div`
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${theme.spacing.l};
  ${mq({
    display: ['', 'flex', 'flex']
  })}
`

export const StyledProductDropdown = styled.div`
  ${mq({
    minWidth: ['', '300px', '410px']
  })}
`
