import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// POST /api/orders - Crear un nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerInfo, total, stripeSessionId } = body

    // Buscar o crear cliente
    let customer = await prisma.customer.findUnique({
      where: { email: customerInfo.email },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: customerInfo.email,
          name: customerInfo.name,
          phone: customerInfo.phone || null,
          address: customerInfo.address || null,
          city: customerInfo.city || null,
          postalCode: customerInfo.postalCode || null,
        },
      })
    }

    // Generar número de pedido único
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Crear pedido
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        total,
        stripeSessionId,
        paymentStatus: 'pending',
        status: 'PENDING',
        shippingAddress: customerInfo.address,
        shippingCity: customerInfo.city,
        shippingZip: customerInfo.postalCode,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    )
  }
}

// GET /api/orders?email=customer@email.com - Obtener pedidos de un cliente
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!customer) {
      return NextResponse.json({ orders: [] })
    }

    return NextResponse.json({ orders: customer.orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    )
  }
}
