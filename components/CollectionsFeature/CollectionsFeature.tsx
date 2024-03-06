import {
  StyledImgContainer,
  StyledContent,
  StyledLifeStyleImgContainer,
  StyledMobileMicrocopyContainer,
  StyledMicrocopy,
  StyledHeading,
  StyledSubcopy,
  StyledPillContainer,
  StyledContainer
} from './CollectionsFeature.styled'
import { Image, ImageProps } from '../Image'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { ColorProps } from '../../Interfaces/color'
import { Grid } from '../Grid'
import { PromoPill } from '../PromoPill'
import { SaleProps } from '../../Interfaces/sales'
import { CtaLinkProps } from '../CtaLink'
import { Locale } from '../../types/global-types'
interface CollectionsFeatureProps {
  /** Heading */
  heading: string
  /** Background Color */
  backgroundColor: ColorProps
  /** Lifestyle Image Assets */
  lifestyleImage: ImageProps
  /** Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** CTA label */
  cta: CtaLinkProps
  /** Accepts heading, subcopy, microcopy, backgroundAssets, cta label and pill label */
  sales?: SaleProps
  locale: Locale
}
export const CollectionsFeature = ({
  heading,
  backgroundColor,
  lifestyleImage,
  backgroundImage,
  cta,
  sales,
  locale
}: CollectionsFeatureProps) => {
  const visiblePillLabel = sales?.isLastChance
    ? sales.lastChance?.collections?.prefooterPillLabel
    : sales?.collectionsFeature?.pillLabel

  const salesCollectionsFeature = sales?.collectionsFeature

  const visibleBackgroundImage = salesCollectionsFeature
    ? salesCollectionsFeature.backgroundImage
    : backgroundImage

  const backgroundImageProps = {
    srcHeights: [834, 417, 440],
    mobileImage: visibleBackgroundImage?.mobileImage,
    tabletImage: visibleBackgroundImage?.tabletImage,
    desktopImage: visibleBackgroundImage?.desktopImage
  }

  return (
    <StyledContainer>
      <BackgroundImage {...backgroundImageProps}>
        <StyledImgContainer
          backgroundColor={
            sales?.collectionsFeature?.backgroundImage
              ? 'none'
              : sales?.collectionsFeature?.backgroundColor?.hex ||
                backgroundColor?.hex
          }
        >
          <Grid
            columnRatio={['1', '1', '5:7']}
            rowGap={['0']}
            columnGap={['0']}
          >
            <StyledContent>
              {visiblePillLabel && sales && (
                <StyledPillContainer>
                  <PromoPill
                    variant={sales?.textColor}
                    promoCopy={visiblePillLabel}
                    locale={locale}
                  />
                </StyledPillContainer>
              )}
              <StyledHeading
                variant='h2'
                color={sales ? sales.textColor : 'gravy'}
                isOnSale={!!sales}
              >
                {sales?.collectionsFeature?.heading || heading}
              </StyledHeading>

              {sales?.collectionsFeature && sales && (
                <StyledSubcopy variant='mediumBody' color={sales?.textColor}>
                  {sales?.collectionsFeature?.subcopy}
                </StyledSubcopy>
              )}
              {sales?.collectionsFeature?.cta || cta}
              {sales?.collectionsFeature && sales && (
                <StyledMicrocopy variant='micro' color={sales?.textColor}>
                  {sales?.collectionsFeature?.microcopy}
                </StyledMicrocopy>
              )}
            </StyledContent>

            <StyledLifeStyleImgContainer>
              <Image
                srcWidths={[768, 910]}
                mobileImage={
                  sales?.collectionsFeature?.lifestyleImage?.mobileImage ||
                  lifestyleImage?.mobileImage
                }
                tabletImage={
                  sales?.collectionsFeature?.lifestyleImage?.tabletImage ||
                  lifestyleImage?.tabletImage
                }
                desktopImage={
                  sales?.collectionsFeature?.lifestyleImage?.desktopImage ||
                  lifestyleImage?.desktopImage
                }
                alt=''
              />
            </StyledLifeStyleImgContainer>

            {sales?.collectionsFeature && (
              <StyledMobileMicrocopyContainer>
                <StyledMicrocopy variant='micro' color='white'>
                  {sales?.collectionsFeature?.microcopy}
                </StyledMicrocopy>
              </StyledMobileMicrocopyContainer>
            )}
          </Grid>
        </StyledImgContainer>
      </BackgroundImage>
    </StyledContainer>
  )
}
