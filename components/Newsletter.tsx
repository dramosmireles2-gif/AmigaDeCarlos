'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="newsletter" className="py-24 px-6 bg-mare-dark text-white text-center">
      <div className="max-w-xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase text-white/50 mb-6">Stay Connected</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
          Join the circle.
        </h2>
        <p className="text-white/60 text-sm tracking-wide mb-10 font-light">
          Early access. New drops. No noise.
        </p>

        {submitted ? (
          <div className="py-4">
            <p className="text-mare-sand text-sm tracking-widest uppercase">
              Welcome to MARÉ. ✦
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border border-white/30 border-r-0 px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-mare-dark text-xs tracking-[0.3em] uppercase px-8 py-3 hover:bg-mare-sand transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
