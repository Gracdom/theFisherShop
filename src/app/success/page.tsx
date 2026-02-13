'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

function SuccessContent() {
  const { clearCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // Limpiar el carrito después de una compra exitosa
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
          <i className="fas fa-check text-white text-5xl"></i>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Pago completado!
        </h1>

        {/* Message */}
        <p className="text-xl text-gray-600 mb-8">
          Gracias por tu compra. Tu pedido se ha procesado correctamente.
        </p>

        {/* Order Details */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-secondary/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fas fa-box text-secondary text-2xl"></i>
            <h2 className="text-2xl font-bold text-gray-900">
              Detalles del pedido
            </h2>
          </div>
          <p className="text-gray-600 mb-2">
            Recibirás un correo de confirmación con los detalles de tu pedido.
          </p>
          <p className="text-gray-600">
            <i className="fas fa-shipping-fast text-secondary mr-2"></i>
            Plazo de entrega estimado: <strong>24-48 horas</strong>
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <i className="fas fa-truck text-secondary text-2xl mb-2"></i>
            <p className="text-sm font-medium text-gray-700">Envío rápido</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <i className="fas fa-shield-alt text-secondary text-2xl mb-2"></i>
            <p className="text-sm font-medium text-gray-700">
              2 años de garantía
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <i className="fas fa-headset text-secondary text-2xl mb-2"></i>
            <p className="text-sm font-medium text-gray-700">Atención 24/7</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition transform hover:scale-105 text-sm uppercase"
          >
            <i className="fas fa-home mr-2"></i>
            Volver a la tienda
          </Link>
          <Link
            href="/pedidos"
            className="border-2 border-gray-400 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition text-sm uppercase"
          >
            <i className="fas fa-list mr-2"></i>
            Mis pedidos
          </Link>
        </div>

        {/* Session ID (for development) */}
        {sessionId && (
          <p className="mt-8 text-xs text-gray-400">
            ID de sesión: {sessionId}
          </p>
        )}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Cargando...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
