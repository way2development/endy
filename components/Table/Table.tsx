import styled from 'styled-components'
import { mq } from '../../styles/theme'
import { theme } from '../../styles/theme'

export interface TableProps {
  /** Number of columns for Table */
  numOfColumns: number
}

export interface ColumnRatioProps {
  /** An array of Column ratios across all breakpoints */
  columnRatio: string[]
}

export const StyledTable = styled.div(({ columnRatio }: ColumnRatioProps) =>
  mq({
    display: 'grid !important',
    gridTemplateColumns: columnRatio.map(
      (ratio: string) => `${ratio.split(':').join('fr ')}fr`
    ),
    borderTop: `1px ${theme.colors.gravy30} solid`,
    borderLeft: `1px ${theme.colors.gravy30}  solid`,

    ['> span']: {
      padding: ['9px'],
      borderRight: [`1px ${theme.colors.gravy30}  solid`],
      borderBottom: [`1px ${theme.colors.gravy30}  solid`],
      marginBottom: [`0!important`]
    }
  })
)

const getColumnRatio = (numOfColumns: number) => {
  let result = ''
  for (let i = 0; i < numOfColumns; i++) {
    result += '1'
    if (i < numOfColumns - 1) {
      result += ':'
    }
  }

  return result
}

export const Table: React.FC<TableProps> = ({ numOfColumns, children }) => {
  return (
    <StyledTable columnRatio={[getColumnRatio(numOfColumns)]}>
      {children}
    </StyledTable>
  )
}
