import React from 'react'

type SalesAsideLinkProps = React.HTMLProps<HTMLAnchorElement>

export const SalesAsideLink = React.forwardRef<
  HTMLAnchorElement,
  SalesAsideLinkProps
>(({ onClick, href, children }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    {children}
  </a>
))

SalesAsideLink.displayName = 'SalesAsideLink'
