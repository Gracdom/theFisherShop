'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('loading')
    
    // Simular llamada API
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 5000)
    }, 1000)
  }

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white flex-1">
            <h2 className="text-3xl font-bold mb-2">
              Suscríbete a nuestra newsletter
            </h2>
            <p className="text-base text-gray-400">
              Recibe ofertas exclusivas, consejos de pesca y novedades en tu correo
            </p>
          </div>
          <div className="flex-1 w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu email"
                className="flex-1 px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition disabled:opacity-50 text-sm uppercase"
              >
                {status === 'loading' ? 'Enviando...' : 'Suscribirse'}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-2 text-green-400 text-sm">
                ¡Gracias por suscribirte! Revisa tu correo.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-red-400 text-sm">
                Introduce una dirección de email válida.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
