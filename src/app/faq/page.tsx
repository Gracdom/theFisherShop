'use client'

import { useState } from 'react'

const faqs = [
  {
    q: '¿Cuál es el plazo de entrega?',
    a: 'Los pedidos se envían en 24-48 horas. La entrega suele tardar 2-5 días laborables.',
  },
  {
    q: '¿Los envíos son gratuitos?',
    a: 'Sí, el envío estándar es gratuito en todos los pedidos.',
  },
  {
    q: '¿Puedo devolver un producto?',
    a: 'Sí, tienes 14 días para devolver productos sin usar. Contacta con nosotros para iniciar el proceso.',
  },
  {
    q: '¿Qué métodos de pago aceptáis?',
    a: 'Aceptamos tarjeta de crédito/débito y PayPal a través de nuestra pasarela segura.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Preguntas frecuentes</h1>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 text-left font-medium text-gray-900 flex justify-between items-center hover:bg-gray-50"
              >
                {faq.q}
                <i className={`fas fa-chevron-${open === i ? 'up' : 'down'} text-primary`}></i>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
