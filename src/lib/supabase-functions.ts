/**
 * Cliente para Supabase Edge Functions.
 * Usa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
const getFunctionsUrl = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return ''
  return `${url.replace(/\/$/, '')}/functions/v1`
}

const getHeaders = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return {
    'Content-Type': 'application/json',
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  }
}

export async function callCreateCheckoutSession(body: { items: unknown[]; customerInfo: Record<string, string> }) {
  const base = getFunctionsUrl()
  if (!base) throw new Error('NEXT_PUBLIC_SUPABASE_URL no configurada')
  const res = await fetch(`${base}/create-checkout-session`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function callContact(body: { name: string; email: string; subject?: string; message: string }) {
  const base = getFunctionsUrl()
  if (base) {
    try {
      const res = await fetch(`${base}/contact`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (res.ok) return data
      throw new Error(data.error || 'Error en la Edge Function')
    } catch {
      // Fallback a API Next.js si Edge Function falla (no desplegada, CORS, etc.)
    }
  }
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error al enviar')
  return { success: true, ...data }
}

export async function callNewsletter(body: { email: string; source?: string }) {
  const base = getFunctionsUrl()
  if (base) {
    try {
      const res = await fetch(`${base}/newsletter`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
      })
      return res.json()
    } catch {
      // Fallback a API Next.js si Edge Function falla (ej. localhost sin deploy)
    }
  }
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function callAbandonedCart(body: { email: string; name?: string; items: unknown[] }) {
  const base = getFunctionsUrl()
  if (!base) return Promise.resolve({ ok: false })
  const res = await fetch(`${base}/abandoned-cart`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  return res.json()
}
