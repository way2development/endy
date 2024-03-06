import axios from 'axios'

export default async function send(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'must be a POST request' })
  }

  const {
    body: { listID, email, referrer, advocateEmail, name, sourceId }
  } = req

  // TODO: Fix honey pot, add hidden inputs to klaviyo forms
  // if (req.body.fullname !== '') {
  //   console.warn('Stuck in honey 🍯')
  //   return res.status(200).json({ status: 202 })
  // }

  if (!email || !listID) {
    console.warn('No email or list ID provided')
    return res
      .status(404)
      .json({ error: 'Must contain an email address and list ID' })
  }

  // TODO: Update this API to use Klaviyo's new API
  const payload = {
    api_key: process.env.KLAVIYO_API_KEY,
    profiles: [
      {
        $consent: 'web',
        email: email,
        referrer,
        advocate_email: advocateEmail,
        first_name: name,
        $source: sourceId ? sourceId : 'API'
      }
    ]
  }

  const newsletterData = await axios
    .post(`https://a.klaviyo.com/api/v2/list/${listID}/subscribe`, payload)
    .then((res) => res.data)

  res.statusCode = 200
  res.json(newsletterData)
}
