import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'
import { corsHeaders } from '../_shared/cors.ts'

const STORE_EMAIL = 'info@thefishershop.com'
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')?.trim() || 'karen.rivera@gracdom.com'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Servicio de email no disponible.' }), {
      status: 503,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Nombre, email y mensaje son obligatorios' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const emailStr = String(email).trim().toLowerCase()
    if (!emailStr.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email no válido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const subjectLine = subject ? `[Contacto] ${String(subject).trim()}` : `[Contacto] Mensaje de ${String(name).trim()}`
    const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const msgHtml = esc(String(message)).replace(/\n/g, '<br />')
    const baseUrl = Deno.env.get('APP_URL') || 'https://thefishershop.com'

    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:20px;">
<h2>Nuevo mensaje de contacto</h2>
<p><strong>Nombre:</strong> ${esc(String(name))}</p>
<p><strong>Email:</strong> <a href="mailto:${esc(emailStr)}">${esc(emailStr)}</a></p>
${subject ? `<p><strong>Asunto:</strong> ${esc(String(subject))}</p>` : ''}
<p><strong>Mensaje:</strong></p>
<p>${msgHtml}</p>
<hr/><p style="color:#64748b;font-size:12px;">The Fisher Shop - ${baseUrl}</p>
</body></html>`

    const resend = new Resend(apiKey)
    const fromEmail = Deno.env.get('RESEND_FROM') || 'The Fisher Shop <info@thefishershop.com>'

    const [storeResult, adminResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [STORE_EMAIL],
        replyTo: emailStr,
        subject: subjectLine,
        html,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [ADMIN_EMAIL],
        replyTo: emailStr,
        subject: `[Admin] ${subjectLine}`,
        html,
      }),
    ])

    const error = storeResult.error || adminResult.error
    if (error) {
      return new Response(JSON.stringify({ error: 'Error al enviar. Inténtalo de nuevo.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, id: storeResult.data?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error al procesar' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
