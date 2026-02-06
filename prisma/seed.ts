import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Limpiar datos existentes
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Crear Categorías
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Fishing Hooks',
        slug: 'fishing-hooks',
        description: 'Professional fishing hooks for all types of fishing',
        icon: 'fa-fish-fins',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Fishing Accessories',
        slug: 'fishing-accessories',
        description: 'Essential accessories for your fishing adventures',
        icon: 'fa-toolbox',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Rod & Reel',
        slug: 'rod-reel',
        description: 'High-quality fishing rods and reels',
        icon: 'fa-fish',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Survival',
        slug: 'survival',
        description: 'Survival equipment for outdoor adventures',
        icon: 'fa-campground',
      },
    }),
  ])

  console.log('✅ Categories created:', categories.length)

  // Crear Productos
  const products = await Promise.all([
    // Fishing Hooks
    prisma.product.create({
      data: {
        name: 'Professional Treble Hook Set',
        slug: 'professional-treble-hook-set',
        description: 'Premium quality treble hooks for catching large fish. Ultra-sharp and corrosion resistant.',
        price: 24.99,
        oldPrice: 34.99,
        stock: 150,
        rating: 4.8,
        reviews: 156,
        featured: true,
        trending: true,
        categoryId: categories[0].id,
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Circle Hook Pack - 50pcs',
        slug: 'circle-hook-pack-50pcs',
        description: 'Perfect for catch and release fishing. Pack of 50 premium circle hooks.',
        price: 19.99,
        stock: 200,
        rating: 4.6,
        reviews: 89,
        trending: true,
        categoryId: categories[0].id,
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Octopus Hook Assortment',
        slug: 'octopus-hook-assortment',
        description: 'Versatile octopus hooks in multiple sizes. Great for bait fishing.',
        price: 16.99,
        oldPrice: 22.99,
        stock: 120,
        rating: 4.5,
        reviews: 67,
        categoryId: categories[0].id,
        images: ['https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500'],
      },
    }),

    // Rod & Reel
    prisma.product.create({
      data: {
        name: 'Carbon Fiber Spinning Rod',
        slug: 'carbon-fiber-spinning-rod',
        description: 'Professional 7ft carbon fiber spinning rod. Ultra-lightweight and sensitive.',
        price: 129.99,
        oldPrice: 179.99,
        stock: 45,
        rating: 4.9,
        reviews: 234,
        featured: true,
        trending: true,
        categoryId: categories[2].id,
        images: ['https://images.unsplash.com/photo-1545450660-7bf07de83db9?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Extreme Spinning Reel 3000',
        slug: 'extreme-spinning-reel-3000',
        description: 'High-performance spinning reel with smooth drag system. Perfect for saltwater.',
        price: 89.99,
        stock: 60,
        rating: 4.7,
        reviews: 178,
        featured: true,
        categoryId: categories[2].id,
        images: ['https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Telescopic Travel Rod',
        slug: 'telescopic-travel-rod',
        description: 'Compact telescopic rod perfect for travel. Extends to 8ft.',
        price: 49.99,
        oldPrice: 69.99,
        stock: 85,
        rating: 4.4,
        reviews: 92,
        trending: true,
        categoryId: categories[2].id,
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'],
      },
    }),

    // Fishing Accessories
    prisma.product.create({
      data: {
        name: 'Waterproof Tackle Box',
        slug: 'waterproof-tackle-box',
        description: 'Large waterproof tackle box with multiple compartments. Heavy-duty construction.',
        price: 39.99,
        stock: 95,
        rating: 4.6,
        reviews: 145,
        categoryId: categories[1].id,
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'LED Fishing Headlamp',
        slug: 'led-fishing-headlamp',
        description: 'Waterproof LED headlamp with red light mode. Perfect for night fishing.',
        price: 27.99,
        stock: 120,
        rating: 4.7,
        reviews: 103,
        categoryId: categories[1].id,
        images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Professional Fish Grip',
        slug: 'professional-fish-grip',
        description: 'Stainless steel fish grip with built-in scale. Weighs up to 50lbs.',
        price: 34.99,
        oldPrice: 44.99,
        stock: 70,
        rating: 4.8,
        reviews: 87,
        featured: true,
        categoryId: categories[1].id,
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500'],
      },
    }),

    // Survival
    prisma.product.create({
      data: {
        name: 'Survival Multi-Tool Kit',
        slug: 'survival-multi-tool-kit',
        description: 'Complete survival kit with knife, fire starter, compass, and more.',
        price: 59.99,
        stock: 55,
        rating: 4.9,
        reviews: 276,
        featured: true,
        trending: true,
        categoryId: categories[3].id,
        images: ['https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Emergency Fishing Kit',
        slug: 'emergency-fishing-kit',
        description: 'Compact emergency fishing kit. Fits in your pocket.',
        price: 14.99,
        stock: 150,
        rating: 4.3,
        reviews: 54,
        categoryId: categories[3].id,
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Waterproof Fire Starter',
        slug: 'waterproof-fire-starter',
        description: 'Magnesium fire starter that works even when wet. Essential survival tool.',
        price: 12.99,
        stock: 180,
        rating: 4.6,
        reviews: 198,
        categoryId: categories[3].id,
        images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'],
      },
    }),
  ])

  console.log('✅ Products created:', products.length)

  // Crear un cliente de ejemplo
  const customer = await prisma.customer.create({
    data: {
      email: 'demo@fishingclub.com',
      name: 'John Fisher',
      phone: '+00 012 345 67 89',
      address: '123 Marina Street',
      city: 'Miami',
      postalCode: '33101',
    },
  })

  console.log('✅ Demo customer created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
