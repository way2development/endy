import axios from 'axios'

export default async function send(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'must be a POST request' })
  }

  const {
    body: { listID, email, fullName }
  } = req

  if (fullName) {
    console.warn('Stuck in honey 🍯')
    return res.status(404).json({ error: 'Bot detected' })
  }

  if (!email || !listID) {
    console.warn('No email or list ID provided')
    return res
      .status(404)
      .json({ error: 'Must contain an email address and list ID' })
  }

  const payload = {
    data: {
      type: 'subscription',
      attributes: {
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email: email
            }
          }
        }
      },
      relationships: { list: { data: { type: 'list', id: listID } } }
    }
  }

  const config = {
    params: { company_id: process.env.KLAVIYO_SITE_ID },
    headers: { revision: '2023-09-15', 'content-type': 'application/json' }
  }

  try {
    const response = await axios.post(
      `https://a.klaviyo.com/client/subscriptions/`,
      payload,
      config
    )
    res.status(200).json(response.data)
  } catch (err) {
    console.error(err)

    const errorResponse = {
      status: err.response ? err.response.status : 500,
      message: err.response ? err.response.data : 'Internal Server Error'
    }
    res.status(errorResponse.status).json(errorResponse)
  }
}
