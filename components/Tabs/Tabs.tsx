import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { StyledTabs } from './Tabs.styled';

interface ITabsProps {
  initialActiveTab: string;
  children: JSX.Element | JSX.Element[];
}

interface ITabContext {
  activeTab: undefined | string;
  activateTab?: (id: string) => void;
}

const defaultTabState = {
  activeTab: undefined
}

const TabContext = createContext<ITabContext>(defaultTabState)
export const useTabContext = () => useContext(TabContext)

/**
 * The {Tabs} component is an accessible styled, tabbed user interface.
 *
 * To hide a specific tab set {hidden} value.
 *
 * @example standard usage
 *
 *  <Tabs initialActiveTab="standard-delivery">
 *    <TabList>
 *      <Tab id="standard-delivery">Standard Delivery</Tab>
 *      <Tab id="same-day-delivery">Same Day Delivery</Tab>
 *      <Tab id="assembly" hidden>360 Delivery</Tab>
 *    </TabList>
 *
 *    <TabPanel id="standard-delivery">
 *      We provide standard delivery.
 *    </TabPanel>
 *
 *    <TabPanel id="same-day-delivery">
 *      We also provide same day delivery when ordering before 10:00 AM.
 *    </TabPanel>
 *
 *    <TabPanel id="360-delivery">
 *      We can also help you set up things in your home. At your service.
 *    </TabPanel>
 *  </Tabs>
 */

export const Tabs = ({ initialActiveTab, children }: ITabsProps) => {
  const [activeTab, setActiveTab] = useState<ITabContext["activeTab"]>(initialActiveTab);

  const activateTab = useCallback(
    (id: string) => setActiveTab(id),
    []
  )

  const tabContextValue = useMemo(() => ({
    activeTab, activateTab
  }), [activeTab, activateTab])

  useEffect(() => {
    activateTab(initialActiveTab);
  }, [initialActiveTab, activateTab])

  return (
    <StyledTabs>
      <TabContext.Provider value={tabContextValue}>
        {children}
      </TabContext.Provider>
    </StyledTabs>
  )
}
