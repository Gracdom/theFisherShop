'use client'

import { Suspense } from 'react'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedSection from '@/components/FeaturedSection'
import ProductsSection from '@/components/ProductsSection'
import PromoBanners from '@/components/PromoBanners'
import Features from '@/components/Features'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedSection />
      <Suspense fallback={<div className="py-20 bg-white"><div className="container mx-auto px-4 text-center text-gray-500">Cargando productos...</div></div>}>
        <ProductsSection />
      </Suspense>
      <PromoBanners />
      <Features />
      <Newsletter />
    </>
  )
}
