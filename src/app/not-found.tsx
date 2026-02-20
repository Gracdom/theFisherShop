import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center px-4">
        <div className="relative inline-block mb-8">
          <span className="text-[180px] md:text-[220px] font-bold text-primary/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-fish text-6xl md:text-8xl text-primary animate-pulse"></i>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ¡Este pez se escapó!
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. 
          Vuelve a lanzar tu caña en nuestra tienda.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            <i className="fas fa-store"></i>
            Ir a la tienda
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-200 transition"
          >
            <i className="fas fa-home"></i>
            Volver al inicio
          </Link>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-gray-400">
          <div className="text-center">
            <i className="fas fa-headset text-2xl mb-2 block"></i>
            <p className="text-sm">¿Necesitas ayuda?</p>
            <a href="/contacto" className="text-primary text-sm font-medium hover:underline">
              Contáctanos
            </a>
          </div>
          <div className="text-center">
            <i className="fas fa-question-circle text-2xl mb-2 block"></i>
            <p className="text-sm">¿Tienes dudas?</p>
            <a href="/faq" className="text-primary text-sm font-medium hover:underline">
              Ver FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
