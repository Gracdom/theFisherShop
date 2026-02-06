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
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <i className={`fas ${feature.icon} text-secondary text-4xl`}></i>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-base mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
