'use client'

import { useState, useEffect, useRef } from 'react'
import { useCart, STORAGE_EMAIL_KEY } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  const abandonedSent = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(STORAGE_EMAIL_KEY)
    if (saved) {
      setCustomerInfo((prev) => ({ ...prev, email: saved }))
    }
  }, [])

  useEffect(() => {
    if (!customerInfo.email || cart.length === 0 || abandonedSent.current) return
    const t = setTimeout(() => {
      abandonedSent.current = true
      fetch('/api/abandoned-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerInfo.email,
          name: customerInfo.name || undefined,
          items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        }),
      }).catch(() => {})
    }, 2 * 60 * 1000)
    return () => clearTimeout(t)
  }, [customerInfo.email, customerInfo.name, cart])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    setLoading(true)

    try {
      // Crear sesión de Stripe Checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customerInfo,
        }),
      })

      const { sessionId } = await response.json()

      // Redirigir a Stripe Checkout
      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({ sessionId })

      if (error) {
        console.error('Stripe Error:', error)
        alert('Error al procesar el pago. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al procesar el pago. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  const SHIPPING_COST = 6.00
  const IVA_RATE = 0.21
  
  const subtotal = getTotalPrice()
  const iva = subtotal * IVA_RATE
  const total = subtotal + iva + SHIPPING_COST

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <i className="fas fa-shopping-bag text-4xl text-gray-300"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 mb-8">
            Parece que aún no has añadido nada. Explora nuestra tienda y encuentra lo que necesitas.
          </p>
          <button
            onClick={() => router.push('/tienda')}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary transition-all hover:scale-[1.02]"
          >
            <i className="fas fa-arrow-left text-sm"></i>
            Ir a la tienda
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header con progreso */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
            >
              <i className="fas fa-arrow-left"></i>
              <span className="hidden sm:inline">Volver</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-sm font-medium text-gray-900 hidden sm:inline">Datos</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-sm font-medium text-gray-400 hidden sm:inline">Pago</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fas fa-lock text-green-500 text-sm"></i>
              <span className="text-sm hidden sm:inline">Pago seguro</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Formulario - Izquierda */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header del formulario */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <i className="fas fa-truck text-primary"></i>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Datos de envío</h2>
                    <p className="text-sm text-gray-500">Completa tu información para el envío</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre y apellidos"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <i className="fas fa-phone"></i>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+34 600 000 000"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección de envío
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Calle, número, piso..."
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Ciudad y CP */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <i className="fas fa-city"></i>
                      </span>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        placeholder="Madrid"
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código postal
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <i className="fas fa-hashtag"></i>
                      </span>
                      <input
                        type="text"
                        name="postalCode"
                        value={customerInfo.postalCode}
                        onChange={handleInputChange}
                        placeholder="28001"
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <i className="fas fa-truck text-primary text-xl mb-2"></i>
                <span className="text-xs font-medium text-gray-700">Envío 24-48h</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <i className="fas fa-shield-alt text-green-500 text-xl mb-2"></i>
                <span className="text-xs font-medium text-gray-700">Pago seguro</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                <i className="fas fa-undo text-blue-500 text-xl mb-2"></i>
                <span className="text-xs font-medium text-gray-700">14 días devolución</span>
              </div>
            </div>
          </div>

          {/* Resumen - Derecha */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-gray-900">Tu pedido</h2>
                    <span className="text-sm text-gray-500">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</span>
                  </div>
                </div>

                {/* Productos */}
                <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-fish text-gray-300"></i>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Cantidad: {item.quantity}</p>
                        <p className="font-semibold text-primary mt-1">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal (sin IVA)</span>
                    <span className="font-medium text-gray-900">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (21%)</span>
                    <span className="font-medium text-gray-900">€{iva.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium text-gray-900">€{SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Botón de pago */}
                <div className="p-6 pt-0">
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-circle-notch fa-spin"></i>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock text-sm"></i>
                        Continuar al pago
                        <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/es.svg" alt="España" className="w-5 h-4 rounded-sm" />
                    <span className="text-xs text-gray-500">Envío a España peninsular</span>
                  </div>
                </div>
              </div>

              {/* Métodos de pago */}
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 text-center mb-3">Métodos de pago aceptados</p>
                <div className="flex items-center justify-center gap-3">
                  <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
                  <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
                  <i className="fab fa-cc-amex text-2xl text-gray-400"></i>
                  <i className="fab fa-cc-apple-pay text-2xl text-gray-400"></i>
                  <i className="fab fa-google-pay text-2xl text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
