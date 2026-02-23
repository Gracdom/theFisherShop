import { baseLayout, PRIMARY } from './base'
import type { OrderConfirmationData } from './order-confirmation'

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function adminSaleNotificationEmail(
  data: OrderConfirmationData & { customerEmail: string }
): string {
  const rows = data.items
    .map(
      (i) =>
        `<tr>
      <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:15px;color:#334155;">${escapeHtml(i.name)}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:center;font-size:15px;color:#475569;">${i.quantity}</td>
      <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-size:15px;font-weight:700;color:${PRIMARY};">€${i.subtotal.toFixed(2)}</td>
    </tr>`
    )
    .join('')

  const content =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td>' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Notificación admin</p>' +
    '<h1 style="margin:0 0 8px;font-size:24px;color:#0f172a;font-weight:700;">Nueva venta registrada</h1>' +
    '<p style="margin:0 0 24px;font-size:15px;color:#64748b;">Se ha registrado un nuevo pedido pagado.</p>' +
    '</td></tr>' +
    '<tr><td>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">' +
    '<tr>' +
    '<td width="50%" style="background-color:#f0fdf4;border-radius:12px;padding:20px;border:1px solid #bbf7d0;"><p style="margin:0 0 4px;font-size:12px;color:#15803d;font-weight:600;">Pedido</p><p style="margin:0;font-size:20px;font-weight:700;color:#166534;">' + escapeHtml(data.orderNumber) + '</p></td>' +
    '<td width="20"></td>' +
    '<td width="50%" style="background-color:#eff6ff;border-radius:12px;padding:20px;border:1px solid #93c5fd;"><p style="margin:0 0 4px;font-size:12px;color:#1d4ed8;font-weight:600;">Total</p><p style="margin:0;font-size:20px;font-weight:700;color:' + PRIMARY + ';">€' + data.total.toFixed(2) + '</p></td>' +
    '</tr></table>' +
    '</td></tr>' +
    '<tr><td style="padding:16px 0 8px;border-top:1px solid #e2e8f0;">' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;font-weight:600;">Cliente</p>' +
    '<p style="margin:0 0 20px;font-size:15px;color:#334155;">' + escapeHtml(data.customerName) + ' · ' + escapeHtml(data.customerEmail) + '</p>' +
    '</td></tr>' +
    '<tr><td>' +
    '<p style="margin:0 0 8px;font-size:12px;color:#94a3b8;font-weight:600;">Productos</p>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;margin-bottom:16px;">' +
    '<thead><tr style="background-color:#f8fafc;">' +
    '<th style="padding:12px 16px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Producto</th>' +
    '<th style="padding:12px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;">Cant.</th>' +
    '<th style="padding:12px 16px;text-align:right;font-size:11px;color:#64748b;text-transform:uppercase;">Subtotal</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>' +
    '</td></tr>' +
    '<tr><td style="padding:16px 0;background-color:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">' +
    '<p style="margin:0;padding:0 20px;font-size:14px;color:#64748b;"><strong style="color:#475569;">Envío:</strong> ' + escapeHtml(data.shippingAddress) + ', ' + escapeHtml(data.shippingCity) + ' ' + escapeHtml(data.shippingZip) + '</p>' +
    '</td></tr></table>'

  return baseLayout(content, 'Nueva venta - ' + data.orderNumber, 'Nuevo pedido ' + data.orderNumber + ' - €' + data.total.toFixed(2))
}
