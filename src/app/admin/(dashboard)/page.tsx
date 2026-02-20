'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/admin/orders'),
        ])

        const products = await productsRes.json()
        const categories = await categoriesRes.json()
        const { orders } = await ordersRes.json()

        const totalRevenue = Array.isArray(orders)
          ? orders.reduce((sum: number, o: { total: number }) => sum + o.total, 0)
          : 0

        setStats({
          products: Array.isArray(products) ? products.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
          orders: Array.isArray(orders) ? orders.length : 0,
          totalRevenue,
        })
      } catch {
        setStats({ products: 0, categories: 0, orders: 0, totalRevenue: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    {
      title: 'Productos',
      value: stats.products,
      icon: 'fa-box',
      href: '/admin/products',
      color: 'blue',
    },
    {
      title: 'Categorías',
      value: stats.categories,
      icon: 'fa-tags',
      href: '/admin/categories',
      color: 'emerald',
    },
    {
      title: 'Pedidos',
      value: stats.orders,
      icon: 'fa-shopping-cart',
      href: '/admin/orders',
      color: 'violet',
    },
    {
      title: 'Ingresos totales',
      value: `€${stats.totalRevenue.toFixed(2)}`,
      icon: 'fa-euro-sign',
      href: '/admin/orders',
      color: 'amber',
    },
  ]

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    violet: 'bg-violet-50 text-violet-600 border-violet-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Resumen de tu tienda The FisherShop</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border ${colorClasses[card.color]}`}
                >
                  <i className={`fas ${card.icon} text-lg`}></i>
                </div>
                <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-gray-500 text-sm mt-1">{card.title}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-white border border-gray-200 rounded-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Accesos rápidos</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
          >
            <i className="fas fa-plus mr-2"></i>
            Nuevo producto
          </Link>
          <Link
            href="/admin/categories"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition"
          >
            <i className="fas fa-plus mr-2"></i>
            Nueva categoría
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition"
          >
            <i className="fas fa-external-link-alt mr-2"></i>
            Ver tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
