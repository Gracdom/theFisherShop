import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

// POST - Confirmar pago desde la página de éxito (fallback si no hay webhook)
export async function POST(request: NextRequest) {
  try {
    const { session_id } = await request.json()
    if (!session_id) {
      return NextResponse.json({ error: 'session_id requerido' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ confirmed: false }, { status: 200 })
    }

    await prisma.order.updateMany({
      where: { stripeSessionId: session_id },
      data: {
        paymentStatus: 'paid',
        status: 'PROCESSING',
      },
    })

    try {
      const { sendOrderEmails } = await import('@/lib/emails/order-emails')
      await sendOrderEmails(session_id)
    } catch (e) {
      console.error('Error sending order emails:', e)
    }

    return NextResponse.json({ confirmed: true })
  } catch (error) {
    console.error('Confirm payment error:', error)
    return NextResponse.json(
      { error: 'Error al confirmar el pago' },
      { status: 500 }
    )
  }
}
