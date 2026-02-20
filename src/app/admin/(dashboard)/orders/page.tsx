'use client'

import { useEffect, useState } from 'react'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: { name: string }
}

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  paymentStatus: string
  createdAt: string
  customer: { name: string; email: string }
  items: OrderItem[]
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data) => {
        setOrders(Array.isArray(data.orders) ? data.orders : [])
      })
      .finally(() => setLoading(false))
  }, [])

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-50 text-amber-700',
    PROCESSING: 'bg-blue-50 text-blue-700',
    SHIPPED: 'bg-violet-50 text-violet-700',
    DELIVERED: 'bg-emerald-50 text-emerald-700',
    CANCELLED: 'bg-red-50 text-red-700',
  }

  const statusLabels: Record<string, string> = {
    PENDING: 'Pendiente',
    PROCESSING: 'Procesando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-500 text-sm mt-1">
            {orders.length} pedidos en total
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Cargando...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No hay pedidos todavía.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Pedido
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Cliente
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Total
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Estado
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <span className="text-gray-900 font-mono text-sm">
                        {o.orderNumber}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-gray-900 font-medium">{o.customer?.name}</p>
                        <p className="text-gray-500 text-sm">{o.customer?.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-semibold">
                      €{o.total.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColors[o.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {statusLabels[o.status] || o.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">
                      {new Date(o.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
