'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

export interface FavoriteItem {
  id: string
  name: string
  slug?: string
  price: number
  image?: string
}

const STORAGE_KEY = 'fisher_favorites'

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  toggleFavorite: (item: FavoriteItem) => boolean
  isFavorite: (id: string) => boolean
  isFavoritesOpen: boolean
  openFavorites: () => void
  closeFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

function loadFromStorage(): FavoriteItem[] {
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

function saveToStorage(items: FavoriteItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  useEffect(() => {
    setFavorites(loadFromStorage())
  }, [])

  useEffect(() => {
    saveToStorage(favorites)
  }, [favorites])

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const toggleFavorite = useCallback((item: FavoriteItem): boolean => {
    let added = false
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id)
      if (exists) return prev.filter((f) => f.id !== item.id)
      added = true
      return [...prev, item]
    })
    return added
  }, [])

  const isFavorite = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites])
  const openFavorites = useCallback(() => setIsFavoritesOpen(true), [])
  const closeFavorites = useCallback(() => setIsFavoritesOpen(false), [])

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, isFavoritesOpen, openFavorites, closeFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}
