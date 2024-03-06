import React from 'react'
import { StyledTabPanel } from './TabPanel.styled'
import { useTabContext } from '../Tabs'

interface TabPanelProps {
  id: string
  children: JSX.Element | JSX.Element[] | string
}

export const TabPanel = ({ id, children }: TabPanelProps) => {
  const { activeTab } = useTabContext()
  const hidden = activeTab !== id

  return (
    <StyledTabPanel
      role='tabpanel'
      id={`panel_${id}`}
      aria-labelledby={`tab_${id}`}
      hidden={hidden}
    >
      {children}
    </StyledTabPanel>
  )
}
