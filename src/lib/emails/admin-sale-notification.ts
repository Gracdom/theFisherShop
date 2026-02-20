import { baseLayout } from './base'
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
      <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;">${escapeHtml(i.name)}</td>
      <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:center;">${i.quantity}</td>
      <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right;">€${i.subtotal.toFixed(2)}</td>
    </tr>`
    )
    .join('')

  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:#111827;">🔔 Nueva venta</h1>
    <p style="margin:0 0 24px; font-size:15px; color:#6b7280;">Se ha registrado un nuevo pedido pagado.</p>
    <div style="display:flex; gap:16px; margin-bottom:24px;">
      <div style="flex:1; background:#f0fdf4; border-radius:12px; padding:16px;">
        <p style="margin:0 0 4px; font-size:12px; color:#15803d;">Pedido</p>
        <p style="margin:0; font-size:18px; font-weight:700;">${escapeHtml(data.orderNumber)}</p>
      </div>
      <div style="flex:1; background:#eff6ff; border-radius:12px; padding:16px;">
        <p style="margin:0 0 4px; font-size:12px; color:#1d4ed8;">Total</p>
        <p style="margin:0; font-size:18px; font-weight:700;">€${data.total.toFixed(2)}</p>
      </div>
    </div>
    <p style="margin:0 0 8px; font-size:14px; font-weight:600;">Cliente</p>
    <p style="margin:0 0 16px;">${escapeHtml(data.customerName)} · ${escapeHtml(data.customerEmail)}</p>
    <p style="margin:0 0 8px; font-size:14px; font-weight:600;">Productos</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:10px; text-align:left; font-size:12px;">Producto</th>
          <th style="padding:10px; text-align:center; font-size:12px;">Cant.</th>
          <th style="padding:10px; text-align:right; font-size:12px;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin:0; font-size:14px; color:#6b7280;">Envío: ${escapeHtml(data.shippingAddress)}, ${escapeHtml(data.shippingCity)} ${escapeHtml(data.shippingZip)}</p>
  `
  return baseLayout(content, `Nueva venta - ${data.orderNumber}`)
}
