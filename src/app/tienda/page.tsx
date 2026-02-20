'use client'

import { Suspense, useEffect, useState } from 'react'
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
  images?: string[]
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
    image: p.image || p.images?.[0] || undefined,
    badge,
    badgeType,
  }
}

const ITEMS_PER_PAGE_OPTIONS = [9, 12, 24, 48]

// Subcategorías por defecto cuando no hay datos en BD (por slug de categoría)
const DEFAULT_SUBCATEGORIES: Record<string, { name: string; slug: string }[]> = {
  'accesorios': [
    { name: 'Cajas y maletines', slug: 'cajas-maletines' },
    { name: 'Herramientas', slug: 'herramientas' },
    { name: 'Bolsas', slug: 'bolsas' },
  ],
  'barcos-de-pesca': [
    { name: 'Barcas', slug: 'barcas' },
    { name: 'Kayaks', slug: 'kayaks' },
  ],
  'carretes': [
    { name: 'Spinning', slug: 'spinning' },
    { name: 'Baitcasting', slug: 'baitcasting' },
    { name: 'Mosca', slug: 'mosca' },
  ],
  'canas': [
    { name: 'Cañas de spinning', slug: 'spinning' },
    { name: 'Cañas de mosca', slug: 'mosca' },
    { name: 'Cañas telescópicas', slug: 'telescopicas' },
  ],
  'pesca-con-mosca': [
    { name: 'Moscas', slug: 'moscas' },
    { name: 'Líneas', slug: 'lineas' },
    { name: 'Accesorios mosca', slug: 'accesorios' },
  ],
  'ropa': [
    { name: 'Chaquetas', slug: 'chaquetas' },
    { name: 'Botas y vadeadores', slug: 'botas-vadeadores' },
    { name: 'Sombreros', slug: 'sombreros' },
  ],
  'sedales': [
    { name: 'Monofilamento', slug: 'monofilamento' },
    { name: 'Trenzado', slug: 'trenzado' },
    { name: 'Fluorocarbono', slug: 'fluorocarbono' },
  ],
  'senuelos-y-moscas': [
    { name: 'Señuelos', slug: 'senuelos' },
    { name: 'Moscas artificiales', slug: 'moscas' },
    { name: 'Cebos', slug: 'cebos' },
  ],
  // Alias por si el slug varía (con/sin ñ)
  'cañas': [
    { name: 'Cañas de spinning', slug: 'spinning' },
    { name: 'Cañas de mosca', slug: 'mosca' },
    { name: 'Cañas telescópicas', slug: 'telescopicas' },
  ],
  'señuelos-y-moscas': [
    { name: 'Señuelos', slug: 'senuelos' },
    { name: 'Moscas artificiales', slug: 'moscas' },
    { name: 'Cebos', slug: 'cebos' },
  ],
}

function TiendaContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [latestProducts, setLatestProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [subcategories, setSubcategories] = useState<{ id: string; name: string; slug: string; categoryId: string }[]>([])
  const [subsByCategory, setSubsByCategory] = useState<Record<string, { id: string; name: string; slug: string }[]>>({})
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterColor, setFilterColor] = useState<Record<string, boolean>>({})
  const [filterPrice, setFilterPrice] = useState<Record<string, boolean>>({})
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('categoria')
  const subcategorySlug = searchParams.get('subcategoria')

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      try {
        const { data: cats } = await supabase.from('Category').select('id, name, slug').order('name')
        setCategories(cats || [])

        const { data: allSubs } = await supabase.from('Subcategory').select('id, name, slug, categoryId').order('name')
        const subs = allSubs || []
        setSubcategories(subs)
        const byCat = subs.reduce<Record<string, { id: string; name: string; slug: string }[]>>((acc, s) => {
          if (!acc[s.categoryId]) acc[s.categoryId] = []
          acc[s.categoryId].push({ id: s.id, name: s.name, slug: s.slug })
          return acc
        }, {})
        setSubsByCategory(byCat)

        let categoryId: string | null = null
        if (categorySlug) {
          const { data: cat } = await supabase.from('Category').select('id').eq('slug', categorySlug).single()
          categoryId = cat?.id ?? null
        }

        let query = supabase
          .from('Product')
          .select('id, slug, name, description, price, oldPrice, image, images, rating, featured, trending')

        if (categoryId) query = query.eq('categoryId', categoryId)

        if (subcategorySlug && categoryId) {
          const { data: sub } = await supabase
            .from('Subcategory')
            .select('id')
            .eq('slug', subcategorySlug)
            .eq('categoryId', categoryId)
            .single()
          if (sub) query = query.eq('subcategoryId', sub.id)
        }

        const { data, error } = await query.order('createdAt', { ascending: false })
        if (error) throw error
        setProducts((data || []).map(mapToCard))

        const { data: latest } = await supabase
          .from('Product')
          .select('id, slug, name, price, oldPrice, image, images')
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
  }, [categorySlug, subcategorySlug])

  const activeCat = categories.find((c) => c.slug === categorySlug)
  const activeSub = subcategories.find((s) => s.slug === subcategorySlug)
  const title = activeSub ? `${activeCat?.name} › ${activeSub.name}` : (activeCat ? activeCat.name : 'Tienda')

  // Imagen del banner: tienda (1) para "Tienda" general, tienda (2-10) por categoría
  const bannerImage = !categorySlug
    ? '/images/tienda%20(1).webp'
    : (() => {
        const idx = categories.findIndex((c) => c.slug === categorySlug)
        const n = idx >= 0 ? Math.min(idx + 2, 10) : 1
        return `/images/tienda%20(${n}).webp`
      })()

  const priceRanges: Record<string, [number, number]> = {
    '0€ - 25€': [0, 25],
    '25€ - 50€': [25, 50],
    '50€ - 100€': [50, 100],
    '100€+': [100, Infinity],
  }
  let filteredProducts = [...products]
  const activePriceFilters = Object.entries(filterPrice).filter(([, v]) => v).map(([k]) => k)
  if (activePriceFilters.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      activePriceFilters.some((range) => {
        const [min, max] = priceRanges[range] || [0, Infinity]
        return p.price >= min && p.price < max
      })
    )
  }

  const sortedProducts = [...filteredProducts]
  if (sortBy === 'price-asc') sortedProducts.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') sortedProducts.sort((a, b) => b.price - a.price)
  if (sortBy === 'name') sortedProducts.sort((a, b) => a.name.localeCompare(b.name))

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(start, start + itemsPerPage)

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      {/* Breadcrumbs - centrados */}
      <div className="container mx-auto px-4 pt-6">
        <nav className="flex justify-center">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <i className="fas fa-home text-gray-400"></i> Inicio
            </Link>
            <span>/</span>
            <Link href="/tienda" className={!categorySlug ? 'text-gray-900 font-medium' : 'hover:text-primary transition-colors'}>
              Tienda
            </Link>
            {activeCat && (
              <>
                <span>/</span>
                <Link
                  href={`/tienda?categoria=${categorySlug}`}
                  className={activeSub ? 'hover:text-primary transition-colors' : 'text-gray-900 font-medium'}
                >
                  {activeCat.name}
                </Link>
              </>
            )}
            {activeSub && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">{activeSub.name}</span>
              </>
            )}
          </div>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-20 pt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar izquierdo - filtros desde arriba */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Categories con subcategorías anidadas */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Categorías</h3>
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
                  {categories.map((c) => {
                    const fromDb = subsByCategory[c.id] || []
                    const fromDefaults = DEFAULT_SUBCATEGORIES[c.slug] || []
                    const subs = fromDb.length > 0
                      ? fromDb
                      : fromDefaults.map((s, i) => ({ id: `default-${c.id}-${i}`, name: s.name, slug: s.slug }))
                    const isActive = categorySlug === c.slug
                    return (
                      <li key={c.id}>
                        <Link
                          href={`/tienda?categoria=${c.slug}`}
                          className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive && !subcategorySlug ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                          }`}
                        >
                          {c.name}
                        </Link>
                        {subs.length > 0 && isActive && (
                          <ul className="pl-4 mt-0.5 mb-2 space-y-0.5 border-l-2 border-gray-200 ml-4">
                            <li>
                              <Link
                                href={`/tienda?categoria=${c.slug}`}
                                className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                                  isActive && !subcategorySlug ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary hover:bg-gray-100/80'
                                }`}
                              >
                                Todas
                              </Link>
                            </li>
                            {subs.map((s) => (
                              <li key={s.id}>
                                <Link
                                  href={`/tienda?categoria=${c.slug}&subcategoria=${s.slug}`}
                                  className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                                    isActive && subcategorySlug === s.slug ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary hover:bg-gray-100/80'
                                  }`}
                                >
                                  {s.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Refine Search - tags activos + filtros */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Refine Search</h3>
                {(activePriceFilters.length > 0 || Object.values(filterColor).some(Boolean)) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activePriceFilters.map((range) => (
                      <span
                        key={range}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {range} <button onClick={() => setFilterPrice((p) => ({ ...p, [range]: false }))} className="hover:text-primary/70">×</button>
                      </span>
                    ))}
                    {Object.entries(filterColor).filter(([, v]) => v).map(([color]) => (
                      <span
                        key={color}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {color} <button onClick={() => setFilterColor((p) => ({ ...p, [color]: false }))} className="hover:text-primary/70">×</button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Color</h4>
                  <ul className="space-y-2">
                    {['Negro', 'Azul', 'Verde', 'Gris', 'Naranja'].map((color) => (
                      <li key={color}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filterColor[color] || false}
                            onChange={() => setFilterColor((prev) => ({ ...prev, [color]: !prev[color] }))}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">{color}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Precio</h4>
                  <ul className="space-y-2">
                    {['0€ - 25€', '25€ - 50€', '50€ - 100€', '100€+'].map((range) => (
                      <li key={range}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filterPrice[range] || false}
                            onChange={() => setFilterPrice((prev) => ({ ...prev, [range]: !prev[range] }))}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">{range}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-0.5"
                >
                  Refine Search
                </button>
              </div>

              {/* Promo Banner */}
              <Link
                href="/tienda"
                className="block relative overflow-hidden rounded-3xl group"
              >
                <div
                  className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/tienda%20(2).webp")',
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
              <div className="bg-gray-50 rounded-3xl p-6">
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

          {/* Contenido principal - derecho */}
          <div className="flex-1 min-w-0 order-1 lg:order-2">
            {/* Hero Banner - título a la derecha, bordes redondeados */}
            <div
              className="h-48 md:h-64 lg:h-72 rounded-[2rem] bg-cover bg-center relative overflow-hidden mb-8 transition-[background-image] duration-500"
              style={{
                backgroundImage: `url("${bannerImage}")`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-primary/90" />
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="px-8 md:px-12 text-right">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
                    {title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Título y descripción de categoría */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-500 mt-1 text-sm md:text-base leading-relaxed">
                Equipamiento profesional para pesca. Calidad, precios competitivos y todo lo que necesitas para tu próxima aventura.
              </p>
            </div>

            {/* Toolbar - filtros completos desde arriba */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 border border-gray-200 rounded-2xl bg-white">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="Vista cuadrícula"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="Vista lista"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-500 text-sm hidden sm:inline">Comparar (0)</span>
                <span className="text-gray-400 text-sm">{sortedProducts.length} productos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Ordenar:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="default">Por defecto</option>
                    <option value="price-asc">Precio ↑</option>
                    <option value="price-desc">Precio ↓</option>
                    <option value="name">Nombre</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Mostrar:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
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

export default function TiendaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="animate-pulse text-gray-500">Cargando tienda...</div>
      </div>
    }>
      <TiendaContent />
    </Suspense>
  )
}
