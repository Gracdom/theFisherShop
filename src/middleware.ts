import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'admin-session-token-change-in-production'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Proteger rutas admin (páginas)
  if (path.startsWith('/admin')) {
    if (path === '/admin/login') return NextResponse.next()
    const session = request.cookies.get('admin_session')?.value
    if (!session || session !== SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  // Proteger APIs admin
  if (path.startsWith('/api/admin') && !path.includes('/auth/')) {
    const session = request.cookies.get('admin_session')?.value
    if (!session || session !== SESSION_TOKEN) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
