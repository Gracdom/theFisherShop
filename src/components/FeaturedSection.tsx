export default function FeaturedSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="pl-8 md:pl-12 lg:pl-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Pesca en <span className="text-secondary">agua dulce</span>
            </h2>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              Gran variedad de equipo de pesca con mosca de la mejor calidad
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-gray-700">
                <i className="fas fa-check text-secondary text-lg mt-0.5"></i>
                <span>Equipamiento de pesca de primera calidad</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <i className="fas fa-check text-secondary text-lg mt-0.5"></i>
                <span>Material de pesca con las mejores ofertas</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <i className="fas fa-check text-secondary text-lg mt-0.5"></i>
                <span>Equipo profesional para todos los pescadores</span>
              </li>
            </ul>
            <a
              href="/tienda"
              className="inline-block bg-primary text-white px-10 py-3 rounded-full font-semibold hover:bg-secondary transition transform hover:scale-105 uppercase text-sm"
            >
              Ver tienda
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="relative w-full h-96 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl"
              style={{
                backgroundImage: 'url("/images/section-lago.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
