import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Nombres cortos para que parezcan reseñas reales
const NAMES = [
  'Carlos M.',
  'Laura G.',
  'Javier R.',
  'Marta L.',
  'Andrés P.',
  'Sergio D.',
  'Ana B.',
  'Pedro S.',
  'Lucía V.',
  'Diego C.',
]

// Elige un promedio visible para el producto
function pickTargetAverage(): number {
  const options = [4.8, 4.9, 5.0]
  return options[Math.floor(Math.random() * options.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickAuthor(): string {
  return NAMES[Math.floor(Math.random() * NAMES.length)]
}

function buildReviewText(productName: string, categoryName?: string | null): string {
  const cat = categoryName ? categoryName.toLowerCase() : ''

  const templates = [
    `Muy contento con el ${productName}, se nota la calidad en cada salida.`,
    `El ${productName} tiene un acabado excelente y se siente muy sólido.`,
    `Lo uso para ${cat || 'mis jornadas de pesca'} y el rendimiento ha sido fantástico.`,
    `El ${productName} ha superado mis expectativas, se comporta muy bien incluso con piezas grandes.`,
    `Buena relación calidad‑precio, el ${productName} se ha convertido en mi equipo de cabecera.`,
    `Después de varias salidas, el ${productName} sigue como nuevo, muy recomendable.`,
    `Se nota que el ${productName} está pensado para pescadores exigentes, muy cómodo de usar.`,
    `El equilibrio del ${productName} es perfecto, he notado mucha diferencia respecto a mi equipo anterior.`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

async function main() {
  console.log('Generando reseñas de productos…')

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      rating: true,
      reviews: true,
      category: { select: { name: true } },
    },
  })

  for (const product of products) {
    // Si ya tiene reseñas, lo dejamos como está para no duplicar
    if (product.reviews && product.reviews > 0) {
      continue
    }

    const totalReviews = randomInt(4, 10)
    const targetAverage = pickTargetAverage()

    // Distribuimos 4 y 5 para aproximarnos al promedio deseado
    // Este cálculo no tiene que ser perfecto; el valor visible será product.rating
    const ratings: number[] = []
    for (let i = 0; i < totalReviews; i++) {
      ratings.push(Math.random() < 0.2 ? 4 : 5) // mayor probabilidad de 5
    }

    const createdReviews = await prisma.productReview.createMany({
      data: ratings.map((r) => ({
        productId: product.id,
        author: pickAuthor(),
        rating: r,
        text: buildReviewText(product.name, product.category?.name),
      })),
    })

    await prisma.product.update({
      where: { id: product.id },
      data: {
        rating: targetAverage,
        reviews: createdReviews.count,
      },
    })

    console.log(
      `- ${product.name}: ${createdReviews.count} reseñas creadas (rating visible ${targetAverage.toFixed(
        1,
      )})`,
    )
  }

  console.log('✅ Reseñas generadas')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })