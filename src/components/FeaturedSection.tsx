export default function FeaturedSection() {
  return (
    <section className="py-10 sm:py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-16 items-center">
          {/* Imagen - Primera en móvil */}
          <div className="relative order-1 md:order-2">
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-400/20 rounded-full blur-3xl"></div>
            <div 
              className="relative w-full h-48 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg sm:shadow-2xl"
              style={{
                backgroundImage: 'url("/images/home%20(1).webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Badge móvil sobre la imagen */}
              <div className="sm:hidden absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                <i className="fas fa-fish mr-1"></i>
                Agua dulce
              </div>
            </div>
          </div>

          {/* Contenido - Segundo en móvil */}
          <div className="order-2 md:order-1 px-1 sm:pl-8 md:pl-12 lg:pl-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
              <span className="hidden sm:inline">Pesca en </span>
              <span className="sm:hidden">Equipo de </span>
              <span className="text-secondary">agua dulce</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              Gran variedad de equipo de pesca con mosca de la mejor calidad
            </p>
            
            {/* Lista - Compacta en móvil */}
            <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
              <li className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <span className="w-5 h-5 sm:w-auto sm:h-auto rounded-full bg-secondary/10 sm:bg-transparent flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-secondary text-xs sm:text-lg"></i>
                </span>
                <span className="text-sm sm:text-base">Equipamiento de primera calidad</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <span className="w-5 h-5 sm:w-auto sm:h-auto rounded-full bg-secondary/10 sm:bg-transparent flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-secondary text-xs sm:text-lg"></i>
                </span>
                <span className="text-sm sm:text-base">Las mejores ofertas</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <span className="w-5 h-5 sm:w-auto sm:h-auto rounded-full bg-secondary/10 sm:bg-transparent flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-secondary text-xs sm:text-lg"></i>
                </span>
                <span className="text-sm sm:text-base">Equipo profesional</span>
              </li>
            </ul>
            
            <a
              href="/tienda"
              className="inline-block bg-primary text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-secondary transition transform hover:scale-105 active:scale-95 uppercase text-xs sm:text-sm"
            >
              Ver tienda
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
