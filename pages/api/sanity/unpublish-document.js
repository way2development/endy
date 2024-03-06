import sanityClient from '@sanity/client'
import axios from 'axios'
import { formatSanitySaleEndDate } from '../../../lib/time'

// This gives us 10min of buffer time between publish Date and current Date
const diffBufferTime = 10 * 60 * 1000

export default async function preview(req, res) {
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' })
  }

  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_PROJECT_DATASET,
    // Need a write token in order to read schedule metadata and publish documents
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2021-03-25'
  })

  // Query for published sale events
  const query = `* [_type == "sales" && !(_id in path("drafts.**"))]`

  const unpublish = async (document) => {
    console.log('unpublishing')
    const id = document._id

    return axios({
      url: `https://api.sanity.io/v1/unpublish/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_PROJECT_DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      data: [
        {
          documentId: id
        }
      ]
    }).then(() => console.log('unpublished'))
  }

  await client
    .fetch(query)
    .then((response) =>
      Promise.all(
        response.map(async (data) => {
          const endDate = data.shopifySaleDetails?.endDate
          const unpublishDate = formatSanitySaleEndDate(endDate)
          const timeLeftToUnpublish = unpublishDate - new Date()
          console.log('current date', new Date())
          console.log('unpublish date', unpublishDate)
          if (timeLeftToUnpublish < diffBufferTime) {
            await unpublish(data)
          }
        })
      )
    )
    .catch((error) => {
      console.log(error)
      res.status(401).json({ message: 'Error' })
    })

  return res.end()
}
