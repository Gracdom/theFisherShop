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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {children}
    </div>
  )
}
