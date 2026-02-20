'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  oldPrice: number | null
  image: string | null
  images: string[]
  stock: number
  sku: string
  categoryId: string
  category?: { name: string; slug: string } | null
}

export default function ProductoPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return
      try {
        const { data: prod, error } = await supabase
          .from('Product')
          .select('id, name, description, price, oldPrice, image, images, stock, sku, categoryId')
          .eq('slug', slug)
          .single()

        if (error || !prod) {
          setProduct(null)
          return
        }

        let category: { name: string; slug: string } | null = null
        if (prod.categoryId) {
          const { data: cat } = await supabase
            .from('Category')
            .select('name, slug')
            .eq('id', prod.categoryId)
            .single()
          category = cat
        }

        setProduct({ ...prod, category } as Product)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  const mainImage = product ? (product.image || product.images?.[0]) : null

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

  if (loading) {
    return (
      <div className="py-12 container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
        <Link href="/tienda" className="text-primary hover:underline">
          Volver a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/tienda" className="hover:text-primary">Tienda</Link>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/tienda?categoria=${product.category.slug}`} className="hover:text-primary">
                {product.category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <i className="fas fa-image text-6xl text-gray-300"></i>
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <Link
                href={`/tienda?categoria=${product.category.slug}`}
                className="text-primary text-sm font-medium mb-2 inline-block hover:underline"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">
                  €{product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.description && (
              <div className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-500">Cantidad:</span>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              {product.stock < 10 && product.stock > 0 && (
                <span className="text-amber-600 text-sm">¡Solo {product.stock} en stock!</span>
              )}
              {product.stock === 0 && (
                <span className="text-red-600 text-sm">Agotado</span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {added ? '¡Añadido! ✓' : 'Añadir al carrito'}
              </button>
              <Link
                href="/carrito"
                className="px-6 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition"
              >
                Ver carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
