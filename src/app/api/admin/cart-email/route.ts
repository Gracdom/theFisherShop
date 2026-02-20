import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET - Listar leads de checkout (solo admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const [leads, total] = await Promise.all([
      prisma.checkoutLead.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.checkoutLead.count(),
    ])

    return NextResponse.json({ leads, total })
  } catch (error) {
    console.error('Error fetching checkout leads:', error)
    return NextResponse.json(
      { error: 'Error al obtener leads' },
      { status: 500 }
    )
  }
}
