import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// TODO: replace with → Firebase Auth / NextAuth session check
// La contraseña se configura en .env.local como ADMIN_PASSWORD
// Por defecto "admin123" para pruebas del esqueleto

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return NextResponse.json({ ok: true })
}
