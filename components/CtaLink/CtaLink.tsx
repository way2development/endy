import Link from 'next/link'
import { Locale } from '../../types/global-types'
import { StyledTextLink, StyledButtonLink, StyledArrow } from './CtaLink.styled'

export interface CtaLinkProps {
  /**
   * Must provide url
   */
  url: string
  /**
   * Must provide label description
   */
  label?: string
  /**
   * Different variants to choose from
   */
  variant:
    | 'solid-rubine'
    | 'solid-gravy'
    | 'hollow-rubine'
    | 'hollow-gravy'
    | 'hollow-white'
    | 'block-line-gravy'
    | 'block-line-white'
    | 'inline'
  /**
   * Language Locale (en or fr)
   */
  locale?: Locale
  /**
   * HTML classes - if needed for GTM triggers
   */
  classNames?: string
  disabled?: boolean
}

export const CtaLink = ({
  url,
  label,
  variant,
  locale,
  classNames,
  disabled = false
}: CtaLinkProps) => {
  /* 
    Next 'Link' should be used when navigating relative paths. 
    Regular anchors <a> should be used for external and email links.
  */
  const isMailTo = (url: string) => /^mailto?/i.test(url)
  const isHttp = (url: string) => /^http?/i.test(url)
  const isExternalUrl: boolean = isHttp(url) || isMailTo(url)

  const externalLinkProps = {
    href: url,
    variant: variant ? variant : '',
    // TODO: once all Shopify pages have been migrated, swap line 43 for 42
    // target: isMailTo(url) ? '_self' : '_blank',
    target: '_blank',
    rel: 'noopener noreferrer',
    className: classNames ? classNames : '',
    disabled: false
  }

  const ArrowRight = () => {
    return <StyledArrow aria-hidden='true'> →</StyledArrow>
  }

  // Internal and External Button Links
  const InternalButtonLink = () => {
    return (
      <StyledButtonLink
        variant={variant ? variant : ''}
        className={classNames}
        href={url}
        locale={locale}
        disabled={disabled}
      >
        {label}
      </StyledButtonLink>
    )
  }

  const ExternalButtonLink = () => (
    <StyledButtonLink {...externalLinkProps}>{label}</StyledButtonLink>
  )

  // Internal & External Text Links
  const InternalTextLink = () => {
    return (
      <Link href={url} locale={locale} scroll={false}>
        <StyledTextLink variant={variant ? variant : ''} className={classNames}>
          {label}
          {variant !== 'inline' && <ArrowRight />}
        </StyledTextLink>
      </Link>
    )
  }

  const ExternalTextLink = () => {
    return (
      <StyledTextLink {...externalLinkProps}>
        {label}
        {variant !== 'inline' && <ArrowRight />}
      </StyledTextLink>
    )
  }

  const isTextLink = variant === 'inline' || variant.includes('block-line')

  return (
    <>
      {!isTextLink && !isExternalUrl && <InternalButtonLink />}
      {!isTextLink && isExternalUrl && <ExternalButtonLink />}

      {isTextLink && !isExternalUrl && <InternalTextLink />}
      {isTextLink && isExternalUrl && <ExternalTextLink />}
    </>
  )
}
