'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const SHIPPING_COST = 6
  const total = getTotalPrice() + SHIPPING_COST

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 sm:py-20 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4 sm:mb-6">
          <i className="fas fa-shopping-cart text-3xl sm:text-4xl text-gray-400"></i>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 max-w-xs">Añade productos para continuar</p>
        <Link
          href="/tienda"
          className="min-h-[44px] inline-flex items-center justify-center bg-primary text-white px-6 sm:px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary transition active:scale-[0.98] touch-manipulation"
        >
          Ir a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-28 sm:pb-8 lg:pb-12">
      <div className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 lg:pt-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Tu carrito</h1>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
              >
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fas fa-fish text-gray-400 text-xl sm:text-2xl"></i>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-snug">{item.name}</h3>
                      <p className="text-primary font-bold text-sm sm:text-base mt-0.5">€{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
                      <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-100 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 active:scale-95 transition touch-manipulation"
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="min-w-[28px] sm:min-w-[32px] text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 active:scale-95 transition touch-manipulation"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base">€{(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition touch-manipulation"
                          aria-label="Eliminar del carrito"
                        >
                          <i className="fas fa-trash text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen: en móvil debajo del listado; en lg sidebar sticky */}
          <div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Resumen</h2>
              <div className="space-y-2 mb-3 sm:mb-4 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío estimado</span>
                  <span className="text-primary font-medium">€{SHIPPING_COST.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 sm:pt-4 flex justify-between text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                <span>Total estimado</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="hidden sm:block space-y-2">
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-primary text-white py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-secondary transition active:scale-[0.98] touch-manipulation"
                >
                  Proceder al pago
                </Link>
                <Link
                  href="/tienda"
                  className="block w-full text-center py-3 text-gray-600 hover:text-primary text-sm font-medium"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra fija inferior en móvil: total + CTA (mejor UX en una mano) */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-bottom z-30">
        <div className="container mx-auto px-3 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">Total estimado</p>
            <p className="text-xl font-bold text-gray-900">€{total.toFixed(2)}</p>
          </div>
          <Link
            href="/checkout"
            className="flex-1 max-w-[200px] min-h-[48px] flex items-center justify-center bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition active:scale-[0.98] touch-manipulation"
          >
            Ir al pago
          </Link>
        </div>
      </div>
    </div>
  )
}
