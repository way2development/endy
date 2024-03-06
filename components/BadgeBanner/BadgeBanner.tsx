import { Text } from '../Text'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { StyledPageWidth } from '../../styles/global.styled'

import styled, { css } from 'styled-components'
import { mq, theme } from '../../styles/theme'

const StyledFlexContainer = styled.div<{ subcopy: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mq({
    padding: [`${theme.spacing.m}`, `${theme.spacing.m}`, `${theme.spacing.xl}`]
  })}

  ${({ subcopy }) => css`
    ${mq({
      flexDirection: subcopy && ['column-reverse', 'row', 'row']
    })}
  `}
`

const StyledBadgeImage = styled.div<{ subcopy: string }>`
  min-width: 64px;
  width: 64px;

  ${({ subcopy }) => css`
    ${mq({
      marginTop: subcopy && [`${theme.spacing.m}`, '0', '0'],
      marginRight: [
        subcopy ? '0' : `${theme.spacing.m}`,
        `${theme.spacing.m}`,
        `${theme.spacing.m}`
      ]
    })}
  `}
`

const StyledHeading = styled(Text)<{ subcopy: string }>`
  margin: 0;

  ${({ subcopy }) => css`
    ${mq({
      textAlign: subcopy && ['center', 'left', 'left']
    })}
  `}
`

const StyledBadgeBannerPageWidth = styled(StyledPageWidth)<{ subcopy: string }>`
  ${({ subcopy }) => css`
    ${mq({
      marginTop: subcopy && [
        theme.spacing.xl,
        theme.spacing.xl,
        theme.spacing.xxl
      ],
      // if Badge Banner has subcopy (i.e. GREENGUARD cert) do this, otherwise do that
      marginBottom: subcopy
        ? [theme.spacing.l, '', '']
        : [theme.spacing.xl, theme.spacing.xl, theme.spacing.xxl]
    })}
  `}
`

const StyledCopyContainer = styled.div`
  ${mq({
    width: ['70%', '50%', '100%']
  })}
`

const StyledInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface BadgeBannerProps {
  heading: string
  backgroundImage: BackgroundImageProps
  badgeImage: BadgeImageProps
  subcopy: string
}

export const BadgeBanner = ({
  heading,
  backgroundImage,
  badgeImage,
  subcopy
}: BadgeBannerProps) => {
  return (
    <StyledBadgeBannerPageWidth subcopy={subcopy}>
      <BackgroundImage
        srcHeights={[153, 112, 128]}
        mobileImage={backgroundImage.desktopImage}
        tabletImage={backgroundImage.desktopImage}
        desktopImage={backgroundImage.desktopImage}
      >
        <StyledFlexContainer subcopy={subcopy}>
          <StyledInnerContainer>
            <StyledBadgeImage subcopy={subcopy}>
              <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
            </StyledBadgeImage>
            <StyledCopyContainer>
              <StyledHeading variant='h3' color='gravy' subcopy={subcopy}>
                {heading}
              </StyledHeading>
              {subcopy && (
                <Text variant='mediumBody' color='gravy'>
                  {subcopy}
                </Text>
              )}
            </StyledCopyContainer>
          </StyledInnerContainer>
        </StyledFlexContainer>
      </BackgroundImage>
    </StyledBadgeBannerPageWidth>
  )
}
