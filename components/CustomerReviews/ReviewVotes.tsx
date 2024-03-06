import { useState } from 'react'

import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

import { Text } from '../Text'

import {
  StyledVotingButton,
  StyledFieldset,
  StyledVotingForm,
  StyledVotingWrapper
} from './CustomerReviews.styled'

import { StyledSemibold } from '../../styles/global.styled'

interface ReviewVotesProps {
  reviewId: number
  votesUp: number
  votesDown: number
  locale: Locale
}

export const ReviewVotes = ({
  reviewId,
  votesUp,
  votesDown,
  locale
}: ReviewVotesProps) => {
  const [upVotes, setUpVotes] = useState(votesUp)
  const [downVotes, setDownVotes] = useState(votesDown)
  const [isVotingDisabled, setIsVotingDisabled] = useState(false)

  const voteReview = (
    e: React.MouseEvent<HTMLButtonElement>,
    reviewId: number,
    voteType: string
  ) => {
    e.preventDefault()

    const payload = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }

    // TODO: Refactor fetch into Axios call
    fetch(`https://api.yotpo.com/reviews/${reviewId}/vote/${voteType}`, payload)
      .then((response) => {
        if (response && voteType === 'up') {
          setUpVotes(upVotes + 1)
        } else if (response && voteType === 'down') {
          setDownVotes(upVotes + 1)
        }

        setIsVotingDisabled(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const upVoteIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/270dff9e3be92f07e7e162f23a19dec9936271e0-13x12.svg?fit=max&w=600&h=600'

  const downVoteIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/6a1b40e13e9640e516a1be8904700bdd3ea051a4-13x12.svg?fit=max&w=600&h=600'

  const getAriaLabel = (locale: Locale, voteType: string) => {
    if (voteType === 'up') {
      return locale === 'fr'
        ? `Soumettre un vote favorable. Cet avis compte actuellement ${upVotes} votes favorables.`
        : `Submit helpful review vote. This review currently has ${upVotes} up votes.`
    }

    if (voteType === 'down') {
      return locale === 'fr'
        ? `Soumettre un vote défavorable. Cet avis compte actuellement ${downVotes} votes défavorables.`
        : `Submit review down vote. This review currently has ${downVotes} down votes.`
    }
  }

  return (
    <StyledVotingForm>
      <StyledFieldset>
        <StyledVotingWrapper>
          <Text variant='mediumBody' color='gravy' element='legend'>
            <StyledSemibold>{dictionary[locale].wasThisHelpful}</StyledSemibold>
          </Text>
          <StyledVotingButton
            onClick={(e) => voteReview(e, reviewId, 'up')}
            aria-label={getAriaLabel(locale, 'up')}
            disabled={isVotingDisabled}
          >
            {/* TODO: Replace with icon component */}
            <img src={upVoteIcon} alt='' /> {upVotes}
          </StyledVotingButton>

          <StyledVotingButton
            aria-label={getAriaLabel(locale, 'down')}
            onClick={(e) => voteReview(e, reviewId, 'down')}
            disabled={isVotingDisabled}
          >
            {/* TODO: Replace with icon component */}
            <img src={downVoteIcon} alt='' /> {downVotes}
          </StyledVotingButton>
        </StyledVotingWrapper>
      </StyledFieldset>
    </StyledVotingForm>
  )
}
