import axios from 'axios'

export default async function send(req, res) {
  const { body, method } = req

  if (method !== 'POST') {
    return res.status(404).json({ error: 'Must be a POST request' })
  }

  for (const key in body) {
    if (!body[key]) {
      console.error(`No value for ${key} provided.`)
      return res.status(404).json({ error: `No value for ${key} provided.` })
    }
  }

  const payload = {
    appkey: process.env.YOTPO_API_KEY,
    ...body
  }

  try {
    const reviewSubmissionData = await axios.post(
      'https://api.yotpo.com/v1/widget/reviews',
      payload
    )
    res.json(reviewSubmissionData.data)
  } catch (error) {
    console.error(`Error in send: ${error}`)
    return res.status(500).json({ error: `Error in send: ${error}` })
  }
}
