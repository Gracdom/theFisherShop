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
    image: p.image || undefined,
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
          .select('id, slug, name, description, price, oldPrice, image, rating, featured, trending')

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Productos destacados
          </h2>
          <div className="flex justify-center text-yellow-400 text-xl gap-1">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <i className="fas fa-box-open text-6xl mb-4 opacity-50"></i>
            <p className="text-lg">No hay productos disponibles</p>
          </div>
        ) : (
          <>
            <div className="relative flex items-center gap-4">
              {/* Flecha izquierda */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Productos anteriores"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              {/* Grid 4 columnas x 2 filas */}
              <div className="flex-1 overflow-hidden px-12 md:px-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

              {/* Flecha derecha */}
              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(
                      Math.ceil(products.length / PRODUCTS_PER_PAGE) - 1,
                      p + 1
                    )
                  )
                }
                disabled={
                  currentPage >= Math.ceil(products.length / PRODUCTS_PER_PAGE) - 1
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Siguientes productos"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Indicador de página */}
            {Math.ceil(products.length / PRODUCTS_PER_PAGE) > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({
                  length: Math.ceil(products.length / PRODUCTS_PER_PAGE),
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      i === currentPage ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Página ${i + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/tienda"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition"
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
