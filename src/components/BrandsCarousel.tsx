'use client'

const brands = [
  'Shimano',
  'Daiwa',
  'Penn',
  'Abu Garcia',
  'Rapala',
  'Berkley',
  'Okuma',
  'St. Croix',
  'G.Loomis',
  'Fenwick',
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
        <div className="flex gap-20 items-center animate-marquee">
          {brandItems.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 px-4 py-2 text-gray-400 text-xl font-bold tracking-tight opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
