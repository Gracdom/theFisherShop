'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

interface ProductReview {
  id: string
  author: string
  rating: number
  text: string
  createdAt: string
}

interface RelatedProduct {
  id: string
  name: string
  slug: string
  price: number
  oldPrice: number | null
  image: string | null
  images: string[]
  rating: number
  reviews: number
}

interface Product {
  id: string
  name: string
  shortDescription?: string | null
  description: string | null
  highlights?: string[]
  price: number
  oldPrice: number | null
  image: string | null
  images: string[]
  stock: number
  sku: string
  categoryId: string
  subcategoryId?: string | null
  rating: number
  reviews: number
  category?: { name: string; slug: string } | null
  subcategory?: { name: string; slug: string } | null
}

export default function ProductoPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (!slug) return
      try {
        const { data: prod, error } = await supabase
          .from('Product')
          .select('id, name, shortDescription, description, highlights, price, oldPrice, image, images, stock, sku, categoryId, subcategoryId, rating, reviews')
          .eq('slug', slug)
          .single()

        if (error || !prod) {
          setProduct(null)
          return
        }

        let category: { name: string; slug: string } | null = null
        let subcategory: { name: string; slug: string } | null = null
        if (prod.categoryId) {
          const { data: cat } = await supabase
            .from('Category')
            .select('name, slug')
            .eq('id', prod.categoryId)
            .single()
          category = cat
        }
        if (prod.subcategoryId) {
          const { data: sub } = await supabase
            .from('Subcategory')
            .select('name, slug')
            .eq('id', prod.subcategoryId)
            .single()
          subcategory = sub
        }

        setProduct({ ...prod, category, subcategory } as Product)

        const { data: revData } = await supabase
          .from('ProductReview')
          .select('id, author, rating, text, createdAt')
          .eq('productId', prod.id)
          .order('createdAt', { ascending: false })
          .limit(10)
        setReviews(revData || [])

        let related: RelatedProduct[] = []
        if (prod.categoryId) {
          const res = await supabase
            .from('Product')
            .select('id, name, slug, price, oldPrice, image, images, rating, reviews')
            .eq('categoryId', prod.categoryId)
            .neq('id', prod.id)
            .limit(8)
          if (res.data && res.data.length > 0) {
            related = res.data as RelatedProduct[]
          }
        }
        // Fallback: si no hay otros en la misma categoría, mostrar productos recientes
        if (related.length === 0) {
          const fallback = await supabase
            .from('Product')
            .select('id, name, slug, price, oldPrice, image, images, rating, reviews')
            .neq('id', prod.id)
            .order('createdAt', { ascending: false })
            .limit(8)
          related = (fallback.data as RelatedProduct[]) || []
        }
        setRelatedProducts(related)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  const allImages = product
    ? ([product.image, ...(product.images || [])].filter(Boolean) as string[])
    : []
  const mainImage = allImages[selectedImage] || allImages[0]

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: mainImage || undefined,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const Stars = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) => {
    const r = Math.round(rating)
    return (
      <div
        className={`flex text-amber-400 gap-0.5 ${size === 'md' ? 'text-base' : 'text-xs'}`}
        aria-label={`${rating} de 5 estrellas`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <i key={i} className={`fa-star ${i <= r ? 'fas' : 'far'} text-amber-400`}></i>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-12 bg-gray-200 rounded w-1/3" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/tienda" className="text-primary font-semibold hover:underline">
            Volver a la tienda
          </Link>
        </div>
      </div>
    )
  }

  const displayRating = product.rating > 0 ? product.rating : 5
  const displayReviews = product.reviews > 0 ? product.reviews : reviews.length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary transition">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/tienda" className="hover:text-primary transition">Tienda</Link></li>
            {product.category && (
              <>
                <li>/</li>
                <li>
                  <Link href={`/tienda?categoria=${product.category.slug}`} className="hover:text-primary transition">
                    {product.category.name}
                  </Link>
                </li>
              </>
            )}
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Main product */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <i className="fas fa-image text-8xl"></i>
                  </div>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                        selectedImage === i ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {product.category && (
                <Link
                  href={`/tienda?categoria=${product.category.slug}`}
                  className="inline-block text-primary text-sm font-semibold mb-2 hover:underline"
                >
                  {product.category.name}
                </Link>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>

              {/* Rating + Reviews count */}
              <div className="flex items-center gap-3 mb-5">
                <Stars rating={Math.round(displayRating)} size="md" />
                <span className="text-gray-600 font-medium">{displayRating.toFixed(1)}</span>
                {displayReviews > 0 && (
                  <span className="text-gray-500 text-sm">({displayReviews} reseñas)</span>
                )}
              </div>

              {/* Price - azul corporativo */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  €{product.price.toFixed(2)}
                </span>
                {product.oldPrice != null && product.oldPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    €{product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Descripción corta */}
              {product.shortDescription && (
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-check text-primary text-xs"></i>
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Cantidad + Añadir */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                {product.stock < 10 && product.stock > 0 && (
                  <span className="text-amber-600 text-sm font-medium">¡Solo {product.stock} en stock!</span>
                )}
                {product.stock === 0 && (
                  <span className="text-red-600 text-sm font-medium">Agotado</span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 min-w-[200px] bg-primary hover:bg-secondary text-white py-4 px-8 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <i className="fas fa-check"></i>
                      Añadido al carrito
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart"></i>
                      Añadir al carrito
                    </>
                  )}
                </button>
                <Link
                  href="/carrito"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition"
                >
                  Ver carrito
                </Link>
              </div>
            </div>
          </div>

          {/* Descripción completa */}
          {product.description && (
            <div className="mt-16 bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción completa</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
          )}

          {/* Reseñas */}
          {(reviews.length > 0 || displayReviews > 0) && (
            <div className="mt-16 bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reseñas ({reviews.length > 0 ? reviews.length : displayReviews})
                </h2>
                <div className="flex items-center gap-2">
                  <Stars rating={Math.round(displayRating)} size="md" />
                  <span className="font-semibold text-primary">{displayRating.toFixed(1)}</span>
                </div>
              </div>
              {reviews.length > 0 ? (
                <>
                  <div className="space-y-6">
                    {(showAllReviews ? reviews : reviews.slice(0, 3)).map((r) => (
                      <div key={r.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary flex-shrink-0">
                            {r.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{r.author}</span>
                              <Stars rating={r.rating} size="sm" />
                            </div>
                            <p className="text-gray-600">{r.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {reviews.length > 3 && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowAllReviews((v) => !v)}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition"
                      >
                        {showAllReviews ? 'Ver menos reseñas' : `Ver todas las reseñas (${reviews.length})`}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {displayRating.toFixed(1)} estrellas • {displayReviews} reseñas
                </p>
              )}
            </div>
          )}

          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={{
                      id: p.id,
                      name: p.name,
                      slug: p.slug,
                      price: p.price,
                      originalPrice: p.oldPrice ?? undefined,
                      image: p.image || p.images?.[0] ?? undefined,
                      rating: p.rating || 5,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
