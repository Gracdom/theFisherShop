'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'thefishershop-popup-dismissed'

export default function EntryPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'popup' }),
      })
      const data = await res.json()
      if (res.ok || data.subscribed) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => handleClose(), 1500)
      } else {
        alert(data.error || 'Error al suscribirse')
      }
    } catch {
      alert('Error de conexión. Inténtalo de nuevo.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 transition"
          aria-label="Cerrar"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Imagen superior con oferta */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src="/popup.webp"
            alt="Oferta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute top-4 left-4 right-4 text-white">
            <p className="text-lg font-medium">Consigue un</p>
            <p className="text-2xl sm:text-3xl font-bold">
              <span className="inline-block bg-primary text-white px-2 py-0.5 rounded">
                15% de descuento
              </span>
            </p>
            <p className="text-lg font-medium">con nosotros</p>
          </div>
        </div>

        {/* Formulario newsletter */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Newsletter
          </h3>
          <p className="text-gray-500 text-sm text-center mb-6">
            Suscríbete y mantente al día con nuevas colecciones, productos y ofertas exclusivas.
          </p>

          {submitted ? (
            <div className="py-4 text-center text-green-600 font-medium">
              <i className="fas fa-check-circle text-2xl mb-2 block"></i>
              ¡Gracias por suscribirte!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu dirección de correo"
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition"
              >
                Suscribirse
              </button>
            </form>
          )}

          <label className="flex items-center justify-center gap-2 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-gray-500 text-sm">
              No mostrar este popup de nuevo
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
