import { useRouter } from 'next/router'
import { Text } from '../Text'
import { CtaLinkProps } from '../CtaLink'
import { Image, ImageProps } from '../Image'
import { Video, VideoProps } from '../Video'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { FeaturedProducts } from './FeaturedProducts'
import { Locale } from '../../types/global-types'
import {
  StyledCtaContainer,
  StyledMediaColumn,
  StyledImageContainer,
  StyledVideoContainer,
  StyledTextColumn,
  StyledWrapper,
  StyledSection
} from './MediaModule.styled'
import { StyledBadgeTopLeft } from '../../styles/global.styled'

type Variant = 'Media Left' | 'Media Right'
interface MediaModuleProps {
  subcopy: string | HTMLElement
  heading: string | HTMLElement
  variant: Variant
  lifestyleImage?: ImageProps
  video?: VideoProps
  badgeImage?: BadgeImageProps
  cta?: CtaLinkProps
  position: 'Vertical' | 'Horizontal'
  featuredProducts?: FeaturedProductsProps
  locale: Locale
  bgColor?: { hex: string }
}
export interface FeaturedProductsProps {
  products: ProductProps[]
  buttonLabel: string
}

export const MediaModule = ({
  subcopy,
  heading,
  variant,
  lifestyleImage,
  video,
  badgeImage,
  cta,
  position,
  featuredProducts,
  locale,
  bgColor
}: MediaModuleProps) => {
  const router = useRouter()

  return (
    <StyledSection bgColor={bgColor}>
      <StyledWrapper
        position={position}
        variant={variant}
        isMLP={router?.asPath === ('/design-du-matelas' || '/mattress-design')}
      >
        <StyledTextColumn position={position}>
          <Text color={'rubine'} variant={'h2'}>
            {heading}
          </Text>
          <Text color={'gravy'} variant={'mediumBody'} element={'div'}>
            {subcopy}
          </Text>
          {cta && <StyledCtaContainer>{cta}</StyledCtaContainer>}
        </StyledTextColumn>
        <StyledMediaColumn position={position}>
          {lifestyleImage ? (
            <StyledImageContainer>
              <Image
                srcWidths={[768, 1024]}
                desktopImage={lifestyleImage.desktopImage}
                tabletImage={lifestyleImage.tabletImage}
                mobileImage={lifestyleImage.mobileImage}
                alt={lifestyleImage.alt}
              />
              {featuredProducts && (
                <FeaturedProducts
                  products={featuredProducts?.products}
                  buttonLabel={featuredProducts?.buttonLabel}
                  locale={locale}
                />
              )}
            </StyledImageContainer>
          ) : (
            <StyledVideoContainer>
              {video && <Video variant='standard' src={video.src} />}
              {video && badgeImage && (
                <StyledBadgeTopLeft>
                  <BadgeImage
                    image={badgeImage.image}
                    alt={badgeImage.alt}
                  ></BadgeImage>
                </StyledBadgeTopLeft>
              )}
            </StyledVideoContainer>
          )}
        </StyledMediaColumn>
      </StyledWrapper>
    </StyledSection>
  )
}
