import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRemoteJWKSet, jwtVerify } from 'jose'

// Firebase publica sus llaves aquí — sin firebase-admin, sin conflicto ESM
const FIREBASE_JWKS = createRemoteJWKSet(
  new URL(
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
  )
)

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!

export async function POST(req: Request) {
  const { idToken } = await req.json()

  try {
    await jwtVerify(idToken, FIREBASE_JWKS, {
      issuer: `https://securetoken.google.com/${PROJECT_ID}`,
      audience: PROJECT_ID,
    })

    // Token válido → crea cookie de sesión
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return NextResponse.json({ ok: true })
}
