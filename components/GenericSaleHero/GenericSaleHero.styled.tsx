import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledHeroContainer = styled.div`
  ${mq({
    position: ['static', 'static', 'relative']
  })}

  ${StyledPageWidth} {
    display: flex;
    align-items: center;
    justify-content: center;

    ${mq({
      minHeight: ['280px', '232px', '250px']
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mq({
    padding: [
      `${theme.spacing.l} ${theme.spacing.xxs}`,
      `${theme.spacing.l} ${theme.spacing.xxs}`,
      `${theme.spacing.xl} 0`
    ]
  })}
`

export const StyledHeading = styled(Text)`
  margin: 10px;
`

export const StyledGraphicImage = styled.div`
  position: relative;

  &::after {
    content: '';
    border-bottom: 1px solid #d8d8d8;
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
export const StyledTimer = styled.div`
  margin-top: ${theme.spacing.m};
`
