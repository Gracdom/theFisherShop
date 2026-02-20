'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface SubcategoryItem {
  id: string
  name: string
  slug: string
  categoryId: string
}

interface ApiCategory {
  id: string
  name: string
  slug: string
  subcategories?: SubcategoryItem[]
}

// Mapeo de nombres de categorías a imágenes disponibles
const categoryImageMap: Record<string, string> = {
  'accesorios': 'Accesorios.webp',
  'accesorios para bobinar carretes': 'Accesorios.webp',
  'aparejos': 'Aparejos.webp',
  'cajas para aparejo': 'Aparejos.webp',
  'bolsas para aparejos': 'Aparejos.webp',
  'barcos de pesca': 'Barcos de pesca.webp',
  'botas': 'Botas y vadeadores.webp',
  'vadeadores': 'Botas y vadeadores.webp',
  'botas y vadeadores': 'Botas y vadeadores.webp',
  'cañas': 'Cañas.webp',
  'carretes': 'Carretes.webp',
  'cebos': 'Cebos.webp',
  'almacenamiento de cebos': 'Cebos.webp',
  'combo': 'combo.webp',
  'combos': 'combo.webp',
  'mosca': 'Pesca con mosca.webp',
  'pesca con mosca': 'Pesca con mosca.webp',
  'ropa': 'ropa.webp',
  'sedales': 'Sedales.webp',
  'cables de acero': 'Sedales.webp',
  'senuelos': 'Señuelos y moscas.webp',
  'señuelos': 'Señuelos y moscas.webp',
  'señuelos y moscas': 'Señuelos y moscas.webp',
  'sombreros': 'sombreros.webp',
  'herramientas': 'Accesorios.webp',
  'alicates': 'Accesorios.webp',
  'alicates y herramientas': 'Accesorios.webp',
}

function getImageForCategory(name: string): string {
  const normalizedName = name.toLowerCase().trim()
  
  // Buscar coincidencia exacta primero
  if (categoryImageMap[normalizedName]) {
    return `/categori/${categoryImageMap[normalizedName]}`
  }
  
  // Buscar coincidencia parcial
  for (const [key, image] of Object.entries(categoryImageMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return `/categori/${image}`
    }
  }
  
  // Imagen por defecto
  return '/categori/Accesorios.webp'
}

export default function Categories() {
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsToShow = 5

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (!res.ok) throw new Error('Error cargando categorías')
        const data = await res.json()
        setCategories(
          (data || []).map((c: ApiCategory) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            subcategories: c.subcategories || [],
          }))
        )
      } catch {
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const maxIndex = Math.max(0, categories.length - itemsToShow)
  const canNavigate = categories.length > itemsToShow

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsToShow
  )

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-6 bg-gray-100 rounded animate-pulse mb-3 mx-auto w-32" />
                <div className="h-8 bg-gray-100 rounded-full animate-pulse mx-auto w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Botón anterior */}
          {canNavigate && currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-primary"
              aria-label="Categoría anterior"
            >
              <i className="fas fa-chevron-left text-gray-700 text-xl"></i>
            </button>
          )}

          {/* Contenedor del carrusel */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 ${canNavigate ? 'px-8' : ''}`}>
            {visibleCategories.map((category) => {
              const subcats = category.subcategories || []
              return (
                <div
                  key={category.id}
                  className="flex flex-col items-center gap-4 group"
                >
                  <Link
                    href={`/tienda?categoria=${category.slug}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100 shadow-[0_8px_15px_-3px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_20px_-3px_rgba(0,0,0,0.12)] transition-all duration-300">
                      <Image
                        src={getImageForCategory(category.name)}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 192px, (max-width: 1024px) 192px, 192px"
                      />
                    </div>
                    <h3 className="font-sans text-primary font-semibold text-xl text-center">
                      {category.name}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                    {subcats.length > 0 ? (
                      subcats.slice(0, 2).map((s) => (
                        <Link
                          key={s.id}
                          href={`/tienda?categoria=${category.slug}&subcategoria=${s.slug}`}
                          className="text-sm text-gray-600 hover:text-primary font-medium transition"
                        >
                          {s.name}
                        </Link>
                      ))
                    ) : null}
                  </div>
                  <Link
                    href={`/tienda?categoria=${category.slug}`}
                    className="inline-block bg-[#0B2A51] hover:bg-blue-950 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors border-none"
                  >
                    Ver Todo
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Botón siguiente */}
          {canNavigate && currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-primary"
              aria-label="Siguiente categoría"
            >
              <i className="fas fa-chevron-right text-gray-700 text-xl"></i>
            </button>
          )}
        </div>

        {/* Indicadores de posición */}
        {canNavigate && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a categoría ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
