import { resend, canSendEmail, fromEmail } from '@/lib/resend'
import { orderConfirmationEmail, type OrderConfirmationData } from './order-confirmation'
import { adminSaleNotificationEmail } from './admin-sale-notification'
import { abandonedCartEmail, type AbandonedCartData } from './abandoned-cart'

const ADMIN_EMAIL = 'karen.rivera@gracdom.com'

export async function sendOrderConfirmation(to: string, data: OrderConfirmationData): Promise<boolean> {
  if (!canSendEmail() || !resend) return false
  const html = orderConfirmationEmail(data)
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [to],
    subject: `Confirmación de pedido ${data.orderNumber} | The Fisher Shop`,
    html,
  })
  if (error) {
    console.error('sendOrderConfirmation error:', error)
    return false
  }
  return true
}

export async function sendAdminSaleNotification(data: OrderConfirmationData & { customerEmail: string }): Promise<boolean> {
  if (!canSendEmail() || !resend) return false
  const html = adminSaleNotificationEmail(data)
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [ADMIN_EMAIL],
    subject: `Nueva venta - ${data.orderNumber} | The Fisher Shop`,
    html,
  })
  if (error) {
    console.error('sendAdminSaleNotification error:', error)
    return false
  }
  return true
}

export async function sendAbandonedCartEmail(to: string, data: AbandonedCartData): Promise<boolean> {
  if (!canSendEmail() || !resend) return false
  const { html, subject } = abandonedCartEmail(data)
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [to],
    subject,
    html,
  })
  if (error) {
    console.error('sendAbandonedCartEmail error:', error)
    return false
  }
  return true
}
