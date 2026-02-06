'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ProductCard, { Product } from '@/components/ProductCard'
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

function mapToCard(p: ApiProduct): Product {
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

const ITEMS_PER_PAGE_OPTIONS = [9, 12, 24, 48]

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [latestProducts, setLatestProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('categoria')

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      try {
        const { data: cats } = await supabase.from('Category').select('id, name, slug').order('name')
        setCategories(cats || [])

        let query = supabase
          .from('Product')
          .select('id, slug, name, description, price, oldPrice, image, rating, featured, trending')

        if (categorySlug) {
          const { data: cat } = await supabase.from('Category').select('id').eq('slug', categorySlug).single()
          if (cat) query = query.eq('categoryId', cat.id)
        }

        const { data, error } = await query.order('createdAt', { ascending: false })
        if (error) throw error
        setProducts((data || []).map(mapToCard))

        const { data: latest } = await supabase
          .from('Product')
          .select('id, slug, name, price, oldPrice, image')
          .order('createdAt', { ascending: false })
          .limit(3)
        setLatestProducts((latest || []).map(mapToCard))
      } catch {
        setProducts([])
        setLatestProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [categorySlug])

  const activeCat = categories.find((c) => c.slug === categorySlug)
  const title = activeCat ? activeCat.name : 'Tienda'

  const sortedProducts = [...products]
  if (sortBy === 'price-asc') sortedProducts.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') sortedProducts.sort((a, b) => b.price - a.price)
  if (sortBy === 'name') sortedProducts.sort((a, b) => a.name.localeCompare(b.name))

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(start, start + itemsPerPage)

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      {/* Breadcrumbs - minimal */}
      <div className="container mx-auto px-4 pt-6">
        <nav className="text-xs md:text-sm text-gray-400 tracking-wide">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{title}</span>
        </nav>
      </div>

      {/* Category Banner - gradient overlay, dramatic */}
      <div
        className="w-full h-56 md:h-72 lg:h-80 mt-4 bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("/images/hero-banner.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg px-4">
            {title}
          </h1>
        </div>
      </div>

      {/* Description - subtle */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
          Equipamiento profesional para pesca. Calidad, precios competitivos y todo lo que necesitas para tu próxima aventura.
        </p>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Product controls - pill style, glass feel */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/80 shadow-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-primary hover:bg-gray-50'
                }`}
                title="Vista grid"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-primary hover:bg-gray-50'
                }`}
                title="Vista lista"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <span className="text-gray-400 text-xs hidden sm:inline">{sortedProducts.length} productos</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-gray-200/80 bg-white/80 backdrop-blur-sm text-sm text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer shadow-sm"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="name">Nombre</option>
            </select>
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }}
              className="px-4 py-2.5 rounded-full border border-gray-200/80 bg-white/80 backdrop-blur-sm text-sm text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer shadow-sm"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Sidebar - glass cards */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Categorías</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/tienda"
                      className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        !categorySlug ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      Todas
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/tienda?categoria=${c.slug}`}
                        className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                          categorySlug === c.slug ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                        }`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Promo Banner */}
              <Link
                href="/tienda"
                className="block relative overflow-hidden rounded-2xl group"
              >
                <div
                  className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/section-pescador.png")',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex flex-col justify-end p-6">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-widest">Oferta</span>
                  <h4 className="text-xl font-bold text-white mt-1">Hasta 15% de ahorro</h4>
                  <span className="inline-flex items-center gap-2 mt-3 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                    Ver ofertas
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>

              {/* Latest Products */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Recientes</h3>
                <div className="space-y-3">
                  {latestProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/producto/${p.slug || p.id}`}
                      className="flex gap-4 p-3 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                        {p.image ? (
                          <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-fish text-gray-300 text-lg"></i>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-primary truncate transition-colors">{p.name}</p>
                        <p className="text-primary font-bold text-sm mt-0.5">€{p.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-[420px] rounded-2xl bg-gray-100/80 animate-pulse" />
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-24 px-6 bg-white/60 rounded-2xl border border-gray-200/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-box-open text-2xl text-gray-400"></i>
                </div>
                <p className="text-gray-600 font-medium">No hay productos en esta categoría</p>
                <Link href="/tienda" className="inline-block mt-4 text-primary font-semibold hover:underline">
                  Ver todas →
                </Link>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'flex flex-col gap-4'
                  }
                >
                  {paginatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} variant={viewMode} />
                  ))}
                </div>

                {/* Pagination - minimal modern */}
                {totalPages > 1 && (
                  <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                      {start + 1}-{Math.min(start + itemsPerPage, sortedProducts.length)} de {sortedProducts.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-primary hover:text-primary transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className="flex gap-1">
                        {(() => {
                          const pages: number[] = []
                          const show = Math.min(5, totalPages)
                          let start = Math.max(1, currentPage - Math.floor(show / 2))
                          if (start + show > totalPages) start = Math.max(1, totalPages - show + 1)
                          for (let i = 0; i < show; i++) pages.push(start + i)
                          return pages.map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                                currentPage === page
                                  ? 'bg-primary text-white shadow-md'
                                  : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                              }`}
                            >
                              {page}
                            </button>
                          ))
                        })()}
                      </div>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-primary hover:text-primary transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter - gradient, modern */}
      <section className="relative py-20 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Newsletter</h2>
            <p className="text-white/80 mb-8">Ofertas exclusivas y novedades en tu bandeja.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3.5 rounded-full border-0 bg-white/95 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
