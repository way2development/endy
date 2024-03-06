import styled from 'styled-components'
import { theme, mq } from '../../styles/theme'

// Footer.tsx styles
export const StyledFooter = styled.footer`
  background-color: ${theme.colors.gravy};
`

export const StyledContentContainer = styled.div`
  display: grid;

  ${mq({
    gridTemplateColumns: ['1fr', 'repeat(3, 1fr)', 'repeat(6, 1fr)'],
    gridTemplateRows: ['0.25fr repeat(3, 1fr)', 'auto', '1fr'],
    padding: [`${theme.spacing.l} 0`, '', `${theme.spacing.xxl} 0`],
    rowGap: ['', `${theme.spacing.l}`, 'initial']
  })}
`

export const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${mq({
    gridColumnStart: ['1', '1', '1'],
    gridColumnEnd: ['4', '4', '1'],
    gridRowStart: ['5', '3', '1'],
    gridRowEnd: ['5', '3', '1'],
    justifyContent: ['center', '', 'initial'],
    alignItems: ['center', '', 'initial'],
    paddingRight: ['0', '', `${theme.spacing.m}`]
  })}
`

export const StyledLogo = styled.div`
  ${mq({
    width: ['initial', '', '100%'],
    margin: [`${theme.spacing.l}`, '', '0 0 20px 0']
  })}

  img {
    max-width: 100px;
  }
`

export const StyledLanguageList = styled.ul`
  list-style: none;
  letter-spacing: 1px;
  text-transform: uppercase;

  ${mq({
    marginRight: ['0', '', `${theme.spacing.xxxl}`],
    display: ['flex', '', 'initial'],
    justifyContent: ['space-between', '', 'initial'],
    width: ['183px', '', 'initial']
  })}
`

export const StyledLanguageLink = styled.li`
  ${mq({
    marginBottom: ['0', '', '5px']
  })}

  a {
    color: white;
    text-decoration: none;
  }
`

// first column requires targeted styling due to extole inclusion
export const StyledMenuColumnOne = styled.div`
  display: flex;
  flex-direction: column;

  ${mq({
    textAlign: ['center', '', 'initial'],
    borderTop: [`1px solid ${theme.colors.white}30`, '', 'initial'],
    borderBottom: [`1px solid ${theme.colors.white}30`, '', 'initial']
  })}
`

export const StyledConnectContainer = styled.div`
  display: flex;
  ${mq({
    gridColumnStart: ['1', '', '5'],
    gridColumnEnd: ['4', '', '7'],
    gridRowStart: ['1', '', 'initial'],
    gridRowEnd: ['1', '', 'initial'],
    justifyContent: ['center', '', 'initial'],
    paddingBottom: [`${theme.spacing.xs}`, '', 'initial']
  })}
`

export const StyledConnectContent = styled.div`
  display: flex;
  flex-direction: column;
  ${mq({
    width: ['100%', '', 'initial']
  })}

  div p {
    ${mq({
      textAlign: ['center', '', 'initial']
    })}
  }
`

export const StyledIconsDesktop = styled.div`
  ${mq({
    display: ['none', '', 'flex'],
    justifyContent: ['initial', '', 'space-between']
  })}
`
export const StyledIconsMobile = styled.div`
  ${mq({
    display: ['flex', '', 'none'],
    alignItems: ['center', '', 'initial'],
    marginTop: [`${theme.spacing.m}`, '0', '']
  })}
`

export const StyledTermsContainer = styled.div`
  background-color: ${theme.colors.gravy80};
  height: 44px;
  display: flex;
`

export const StyledTerms = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const StyledTermsLink = styled.li`
  margin: 0 ${theme.spacing.m} 0;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    ${mq({
      fontSize: ['13px', '', '16px']
    })}

    &:hover {
      text-decoration: underline;
    }
  }
`

// DigiCertLogo.tsx styles
export const StyledDigiCertLogo = styled.div`
  padding: 0 5px;
  width: 57px;

  ${mq({
    position: ['initial', '', 'relative'],
    top: ['initial', '', '2.5rem']
  })}

  img {
    opacity: 0.7;
  }
`

// SocialLinks.tsx styles
export const StyledSocialIconContainer = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 0;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
`

export const StyledSocialIcon = styled.li<{ isSocialActive: boolean }>`
  opacity: ${({ isSocialActive }) => (isSocialActive ? '0.25' : '1')};

  &:hover {
    opacity: 1;
  }

  a {
    display: block;
    padding: 0 3px;
    text-align: center;

    &:first-child {
      margin-left: 0;
    }
  }
`
