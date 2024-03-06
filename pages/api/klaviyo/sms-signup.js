import axios from 'axios'

export default async function send(req, res) {
  const { body, method } = req
  const { mobileNum, email, fullName } = body

  if (method !== 'POST') {
    return res.status(404).json({ error: 'Must be a POST request' })
  }

  if (fullName) {
    console.warn('Stuck in honey 🍯')
    return res.status(404).json({ error: 'Bot detected' })
  }

  if (!mobileNum || !process.env.EN_SMS_LIST_ID || !email) {
    return res
      .status(404)
      .json({ error: 'Must contain a number, list ID and email' })
  }

  const payload = {
    data: {
      type: 'subscription',
      attributes: {
        profile: {
          data: {
            type: 'profile',
            attributes: {
              phone_number: mobileNum,
              properties: {
                email: email
              }
            }
          }
        }
      },
      relationships: {
        list: { data: { type: 'list', id: process.env.EN_SMS_LIST_ID } }
      }
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
