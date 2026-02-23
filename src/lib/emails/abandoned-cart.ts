import { baseLayout, button, BASE_URL, PRIMARY, ACCENT } from './base'

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
    (i) => '<tr><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:15px;color:#334155;">' + escapeHtml(i.name) + '</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:center;font-size:15px;color:#475569;">' + i.quantity + '</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:15px;font-weight:600;color:' + PRIMARY + ';">€' + (i.price * i.quantity).toFixed(2) + '</td></tr>'
  ).join('')

  const content =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td>' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Tu carrito te espera</p>' +
    '<h1 style="margin:0 0 8px;font-size:26px;color:#0f172a;font-weight:700;">' + getHeadline(data.step) + '</h1>' +
    '<p style="margin:0 0 28px;font-size:16px;color:#64748b;line-height:1.5;">' + getMessage(data.step) + '</p>' +
    '</td></tr>' +
    '<tr><td>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;margin-bottom:24px;">' +
    '<thead><tr style="background-color:#f8fafc;">' +
    '<th style="padding:14px 16px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Producto</th>' +
    '<th style="padding:14px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;">Cant.</th>' +
    '<th style="padding:14px 16px;text-align:right;font-size:11px;color:#64748b;text-transform:uppercase;">Subtotal</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>' +
    '</td></tr>' +
    (discount > 0
      ? '<tr><td style="background-color:#dcfce7;border-radius:12px;padding:20px 24px;margin-bottom:24px;border-left:4px solid ' + ACCENT + ';">' +
        '<p style="margin:0;font-size:15px;color:#166534;"><strong>' + discount + '% de descuento:</strong> -€' + discountAmount.toFixed(2) + '</p>' +
        '<p style="margin:12px 0 0;font-size:20px;font-weight:700;color:' + PRIMARY + ';">Total con descuento: €' + finalTotal.toFixed(2) + '</p>' +
        '</td></tr>'
      : '<tr><td style="background:' + PRIMARY + ';color:#fff;border-radius:12px;padding:20px 24px;margin-bottom:24px;text-align:right;">' +
        '<p style="margin:0;font-size:20px;font-weight:700;">Total: €' + data.total.toFixed(2) + '</p>' +
        '</td></tr>') +
    '<tr><td>' +
    button(BASE_URL + '/checkout', 'Completar mi compra') +
    '</td></tr></table>'
  return {
    html: baseLayout(content, getSubject(data.step), 'Tienes productos esperando en tu carrito' + (discount > 0 ? ' con ' + discount + '% de descuento' : '') + '.'),
    subject: getSubject(data.step) + ' | The Fisher Shop',
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
