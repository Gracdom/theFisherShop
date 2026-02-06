'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    title: "Tu Aventura de Pesca Comienza Aquí",
    subtitle: "Equipamiento profesional para pescadores apasionados. Encuentra todo lo que necesitas para tu próxima captura.",
    buttonText: "Explorar Equipamiento",
    buttonLink: "/tienda",
    features: ["Envío Gratis", "Calidad Premium", "Garantía Oficial"],
    icon: "🎣"
  },
  {
    title: "Calidad que Confía el Pescador",
    subtitle: "Desde cañas hasta carretes, pasando por señuelos y accesorios. Todo para hacer de tu pesca una experiencia única.",
    buttonText: "Ver Productos",
    buttonLink: "/tienda",
    features: ["+500 Productos", "Expertos en Pesca", "Soporte 24/7"],
    icon: "🐟"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000) // Cambia cada 8 segundos (más lento)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Generar estrellas decorativas
  const stars = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    size: Math.random() * 4 + 2
  }))

  return (
    <section className="relative min-h-[500px] lg:min-h-[650px] flex items-center overflow-hidden -mt-24 pt-24"
      style={{
        backgroundImage: 'url("/images/banner.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      
      {/* Estrellas decorativas animadas */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-yellow-300 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`,
            fontSize: `${star.size}px`,
            filter: 'drop-shadow(0 0 3px rgba(255, 255, 0, 0.8))',
          }}
        >
          ⭐
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
                  {/* Icono decorativo grande */}
                  <div className="absolute -top-4 -left-4 text-8xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>
                    {slide.icon}
                  </div>
                  
                  {/* Badge destacado */}
                  <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 shadow-lg animate-fade-in">
                    <i className="fas fa-star text-yellow-300"></i>
                    <span className="text-sm font-semibold">Lo Mejor en Pesca</span>
                  </div>
                  
                  {/* Título principal con efecto de brillo */}
                  <h1 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight relative"
                    style={{
                      textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(59, 130, 246, 0.3)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    <span className="relative inline-block">
                      {slide.title}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
                    </span>
                  </h1>
                  
                  {/* Subtítulo */}
                  <p 
                    className="text-lg md:text-xl lg:text-2xl text-white/95 mb-6 max-w-2xl leading-relaxed"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  
                  {/* Características destacadas */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {slide.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30 shadow-md hover:bg-white/30 transition-all duration-300"
                      >
                        <i className="fas fa-check-circle text-green-300"></i>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Botón CTA mejorado */}
                  <a
                    href={slide.buttonLink}
                    className="group inline-flex items-center gap-3 bg-primary hover:bg-secondary text-white font-bold px-10 py-5 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-110 text-lg relative overflow-hidden"
                    style={{
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    <span className="relative z-10">{slide.buttonText}</span>
                    <i className="fas fa-arrow-right ml-2 relative z-10 transform group-hover:translate-x-2 transition-transform"></i>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </a>
                  
                  {/* Elementos decorativos adicionales */}
                  <div className="absolute -bottom-8 -right-8 text-6xl opacity-10 animate-float" style={{ animationDuration: '4s' }}>
                    🎣
                  </div>
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
      
      {/* Botón de chat flotante */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl hover:bg-secondary transition z-50 border-2 border-secondary animate-bounce" style={{ animationDuration: '2s' }}>
        <i className="fas fa-comments text-white text-2xl"></i>
      </button>
      
      {/* Estilos de animación personalizados */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}
