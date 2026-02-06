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

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
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
          <div className="flex justify-center text-secondary text-xl gap-1">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
