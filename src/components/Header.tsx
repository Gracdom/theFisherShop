'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import CartModal from './CartModal'

interface CategoryItem {
  id: string
  name: string
  slug: string
}

export default function Header() {
  const { getTotalItems, getTotalPrice } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setCategories(data || []))
      .catch(() => setCategories([]))
  }, [])
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
      style={{
        backgroundColor: scrolled ? '#ffffff' : showTransparent ? 'transparent' : '#ffffff',
      }}
    >
      {/* Top Bar - Información de contacto */}
      {!showTransparent && (
        <div className="text-white text-xs py-1.5" style={{ backgroundColor: '#395690' }}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <a
                href="https://wa.me/34910202911"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white/80 transition"
              >
                <i className="fab fa-whatsapp text-white/90"></i>
                <span className="hidden sm:inline">WhatsApp: +34 910 202 911</span>
                <span className="sm:hidden">+34 910 202 911</span>
              </a>
              <p className="hidden md:block text-white/90 font-medium">
                Envío gratis en pedidos +€50
              </p>
              <a
                href="mailto:info@thefishershop.com"
                className="flex items-center gap-2 hover:text-white/80 transition"
              >
                <i className="fas fa-envelope text-white/90"></i>
                <span className="hidden sm:inline">info@thefishershop.com</span>
              </a>
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
                src={showTransparent ? '/logo-white.webp' : '/logo.webp'}
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
                  ? 'hover:bg-white/20 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
              aria-label="Menú"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Navegación Desktop */}
            <nav className="flex-1 mx-8 hidden lg:block">
              <ul className="flex items-center justify-center gap-8 text-sm">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className={`py-2 font-semibold transition-colors relative group flex items-center ${
                      showTransparent ? 'text-white hover:text-white/90' : 'text-gray-900 hover:text-gray-700'
                    }`}
                  >
                    Inicio
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                      showTransparent ? 'bg-white' : 'bg-gray-900'
                    }`}></span>
                  </Link>
                </li>
                <li className="relative group/sub flex items-center">
                  <Link
                    href="/tienda"
                    className={`py-2 font-semibold transition-colors relative flex items-center ${
                      showTransparent ? 'text-white hover:text-white/90' : 'text-gray-900 hover:text-gray-700'
                    }`}
                  >
                    Tienda
                    <i className="fas fa-chevron-down ml-1 text-xs opacity-70"></i>
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover/sub:w-full transition-all duration-300 ${
                      showTransparent ? 'bg-white' : 'bg-gray-900'
                    }`}></span>
                  </Link>
                  {categories.length > 0 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 before:absolute before:inset-x-0 before:-top-2 before:h-3 before:block">
                      <div className="relative bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px]">
                        <Link
                          href="/tienda"
                          className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary/10 hover:text-primary transition"
                        >
                          Ver toda la tienda
                        </Link>
                        <hr className="my-2 border-gray-100" />
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/tienda?categoria=${cat.slug}`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary transition"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                <li className="flex items-center">
                  <Link
                    href="/contacto"
                    className={`py-2 font-semibold transition-colors relative group flex items-center ${
                      showTransparent ? 'text-white hover:text-white/90' : 'text-gray-900 hover:text-gray-700'
                    }`}
                  >
                    Contacto
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                      showTransparent ? 'bg-white' : 'bg-gray-900'
                    }`}></span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/sobre-nosotros"
                    className={`py-2 font-semibold transition-colors relative group flex items-center ${
                      showTransparent ? 'text-white hover:text-white/90' : 'text-gray-900 hover:text-gray-700'
                    }`}
                  >
                    Nosotros
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                      showTransparent ? 'bg-white' : 'bg-gray-900'
                    }`}></span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/faq"
                    className={`py-2 font-semibold transition-colors relative group flex items-center ${
                      showTransparent ? 'text-white hover:text-white/90' : 'text-gray-900 hover:text-gray-700'
                    }`}
                  >
                    FAQ
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                      showTransparent ? 'bg-white' : 'bg-gray-900'
                    }`}></span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Iconos de acción */}
            <div className="flex items-center gap-3">
              <button 
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                  showTransparent 
                    ? 'hover:bg-white/20 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
                aria-label="Buscar"
              >
                <i className="fas fa-search text-base"></i>
              </button>
              <Link 
                href="/favoritos" 
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                  showTransparent 
                    ? 'hover:bg-white/20 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
                aria-label="Favoritos"
              >
                <i className="far fa-heart text-base"></i>
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105 relative ${
                  showTransparent 
                    ? 'hover:bg-white/20 text-white border border-white/30' 
                    : 'hover:bg-gray-100 text-gray-900 border border-gray-200'
                }`}
              >
                <i className="fas fa-shopping-cart text-base"></i>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-primary">
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
                  className="font-semibold py-2 block transition"
                  style={{ color: '#072652' }}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold py-2 block transition"
                  style={{ color: '#072652' }}
                >
                  Tienda
                </Link>
                {categories.length > 0 && (
                  <ul className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200 ml-2">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/tienda?categoria=${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="py-2 block text-sm text-gray-600 hover:text-primary transition"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold py-2 block transition"
                  style={{ color: '#072652' }}
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold py-2 block transition"
                  style={{ color: '#072652' }}
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-semibold py-2 block transition"
                  style={{ color: '#072652' }}
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
