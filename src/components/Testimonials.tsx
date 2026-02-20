'use client'

import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Márquez',
    role: 'Pescador profesional',
    text: 'Excelente tienda de pesca. La calidad de los productos supera mis expectativas. Las cañas y carretes que compré han resistido jornadas intensas en el mar. Recomiendo The Fisher Shop sin dudarlo.',
    shortText: 'Excelente tienda. La calidad supera expectativas. Recomiendo The Fisher Shop sin dudarlo.',
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    role: 'Aficionada a la pesca deportiva',
    text: 'Encontré todo lo que necesitaba para mi primer equipo completo. El asesoramiento fue excelente y el envío llegó perfectamente embalado. Volveré a comprar sin duda.',
    shortText: 'Encontré todo para mi primer equipo. Asesoramiento excelente. Volveré a comprar.',
  },
  {
    id: 3,
    name: 'Miguel Torres',
    role: 'Guía de pesca',
    text: 'Como guía profesional confío en The Fisher Shop para equipar a mis clientes. Los señuelos y accesorios son de primera calidad. Un referente en el sector.',
    shortText: 'Como guía profesional confío en The Fisher Shop. Productos de primera calidad.',
  },
  {
    id: 4,
    name: 'Laura Fernández',
    role: 'Pescadora de truchas',
    text: 'Los señuelos de mosca son de excelente calidad. Buen precio y envío rápido. Repetiré en próximas temporadas de pesca.',
    shortText: 'Señuelos de excelente calidad. Buen precio y envío rápido. Repetiré.',
  },
]

const ITEMS_PER_PAGE_DESKTOP = 2
const totalPagesDesktop = Math.ceil(testimonials.length / ITEMS_PER_PAGE_DESKTOP)

function GoogleLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPagesDesktop)
      setMobileIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: mobileIndex * cardWidth,
        behavior: 'smooth'
      })
    }
  }, [mobileIndex])

  const handleMobileScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth
      const scrollLeft = scrollRef.current.scrollLeft
      const newIndex = Math.round(scrollLeft / cardWidth)
      if (newIndex !== mobileIndex && newIndex >= 0 && newIndex < testimonials.length) {
        setMobileIndex(newIndex)
      }
    }
  }

  const start = currentPage * ITEMS_PER_PAGE_DESKTOP
  const visible = testimonials.slice(start, start + ITEMS_PER_PAGE_DESKTOP)

  return (
    <section className="py-10 sm:py-20 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(180, 140, 100, 0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 30% 70%, rgba(200, 170, 130, 0.12) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <svg
            className="w-20 sm:w-32 h-2 sm:h-3 mx-auto text-gray-300"
            viewBox="0 0 128 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8 Q20 2, 40 8 T80 8 T120 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* MÓVIL: Carrusel horizontal */}
        <div className="sm:hidden">
          <div 
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-3 px-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 w-full snap-center px-1"
              >
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mx-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GoogleLogo className="w-5 h-5" />
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star text-[10px]"></i>
                        ))}
                      </div>
                    </div>
                    <i className="fas fa-quote-right text-gray-200 text-lg"></i>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{t.shortText}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{t.name}</h3>
                      <p className="text-[11px] text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicadores móvil */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === mobileIndex 
                    ? 'bg-primary w-5 h-2' 
                    : 'bg-gray-300 w-2 h-2'
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* TABLET Y DESKTOP: Grid de 2 columnas */}
        <div className="hidden sm:block">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {visible.map((t) => (
              <div
                key={t.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <GoogleLogo className="w-7 h-7" />
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-sm"></i>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{t.text}</p>
                <div>
                  <h3 className="font-bold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {totalPagesDesktop > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPagesDesktop }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentPage ? 'bg-primary scale-110' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
