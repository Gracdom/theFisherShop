'use client'

import { useState } from 'react'
import { useCart, STORAGE_EMAIL_KEY } from '@/context/CartContext'

export default function CartEmailPopup() {
  const { showEmailPopup, dismissEmailPopup } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/cart-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok || data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_EMAIL_KEY, email.trim().toLowerCase())
        }
        setSubmitted(true)
        setTimeout(() => {
          dismissEmailPopup()
          setSubmitted(false)
          setEmail('')
        }, 1500)
      } else {
        alert(data.error || 'Error al guardar')
      }
    } catch {
      alert('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    dismissEmailPopup()
    setEmail('')
  }

  if (!showEmailPopup) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 transition"
          aria-label="Cerrar"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        <div className="p-6 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            ¡Producto añadido al carrito!
          </h3>
          <p className="text-gray-500 text-sm text-center mb-6">
            Introduce tu correo para agilizar el pago cuando completes la compra.
          </p>

          {submitted ? (
            <div className="py-4 text-center text-green-600 font-medium">
              <i className="fas fa-check-circle text-2xl mb-2 block"></i>
              ¡Listo! Te recordaremos el correo en el checkout.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando...' : 'Continuar'}
              </button>
            </form>
          )}

          {!submitted && (
            <button
              type="button"
              onClick={handleClose}
              className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700"
            >
              Omitir por ahora
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
