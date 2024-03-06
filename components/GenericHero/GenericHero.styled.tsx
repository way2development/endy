import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledHeroContainer = styled.div`
  ${mq({
    position: ['static', 'static', 'relative'],
    height: ['auto', 'auto', '330px']
  })}

  ${StyledPageWidth} {
    ${mq({
      height: ['auto', 'auto', '100%']
    })}

    /* Grid */
    > div {
      height: 100%;
      ${mq({
        position: ['relative', 'relative', 'static']
      })}
    }
  }
`

export const StyledWrapper = styled.div`
  text-align: center;
  padding: ${theme.spacing.l} ${theme.spacing.m} 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mq({
    textAlign: ['center', 'center', 'left'],
    padding: [
      `${theme.spacing.m} ${theme.spacing.m} 0`,
      `${theme.spacing.l} ${theme.spacing.m} 0`,
      `0 ${theme.spacing.m}`
    ]
  })}
`

export const StyledHeading = styled(Text)`
  margin: ${theme.spacing.s} 0 ${theme.spacing.xs};
`

export const StyledPillContainer = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.m};

  span {
    position: relative;
    top: auto;
    right: auto;
    border: solid 2px;
  }
`

export const StyledImageContainer = styled.div`
  top: 0;
  right: 0;

  ${mq({
    position: ['static', 'static', 'absolute'],
    minHeight: ['auto', 'auto', '330px'],
    /* TODO: is there a better way to have the lifestyle image bleed out of StyledPageWidth? */
    marginLeft: ['-20px', '-75px', 'auto'],
    marginRight: ['-20px', '-75px', 'auto']
  })}

  img {
    object-fit: cover;
    object-position: left;
    ${mq({
      height: ['auto', 'auto', '330px'],
      maxWidth: ['', '100%', '595px']
    })}
  }
`

export const StyledGraphicImage = styled.div`
  position: relative;

  &::after {
    content: '';
    border-bottom: 1px solid ${theme.colors.gravy20};
    position: absolute;
    width: 100%;
    right: 0;
    left: 0;
    bottom: 0;
    margin: 0 auto;

    ${mq({
      maxWidth: ['300px', '550px', '450px']
    })}
  }

  ${mq({
    width: ['100%', '', '90%']
  })}

  img {
    padding-bottom: ${theme.spacing.m};
    width: auto;

    ${mq({
      margin: ['0 auto', '', 'unset']
    })}
  }
`
