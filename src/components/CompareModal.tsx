'use client'

import Link from 'next/link'
import { useCompare } from '@/context/CompareContext'

export default function CompareModal() {
  const { items, isOpen, close, removeFromCompare, clearCompare, suggestedId } = useCompare()

  if (!isOpen || items.length === 0) return null

  const best = items.find((i) => i.id === suggestedId) || null

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Comparar productos</h2>
            <p className="text-xs text-gray-500">Estás comparando {items.length} producto(s)</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Limpiar comparación
            </button>
            <button
              onClick={close}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700"
              aria-label="Cerrar"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>

        <div className="p-4 overflow-auto">
          <div className="min-w-[600px]">
            <div className="grid" style={{ gridTemplateColumns: `180px repeat(${items.length}, minmax(140px, 1fr))` }}>
              {/* Cabecera con nombres */}
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Producto
              </div>
              {items.map((item) => (
                <div key={item.id} className="p-3 border-l border-gray-100 flex flex-col items-center gap-2">
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="self-end text-[11px] text-gray-400 hover:text-red-500"
                  >
                    Quitar
                  </button>
                  <Link href={`/producto/${item.slug || item.id}`} onClick={close}>
                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden mb-1 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <i className="fas fa-fish text-gray-300 text-2xl"></i>
                      )}
                    </div>
                  </Link>
                  <Link
                    href={`/producto/${item.slug || item.id}`}
                    onClick={close}
                    className="text-sm font-semibold text-gray-900 text-center line-clamp-2 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}

              {/* Precio */}
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t border-gray-100 flex items-center">
                Precio
              </div>
              {items.map((item) => (
                <div key={item.id} className="p-3 border-t border-l border-gray-100 text-center">
                  <span className="text-base font-bold text-gray-900">€{item.price.toFixed(2)}</span>
                </div>
              ))}

              {/* Valoración */}
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t border-gray-100 flex items-center">
                Valoración
              </div>
              {items.map((item) => (
                <div key={item.id} className="p-3 border-t border-l border-gray-100 text-center">
                  {typeof item.rating === 'number' && item.rating > 0 ? (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-500">
                      <i className="fas fa-star"></i>
                      {item.rating.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Sin reseñas</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sugerencia */}
        {best && (
          <div className="border-t px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Sugerencia para tu compra
              </p>
              <p className="text-sm text-gray-700">
                Según <span className="font-semibold">relación calidad/precio</span>{' '}
                te recomendamos:
                <span className="font-semibold text-primary"> {best.name}</span>.
              </p>
            </div>
            <Link
              href={`/producto/${best.slug || best.id}`}
              onClick={close}
              className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition"
            >
              Ver y comprar {best.name.split(' ')[0] || 'producto'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

