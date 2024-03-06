import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'

export const StyledAffirmContainer = styled.div<{
  isAffirmAvailable: boolean
  showAPRLineBreak: boolean | undefined
}>`
  margin-bottom: ${theme.spacing.m};
  width: calc(100% / 2);
  display: flex;
  align-items: flex-end;

  ${({ isAffirmAvailable }) =>
    !isAffirmAvailable && `margin-bottom: 0; width: auto`}

  ${({ showAPRLineBreak }) => !showAPRLineBreak && `width auto`}
`
export const StyledButton = styled.button<{ isSaleOnFR: boolean }>`
  border: none;
  background: none;
  padding: ${({ isSaleOnFR }) =>
    isSaleOnFR ? '0' : `0 0 0 ${theme.spacing.s};`};
  text-align: left;
  line-height: 1.5;

  img {
    opacity: 70%;
    position: relative;
    /* top: 0.5px; */

    ${mq({
      width: ['40px', '40px', '50px'],
      top: ['0.25px', '0', '0']
    })}
  }
`

export const StyledUnderline = styled.span`
  position: relative;
  border-bottom: 1px solid ${theme.colors.gravy70};
`

export const StyledAPR = styled.span<{ showAPRLineBreak: boolean | undefined }>`
  ${({ showAPRLineBreak }) => css`
    ${mq({
      display: showAPRLineBreak
        ? ['block', 'inline', 'block']
        : ['inline', '', '']
    })}
  `}
`
