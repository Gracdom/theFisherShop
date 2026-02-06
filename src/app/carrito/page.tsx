'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-6"></i>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Añade productos para continuar</p>
        <Link
          href="/tienda"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
        >
          Ir a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu carrito</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 flex gap-4 shadow-sm"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-fish text-gray-400 text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-primary font-bold">€{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 text-sm"
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-primary font-medium">Gratis</span>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>€{getTotalPrice().toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition"
              >
                Proceder al pago
              </Link>
              <Link
                href="/tienda"
                className="block w-full text-center mt-3 text-gray-600 hover:text-primary"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
