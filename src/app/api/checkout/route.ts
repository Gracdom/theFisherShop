import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json()

    // Calcular total
    const total = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    )

    // Crear line items para Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: `Producto de pesca - ${item.name}`,
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity,
    }))

    // Buscar o crear cliente en la base de datos
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

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout`,
      customer_email: customerInfo.email,
      metadata: {
        customerName: customerInfo.name,
        address: customerInfo.address,
        city: customerInfo.city,
        postalCode: customerInfo.postalCode,
        phone: customerInfo.phone || '',
        orderNumber,
        customerId: customer.id,
      },
      shipping_address_collection: {
        allowed_countries: ['ES', 'PT', 'FR', 'IT', 'US', 'GB'],
      },
    })

    // Crear pedido en la base de datos
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        total,
        stripeSessionId: session.id,
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
    })

    console.log('✅ Order created:', order.orderNumber)

    return NextResponse.json({ sessionId: session.id, orderNumber: order.orderNumber })
  } catch (error: any) {
    console.error('Error en checkout:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
