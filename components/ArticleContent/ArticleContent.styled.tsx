import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Text } from '../Text/Text'
import { RichText } from '../RichText/RichText'

export const StyledPublishedDate = styled(Text)`
  text-transform: uppercase;
  letter-spacing: ${theme.letterSpacing.s};
`

export const StyledFlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.m};
`

export const StyledFlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.xxl};

  ${mq({
    paddingBottom: [theme.spacing.l, '', 0]
  })}
`

export const StyledAuthor = styled.div`
  margin-bottom: ${theme.spacing.l};
  letter-spacing: ${theme.letterSpacing.s};
`

export const StyledHeading = styled(Text)`
  margin-bottom: ${theme.spacing.m};
`

export const StyledArticle = styled.article`
  margin: ${theme.spacing.l} 0 ${theme.spacing.xl} 0;
  ${mq({
    width: ['100%', '', '65%'],
    padding: ['0', '', theme.spacing.xxl],
    borderRight: ['none', '', `1px solid ${theme.colors.gravy}30`],
    borderBottom: [`1px solid ${theme.colors.gravy}30`, '', 'none']
  })}
`

export const StyledContent = styled.div`
  span {
    color: ${theme.colors.gravy};
    line-height: 1.5;

    ${mq({
      fontSize: ['16px', '16px', '19px']
    })}

    /* selects all paragraph <span> elements from the <RichText> module */
    span {
      :not(:last-child) {
        margin-bottom: ${theme.spacing.m};
      }
    }

    /* selects all image element from <RichText> module */
    picture {
      ${mq({
        marginBottom: [
          `${theme.spacing.xs}!important`,
          '',
          `${theme.spacing.m}!important`
        ]
      })}
    }
  }

  /* selects all h2's, and LargeBody <p> elements from the <RichText> module */
  /*  :has() has limited browser support (Currently only Chrome / Edge / Safari). */
  span h2,
  span:has(> strong),
  p:has(> strong) {
    ${mq({
      marginTop: [theme.spacing.l, '', theme.spacing.xl],
      marginBottom: [
        `${theme.spacing.xs} !important`,
        '',
        `${theme.spacing.m} !important`
      ]
    })}
  }
`
