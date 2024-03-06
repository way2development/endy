import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'
import { Grid } from '../Grid'

export const StyledGrid = styled(Grid)`
  width: 335px;
`

export const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  line-height: unset;
`

export const StyledImg = styled.img`
  object-fit: cover;
  ${mq({
    width: ['76px', '69px', '76px'],
    height: ['61px', '55px', '61px']
  })}
`

export const StyledModalContainer = styled.div`
  ${mq({
    width: ['334px', '613px', '642px'],
    height: ['fit-content', '', '']
  })}
`

export const StyledReviewContentContainer = styled.div`
  padding: ${theme.spacing.l};
  text-align: left;
`
