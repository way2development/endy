import React from 'react'

import BlockContent from 'oldComponents/block-content'
import Photo from 'oldComponents/photo'

const Hero = ({ data = {} }) => {
  const { content, photos } = data

  return (
    <section className="hero">
      {content && (
        <div className="hero--overlay">
          <div className="hero--content">
            <BlockContent blocks={content} />
          </div>
        </div>
      )}

      <>
        {photos?.desktopPhoto && (
          <Photo
            photo={photos.desktopPhoto}
            width={1600}
            srcSizes={[800, 1000, 1200, 1600]}
            sizes="100vw"
            layout="fill"
            className="hero--bg is-desktop"
          />
        )}
        {photos?.mobilePhoto && (
          <Photo
            photo={photos.mobilePhoto}
            width={800}
            sizes="100vw"
            layout="fill"
            className="hero--bg is-mobile"
          />
        )}
      </>
    </section>
  )
}

export default Hero
