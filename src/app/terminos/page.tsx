export default function TerminosPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y condiciones</h1>
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          <h2 className="text-xl font-semibold text-gray-900">1. Uso del sitio</h2>
          <p>Al utilizar este sitio web aceptas estos términos. El contenido es para uso personal y no comercial.</p>
          <h2 className="text-xl font-semibold text-gray-900">2. Productos y precios</h2>
          <p>Nos reservamos el derecho de modificar precios y disponibilidad. Los precios mostrados incluyen IVA.</p>
          <h2 className="text-xl font-semibold text-gray-900">3. Envíos</h2>
          <p>Los plazos de entrega son orientativos. El envío estándar es gratuito en pedidos superiores a €50.</p>
          <h2 className="text-xl font-semibold text-gray-900">4. Devoluciones</h2>
          <p>Puedes devolver productos en un plazo de 14 días desde la recepción. Contacta con nosotros para iniciar el proceso.</p>
        </div>
      </div>
    </div>
  )
}
