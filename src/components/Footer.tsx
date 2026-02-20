'use client'

import Link from 'next/link'
import { useState } from 'react'

const STORE = {
  name: 'The Fisher Shop',
  email: 'info@thefishershop.com',
  whatsapp: '34910202911',
  whatsappDisplay: '+34 910 202 911',
}

const blogPosts = [
  {
    id: 1,
    title: 'Mejores técnicas de pesca con mosca en agua dulce',
    excerpt: 'Guía práctica para principiantes...',
    date: '15 Ene, 2025',
    href: '/blog/tecnicas-pesca-mosca',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop',
  },
  {
    id: 2,
    title: 'Cómo elegir la caña de pescar ideal',
    excerpt: 'Tamaño, material y potencia según el tipo de pesca...',
    date: '8 Ene, 2025',
    href: '/blog/elegir-cana-pescar',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=80&fit=crop',
  },
  {
    id: 3,
    title: 'Mantenimiento de carretes de pesca',
    excerpt: 'Limpieza y conservación para prolongar su vida útil...',
    date: '20 Dic, 2024',
    href: '/blog/mantenimiento-carretes',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=80&fit=crop',
  },
  {
    id: 4,
    title: 'Señuelos más efectivos para pesca en mar',
    excerpt: 'Tipos de señuelos según la temporada y la especie...',
    date: '5 Dic, 2024',
    href: '/blog/senuelos-pesca-mar',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=120&h=80&fit=crop',
  },
]

const infoLinks = [
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
  { href: '/informacion-envio', label: 'Información de envío' },
  { href: '/privacidad', label: 'Política de privacidad' },
  { href: '/terminos', label: 'Términos y condiciones' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/faq', label: 'Preguntas frecuentes' },
]

const accountLinks = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/carrito', label: 'Carrito' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/contacto', label: 'Atención al cliente' },
  { href: '/faq', label: 'FAQ' },
]

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: 'fab fa-facebook-f' },
  { href: 'https://x.com', label: 'X', icon: 'fab fa-x-twitter' },
  { href: 'https://youtube.com', label: 'YouTube', icon: 'fab fa-youtube' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'fab fa-instagram' },
  { href: 'https://pinterest.com', label: 'Pinterest', icon: 'fab fa-pinterest-p' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [blogPage, setBlogPage] = useState(0)
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const visibleBlogPosts = blogPosts.slice(blogPage * 2, blogPage * 2 + 2)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'footer' }),
      })
      const data = await res.json()
      if (res.ok || data.subscribed) {
        setNewsletterStatus('success')
        setEmail('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <footer className="font-sans bg-primary text-white border-t border-primary">
      {/* 1. Newsletter */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-envelope text-white text-lg"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Suscríbete a nuestra newsletter</h3>
                <p className="text-white/80 text-sm">No te pierdas ofertas y novedades</p>
              </div>
            </div>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row w-full lg:w-auto max-w-md gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setNewsletterStatus('idle') }}
                placeholder="Introduce tu email"
                disabled={newsletterStatus === 'loading'}
                className="flex-1 px-5 py-3 border border-white/30 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/60 disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-6 py-3 bg-secondary hover:bg-white hover:text-primary text-white font-semibold rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors disabled:opacity-70 flex-shrink-0"
              >
                {newsletterStatus === 'loading' ? 'Enviando...' : 'Suscribirse'}
              </button>
              {newsletterStatus === 'success' && (
                <p className="text-green-300 text-sm w-full sm:col-span-2">¡Gracias por suscribirte!</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-red-200 text-sm w-full sm:col-span-2">Error. Inténtalo de nuevo.</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* 2. 4 columnas */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Columna 1 - Store Information */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <img
                src="/logo-white.webp"
                alt={STORE.name}
                className="h-10 w-auto"
              />
            </Link>
            <h5 className="font-sans font-semibold text-white mb-5 text-base">
              Información de la tienda
            </h5>
            <ul className="space-y-4 text-white/80 text-sm">
              <li className="flex gap-3">
                <i className="fab fa-whatsapp text-secondary mt-0.5 flex-shrink-0 text-lg"></i>
                <a
                  href={`https://wa.me/${STORE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  {STORE.whatsappDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-envelope text-secondary mt-0.5 flex-shrink-0"></i>
                <a href={`mailto:${STORE.email}`} className="hover:text-white transition">
                  {STORE.email}
                </a>
              </li>
              <li className="mt-5 p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <i className="fab fa-whatsapp text-secondary text-xl"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">¿Necesitas ayuda? Escríbenos por WhatsApp</p>
                    <a
                      href={`https://wa.me/${STORE.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary font-bold hover:text-white transition"
                    >
                      {STORE.whatsappDisplay}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 2 - Information */}
          <div>
            <h5 className="font-sans font-semibold text-white mb-5 text-base">
              Información
            </h5>
            <ul className="space-y-2.5 text-sm">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 - My Account */}
          <div>
            <h5 className="font-sans font-semibold text-white mb-5 text-base">
              Tu cuenta
            </h5>
            <ul className="space-y-2.5 text-sm">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 - Our Blog */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h5 className="font-sans font-semibold text-white text-base">
                Nuestro blog
              </h5>
              <div className="flex gap-1">
                <button
                  onClick={() => setBlogPage((p) => Math.max(0, p - 1))}
                  disabled={blogPage === 0}
                  className="w-8 h-8 rounded border border-white/30 flex items-center justify-center text-white/80 hover:border-secondary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous"
                >
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>
                <button
                  onClick={() => setBlogPage((p) => Math.min(1, p + 1))}
                  disabled={blogPage >= 1}
                  className="w-8 h-8 rounded border border-white/30 flex items-center justify-center text-white/80 hover:border-secondary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next"
                >
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {visibleBlogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={post.href}
                  className="flex gap-3 group"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm mb-0.5 group-hover:text-secondary transition line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-white/70 text-xs mb-1 line-clamp-1">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-white/60 text-xs">
                      <i className="far fa-calendar-alt"></i>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-secondary text-xs font-medium group-hover:underline">
                      Leer más
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Copyright y redes */}
      <div className="border-t border-white/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {STORE.name}. Todos los derechos reservados.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-secondary transition-colors"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
