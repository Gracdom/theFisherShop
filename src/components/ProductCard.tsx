'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export interface Product {
  id: string
  name: string
  slug?: string
  description?: string | null
  price: number
  originalPrice?: number
  rating?: number
  icon?: string
  image?: string | null
  badge?: string
  badgeType?: 'discount' | 'new' | 'hot'
}

interface ProductCardProps {
  product: Product
  linkToProduct?: boolean
  variant?: 'grid' | 'list'
}

export default function ProductCard({ product, linkToProduct = true, variant = 'grid' }: ProductCardProps) {
  const { addToCart } = useCart()
  const [showNotification, setShowNotification] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const getBadgeColor = () => {
    switch (product.badgeType) {
      case 'discount':
        return 'bg-red-500'
      case 'new':
        return 'bg-accent'
      case 'hot':
        return 'bg-secondary'
      default:
        return 'bg-red-500'
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className="fas fa-star"></i>
    ))
  }

  const isList = variant === 'list'
  const AddToCartBtn = (
    <button
      onClick={(e) => handleAddToCart(e)}
      className={`inline-flex items-center justify-center gap-1.5 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-200 text-xs ${isList ? 'w-full' : ''} hover:shadow-lg`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Añadir al carrito
    </button>
  )

  const CardContentGrid = (
    <>
      {product.badge && (
        <div
          className={`absolute top-4 left-4 ${getBadgeColor()} text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg`}
        >
          {product.badge}
        </div>
      )}
      <div className="w-full h-52 bg-gray-50/50 rounded-2xl flex items-center justify-center mb-5 overflow-hidden group-hover:bg-gray-100/50 transition-colors duration-300">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <i className={`fas ${product.icon || 'fa-fish'} text-gray-300 text-6xl`}></i>
        )}
      </div>
      <div className="flex justify-center text-amber-400 text-xs mb-2">{renderStars()}</div>
      <h3 className="text-gray-900 font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors text-center">{product.name}</h3>
      <div className="flex items-center justify-center gap-2 mb-4">
        {(product.originalPrice ?? 0) > 0 && (
          <span className="text-gray-400 line-through text-sm">€{product.originalPrice!.toFixed(2)}</span>
        )}
        <span className="text-gray-900 font-bold text-xl">€{product.price.toFixed(2)}</span>
      </div>
      <div className="flex justify-center">{AddToCartBtn}</div>
      {showNotification && (
        <div className="absolute -top-2 -right-2 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
          ¡Añadido! ✓
        </div>
      )}
    </>
  )

  const CardContentList = (
    <>
      <div className="w-32 sm:w-40 h-32 sm:h-40 flex-shrink-0 bg-gray-50/50 rounded-2xl flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
        ) : (
          <i className={`fas ${product.icon || 'fa-fish'} text-gray-300 text-4xl`}></i>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex text-amber-400 text-xs mb-1">{renderStars()}</div>
        <h3 className="text-gray-900 font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          {(product.originalPrice ?? 0) > 0 && (
            <span className="text-gray-400 line-through text-sm">€{product.originalPrice!.toFixed(2)}</span>
          )}
          <span className="text-gray-900 font-bold text-xl">€{product.price.toFixed(2)}</span>
        </div>
        {AddToCartBtn}
      </div>
      {product.badge && (
        <div className={`absolute top-3 left-3 ${getBadgeColor()} text-white px-3 py-1 rounded-full text-xs font-bold z-10`}>
          {product.badge}
        </div>
      )}
      {showNotification && (
        <div className="absolute top-3 right-3 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
          ¡Añadido! ✓
        </div>
      )}
    </>
  )

  const slug = product.slug || product.id
  const CardContent = isList ? CardContentList : CardContentGrid

  const cardClasses = `bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative h-full flex ${
    isList ? 'flex-row gap-6' : 'flex-col items-center text-center border border-gray-100/80'
  }`

  if (linkToProduct && slug) {
    return (
      <Link href={`/producto/${slug}`} className="block">
        <div className={cardClasses}>
          {CardContent}
        </div>
      </Link>
    )
  }

  return (
    <div className={cardClasses}>
      {CardContent}
    </div>
  )
}
