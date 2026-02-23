import { baseLayout, PRIMARY } from './base'

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export function contactReceivedEmail(data: ContactFormData): string {
  const messageHtml = escapeHtml(data.message).replace(/\n/g, '<br />')

  const content =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td>' +
    '<p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Formulario de contacto</p>' +
    '<h1 style="margin:0 0 8px;font-size:24px;color:#0f172a;font-weight:700;">Nuevo mensaje de contacto</h1>' +
    '<p style="margin:0 0 24px;font-size:15px;color:#64748b;">Has recibido un nuevo mensaje desde la web.</p>' +
    '</td></tr>' +
    '<tr><td>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;background-color:#f8fafc;">' +
    '<tr><td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;"><p style="margin:0;font-size:12px;color:#94a3b8;font-weight:600;">Nombre</p><p style="margin:4px 0 0;font-size:15px;color:#334155;">' + escapeHtml(data.name) + '</p></td></tr>' +
    '<tr><td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;"><p style="margin:0;font-size:12px;color:#94a3b8;font-weight:600;">Email</p><p style="margin:4px 0 0;font-size:15px;"><a href="mailto:' + escapeHtml(data.email) + '" style="color:' + PRIMARY + ';text-decoration:none;">' + escapeHtml(data.email) + '</a></p></td></tr>' +
    (data.subject ? '<tr><td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;"><p style="margin:0;font-size:12px;color:#94a3b8;font-weight:600;">Asunto</p><p style="margin:4px 0 0;font-size:15px;color:#334155;">' + escapeHtml(data.subject) + '</p></td></tr>' : '') +
    '<tr><td style="padding:16px 20px;"><p style="margin:0;font-size:12px;color:#94a3b8;font-weight:600;">Mensaje</p><p style="margin:12px 0 0;font-size:15px;color:#334155;line-height:1.6;">' + messageHtml + '</p></td></tr>' +
    '</table>' +
    '</td></tr>' +
    '<tr><td style="padding-top:20px;">' +
    '<p style="margin:0;font-size:13px;color:#94a3b8;">Puedes responder directamente a este correo.</p>' +
    '</td></tr></table>'

  return baseLayout(content, 'Nuevo mensaje de contacto', 'Mensaje de ' + data.name + ' desde el formulario de contacto.')
}
