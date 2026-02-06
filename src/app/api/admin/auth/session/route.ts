import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'admin-session-token-change-in-production'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (!session || session !== SESSION_TOKEN) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
}
