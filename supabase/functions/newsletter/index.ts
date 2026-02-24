import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@2.0.0'
import { corsHeaders } from '../_shared/cors.ts'

const PRIMARY = '#072652'

function baseLayout(content: string): string {
  const baseUrl = Deno.env.get('APP_URL') || 'https://thefishershop.com'
  const logoUrl = `${baseUrl.replace(/\/$/, '')}/logo-white.webp`
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>The Fisher Shop</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td align="center" style="background:linear-gradient(135deg,${PRIMARY} 0%,#0d3a6d 100%);padding:32px 24px;">
<img src="${logoUrl}" alt="The Fisher Shop" width="200" height="50" style="display:block;width:200px;height:50px;border:0;" />
</td></tr>
<tr><td style="padding:40px;font-size:16px;color:#334155;">${content}</td></tr>
<tr><td style="background:#f8fafc;padding:24px 40px;text-align:center;"><p style="margin:0;font-size:12px;color:#64748b;">The Fisher Shop</p></td></tr>
</table></td></tr></table></body></html>`
}

function newsletterWelcomeHtml(): string {
  const baseUrl = Deno.env.get('APP_URL') || 'https://thefishershop.com'
  const content = `<h1 style="margin:0 0 8px;font-size:28px;color:#0f172a;">¡Bienvenido a nuestra newsletter!</h1>
<p style="margin:0 0 28px;font-size:16px;color:#64748b;">Gracias por suscribirte a <strong style="color:${PRIMARY};">The Fisher Shop</strong>. Ofertas exclusivas y hasta 15% de descuento te esperan.</p>
<p style="margin:0 0 28px;font-size:15px;color:#64748b;">Explora nuestro catálogo de equipamiento profesional de pesca.</p>
<a href="${baseUrl}/tienda" style="display:inline-block;background:${PRIMARY};color:#fff;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:700;">Ir a la tienda</a>`
  return baseLayout(content)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  try {
    const { email, source = 'footer' } = await req.json()

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email requerido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email no válido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const validSources = ['footer', 'popup']
    const subscribeSource = validSources.includes(source) ? source : 'footer'

    const { data: existing } = await supabase.from('NewsletterSubscriber').select('id').eq('email', normalizedEmail).single()
    if (existing) {
      return new Response(JSON.stringify({ message: 'Ya estabas suscrito', subscribed: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    await supabase.from('NewsletterSubscriber').insert({ email: normalizedEmail, source: subscribeSource })

    const resendKey = Deno.env.get('RESEND_API_KEY')
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        const fromEmail = Deno.env.get('RESEND_FROM') || 'The Fisher Shop <info@thefishershop.com>'
        await resend.emails.send({
          from: fromEmail,
          to: [normalizedEmail],
          subject: '¡Bienvenido a la newsletter! | The Fisher Shop',
          html: newsletterWelcomeHtml(),
        })
      } catch (e) {
        console.error('Error enviando email bienvenida:', e)
      }
    }

    return new Response(JSON.stringify({ message: '¡Gracias por suscribirte!', subscribed: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error al procesar la suscripción' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
