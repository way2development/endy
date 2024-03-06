import styled from 'styled-components'

const StyledRect = styled.rect`
  clip-path: url(#star-clip-path);
  fill: #ffd258;
`

interface ProductReviewStarsProps {
  /**
   * product rating (out of 5)
   */
  rating: number
  isReviewHeader?: boolean
}

export const ProductReviewStars = ({
  rating,
  isReviewHeader
}: ProductReviewStarsProps) => {
  const fillWidth = (rating / 5) * 100

  return (
    <svg
      width={isReviewHeader ? '150px' : '78px'}
      height={isReviewHeader ? '28px' : '12px'}
      viewBox='0 0 78 12'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      stroke='none'
      strokeWidth='0.5'
      fill='none'
      fillRule='evenodd'
      style={{ display: 'flex' }}
    >
      <title>stars-five-stack-yellow-80x16</title>
      <StyledRect
        x='0'
        y='0'
        width={isReviewHeader ? '150' : '78'}
        height={isReviewHeader ? '28' : '12'}
        style={{ width: fillWidth + '%' }}
      />
      <g
        id='Icons'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <g
          id='illustrative-icons---others'
          transform='translate(-80.000000, -233.000000)'
          stroke='#FFD258'
          strokeWidth='1.5'
        >
          <g id='non-toxic' transform='translate(79.000000, 210.500000)'>
            <g
              id='stars-five-stack-yellow-80x16'
              transform='translate(0.000000, 20.500000)'
            >
              <g>
                <polygon points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'></polygon>
              </g>
              <g transform='translate(16.000000, 0.000000)'>
                <polygon points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'></polygon>
              </g>
              <g transform='translate(32.000000, 0.000000)'>
                <polygon points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'></polygon>
              </g>
              <g transform='translate(48.000000, 0.000000)'>
                <polygon points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'></polygon>
              </g>
              <g transform='translate(64.000000, 0.000000)'>
                <polygon points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'></polygon>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g>
        <clipPath id='star-clip-path'>
          <polygon
            id='SVGID_1_'
            transform='translate(-1.000000, -1.500000)'
            points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'
          ></polygon>
          <polygon
            transform='translate(15.000000, -1.500000)'
            points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'
          ></polygon>
          <polygon
            transform='translate(31.000000, -1.500000)'
            points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'
          ></polygon>
          <polygon
            transform='translate(47.000000, -1.500000)'
            points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'
          ></polygon>
          <polygon
            transform='translate(63.000000, -1.500000)'
            points='8.00749152 2.74417231 6.30382755 6.19617256 2.50421637 6.76938056 5.25090531 9.436734 4.60016358 13.2308494 8.01050908 11.4395111 11.4148195 13.2308494 10.7640777 9.436734 13.5168018 6.76938056 9.71115549 6.19617256'
          ></polygon>
        </clipPath>
      </g>
    </svg>
  )
}
