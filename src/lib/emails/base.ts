const PRIMARY = '#072652'
const SECONDARY = '#395690'
const ACCENT = '#22c55e'
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://thefishershop.com'
// Logo blanco para fondo oscuro (header). URL absoluta para que cargue en clientes de correo
const LOGO_URL = `${BASE_URL.replace(/\/$/, '')}/logo-white.webp`

export function baseLayout(content: string, title?: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title || 'The Fisher Shop'}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  ${preheader ? `<style type="text/css">.preheader{display:none !important;visibility:hidden;max-height:0;overflow:hidden;}</style>` : ''}
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  ${preheader ? `<span class="preheader" style="display:none !important;">${preheader}</span>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
          <!-- Header con logo -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg, ${PRIMARY} 0%, #0d3a6d 100%);padding:32px 24px;">
              <a href="${BASE_URL}" target="_blank" style="text-decoration:none;display:inline-block;">
                <img src="${LOGO_URL}" alt="The Fisher Shop" width="200" height="50" style="display:block;width:200px;height:50px;max-width:200px;border:0;outline:none;" />
              </a>
            </td>
          </tr>
          <!-- Contenido -->
          <tr>
            <td style="padding:40px 40px 32px;font-size:16px;line-height:1.6;color:#334155;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">The Fisher Shop</p>
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">Equipamiento profesional de pesca</p>
              <p style="margin:12px 0 0;font-size:12px;">
                <a href="mailto:info@thefishershop.com" style="color:${SECONDARY};text-decoration:none;">info@thefishershop.com</a>
                <span style="color:#cbd5e1;margin:0 8px;">|</span>
                <a href="https://wa.me/34910202911" style="color:${SECONDARY};text-decoration:none;">WhatsApp +34 910 202 911</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function button(href: string, label: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td>
      <a href="${href}" target="_blank" style="display:inline-block;background-color:${PRIMARY};color:#ffffff !important;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;text-align:center;border:0;">
        ${label}
      </a>
    </td>
  </tr>
</table>`
}

export { PRIMARY, SECONDARY, ACCENT, BASE_URL, LOGO_URL }
