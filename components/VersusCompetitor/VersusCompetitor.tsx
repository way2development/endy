import { Video, VideoProps } from '../Video'
import { Image, ImageProps } from '../Image'
import {
  StyledColumnWrapper,
  StyledCompetitorWrapper,
  StyledFeatureText,
  StyledFeatureWrapper,
  StyledHeading,
  StyledProductHeading,
  StyledSection
} from './VersusCompetitor.styled'

interface FeatureProps {
  heading: string
  subcopy: string
}

interface ColumnProps {
  heading: string
  video: VideoProps
  lifestyleImage: ImageProps
  features: FeatureProps[]
}

interface VersusCompetitorProps {
  heading: string
  columnOne: ColumnProps
  columnTwo: ColumnProps
  bgColor?: { hex: string }
}

interface FeatureComponentProps {
  feature: string
  subcopy: string | HTMLElement
  headingColor: 'gravy' | 'rubine'
  order: number
}

interface RenderedColumns {
  items: ({ type: string } & (
    | { text: string }
    | { video: VideoProps }
    | { lifestyleImage: ImageProps }
    | FeatureProps
  ))[]
  columnHeaderColor: 'gravy' | 'rubine'
}

const Feature = ({
  feature,
  subcopy,
  headingColor,
  order
}: FeatureComponentProps) => (
  <StyledFeatureWrapper order={order}>
    <StyledFeatureText variant='h5' color={headingColor}>
      {feature}
    </StyledFeatureText>
    <p>{subcopy}</p>
  </StyledFeatureWrapper>
)

export const VersusCompetitor = ({
  heading = `Why don't we compare?`,
  columnOne,
  columnTwo,
  bgColor
}: VersusCompetitorProps) => {
  const columns: RenderedColumns[] = [
    {
      items: [
        { type: 'text', text: columnOne.heading },
        { type: 'video', video: columnOne.video },
        { type: 'lifestyleImage', lifestyleImage: columnOne.lifestyleImage },
        ...columnOne.features.map((feat) => ({ ...feat, type: 'feature' }))
      ],
      columnHeaderColor: 'rubine'
    },
    {
      items: [
        { type: 'text', text: columnTwo.heading },
        { type: 'video', video: columnTwo.video },
        { type: 'lifestyleImage', lifestyleImage: columnTwo.lifestyleImage },
        ...columnTwo.features.map((feat) => ({ ...feat, type: 'feature' }))
      ],
      columnHeaderColor: 'gravy'
    }
  ]

  return (
    <StyledSection bgColor={bgColor}>
      <StyledCompetitorWrapper>
        <StyledHeading variant='h2' color='gravy'>
          {heading}
        </StyledHeading>

        <StyledColumnWrapper numberOfColumns={columns.length}>
          {columns.map((column, columnIndex) =>
            column.items.map((columnItem: any, itemIndex) => {
              const order =
                columnIndex % 2 === 0 ? itemIndex * 2 : itemIndex * 2 + 1

              switch (columnItem.type) {
                case 'text':
                  return (
                    <StyledProductHeading
                      order={order}
                      variant='h4'
                      color={column.columnHeaderColor}
                      key={itemIndex}
                    >
                      {columnItem.text}
                    </StyledProductHeading>
                  )

                case 'video':
                  return (
                    columnItem?.video?.src && (
                      <span style={{ order }} key={itemIndex}>
                        <Video src={columnItem?.video?.src} variant='mini' />
                      </span>
                    )
                  )

                case 'lifestyleImage':
                  return (
                    columnItem?.lifestyleImage && (
                      <span style={{ order }} key={itemIndex}>
                        <Image
                          alt={columnItem?.lifestyleImage.alt}
                          desktopImage={
                            columnItem?.lifestyleImage?.desktopImage
                          }
                          tabletImage={columnItem?.lifestyleImage?.tabletImage}
                          mobileImage={columnItem?.lifestyleImage?.mobileImage}
                          srcWidths={[768, 1024]}
                        />
                      </span>
                    )
                  )

                case 'feature':
                  return (
                    <Feature
                      order={order}
                      headingColor={column.columnHeaderColor}
                      feature={columnItem.heading}
                      subcopy={columnItem.subcopy}
                      key={itemIndex}
                    />
                  )
              }
            })
          )}
        </StyledColumnWrapper>
      </StyledCompetitorWrapper>
    </StyledSection>
  )
}
