import createSanityClient from '@sanity/client'
import sanityImage from '@sanity/image-url'

const options = {
  dataset:
    process.env.SANITY_PROJECT_DATASET || process.env.STORYBOOK_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID || process.env.STORYBOOK_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2021-10-21'
}

export const sanityClient = createSanityClient(options)
export const imageBuilder = sanityImage(sanityClient)

// export function createPreviewClient(token) {
//   return createSanityClient({
//     ...options,
//     useCdn: false
//     token
//   })
// }

export function getSanityClient() {
  // TODO: remove
  // if (preview?.active) {
  //   return createPreviewClient(preview.token)
  // } else {
  return sanityClient
  // }
}
