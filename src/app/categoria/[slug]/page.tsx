'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function CategoriaPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  useEffect(() => {
    if (slug) {
      router.replace(`/tienda?categoria=${slug}`)
    }
  }, [slug, router])

  return (
    <div className="py-20 text-center">
      <p className="text-gray-500">Redirigiendo...</p>
    </div>
  )
}
