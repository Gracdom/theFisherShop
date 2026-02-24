'use client'

import Link from 'next/link'
import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'

export default function FavoritesModal() {
  const { favorites, removeFavorite, isFavoritesOpen, closeFavorites } = useFavorites()
  const { addToCart } = useCart()

  if (!isFavoritesOpen) return null

  const handleAddToCart = (item: { id: string; name: string; price: number; image?: string }) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={closeFavorites} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col" style={{ animation: 'slideInRight 0.25s ease-out', willChange: 'transform' }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b bg-primary">
            <div className="flex items-center gap-3">
              <i className="far fa-heart text-white text-xl"></i>
              <h2 className="text-xl font-bold text-white">Favoritos ({favorites.length})</h2>
            </div>
            <button onClick={closeFavorites} className="text-white hover:text-secondary text-2xl p-1" aria-label="Cerrar">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <i className="far fa-heart text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg mb-2">No tienes favoritos</p>
                <p className="text-gray-400 text-sm mb-6">Añade productos con el corazón para verlos aquí</p>
                <Link
                  href="/tienda"
                  onClick={closeFavorites}
                  className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary transition"
                >
                  Ir a la tienda
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Link href={`/producto/${item.slug || item.id}`} onClick={closeFavorites} className="flex-shrink-0">
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <i className="fas fa-fish text-gray-300 text-2xl"></i>
                        )}
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/producto/${item.slug || item.id}`} onClick={closeFavorites} className="block">
                        <h3 className="font-semibold text-gray-900 truncate hover:text-primary transition">{item.name}</h3>
                      </Link>
                      <p className="text-primary font-bold text-lg">€{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-secondary transition"
                        >
                          <i className="fas fa-cart-plus mr-1"></i> Añadir
                        </button>
                        <button
                          onClick={() => removeFavorite(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          aria-label="Quitar de favoritos"
                        >
                          <i className="fas fa-heart text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {favorites.length > 0 && (
            <div className="border-t p-6">
              <Link
                href="/favoritos"
                onClick={closeFavorites}
                className="block w-full py-3 border-2 border-primary text-primary font-semibold rounded-xl text-center hover:bg-primary hover:text-white transition"
              >
                Ver todos los favoritos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
