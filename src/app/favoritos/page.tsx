'use client'

import { useFavorites } from '@/context/FavoritesContext'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default function FavoritosPage() {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabecera: compacta en móvil, safe area */}
      <div className="bg-primary text-white pt-6 pb-8 sm:pt-8 sm:pb-10 md:py-16 safe-area-top">
        <div className="container mx-auto px-3 sm:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Mis favoritos</h1>
          <p className="text-white/90 mt-1.5 sm:mt-2 text-sm sm:text-base">
            {favorites.length === 0
              ? 'Aún no tienes productos guardados'
              : `${favorites.length} producto${favorites.length === 1 ? '' : 's'} guardado${favorites.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-5 sm:py-8 md:py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mx-auto max-w-lg">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <i className="far fa-heart text-3xl sm:text-4xl text-gray-300"></i>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 px-2">Tu lista está vacía</h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 max-w-sm mx-auto px-2">
              Guarda tus productos favoritos haciendo clic en el corazón para verlos aquí.
            </p>
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-primary text-white px-6 sm:px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary transition active:scale-[0.98] touch-manipulation"
            >
              <i className="fas fa-store text-sm"></i>
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {favorites.map((p) => (
              <div key={p.id} className="relative group">
                <ProductCard
                  product={{
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    price: p.price,
                    image: p.image || null,
                  }}
                  linkToProduct={true}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeFavorite(p.id)
                  }}
                  className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] rounded-full bg-white/95 shadow-md flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-95 transition touch-manipulation"
                  aria-label="Quitar de favoritos"
                >
                  <i className="fas fa-heart text-sm sm:text-base"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
