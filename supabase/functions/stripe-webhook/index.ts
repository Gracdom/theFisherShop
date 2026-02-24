import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.0.0'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const PRIMARY = '#072652'
const BASE_URL = Deno.env.get('APP_URL') || 'https://thefishershop.com'
const LOGO_URL = `${BASE_URL.replace(/\/$/, '')}/logo-white.webp`
const ADMIN_EMAIL = 'karen.rivera@gracdom.com'

function baseLayout(content: string): string {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>The Fisher Shop</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td align="center" style="background:linear-gradient(135deg,${PRIMARY} 0%,#0d3a6d 100%);padding:32px 24px;">
<img src="${LOGO_URL}" alt="The Fisher Shop" width="200" height="50" style="display:block;width:200px;height:50px;border:0;" />
</td></tr>
<tr><td style="padding:40px 40px 32px;font-size:16px;color:#334155;">${content}</td></tr>
<tr><td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
<p style="margin:0;font-size:12px;color:#64748b;">The Fisher Shop | info@thefishershop.com</p>
</td></tr></table></td></tr></table></body></html>`
}

function orderConfirmationHtml(data: { customerName: string; orderNumber: string; items: { name: string; quantity: number; price: number; subtotal: number }[]; total: number; shippingAddress: string; shippingCity: string; shippingZip: string }): string {
  const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const rows = data.items.map(i =>
    `<tr><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;">${esc(i.name)}</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:center">${i.quantity}</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right">€${i.price.toFixed(2)}</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;color:${PRIMARY}">€${i.subtotal.toFixed(2)}</td></tr>`).join('')
  const content = `<p style="margin:0 0 8px;font-size:28px;color:#0f172a;font-weight:700;">¡Gracias por tu compra, ${esc(data.customerName)}!</p>
<p style="margin:0 0 28px;font-size:16px;color:#64748b;">Tu pedido ${esc(data.orderNumber)} ha sido confirmado.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;">
<thead><tr style="background:#f8fafc;"><th style="padding:14px 16px;text-align:left;font-size:11px;color:#64748b;">Producto</th><th style="padding:14px 16px;text-align:center;font-size:11px;color:#64748b;">Cant.</th><th style="padding:14px 16px;text-align:right;font-size:11px;color:#64748b;">Precio</th><th style="padding:14px 16px;text-align:right;font-size:11px;color:#64748b;">Subtotal</th></tr></thead>
<tbody>${rows}</tbody></table>
<p style="margin:24px 0 0;font-size:14px;color:#64748b;">Envío: ${esc(data.shippingAddress)}, ${esc(data.shippingCity)} ${data.shippingZip}</p>
<p style="margin:24px 0 0;font-size:24px;font-weight:700;color:${PRIMARY}">Total: €${data.total.toFixed(2)}</p>`
  return baseLayout(content)
}

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!signature || !webhookSecret) {
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), { status: 400 })
  }

  const body = await req.text()
  let event: Stripe.Event
  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-11-20.acacia' })
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.payment_status !== 'paid' || !session.id) {
    return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  await supabase.from('Order').update({ paymentStatus: 'paid', status: 'PROCESSING' }).eq('stripeSessionId', session.id)

  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (!resendKey) return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })

  try {
    const { data: orderRows } = await supabase.from('Order').select('id, orderNumber, total, shippingAddress, shippingCity, shippingZip, customerId').eq('stripeSessionId', session.id)
    const orderRow = orderRows?.[0] as { id: string; orderNumber: string; total: number; shippingAddress: string; shippingCity: string; shippingZip: string; customerId: string } | undefined
    if (!orderRow) return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })

    const { data: custRow } = await supabase.from('Customer').select('name, email').eq('id', orderRow.customerId).single()
    if (!custRow) return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })

    const { data: orderItems } = await supabase.from('OrderItem').select('productId, quantity, price').eq('orderId', orderRow.id)
    const productIds = (orderItems || []).map((oi: { productId: string }) => oi.productId)
    const { data: products } = productIds.length > 0 ? await supabase.from('Product').select('id, name').in('id', productIds) : { data: [] }
    const productMap = Object.fromEntries(((products as { id: string; name: string }[]) || []).map((p) => [p.id, p.name]))

    const items = (orderItems || []).map((oi: { productId: string; quantity: number; price: number }) => ({
      name: productMap[oi.productId] ?? 'Producto',
      quantity: oi.quantity,
      price: oi.price,
      subtotal: oi.price * oi.quantity,
    }))

    const emailData = {
      customerName: custRow.name,
      orderNumber: orderRow.orderNumber,
      items,
      total: orderRow.total,
      shippingAddress: orderRow.shippingAddress,
      shippingCity: orderRow.shippingCity,
      shippingZip: orderRow.shippingZip,
    }

    const resend = new Resend(resendKey)
    const fromEmail = Deno.env.get('RESEND_FROM') || 'The Fisher Shop <info@thefishershop.com>'

    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [custRow.email],
        subject: `Confirmación de pedido ${orderRow.orderNumber} | The Fisher Shop`,
        html: orderConfirmationHtml(emailData),
      }),
      resend.emails.send({
        from: fromEmail,
        to: [ADMIN_EMAIL],
        subject: `Nueva venta - ${orderRow.orderNumber} | The Fisher Shop`,
        html: orderConfirmationHtml(emailData),
      }),
    ])

    await supabase.from('AbandonedCart').delete().eq('email', custRow.email.toLowerCase())
  } catch (e) {
    console.error('Error sending order emails:', e)
  }

  return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
})
