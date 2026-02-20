'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    title: "Tu Aventura de Pesca Comienza Aquí",
    subtitle: "Equipamiento profesional para pescadores apasionados. Encuentra todo lo que necesitas para tu próxima captura.",
    buttonText: "Explorar Equipamiento",
    buttonLink: "/tienda",
    features: ["Envío Gratis", "Calidad Premium", "Garantía Oficial"],
  },
  {
    title: "Calidad que Confía el Pescador",
    subtitle: "Desde cañas hasta carretes, pasando por señuelos y accesorios. Todo para hacer de tu pesca una experiencia única.",
    buttonText: "Ver Productos",
    buttonLink: "/tienda",
    features: ["+500 Productos", "Expertos en Pesca", "Soporte 24/7"],
  },
  {
    title: "Todo para Tu Próxima Captura",
    subtitle: "Las mejores marcas y equipamiento de pesca. Envío rápido y asesoramiento experto.",
    buttonText: "Ver Tienda",
    buttonLink: "/tienda",
    features: ["Marcas Top", "Ofertas Exclusivas", "Envío 24-48h"],
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Cambia cada 6 segundos

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const bannerImages = ['/images/banner.webp', '/images/banner2.webp', '/images/banner.webp']

  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    size: Math.random() * 3 + 2
  }))

  return (
    <section className="relative min-h-[600px] lg:min-h-[780px] flex items-center overflow-hidden -mt-24 pt-24">
      {/* Fondo con 2 imágenes que cambian según el slide */}
      <div className="absolute inset-0">
        {bannerImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0,
            }}
          />
        ))}
      </div>
      
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 via-black/20 to-transparent z-[2]"></div>
      
      {/* Estrellas decorativas */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-yellow-300 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`,
            fontSize: `${star.size}px`,
          }}
        >
          ★
        </div>
      ))}
      
      {/* Contenedor del slider */}
      <div className="relative z-10 w-full">
        <div className="relative overflow-hidden">
          {/* Slides */}
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index}
                className="min-w-full px-4 lg:px-8 xl:px-16 py-12 lg:py-20"
              >
                <div className="max-w-3xl text-left relative">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-full mb-6 shadow-lg">
                    <i className="fas fa-star text-yellow-300 text-sm"></i>
                    <span className="text-sm font-semibold">Lo Mejor en Pesca</span>
                  </div>
                  
                  {/* Título */}
                  <h1 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 text-white leading-tight"
                    style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.8)' }}
                  >
                    {slide.title}
                  </h1>
                  
                  {/* Subtítulo */}
                  <p className="text-lg md:text-xl text-white/95 mb-6 max-w-2xl leading-relaxed" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
                    {slide.subtitle}
                  </p>
                  
                  {/* Características */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {slide.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/25"
                      >
                        <i className="fas fa-check text-green-300 text-sm"></i>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Botón CTA */}
                  <a
                    href={slide.buttonLink}
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {slide.buttonText}
                    <i className="fas fa-arrow-right text-sm"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores del slider mejorados */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative rounded-full transition-all duration-500 ${
                currentSlide === index 
                  ? 'bg-white w-10 h-3 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            >
              {currentSlide === index && (
                <span className="absolute inset-0 rounded-full bg-white animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
