import styled, { css } from 'styled-components'
import { theme, mq } from '../../styles/theme'
import { Text } from '../Text/Text'

export const StyledWrapper = styled.div<{
  bgColor: string
  hasColorSelector: boolean
}>`
  background: ${theme.colors.white};
  border: 2px dotted ${theme.colors.darkBlue};
  border-radius: ${theme.borders.borderRadius};
  position: relative;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : `${theme.colors.endyBlue}`};

  ${mq({
    marginTop: [`${theme.spacing.l}`, '', `${theme.spacing.xl}`]
  })}
`

export const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StyledImageContainer = styled.div<{ hasColorSelector: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: ${theme.spacing.s};
  overflow-y: hidden;

  img {
    max-height: 111px;
    max-width: 92px;
  }

  ${({ hasColorSelector }) =>
    hasColorSelector &&
    css`
      ${mq({
        gridArea: ['3 / 1', '1 / 1 / 4 / 1', ''],
        marginBottom: ['-2px', '0', '']
      })}

      img {
        ${mq({
          maxHeight: ['85px', '130px', ''],
          maxWidth: ['163px', '107px', '']
        })}
      }
    `}
`

export const StyledText = styled(Text)<{ locale: string }>`
  color: ${theme.colors.rubine};
  text-transform: ${({ locale }) =>
    locale === 'fr' ? `initial` : 'capitalize'};
`

export const StyledPrice = styled.span`
  text-decoration: line-through;
  color: ${theme.colors.gravy70};
  margin-left: ${theme.spacing.xs};
`

export const StyledContentContainer = styled.div`
  flex-grow: 1;

  ${mq({
    padding: [
      `${theme.spacing.s} 0`,
      '',
      `${theme.spacing.m} 0 ${theme.spacing.xs}`
    ]
  })}
`

export const StyledColorSelectorSection = styled.div`
  background-color: ${theme.colors.offWhite};
`

export const StyledSwatchesContainer = styled.div`
  padding: ${theme.spacing.xxxs} 0;
  ${mq({
    margin: [
      `${theme.spacing.xxs}`,
      `${theme.spacing.xs}`,
      `${theme.spacing.s}`
    ]
  })}
`

export const StyledPromoPillContainer = styled.div<{
  locale: string
}>`
  /* span block is custom styling for PromoPill */
  span {
    margin-left: unset;
    margin-right: unset;
    background-color: ${theme.colors.endyBlue40};
    border-style: dotted;
    border-color: ${theme.colors.darkBlue};
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const StyledToggle = styled.div(
  ({
    locale,
    hasColorSelector
  }: {
    locale: string
    hasColorSelector: boolean
  }) => {
    return mq({
      gridArea: ['2 / 3'],
      gridRowEnd: ['3'],
      display: ['flex'],
      alignItems: ['center'],
      justifyContent: ['flex-end'],
      justifySelf: ['flex-end'],
      height: ['20px'],
      width: locale === 'fr' ? ['61px'] : ['75px'],
      backgroundColor: [`${theme.colors.gravy}`],
      borderRadius: ['12px'],
      position: ['absolute'],
      top: hasColorSelector ? ['22px', '', '28px'] : ['initial', '22px', ''],
      right: hasColorSelector ? ['12px', '16px', ''] : ['14px', '16px', ''],
      bottom: hasColorSelector ? ['initial'] : ['14px', 'initial', ''],

      ['img']: {
        height: ['80%'],
        margin: ['0 2px 0 5px']
      }
    })
  }
)

export const StyledFreeText = styled(Text)<{ hasColorSelector: boolean }>`
  color: ${theme.colors.rubine};

  ${({ hasColorSelector }) =>
    hasColorSelector &&
    css`
      ${mq({
        display: ['none', 'block', 'block']
      })};
    `}
`

export const StyledGiftWithColorContainer = styled.div`
  display: grid;

  ${mq({
    gridTemplateColumns: ['1fr 0fr 1fr', '107px 3.5fr 1fr', '107px 2fr 1fr'],
    gridTemplateRows: ['20px 48px 60px', '22px 67px 22px', '24px 86px 24px']
  })}

  /* targets the div element that opens from the color dropdown button */
  div:last-of-type {
    grid-area: 4 / 1 / 4 / 4;

    /* targets the actual StyledSwatchesContainer */
    div:last-of-type {
    }
  }
`

export const StyledToggleContainer = styled.div`
  display: grid;
`
export const StyledSwatchesPriceContainer = styled(Text)`
  grid-area: 2/3;
  color: ${theme.colors.rubine};
  align-items: flex-end;

  ${mq({
    display: ['flex', 'none', 'none'],
    justifySelf: ['flex-end', 'initial', ''],
    marginRight: [`${theme.spacing.s}`, '0', ''],
    marginTop: [`${theme.spacing.xxxl}`, '0', '']
  })}
`
export const StyledFreeGiftDetails = styled.div<{ hasColorSelector: boolean }>`
  ${({ hasColorSelector }) =>
    hasColorSelector &&
    css`
      display: grid;
      grid-auto-columns: minmax(max-content, 2fr);
      ${mq({
        gridArea: ['2 / 1', '2 / 2', ''],
        paddingLeft: [`${theme.spacing.s}`, '0', '0']
      })};
    `}
`
