import { baseLayout, button, BASE_URL } from './base'

export interface AbandonedCartItem {
  name: string
  quantity: number
  price: number
  image?: string
}

export interface AbandonedCartData {
  customerName: string
  items: AbandonedCartItem[]
  total: number
  step: 1 | 2 | 3
}

const DISCOUNTS = { 1: 0, 2: 5, 3: 10 } as const

function getSubject(step: 1 | 2 | 3): string {
  if (step === 1) return '¿Olvidaste algo en tu carrito?'
  if (step === 2) return 'Te esperamos – 5% de descuento en tu carrito'
  return 'Última oportunidad – 10% de descuento'
}

function getHeadline(step: 1 | 2 | 3): string {
  if (step === 1) return 'Tu carrito te está esperando'
  if (step === 2) return '¡Te reservamos 5% de descuento!'
  return '¡No te lo pierdas! 10% de descuento por tiempo limitado'
}

function getMessage(step: 1 | 2 | 3): string {
  if (step === 1) return 'Parece que dejaste algunos productos en tu carrito. ¿Necesitas ayuda para completar tu compra?'
  if (step === 2) return 'Como agradecimiento por tu interés, te ofrecemos un 5% de descuento en los artículos de tu carrito.'
  return 'Esta es tu última oportunidad. Completa tu compra ahora con un 10% de descuento.'
}

export function abandonedCartEmail(data: AbandonedCartData): { html: string; subject: string } {
  const discount = DISCOUNTS[data.step]
  const discountAmount = data.total * (discount / 100)
  const finalTotal = data.total - discountAmount

  const rows = data.items.map(
    (i) => `
    <tr>
      <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:15px;">${escapeHtml(i.name)}</td>
      <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:center;">${i.quantity}</td>
      <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right;">€${(i.price * i.quantity).toFixed(2)}</td>
    </tr>`
  ).join('')

  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:#111827;">${getHeadline(data.step)}</h1>
    <p style="margin:0 0 24px; font-size:16px; color:#6b7280;">${getMessage(data.step)}</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:12px; text-align:left; font-size:12px; color:#6b7280; text-transform:uppercase;">Producto</th>
          <th style="padding:12px; text-align:center; font-size:12px; color:#6b7280; text-transform:uppercase;">Cant.</th>
          <th style="padding:12px; text-align:right; font-size:12px; color:#6b7280; text-transform:uppercase;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    ${discount > 0 ? `
    <div style="background:#dcfce7; border-radius:12px; padding:16px; margin-bottom:24px; border-left:4px solid #22c55e;">
      <p style="margin:0; font-size:15px; color:#166534;">
        <strong>${discount}% de descuento:</strong> -€${discountAmount.toFixed(2)}
      </p>
      <p style="margin:8px 0 0; font-size:18px; font-weight:700; color:#072652;">Total con descuento: €${finalTotal.toFixed(2)}</p>
    </div>
    ` : `
    <div style="background:#072652; color:#fff; border-radius:12px; padding:16px; margin-bottom:24px; text-align:right;">
      <p style="margin:0; font-size:18px; font-weight:700;">Total: €${data.total.toFixed(2)}</p>
    </div>
    `}

    ${button(`${BASE_URL}/checkout`, 'Completar mi compra')}
  `
  return {
    html: baseLayout(content, getSubject(data.step)),
    subject: getSubject(data.step) + ' | The Fisher Shop',
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
