'use client'

import { useState } from 'react'

export default function ContactoPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacto</h1>
        <p className="text-gray-500 mb-12">
          ¿Tienes alguna pregunta? Escríbenos y te responderemos lo antes posible.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contacto</h2>
            <div className="space-y-4 text-gray-600">
              <a
                href="https://wa.me/34910202911"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-primary transition"
              >
                <i className="fab fa-whatsapp text-primary mt-1 text-xl"></i>
                <span>+34 910 202 911</span>
              </a>
              <a
                href="mailto:info@thefishershop.com"
                className="flex gap-3 hover:text-primary transition"
              >
                <i className="fas fa-envelope text-primary mt-1"></i>
                <span>info@thefishershop.com</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Envíanos un mensaje</h2>
            {sent ? (
              <div className="p-4 bg-green-50 text-green-800 rounded-lg">
                <p className="font-medium">¡Mensaje enviado!</p>
                <p className="text-sm mt-1">Te responderemos en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
