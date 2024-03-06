import React from 'react'
import { StyledTabList } from './TabList.styled'

interface TabListProps {
  children: JSX.Element | JSX.Element[];
}

export const TabList = ({ children }: TabListProps) =>
  <StyledTabList role="tablist">{children}</StyledTabList>
