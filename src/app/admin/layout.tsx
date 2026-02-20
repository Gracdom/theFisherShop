import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin CMS | The FisherShop',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {children}
    </div>
  )
}
