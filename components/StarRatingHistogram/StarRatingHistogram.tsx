import {
  StyledText,
  StyledRatingContainer,
  StyledStarHistogram,
  StyledGraphBackground,
  StyledGraphScore
} from './StarRatingHistogram.styled'
import { useState, useEffect } from 'react'

interface StarRatingHistogramProps {
  /** * number of ratings per star */
  starDistribution: {
    1?: number
    2?: number
    3?: number
    4?: number
    5?: number
  }
  /** * total of reviews */
  totalReviews: number
}

const SingleStar = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='13' height='12'>
      <g fill='none'>
        <path
          stroke='#FFD258'
          d='M6.507 9.44 3.1 11.231l.651-3.794L.994 4.75l3.81-.554L6.507.744l1.704 3.452 3.81.554-2.757 2.687.651 3.794z'
        />
        <path
          fill='#FFD258'
          d='M6.507 9.649 3.1 11.44l.651-3.794L.994 4.959l3.81-.553L6.507.954l1.704 3.452 3.81.553-2.757 2.687.651 3.794z'
        />
      </g>
    </svg>
  )
}

export const StarRatingHistogram = ({
  starDistribution,
  totalReviews
}: StarRatingHistogramProps) => {
  const [starDistributionValues, setStarDistributionValues] = useState<
    number[]
  >([])

  useEffect(() => {
    starDistribution
      ? setStarDistributionValues(Object.values(starDistribution).reverse())
      : starDistributionValues
  }, [starDistribution])

  return (
    <>
      {starDistributionValues?.map((numReviews, i) => {
        const numStars = Math.abs(i - starDistributionValues.length)
        const graphScore = (numReviews / totalReviews) * 100
        return (
          // TODO: replace key with something other than index
          <StyledRatingContainer key={i}>
            <StyledText color='gravy' variant='mediumBody'>
              {numStars}
            </StyledText>
            <SingleStar />
            <StyledStarHistogram>
              <StyledGraphBackground />
              <StyledGraphScore graphScore={graphScore} />
            </StyledStarHistogram>
            {numReviews}
          </StyledRatingContainer>
        )
      })}
    </>
  )
}
