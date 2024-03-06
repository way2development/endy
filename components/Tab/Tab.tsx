import React from 'react'
import { useTabContext } from '../Tabs'
import { StyledTab, StyledTabButton } from './Tab.styled'

interface TabProps {
  children: JSX.Element | JSX.Element[] | string
  disabled?: boolean
  id: string
}

export const Tab = ({ children, disabled = false, id }: TabProps) => {
  const { activeTab, activateTab } = useTabContext()
  const selected: boolean = activeTab === id

  return (
    <StyledTab
      role='tab'
      id={`tab_${id}`}
      aria-selected={selected}
      aria-disabled={disabled}
      aria-controls={`panel_${id}`}
      tabIndex={selected ? 0 : undefined}
    >
      <StyledTabButton
        type='button'
        onClick={(event) => {
          event.preventDefault()
          if (!selected && activateTab) activateTab(id)
        }}
      >
        {children}
      </StyledTabButton>
    </StyledTab>
  )
}
