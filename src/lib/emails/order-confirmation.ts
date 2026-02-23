import { baseLayout, button, BASE_URL, PRIMARY } from './base'

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
    .map((i) => '<tr><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:15px;color:#334155">' + esc(i.name) + '</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:center;font-size:15px;color:#475569">' + i.quantity + '</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:15px;color:#475569">€' + i.price.toFixed(2) + '</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:700;font-size:15px;color:' + PRIMARY + '">€' + i.subtotal.toFixed(2) + '</td></tr>')
    .join('')

  const content =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td>' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Confirmación de pedido</p>' +
    '<h1 style="margin:0 0 8px;font-size:28px;color:#0f172a;font-weight:700;">¡Gracias por tu compra, ' + esc(data.customerName) + '!</h1>' +
    '<p style="margin:0 0 28px;font-size:16px;color:#64748b;line-height:1.5;">Tu pedido ha sido confirmado correctamente.</p>' +
    '</td></tr>' +
    '<tr><td style="background-color:#f0f9ff;border-radius:12px;padding:20px 24px;margin-bottom:24px;border-left:4px solid ' + PRIMARY + ';">' +
    '<p style="margin:0 0 4px;font-size:12px;color:#0369a1;font-weight:600;">Nº de pedido</p>' +
    '<p style="margin:0;font-size:20px;font-weight:700;color:' + PRIMARY + ';letter-spacing:-0.5px;">' + esc(data.orderNumber) + '</p>' +
    '</td></tr>' +
    '<tr><td style="padding:0 0 24px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">' +
    '<thead><tr style="background-color:#f8fafc;">' +
    '<th style="padding:14px 16px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Producto</th>' +
    '<th style="padding:14px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Cant.</th>' +
    '<th style="padding:14px 16px;text-align:right;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Precio</th>' +
    '<th style="padding:14px 16px;text-align:right;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Subtotal</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>' +
    '</td></tr>' +
    '<tr><td style="padding:20px 0;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;font-weight:600;">Dirección de envío</p>' +
    '<p style="margin:0;font-size:15px;color:#334155;">' + esc(data.shippingAddress) + ', ' + esc(data.shippingCity) + ' ' + esc(data.shippingZip) + '</p>' +
    '</td></tr>' +
    '<tr><td style="padding:24px 0 16px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + PRIMARY + ';border-radius:12px;">' +
    '<tr><td style="padding:24px;text-align:right;">' +
    '<p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">Total: €' + data.total.toFixed(2) + '</p>' +
    '</td></tr></table>' +
    '</td></tr>' +
    '<tr><td>' +
    '<p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.5;">Recibirás un correo con el número de seguimiento cuando enviemos tu pedido.</p>' +
    button(BASE_URL + '/tienda', 'Seguir comprando') +
    '</td></tr></table>'

  return baseLayout(content, 'Confirmación pedido ' + data.orderNumber, 'Tu pedido ' + data.orderNumber + ' ha sido confirmado.')
}
