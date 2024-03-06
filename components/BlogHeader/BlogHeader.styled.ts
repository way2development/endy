import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

import { StyledNavList } from '../BlogArticleHero/BlogArticleHero.styled'

export const StyledNavigationWrapper = styled.nav`
  justify-content: center;
  display: flex;

  a {
    position: relative;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.gravy};
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -3px;
      left: 0;
      transform: scaleX(0);
      transition: transform 0.5s ease-in-out;
    }

    &:hover::after {
      transform: scaleX(1);
      background-color: ${theme.colors.rubine};
    }
  }

  .selected a {
    color: ${theme.colors.rubine};
    border-bottom: 2px solid ${theme.colors.rubine};
  
    &:hover {
      color: ${theme.colors.rubine};
    }
  }

  ${mq({
  display: ['none', 'flex', 'flex']
})}
`;

export const StyledHeading = styled.div`
  a {
    position: relative;
    text-decoration: none;
  }

 
 h1 {
  line-height: normal;
  ${mq({
  margin: ['0', `${theme.spacing.m}`, '']
})}
 }
`

export const StyledDropdownWrapper = styled.div`
  display: none; /* hide the wrapper by default */
  padding: ${theme.spacing.xl} 0 ;
  position: sticky;
  display: block;
  top: ${theme.spacing.xxl};
  z-index: 20;
  background-color: ${theme.colors.offWhite};

  select option {
    text-transform: capitalize;
  }

  ${mq({
  display: ['block', 'none', 'none'],
})}
`
export const StyledPage = styled.div`
  background-color: ${theme.colors.offWhite};
`
export const StyledPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${theme.spacing.xxl} 0 0 0;
`

export const StyledBlogNav = styled(StyledNavList)`
padding: 0 ${theme.spacing.m}
`