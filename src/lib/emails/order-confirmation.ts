import { baseLayout, button, BASE_URL } from './base'

export interface OrderItem {
  name: string
  quantity: number
  price: number
  subtotal: number
}

export interface OrderConfirmationData {
  customerName: string
  orderNumber: string
  items: OrderItem[]
  total: number
  shippingAddress: string
  shippingCity: string
  shippingZip: string
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function orderConfirmationEmail(data: OrderConfirmationData): string {
  const rows = data.items
    .map((i) => '<tr><td style="padding:12px 0; border-bottom:1px solid #e5e7eb">' + esc(i.name) + '</td><td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:center">' + i.quantity + '</td><td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right">' + '€' + i.price.toFixed(2) + '</td><td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right; font-weight:600">' + '€' + i.subtotal.toFixed(2) + '</td></tr>')
    .join('')

  const content =
    '<h1 style="margin:0 0 8px; font-size:24px; color:#111827">¡Gracias por tu compra, ' +
    esc(data.customerName) +
    '!</h1>' +
    '<p style="margin:0 0 24px; font-size:16px; color:#6b7280">Tu pedido ha sido confirmado correctamente.</p>' +
    '<div style="background:#f8fafc; border-radius:12px; padding:20px; margin-bottom:24px">' +
    '<p style="margin:0 0 8px; font-size:14px; color:#6b7280">Nº de pedido</p>' +
    '<p style="margin:0; font-size:18px; font-weight:700; color:#072652">' +
    esc(data.orderNumber) +
    '</p></div>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">' +
    '<thead><tr style="background:#f3f4f6">' +
    '<th style="padding:12px; text-align:left; font-size:12px; color:#6b7280">Producto</th>' +
    '<th style="padding:12px; text-align:center; font-size:12px; color:#6b7280">Cant.</th>' +
    '<th style="padding:12px; text-align:right; font-size:12px; color:#6b7280">Precio</th>' +
    '<th style="padding:12px; text-align:right; font-size:12px; color:#6b7280">Subtotal</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    '<div style="border-top:2px solid #e5e7eb; padding-top:16px; margin-bottom:24px">' +
    '<p style="margin:0 0 4px; font-size:14px; color:#6b7280">Envío a:</p>' +
    '<p style="margin:0; font-size:15px; color:#111827">' + esc(data.shippingAddress) + ', ' + esc(data.shippingCity) + ' ' + esc(data.shippingZip) + '</p></div>' +
    '<div style="background:#072652; color:#fff; border-radius:12px; padding:20px; margin-bottom:24px; text-align:right">' +
    '<p style="margin:0; font-size:20px; font-weight:700">Total: €' + data.total.toFixed(2) + '</p></div>' +
    '<p style="margin:0 0 16px; font-size:14px; color:#6b7280">Recibirás un correo con el número de seguimiento cuando enviemos tu pedido.</p>' +
    button(BASE_URL + '/tienda', 'Seguir comprando')

  return baseLayout(content, 'Confirmación pedido ' + data.orderNumber)
}
