import { NextRequest, NextResponse } from 'next/server'
import { resend, canSendEmail, fromEmail } from '@/lib/resend'

export async function GET(request: NextRequest) {
  if (!canSendEmail() || !resend) {
    return NextResponse.json({ error: 'Resend no configurado' }, { status: 500 })
  }

  const to = request.nextUrl.searchParams.get('to')?.trim()
  if (!to || !to.includes('@')) {
    return NextResponse.json(
      { error: 'Indica el destinatario: ?to=tu@email.com' },
      { status: 400 }
    )
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: 'Prueba de correo - The Fisher Shop',
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #072652;">¡Funciona!</h1>
          <p>Este es un correo de prueba desde The Fisher Shop.</p>
          <p>Resend está configurado correctamente.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Enviado desde: ${fromEmail}</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
