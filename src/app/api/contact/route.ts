import { NextRequest, NextResponse } from 'next/server'
import { resend, canSendEmail, fromEmail } from '@/lib/resend'
import { contactReceivedEmail } from '@/lib/emails/contact-received'

const STORE_EMAIL = 'info@thefishershop.com'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim() || 'karen.rivera@gracdom.com'

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

    const html = contactReceivedEmail({
      name: String(name).trim(),
      email: emailStr,
      subject: subject ? String(subject).trim() : undefined,
      message: String(message).trim(),
    })

    const [storeResult, adminResult] = await Promise.all([
      resend!.emails.send({
        from: fromEmail,
        to: [STORE_EMAIL],
        replyTo: emailStr,
        subject: subjectLine,
        html,
      }),
      resend!.emails.send({
        from: fromEmail,
        to: [ADMIN_EMAIL],
        replyTo: emailStr,
        subject: `[Admin] ${subjectLine}`,
        html,
      }),
    ])

    const error = storeResult.error || adminResult.error
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: storeResult.data?.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
}

