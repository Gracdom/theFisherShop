'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface CompareItem {
  id: string
  name: string
  slug?: string
  price: number
  rating?: number
  image?: string
}

const STORAGE_KEY = 'fisher_compare'
const MAX_ITEMS = 4

interface CompareContextType {
  items: CompareItem[]
  toggleCompare: (item: CompareItem) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isCompared: (id: string) => boolean
  isOpen: boolean
  open: () => void
  close: () => void
  suggestedId: string | null
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

function loadFromStorage(): CompareItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveToStorage(items: CompareItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function chooseSuggestion(items: CompareItem[]): string | null {
  if (items.length === 0) return null

  // Estrategia simple: mejor relación valoración/precio, si no hay rating usar precio más bajo
  const withRating = items.filter((i) => typeof i.rating === 'number' && i.rating! > 0)
  if (withRating.length > 0) {
    const scored = withRating.map((i) => ({
      id: i.id,
      score: (i.rating || 0) / (i.price || 1),
    }))
    scored.sort((a, b) => b.score - a.score)
    return scored[0]?.id || null
  }

  const sortedByPrice = [...items].sort((a, b) => a.price - b.price)
  return sortedByPrice[0]?.id || null
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [suggestedId, setSuggestedId] = useState<string | null>(null)

  useEffect(() => {
    const loaded = loadFromStorage()
    setItems(loaded)
    setSuggestedId(chooseSuggestion(loaded))
  }, [])

  useEffect(() => {
    saveToStorage(items)
    setSuggestedId(chooseSuggestion(items))
  }, [items])

  const toggleCompare = useCallback((item: CompareItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id)
      if (exists) {
        return prev.filter((p) => p.id !== item.id)
      }
      if (prev.length >= MAX_ITEMS) {
        // Reemplazamos el más antiguo
        const [, ...rest] = prev
        return [...rest, item]
      }
      return [...prev, item]
    })
    setIsOpen(true)
  }, [])

  const removeFromCompare = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const clearCompare = useCallback(() => {
    setItems([])
  }, [])

  const isCompared = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items],
  )

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <CompareContext.Provider
      value={{ items, toggleCompare, removeFromCompare, clearCompare, isCompared, isOpen, open, close, suggestedId }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare debe usarse dentro de CompareProvider')
  return ctx
}

