import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY?.trim()
const fromEmail = process.env.RESEND_FROM?.trim() || 'The Fisher Shop <info@thefishershop.com>'

export const resend: Resend | null = apiKey ? new Resend(apiKey) : null

export function canSendEmail(): boolean {
  return !!apiKey && !!resend
}

export { fromEmail }
