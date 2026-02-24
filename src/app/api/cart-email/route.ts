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

    try {
      await prisma.checkoutLead.create({
        data: { email: normalizedEmail },
      })
    } catch (dbError) {
      // Si falla la base de datos, al menos guardamos en localStorage en el cliente
      console.error('Cart email DB error:', dbError)
    }

    return NextResponse.json({
      message: 'Email guardado',
      success: true,
    })
  } catch (error) {
    console.error('Cart email error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la petición' },
      { status: 500 }
    )
  }
}
