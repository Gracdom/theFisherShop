import { baseLayout, button, BASE_URL, PRIMARY } from './base'

export function newsletterWelcomeEmail(): string {
  const content =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td>' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Newsletter</p>' +
    '<h1 style="margin:0 0 8px;font-size:28px;color:#0f172a;font-weight:700;">¡Bienvenido a nuestra newsletter!</h1>' +
    '<p style="margin:0 0 28px;font-size:16px;color:#64748b;line-height:1.6;">Gracias por suscribirte a <strong style="color:' + PRIMARY + ';">The Fisher Shop</strong>. Estás dentro del círculo de pescadores que reciben ofertas exclusivas, novedades y consejos para su próxima aventura.</p>' +
    '</td></tr>' +
    '<tr><td style="background-color:#f0f9ff;border-radius:12px;padding:24px;margin-bottom:24px;border-left:4px solid ' + PRIMARY + ';">' +
    '<p style="margin:0;font-size:16px;color:#0c4a6e;line-height:1.5;"><strong>¿Sabías que...?</strong> Los suscriptores reciben hasta un <strong>15% de descuento</strong> en su primera compra. ¡No te pierdas las ofertas que te enviaremos!</p>' +
    '</td></tr>' +
    '<tr><td>' +
    '<p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.5;">Explora nuestro catálogo de equipamiento profesional de pesca: cañas, carretes, señuelos, ropa y mucho más.</p>' +
    button(BASE_URL + '/tienda', 'Ir a la tienda') +
    '</td></tr>' +
    '<tr><td style="padding-top:24px;border-top:1px solid #e2e8f0;">' +
    '<p style="margin:0;font-size:12px;color:#94a3b8;">Si no te suscribiste a nuestra newsletter, puedes ignorar este correo.</p>' +
    '</td></tr></table>'
  return baseLayout(content, 'Bienvenido a The Fisher Shop', 'Gracias por suscribirte. Ofertas exclusivas y hasta 15% de descuento te esperan.')
}
