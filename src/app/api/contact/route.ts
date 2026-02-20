import { NextRequest, NextResponse } from 'next/server'
import { resend, canSendEmail, fromEmail } from '@/lib/resend'

const STORE_EMAIL = 'info@thefishershop.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son obligatorios' },
        { status: 400 }
      )
    }

    const emailStr = String(email).trim().toLowerCase()
    if (!emailStr.includes('@')) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      )
    }

    if (!canSendEmail()) {
      console.warn('Resend no configurado: RESEND_API_KEY faltante')
      return NextResponse.json(
        { error: 'Servicio de email no disponible. Contacta por WhatsApp.' },
        { status: 503 }
      )
    }

    const subjectLine = subject
      ? `[Contacto] ${String(subject).trim()}`
      : `[Contacto] Mensaje de ${String(name).trim()}`

    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(String(name))}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
      ${subject ? `<p><strong>Asunto:</strong> ${escapeHtml(String(subject))}</p>` : ''}
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(String(message)).replace(/\n/g, '<br />')}</p>
    `

    const { data, error } = await resend!.emails.send({
      from: fromEmail,
      to: [STORE_EMAIL],
      replyTo: emailStr,
      subject: subjectLine,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
