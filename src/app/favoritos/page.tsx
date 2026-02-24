'use client'

import { useFavorites } from '@/context/FavoritesContext'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default function FavoritosPage() {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Mis favoritos</h1>
          <p className="text-white/90 mt-2">
            {favorites.length === 0
              ? 'Aún no tienes productos guardados'
              : `${favorites.length} producto${favorites.length === 1 ? '' : 's'} guardado${favorites.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <i className="far fa-heart text-4xl text-gray-300"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tu lista está vacía</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Guarda tus productos favoritos haciendo clic en el corazón para verlos aquí.
            </p>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary transition"
            >
              <i className="fas fa-store"></i>
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                  className="absolute top-2 right-2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                  aria-label="Quitar de favoritos"
                >
                  <i className="fas fa-heart text-lg"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
