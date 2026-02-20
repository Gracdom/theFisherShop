'use client'

import { useEffect, useState } from 'react'

interface Subscriber {
  id: string
  email: string
  source: string | null
  createdAt: string
}

const sourceLabels: Record<string, string> = {
  footer: 'Footer',
  popup: 'Popup entrada',
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  const fetchSubscribers = () => {
    const params = new URLSearchParams()
    if (filter) params.set('source', filter)
    fetch(`/api/admin/newsletter?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data.subscribers || [])
        setTotal(data.total ?? 0)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSubscribers()
  }, [filter])

  const handleExport = () => {
    const csv = [
      ['email', 'origen', 'fecha'].join(','),
      ...subscribers.map((s) =>
        [s.email, s.source || 'footer', new Date(s.createdAt).toLocaleString('es-ES')].join(',')
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `newsletter-suscriptores-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-500 text-sm mt-1">
            {total} suscriptores en total
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white"
          >
            <option value="">Todos los orígenes</option>
            <option value="footer">Footer</option>
            <option value="popup">Popup entrada</option>
          </select>
          <button
            onClick={handleExport}
            disabled={subscribers.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <i className="fas fa-download"></i>
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Cargando...</div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No hay suscriptores todavía.
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
                    Origen
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">
                    Fecha suscripción
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <span className="text-gray-900 font-medium">{s.email}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {sourceLabels[s.source || 'footer'] || s.source || 'Footer'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">
                      {new Date(s.createdAt).toLocaleDateString('es-ES', {
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
