export default function SobreNosotrosPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sobre nosotros</h1>
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            <strong>The FisherShop</strong> es tu tienda de confianza para equipamiento de pesca profesional.
            Desde hace años nos dedicamos a ofrecer los mejores productos para pescadores de todos los niveles.
          </p>
          <p>
            Nuestra selección incluye cañas, carretes, señuelos, sedales y todo lo que necesitas para tu próxima
            aventura de pesca. Trabajamos con las mejores marcas del sector para garantizarte calidad y durabilidad.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mt-8">Nuestros valores</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Calidad en cada producto</li>
            <li>Atención al cliente personalizada</li>
            <li>Envío rápido y seguro</li>
            <li>Precios competitivos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
