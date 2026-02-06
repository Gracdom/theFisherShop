'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import CartModal from './CartModal'

export default function Header() {
  const { getTotalItems, getTotalPrice } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showTransparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showTransparent 
          ? 'bg-transparent' 
          : 'bg-white shadow-lg'
      }`}
    >
      {/* Top Bar - Moderno con información de contacto */}
      {!showTransparent && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs py-1.5 border-b border-blue-500/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-6 md:gap-8">
                <span className="flex items-center gap-2 hover:text-blue-100 transition cursor-pointer">
                  <i className="fas fa-phone text-blue-200"></i>
                  <span className="hidden sm:inline">Llámanos: (+34) 912 345 678</span>
                  <span className="sm:hidden">(+34) 912 345 678</span>
                </span>
                <span className="hidden md:flex items-center gap-2 hover:text-blue-100 transition cursor-pointer">
                  <i className="fas fa-envelope text-blue-200"></i>
                  info@thefishershop.com
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Principal - Diseño Moderno */}
      <div
        className={`transition-all duration-300 ${
          showTransparent 
            ? 'py-2' 
            : 'py-2 border-b border-gray-100'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center z-10">
              <Image
                src="/logo.png"
                alt="The FisherShop - Equipamiento de pesca profesional"
                width={220}
                height={55}
                className="h-10 w-auto md:h-12"
                priority
              />
            </Link>

            {/* Menú Mobile Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden z-10 p-2 rounded-lg transition-colors ${
                showTransparent 
                  ? 'text-blue-600 hover:bg-white/20' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="Menú"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Navegación Desktop */}
            <nav className="flex-1 mx-8 hidden lg:block">
              <ul className="flex justify-center gap-8 text-sm">
                <li>
                  <Link
                    href="/"
                    className={`py-2 font-semibold transition-colors relative group ${
                      showTransparent 
                        ? 'text-blue-600 hover:text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Inicio
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tienda"
                    className={`py-2 font-semibold transition-colors relative group ${
                      showTransparent 
                        ? 'text-blue-600 hover:text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Tienda
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/carrito"
                    className={`py-2 font-semibold transition-colors relative group ${
                      showTransparent 
                        ? 'text-blue-600 hover:text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Carrito
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className={`py-2 font-semibold transition-colors relative group ${
                      showTransparent 
                        ? 'text-blue-600 hover:text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Contacto
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className={`py-2 font-semibold transition-colors relative group ${
                      showTransparent 
                        ? 'text-blue-600 hover:text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Nosotros
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className={`py-2 font-semibold transition-colors relative group ${
                      showTransparent 
                        ? 'text-blue-600 hover:text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    FAQ
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Iconos de acción */}
            <div className="flex items-center gap-3">
              <button 
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                  showTransparent 
                    ? 'text-blue-600 hover:bg-white/20' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
                aria-label="Buscar"
              >
                <i className="fas fa-search text-base"></i>
              </button>
              <Link 
                href="/favoritos" 
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                  showTransparent 
                    ? 'text-blue-600 hover:bg-white/20' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
                aria-label="Favoritos"
              >
                <i className="far fa-heart text-base"></i>
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105 relative ${
                  showTransparent 
                    ? 'text-blue-600 hover:bg-white/20 border border-blue-600/30' 
                    : 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                <i className="fas fa-shopping-cart text-base"></i>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
                <span className="hidden md:block text-sm font-semibold">
                  €{getTotalPrice().toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <nav className="container mx-auto px-4 py-3">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 font-semibold py-2 block hover:text-blue-700 transition"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 font-semibold py-2 block hover:text-blue-700 transition"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  href="/carrito"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 font-semibold py-2 block hover:text-blue-700 transition"
                >
                  Carrito
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 font-semibold py-2 block hover:text-blue-700 transition"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 font-semibold py-2 block hover:text-blue-700 transition"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 font-semibold py-2 block hover:text-blue-700 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
