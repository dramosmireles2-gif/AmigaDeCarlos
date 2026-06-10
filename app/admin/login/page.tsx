'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { BRAND } from '@/lib/config'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') ?? '/admin'

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push(redirect)
      router.refresh()
    } else {
      setError('Contraseña incorrecta')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-3xl tracking-[0.3em] text-stone-900 mb-2">{BRAND.name}</p>
          <p className="text-xs tracking-widest uppercase text-stone-400">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-100 p-8 space-y-5 shadow-sm">
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full border border-stone-200 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white text-sm py-3 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar al admin'}
          </button>

          {/* TODO: replace with Firebase Auth UI or NextAuth signIn() */}
          <p className="text-[10px] text-stone-300 text-center">
            Contraseña por defecto: <span className="font-mono">admin123</span> · Cambiar en .env.local → ADMIN_PASSWORD
          </p>
        </form>
      </div>
    </main>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
