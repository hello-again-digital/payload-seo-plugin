import type { AccessArgs, User } from 'payload'

type isApiKeyValid = (args: AccessArgs<User>) => boolean

export const apiKey: isApiKeyValid = ({ req: { headers } }) => {
  const apiKey = headers.get('apiKey')
  if (!apiKey) {
    console.warn('`apiKey` is not defined in the request header')
    return false
  }

  const validApiKey = process.env.PAYLOAD_SEO_API_KEY
  if (!validApiKey) {
    console.warn('`PAYLOAD_SEO_API_KEY` is not defined in .env')
    return false
  }

  if (apiKey === validApiKey) {
    return true
  }

  console.error('`apikey` is not valid')
  return false
}