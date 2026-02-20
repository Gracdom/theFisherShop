const features = [
  {
    icon: 'fa-undo-alt',
    title: 'Compra y devolución sencillas',
    description: 'Un clic para comprar y devolver',
  },
  {
    icon: 'fa-shield-alt',
    title: 'Pagos seguros',
    description: '100% de seguridad en el pago',
  },
  {
    icon: 'fa-headset',
    title: 'Atención 24 horas',
    description: 'Soporte disponible todo el día',
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Compra desde la app',
    description: 'Descarga la app y consigue ofertas',
  },
]

export default function Features() {
  return (
    <section className="py-10 lg:py-12 bg-white -mt-12 lg:-mt-16 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-5 lg:p-6 bg-white rounded-2xl shadow-lg border border-gray-100/80 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 flex-shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <i className={`fas ${feature.icon} text-primary text-xl lg:text-2xl group-hover:text-white transition-colors`}></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-gray-900 font-bold text-sm lg:text-base mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs lg:text-sm leading-snug">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
