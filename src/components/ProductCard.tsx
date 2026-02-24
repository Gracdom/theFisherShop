'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useCompare } from '@/context/CompareContext'
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
  const { toggleFavorite, isFavorite } = useFavorites()
  const { toggleCompare, isCompared } = useCompare()
  const [showNotification, setShowNotification] = useState(false)

  const favorited = isFavorite(product.id)
  const compared = isCompared(product.id)
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image || undefined,
    })
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleCompare({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      rating: product.rating,
      image: product.image || undefined,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || undefined,
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
      className={`inline-flex items-center justify-center gap-1.5 sm:gap-1.5 bg-primary text-white py-2.5 sm:py-2 px-3 sm:px-4 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 text-xs sm:text-xs min-h-[40px] ${isList ? 'w-full' : 'w-full sm:w-auto'} active:scale-[0.98]`}
    >
      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className="hidden sm:inline">Añadir al carrito</span>
      <span className="sm:hidden">Añadir</span>
    </button>
  )

  const CardContentGrid = (
    <>
      {product.badge && (
        <div
          className={`absolute top-2 left-2 sm:top-4 sm:left-4 ${getBadgeColor()} text-white px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-full text-[9px] sm:text-xs font-bold z-10 shadow-md`}
        >
          {product.badge}
        </div>
      )}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center z-10 hover:scale-110 transition"
        aria-label={favorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <i className={`${favorited ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-base`}></i>
      </button>
      <button
        onClick={handleCompare}
        className="absolute top-12 right-2 sm:top-[3.75rem] sm:right-4 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center z-10 hover:scale-110 transition text-[11px] text-gray-500"
        aria-label={compared ? 'Quitar de comparación' : 'Añadir a comparación'}
      >
        <i className="fas fa-sliders-h"></i>
      </button>
      {/* Imagen aspect-square en móvil para look app */}
      <div className="w-full aspect-square sm:h-44 md:h-52 bg-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden group-hover:bg-gray-100/50 transition-colors">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <i className={`fas ${product.icon || 'fa-fish'} text-gray-300 text-4xl sm:text-6xl`}></i>
        )}
      </div>
      <div className="flex justify-center text-amber-400 text-[10px] sm:text-xs mb-1 sm:mb-2 gap-0.5">{renderStars()}</div>
      <h3 className="text-gray-900 font-semibold text-[13px] sm:text-sm md:text-base mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary transition-colors text-center leading-snug min-h-[2.5rem] sm:min-h-0">{product.name}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-0.5 sm:gap-2 mb-2 sm:mb-4">
        {(product.originalPrice ?? 0) > 0 && (
          <span className="text-gray-400 line-through text-[11px] sm:text-sm text-center sm:text-left">€{product.originalPrice!.toFixed(2)}</span>
        )}
        <span className="text-gray-900 font-bold text-lg sm:text-xl text-center sm:text-left">€{product.price.toFixed(2)}</span>
      </div>
      <div className="flex justify-center mt-auto">{AddToCartBtn}</div>
      {showNotification && (
        <div className="absolute top-2 right-2 sm:-top-2 sm:-right-2 bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg text-[10px] sm:text-sm font-medium flex items-center gap-1">
          <i className="fas fa-check"></i> Añadido
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
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center z-10 hover:scale-110 transition"
        aria-label={favorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <i className={`${favorited ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-base`}></i>
      </button>
      {showNotification && (
        <div className="absolute top-3 right-3 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
          ¡Añadido! ✓
        </div>
      )}
    </>
  )

  const slug = product.slug || product.id
  const CardContent = isList ? CardContentList : CardContentGrid

  const cardClasses = `bg-white rounded-2xl p-3 sm:p-5 shadow-sm hover:shadow-lg sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 group relative h-full flex ${
    isList ? 'flex-row gap-4 sm:gap-6' : 'flex-col items-center text-center border border-gray-100/80'
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
