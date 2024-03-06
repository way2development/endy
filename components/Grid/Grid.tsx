import React from 'react'
import styled from 'styled-components'
import { mq } from '../../styles/theme'

export type GridProps = {
  /** An array of Column ratios across all breakpoints */
  columnRatio: string[]
  /** An array or string value of the spacing between rows across all breakpoints */
  rowGap: string | string[]
  /** An array or string value of the spacing between columns across all breakpoints */
  columnGap: string | string[]
}

export const StyledGrid = styled.div(
  ({ columnRatio, rowGap, columnGap }: GridProps) =>
    mq({
      display: 'grid',
      gridTemplateColumns: columnRatio.map(
        (ratio: string) => `${ratio.split(':').join('fr ')}fr`
      ),
      rowGap,
      columnGap
    })
)

export const Grid: React.FC<GridProps> = ({
  columnRatio = ['1', '1', '1:1:1'],
  rowGap,
  columnGap,
  children
}) => {
  return (
    <StyledGrid columnRatio={columnRatio} rowGap={rowGap} columnGap={columnGap}>
      {children}
    </StyledGrid>
  )
}
