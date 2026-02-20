'use client'

import { useEffect, useState } from 'react'

interface Lead {
  id: string
  email: string
  createdAt: string
}

export default function AdminCartEmailPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchLeads = () => {
    fetch('/api/admin/cart-email')
      .then((r) => r.json())
      .then((data) => {
        setLeads(data.leads || [])
        setTotal(data.total ?? 0)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleExport = () => {
    const csv = [
      ['email', 'fecha'].join(','),
      ...leads.map((l) =>
        [l.email, new Date(l.createdAt).toLocaleString('es-ES')].join(',')
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `checkout-leads-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emails del carrito</h1>
          <p className="text-gray-500 text-sm mt-1">
            Correos capturados al añadir primer producto al carrito. {total} en total.
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={leads.length === 0}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <i className="fas fa-download"></i>
          Exportar CSV
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Cargando...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No hay emails registrados todavía.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <span className="text-gray-900 font-medium">{l.email}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">
                      {new Date(l.createdAt).toLocaleDateString('es-ES', {
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
