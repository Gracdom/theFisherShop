'use client'

import Image from 'next/image'

const brands = [
  { name: 'Shimano', logo: '/marcas/Shimano-Logo.webp' },
  { name: 'Mitchell', logo: '/marcas/logo-de-la-marque-mitchell.webp' },
  { name: 'Kalikunnan', logo: '/marcas/kalikunnan-logo-preta.png' },
]

export default function BrandsCarousel() {
  const brandItems = [...brands, ...brands]

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="mb-8">
        <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider">
          Marcas destacadas
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-16 items-center animate-marquee">
          {brandItems.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-12 opacity-70 hover:opacity-100 transition-all duration-300"
              style={{ minWidth: 120 }}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={48}
                className="object-contain w-auto h-10 md:h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
