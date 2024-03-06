import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text'
import { StyledPageWidth } from '../../styles/global.styled'

export const StyledSection = styled.section<{ bgColor?: { hex: string } }>`
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor.hex : `${theme.colors.white}`};
`

export const StyledCompetitorWrapper = styled(StyledPageWidth)`
  ${mq({
    paddingTop: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl],
    paddingBottom: [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
  })}
`

export const StyledColumnWrapper = styled.div<{ numberOfColumns: number }>`
  display: grid;
  grid-template-columns: ${({ numberOfColumns }) =>
    Array.from({ length: numberOfColumns }, () => '1fr').join(' ')};
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  background: linear-gradient(#d8d8d8, #d8d8d8) center/1px 100% no-repeat;

  // Override to target div children of .plyr in order to remove the built-in css background: linear-gradient styling
  .plyr > div {
    background: none;
  }

  ${mq({
    gridColumnGap: [
      ` ${theme.spacing.xl}`,
      ` ${theme.spacing.xxxl}`,
      ` ${theme.spacing.xxxl}`
    ]
  })};

  @media screen and (max-width: 767px) {
    grid-column-gap: ${theme.spacing.xs};
    background: unset;
  } ;
`

export const StyledProductHeading = styled(Text)<{ order?: number }>`
  order: ${({ order }) => order ?? 'unset'};
  ${mq({
    textAlign: ['left', 'center', '']
  })}
`

export const StyledHeading = styled(Text)`
  text-align: center;
`

export const StyledFeatureText = styled(Text)`
  align-self: center;
  margin-bottom: ${theme.spacing.xs};
`
export const StyledFeatureWrapper = styled.div<{ order?: number }>`
  margin-top: ${theme.spacing.l};
  order: ${({ order }) => order ?? 'unset'};
`
