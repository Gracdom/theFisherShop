import prisma from '@/lib/prisma'
import { sendOrderConfirmation, sendAdminSaleNotification } from './send'
import type { OrderConfirmationData } from './order-confirmation'

export async function sendOrderEmails(stripeSessionId: string): Promise<void> {
  const order = await prisma.order.findFirst({
    where: { stripeSessionId },
    include: {
      customer: true,
      items: { include: { product: true } },
    },
  })

  if (!order || !order.customer) return

  const items = order.items.map((oi) => ({
    name: oi.product?.name ?? 'Producto',
    quantity: oi.quantity,
    price: oi.price,
    subtotal: oi.price * oi.quantity,
  }))

  const data: OrderConfirmationData & { customerEmail: string } = {
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    orderNumber: order.orderNumber,
    items,
    total: order.total,
    shippingAddress: order.shippingAddress,
    shippingCity: order.shippingCity,
    shippingZip: order.shippingZip,
  }

  await Promise.all([
    sendOrderConfirmation(order.customer.email, data),
    sendAdminSaleNotification(data),
  ])

  await prisma.abandonedCart.deleteMany({
    where: { email: order.customer.email.toLowerCase() },
  })
}
