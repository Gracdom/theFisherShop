'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface SearchProduct {
  id: string
  slug: string | null
  name: string
  price: number
  image: string | null
  category?: { name: string }
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchProduct[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const term = query.trim()
        const { data, error } = await supabase
          .from('Product')
          .select('id, slug, name, price, image')
          .or(`name.ilike.%${term}%,description.ilike.%${term}%`)
          .limit(12)
        if (error) throw error
        setResults((data || []) as SearchProduct[])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  const handleResultClick = (slug: string | null) => {
    if (slug) router.push(`/producto/${slug}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-200">
      <div className="absolute inset-x-4 top-24 md:top-32 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl md:w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <i className="fas fa-search text-gray-400 text-lg"></i>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar cañas, carretes, señuelos..."
              className="flex-1 py-2.5 text-base focus:outline-none placeholder:text-gray-400"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
              aria-label="Cerrar"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-12 text-gray-400">
                <i className="fas fa-circle-notch fa-spin text-2xl"></i>
              </div>
            )}
            {!loading && query.trim() && results.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <i className="fas fa-search text-3xl mb-3 opacity-50"></i>
                <p>No encontramos &quot;{query}&quot;</p>
                <Link
                  href={`/tienda?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-block mt-3 text-primary font-semibold hover:underline"
                >
                  Ver todos los productos
                </Link>
              </div>
            )}
            {!loading && results.length > 0 && (
              <ul className="py-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => handleResultClick(p.slug)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition text-left"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {p.image ? (
                          <img src={p.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-fish text-gray-300"></i>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-primary font-bold text-sm">€{p.price.toFixed(2)}</p>
                      </div>
                      <i className="fas fa-chevron-right text-gray-300 text-sm"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {!loading && !query.trim() && (
              <div className="py-8 px-4 text-center text-gray-500">
                <p className="text-sm">Escribe para buscar productos</p>
                <p className="text-xs mt-1 opacity-80">Cañas, carretes, señuelos, accesorios...</p>
              </div>
            )}
          </div>
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            <kbd className="px-2 py-0.5 bg-white rounded border border-gray-200">Esc</kbd> para cerrar
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      />
    </div>
  )
}
