const PRIMARY = '#072652'
const SECONDARY = '#395690'
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://thefishershop.com'

export function baseLayout(content: string, title?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'The Fisher Shop'}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa; padding: 24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background:#fff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(7,38,82,0.08);">
          <tr>
            <td style="background:${PRIMARY}; padding: 24px; text-align:center;">
              <a href="${BASE_URL}" style="text-decoration:none;">
                <img src="${BASE_URL}/logo.webp" alt="The Fisher Shop" width="180" height="45" style="display:inline-block; max-width:180px; height:auto;">
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:#f8f9fa; padding: 20px 40px; text-align:center; font-size:12px; color:#6b7280;">
              <p style="margin:0 0 8px;">The Fisher Shop · Equipamiento profesional de pesca</p>
              <p style="margin:0;"><a href="mailto:info@thefishershop.com" style="color:${SECONDARY};">info@thefishershop.com</a> · <a href="https://wa.me/34910202911" style="color:${SECONDARY};">WhatsApp +34 910 202 911</a></p>
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
  <a href="${href}" style="display:inline-block; background:${PRIMARY}; color:#fff !important; padding:14px 32px; border-radius:12px; text-decoration:none; font-weight:600; font-size:15px; margin:16px 0;">
    ${label}
  </a>`
}

export { PRIMARY, SECONDARY, BASE_URL }
