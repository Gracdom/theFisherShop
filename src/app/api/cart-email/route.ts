import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// POST - Guardar email al añadir primer producto al carrito
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

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

    await prisma.checkoutLead.create({
      data: { email: normalizedEmail },
    })

    return NextResponse.json({
      message: 'Email guardado',
      success: true,
    })
  } catch (error) {
    console.error('Cart email error:', error)
    return NextResponse.json(
      { error: 'Error al guardar el email' },
      { status: 500 }
    )
  }
}
