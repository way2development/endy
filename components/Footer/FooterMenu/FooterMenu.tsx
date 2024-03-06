import {
  StyledFooterMenuContainer,
  StyledMenu,
  StyledLinkListHeading,
  StyledLinkList,
  StyledLinkItem
} from './FooterMenu.styled'

interface FooterMenuProps {
  heading: string
  linkList: Links[]
}

interface Links {
  _key: string
  label: string
  url: string
}

export const FooterMenu = ({ heading, linkList }: FooterMenuProps) => {
  return (
    <StyledFooterMenuContainer>
      <StyledMenu>
        <li>
          <StyledLinkListHeading color={'white'} variant={'smallBody'}>
            {heading}
          </StyledLinkListHeading>
        </li>
        {linkList &&
          linkList.map((link) => {
            return (
              <StyledLinkList key={link._key}>
                <StyledLinkItem href={link.url}>{link.label}</StyledLinkItem>
              </StyledLinkList>
            )
          })}
      </StyledMenu>
    </StyledFooterMenuContainer>
  )
}
