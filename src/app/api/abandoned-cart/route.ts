import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, items } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email no válido' }, { status: 400 })
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const cartItems = items.map((i: { id?: string; name?: string; price?: number; quantity?: number }) => ({
      id: i.id ?? '',
      name: i.name ?? 'Producto',
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 1,
    }))
    const total = cartItems.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0)

    const recent = await prisma.abandonedCart.findFirst({
      where: { email: normalizedEmail },
      orderBy: { createdAt: 'desc' },
    })
    if (recent && Date.now() - recent.createdAt.getTime() < 30 * 60 * 1000) {
      return NextResponse.json({ ok: true })
    }

    await prisma.abandonedCart.create({
      data: {
        email: normalizedEmail,
        name: (name && String(name).trim()) || null,
        items: cartItems,
        total,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('abandoned-cart POST:', e)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
