'use client'

import { useEffect, useState } from 'react'
import ProductModal from '@/components/admin/ProductModal'

interface Product {
  id: string
  sku: string
  name: string
  price: number
  stock: number
  image: string | null
  featured: boolean
  trending: boolean
  description?: string | null
  oldPrice?: number | null
  images?: string[]
  categoryId: string
  category: { name: string }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const fetchProducts = () => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      fetchProducts()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500 text-sm mt-1">
            {products.length} productos en catálogo
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null)
            setModalOpen(true)
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Nuevo producto
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Cargando...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">No hay productos.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Crear el primero
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Producto
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    SKU
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Categoría
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Precio
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Stock
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Estado
                  </th>
                  <th className="text-right py-4 px-6 text-gray-600 font-medium text-sm">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            <i className="fas fa-image text-gray-400"></i>
                          </div>
                        )}
                        <span className="text-gray-900 font-medium line-clamp-1 max-w-[200px]">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm font-mono">
                      {p.sku}
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">
                      {p.category?.name || '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-medium">
                      €{p.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={
                          p.stock === 0 ? 'text-red-600' : 'text-gray-600'
                        }
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1 flex-wrap">
                        {p.featured && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                            Destacado
                          </span>
                        )}
                        {p.trending && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs">
                            Tendencia
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p)
                            setModalOpen(true)
                          }}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Eliminar"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingProduct(null)
        }}
        product={editingProduct}
        onSaved={fetchProducts}
      />
    </div>
  )
}
