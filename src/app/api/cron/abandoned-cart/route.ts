import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendAbandonedCartEmail } from '@/lib/emails/send'

const CRON_SECRET = process.env.CRON_SECRET || 'change-me-in-production'

const DELAY_EMAIL_1_MS = 60 * 60 * 1000 // 1h
const DELAY_EMAIL_2_MS = 24 * 60 * 60 * 1000 // 24h
const DELAY_EMAIL_3_MS = 72 * 60 * 60 * 1000 // 72h

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    let sent = 0

    const carts = await prisma.abandonedCart.findMany({
      orderBy: { createdAt: 'asc' },
    })

    for (const cart of carts) {
      const created = cart.createdAt.getTime()
      const items = (cart.items as { name: string; price: number; quantity: number }[]) || []

      if (items.length === 0) continue

      const cartData = {
        customerName: cart.name || 'Cliente',
        items,
        total: Number(cart.total) || 0,
      }

      if (!cart.email1SentAt && now.getTime() - created >= DELAY_EMAIL_1_MS) {
        const ok = await sendAbandonedCartEmail(cart.email, { ...cartData, step: 1 })
        if (ok) {
          await prisma.abandonedCart.update({
            where: { id: cart.id },
            data: { email1SentAt: now },
          })
          sent++
        }
      } else if (cart.email1SentAt && !cart.email2SentAt && now.getTime() - created >= DELAY_EMAIL_2_MS) {
        const ok = await sendAbandonedCartEmail(cart.email, { ...cartData, step: 2 })
        if (ok) {
          await prisma.abandonedCart.update({
            where: { id: cart.id },
            data: { email2SentAt: now },
          })
          sent++
        }
      } else if (cart.email2SentAt && !cart.email3SentAt && now.getTime() - created >= DELAY_EMAIL_3_MS) {
        const ok = await sendAbandonedCartEmail(cart.email, { ...cartData, step: 3 })
        if (ok) {
          await prisma.abandonedCart.update({
            where: { id: cart.id },
            data: { email3SentAt: now },
          })
          sent++
        }
      }
    }

    return NextResponse.json({ ok: true, emailsSent: sent })
  } catch (e) {
    console.error('cron abandoned-cart:', e)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}
