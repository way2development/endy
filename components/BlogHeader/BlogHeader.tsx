import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { CtaLink } from '../CtaLink'
import { Dropdown } from '../Dropdown'
import {
  StyledNavList,
  StyledNavListItem
} from '../BlogArticleHero/BlogArticleHero.styled'
import { StyledSemibold } from '../../styles/global.styled'

import { Text } from '../Text'
import {
  StyledDropdownWrapper,
  StyledNavigationWrapper,
  StyledPageContainer,
  StyledHeading
} from './BlogHeader.styled'
import { toCapitalize } from '../../lib/helpers'
import dictionary from '../../dictionary.json'
import { blogHomepageProps } from 'Interfaces/blog'

export const BlogHeader = ({ locale, header }: blogHomepageProps) => {
  const router = useRouter()
  const localizedDictionary = dictionary[locale]

  const [selectedCategory, setSelectedCategory] = useState<string>()

  useEffect(() => {
    const slug = router?.asPath.split('/').pop()
    setSelectedCategory(slug)
  }, [router?.asPath])

  const handleBlogSelection = (slug: string) => {
    if (slug) router.push(`/blog/${slug}`)
  }

  const checkCategory = (nav: string) => {
    return router?.asPath.includes(nav) ? 'selected' : ''
  }

  const navItems = useMemo(
    () =>
      header?.navigation.map((nav: { url: string; label: string }) => ({
        id: nav.url,
        label: toCapitalize(nav?.label)
      })),
    [header?.navigation]
  )

  return (
    <>
      <StyledPageContainer>
        <StyledHeading>
          <Text color='gravy' variant='h1'>
            <Link href={'/blog'} locale={locale}>
              {header?.heading}
            </Link>
          </Text>
        </StyledHeading>

        <StyledNavigationWrapper>
          <StyledNavList>
            {header?.navigation.map((nav: { label: string; url: string }) => {
              return (
                <StyledNavListItem key={nav.label}>
                  <Text
                    color='gravy'
                    variant='smallBody'
                    className={checkCategory(nav.url)}
                  >
                    <StyledSemibold>
                      <CtaLink
                        url={`/blog/${nav.url}`}
                        label={nav.label}
                        variant='inline'
                      />
                    </StyledSemibold>
                  </Text>
                </StyledNavListItem>
              )
            })}
          </StyledNavList>
        </StyledNavigationWrapper>
      </StyledPageContainer>

      <StyledDropdownWrapper>
        <Dropdown
          handleChange={handleBlogSelection}
          handleClick={handleBlogSelection}
          label={localizedDictionary.selectACategory}
          options={[
            { id: '#', label: localizedDictionary.selectACategory },
            ...navItems
          ]}
          variant='white'
          showLabelOnLoad={true}
          selectedOption={selectedCategory}
        />
      </StyledDropdownWrapper>
    </>
  )
}
