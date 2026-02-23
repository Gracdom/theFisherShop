import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendNewsletterWelcome } from '@/lib/emails/send'

export const dynamic = 'force-dynamic'

// POST - Suscribirse a la newsletter (público)
export async function POST(request: NextRequest) {
  try {
    const { email, source = 'footer' } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      )
    }

    const validSources = ['footer', 'popup']
    const subscribeSource = validSources.includes(source) ? source : 'footer'

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    })

    if (existing) {
      return NextResponse.json(
        { message: 'Ya estabas suscrito', subscribed: true },
        { status: 200 }
      )
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        source: subscribeSource,
      },
    })

    // Enviar correo de bienvenida al nuevo suscriptor
    try {
      await sendNewsletterWelcome(normalizedEmail)
    } catch (e) {
      console.error('Error enviando email de bienvenida newsletter:', e)
      // No fallar la suscripción si el correo falla
    }

    return NextResponse.json({
      message: '¡Gracias por suscribirte!',
      subscribed: true,
    })
  } catch (error) {
    console.error('Newsletter subscribe error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la suscripción' },
      { status: 500 }
    )
  }
}
