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
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Resumen de tu tienda The FisherShop</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-800/50 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border ${colorClasses[card.color]}`}
                >
                  <i className={`fas ${card.icon} text-lg`}></i>
                </div>
                <i className="fas fa-chevron-right text-gray-500 text-sm"></i>
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="text-gray-400 text-sm mt-1">{card.title}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">Accesos rápidos</h2>
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
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
          >
            <i className="fas fa-plus mr-2"></i>
            Nueva categoría
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
          >
            <i className="fas fa-external-link-alt mr-2"></i>
            Ver tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
