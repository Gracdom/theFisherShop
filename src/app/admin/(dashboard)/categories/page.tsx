'use client'

import { useEffect, useState } from 'react'
import CategoryModal from '@/components/admin/CategoryModal'

interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  _count?: { products: number }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const fetchCategories = () => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : [])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id: string, name: string, productCount: number) => {
    if (productCount > 0) {
      alert(`No se puede eliminar: tiene ${productCount} productos asociados`)
      return
    }
    if (!confirm(`¿Eliminar la categoría "${name}"?`)) return
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      fetchCategories()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Categorías</h1>
          <p className="text-gray-400 text-sm mt-1">
            {categories.length} categorías
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null)
            setModalOpen(true)
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Nueva categoría
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-800/50 rounded-xl animate-pulse"
            />
          ))
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-between group"
            >
              <div>
                <p className="font-medium text-white">{cat.name}</p>
                <p className="text-gray-500 text-sm">{cat.slug}</p>
                {cat._count !== undefined && (
                  <p className="text-gray-400 text-xs mt-1">
                    {cat._count.products} productos
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setEditingCategory(cat)
                    setModalOpen(true)
                  }}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg"
                  title="Editar"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() =>
                    handleDelete(cat.id, cat.name, cat._count?.products || 0)
                  }
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg"
                  title="Eliminar"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCategory(null)
        }}
        category={editingCategory}
        onSaved={fetchCategories}
      />
    </div>
  )
}
