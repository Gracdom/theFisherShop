'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ProductCard, { Product } from './ProductCard'
import { supabase } from '@/lib/supabase'

interface ApiProduct {
  id: string
  slug?: string
  name: string
  description?: string | null
  price: number
  oldPrice?: number | null
  image?: string | null
  images?: string[]
  rating?: number
  featured?: boolean
  trending?: boolean
}

function mapApiProductToCard(p: ApiProduct): Product {
  let badge: string | undefined
  let badgeType: 'discount' | 'new' | 'hot' | undefined
  if (p.oldPrice && p.oldPrice > p.price) {
    const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
    badge = `-${discount}%`
    badgeType = 'discount'
  } else if (p.trending) {
    badge = 'Tendencia'
    badgeType = 'hot'
  } else if (p.featured) {
    badge = 'Destacado'
    badgeType = 'hot'
  }
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description || undefined,
    price: p.price,
    originalPrice: p.oldPrice || undefined,
    rating: p.rating ?? 0,
    image: p.image || p.images?.[0] || undefined,
    badge,
    badgeType,
  }
}

const PRODUCTS_PER_PAGE = 8 // 4 columnas x 2 filas

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        let query = supabase
          .from('Product')
          .select('id, slug, name, description, price, oldPrice, image, images, rating, featured, trending')

        if (categorySlug) {
          const { data: cat } = await supabase
            .from('Category')
            .select('id')
            .eq('slug', categorySlug)
            .single()
          if (cat) {
            query = query.eq('categoryId', cat.id)
          }
        }

        const { data, error } = await query.order('createdAt', { ascending: false })

        if (error) throw error
        setProducts((data || []).map(mapApiProductToCard))
        setCurrentPage(0)
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [categorySlug])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Productos destacados
          </h2>
          <div className="flex justify-center text-yellow-400 text-sm md:text-xl gap-0.5 md:gap-1">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 md:h-80 bg-gray-100 rounded-xl md:rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 md:py-16 text-gray-500">
            <i className="fas fa-box-open text-5xl md:text-6xl mb-4 opacity-50"></i>
            <p className="text-base md:text-lg">No hay productos disponibles</p>
          </div>
        ) : (
          <>
            <div className="relative">
              {/* Flechas de navegación - Solo visibles si hay más de 1 página */}
              {totalPages > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 md:-translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
                    aria-label="Productos anteriores"
                  >
                    <i className="fas fa-chevron-left text-xs sm:text-sm md:text-base"></i>
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={currentPage >= totalPages - 1}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 md:translate-x-4 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
                    aria-label="Siguientes productos"
                  >
                    <i className="fas fa-chevron-right text-xs sm:text-sm md:text-base"></i>
                  </button>
                </>
              )}

              {/* Grid de productos */}
              <div className={`overflow-hidden ${totalPages > 1 ? 'px-6 sm:px-10 md:px-16' : ''}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                  {products
                    .slice(
                      currentPage * PRODUCTS_PER_PAGE,
                      currentPage * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE
                    )
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            </div>

            {/* Indicadores de página - táctiles en móvil */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 sm:gap-2 mt-5 md:mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentPage 
                        ? 'bg-primary w-6 sm:w-8 h-2.5 sm:h-2.5' 
                        : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
                    }`}
                    aria-label={`Página ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Botón ver todos */}
            <div className="text-center mt-8 md:mt-12">
              <Link
                href="/tienda"
                className="inline-block bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-secondary transition text-sm sm:text-base active:scale-95"
              >
                Ver todos los productos
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
