'use client'

const values = [
  {
    icon: 'fas fa-award',
    title: 'Calidad garantizada',
    description: 'Trabajamos solo con marcas líderes en el sector. Cada producto pasa controles de calidad antes de llegar a ti.',
  },
  {
    icon: 'fas fa-heart',
    title: 'Atención personalizada',
    description: 'Expertos pescadores te asesoran para elegir el equipo ideal. Tu éxito es nuestro objetivo.',
  },
  {
    icon: 'fas fa-shipping-fast',
    title: 'Envío rápido y seguro',
    description: 'Enviamos en 24-48h a toda España. Embalaje reforzado para que tu equipo llegue en perfectas condiciones.',
  },
  {
    icon: 'fas fa-tag',
    title: 'Precios competitivos',
    description: 'Las mejores ofertas sin renunciar a la calidad. Promociones exclusivas para suscriptores.',
  },
]

const stats = [
  { value: '+10', label: 'Años de experiencia' },
  { value: '+5000', label: 'Clientes satisfechos' },
  { value: '+500', label: 'Productos en catálogo' },
  { value: '4.9/5', label: 'Valoración media' },
]

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/nosotros%20(1).webp")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <i className="fas fa-fish text-secondary"></i>
            <span className="text-sm font-semibold">The Fisher Shop</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
            Tu tienda de pesca de confianza
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl">
            Más de una década equipando a pescadores de todos los niveles con el mejor material.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">Nuestra historia</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pasión por la pesca desde 2014
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>The Fisher Shop</strong> nació del sueño de crear una tienda donde los pescadores encontraran no solo productos, sino asesoramiento experto y una comunidad apasionada por el deporte.
                </p>
                <p>
                  Empezamos con una pequeña selección de cañas y carretes en Madrid. Hoy ofrecemos más de 500 referencias: desde pesca con mosca hasta spinning en mar, equipamiento para principiantes y profesionales.
                </p>
                <p>
                  Seguimos siendo una empresa familiar donde cada pedido importa. Nuestro equipo está formado por pescadores que conocen el río, el lago y el mar, y te ayudamos a elegir el equipo perfecto.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/nosotros%20(2).webp"
                  alt="Pesca en aguas tranquilas"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-3xl font-bold">+10</p>
                <p className="text-sm text-white/90">años acompañando pescadores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">Qué nos define</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Los pilares que guían cada decisión que tomamos.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <i className={`fas ${v.icon} text-primary text-xl group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-secondary mb-1">{s.value}</p>
                <p className="text-white/80 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imagen + CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("/images/nosotros%20(3).webp")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
            <div className="relative z-10 p-8 md:p-16 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para tu próxima aventura?
              </h2>
              <p className="text-white/90 mb-6">
                Explora nuestro catálogo y encuentra el equipo perfecto para ti.
              </p>
              <a
                href="/tienda"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-secondary hover:text-white transition"
              >
                Ver tienda
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
