/**
 * Generador "offline" de descripciones para productos.
 * - NO usa Gemini ni ninguna API externa.
 * - Rellena: shortDescription, description (larga) y highlights[2]
 *   solo para productos que tengan alguno de esos campos vacío.
 *
 * Uso: npm run db:generate-descriptions
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type DescResult = {
  shortDescription: string
  longDescription: string
  highlights: [string, string]
}

function clampShort(text: string, max = 150): string {
  if (!text) return ''
  if (text.length <= max) return text
  return text.slice(0, max - 1).trimEnd() + '…'
}

function pickCategoryKind(category: string): 'rod' | 'reel' | 'lure' | 'line' | 'clothing' | 'boat' | 'other' {
  const c = category.toLowerCase()
  if (c.includes('caña') || c.includes('canas')) return 'rod'
  if (c.includes('carrete')) return 'reel'
  if (c.includes('señuelo') || c.includes('senuelo') || c.includes('cebo')) return 'lure'
  if (c.includes('sedal') || c.includes('línea') || c.includes('linea')) return 'line'
  if (c.includes('ropa') || c.includes('chaqueta') || c.includes('botas')) return 'clothing'
  if (c.includes('barco') || c.includes('kayak')) return 'boat'
  return 'other'
}

function buildHighlights(name: string, category: string): [string, string] {
  const kind = pickCategoryKind(category)
  switch (kind) {
    case 'rod':
      return [
        'Acción equilibrada y gran sensibilidad',
        'Construcción resistente para uso intensivo',
      ]
    case 'reel':
      return [
        'Recogida suave y precisa',
        'Freno potente y fiable para grandes capturas',
      ]
    case 'lure':
      return [
        'Nado muy realista que atrae depredadores',
        'Colores y brillos pensados para aguas claras y turbias',
      ]
    case 'line':
      return [
        'Alta resistencia al nudo y a la abrasión',
        'Diámetro equilibrado para buen lance y discreción',
      ]
    case 'clothing':
      return [
        'Tejido cómodo pensado para largas jornadas',
        'Diseño pensado para pescadores exigentes',
      ]
    case 'boat':
      return [
        'Gran estabilidad incluso con oleaje',
        'Espacio y distribución optimizados para pescar cómodo',
      ]
    default:
      return [
        'Diseñado para pescadores que buscan calidad',
        'Acabados cuidados y gran durabilidad',
      ]
  }
}

function buildLongDescription(name: string, category: string, subcategory: string | null): string {
  const kind = pickCategoryKind(category)
  const catLabel = subcategory || category

  const baseIntro = `El ${name} es un ${catLabel.toLowerCase()} pensado para pescadores que buscan calidad y buen rendimiento en cada salida.`

  let middle = ''
  switch (kind) {
    case 'rod':
      middle =
        ' Combina una acción equilibrada con una excelente sensibilidad en la punta, permitiendo detectar incluso las picadas más sutiles. Su construcción robusta ofrece reservas de potencia suficientes para pelear con piezas grandes sin perder control.'
      break
    case 'reel':
      middle =
        ' Destaca por una recogida suave y precisa, con un freno potente y progresivo que aporta seguridad cuando la captura aprieta. Sus componentes internos están pensados para soportar un uso intensivo, tanto en agua dulce como salada según el modelo.'
      break
    case 'lure':
      middle =
        ' Su nado muy realista y sus acabados detallados lo convierten en un imán para los depredadores. Funciona especialmente bien en escenarios muy pescados, donde necesitas presentar algo diferente para provocar el ataque.'
      break
    case 'line':
      middle =
        ' Ofrece un equilibrio muy interesante entre resistencia, diámetro y manejabilidad. Es una línea versátil que se adapta bien a distintas técnicas y escenarios, manteniendo la confianza incluso en fondos rocosos o estructuras.'
      break
    case 'clothing':
      middle =
        ' Fabricado con materiales cómodos y resistentes, está pensado para acompañarte jornada tras jornada. Aporta protección y libertad de movimientos para que solo te preocupes de lo importante: pescar y disfrutar.'
      break
    case 'boat':
      middle =
        ' Su diseño ofrece una buena estabilidad y una distribución del espacio muy práctica para tener siempre el equipo a mano. Es una base sólida para explorar nuevas zonas de pesca con seguridad y comodidad.'
      break
    default:
      middle =
        ' Su diseño equilibra comodidad, durabilidad y funcionalidad, convirtiéndolo en una pieza de equipo que rápidamente se convierte en imprescindible. Cada detalle está pensado para facilitarte la vida en el agua.'
      break
  }

  const closing =
    ' Es una opción ideal tanto para pescadores que empiezan a tomárselo en serio como para aficionados avanzados que quieren renovar su material con un producto fiable y duradero.'

  return `${baseIntro}\n\n${middle}\n\n${closing}`
}

function generateDescriptionLocal(
  name: string,
  category: string,
  subcategory: string | null,
): DescResult {
  const longDescription = buildLongDescription(name, category, subcategory)
  const shortBase =
    `El ${name} es un ${subcategory || category.toLowerCase()} de alta calidad, ideal para tus jornadas de pesca.`
  const shortDescription = clampShort(shortBase, 150)
  const highlights = buildHighlights(name, category)

  return {
    shortDescription,
    longDescription,
    highlights,
  }
}

async function main() {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { shortDescription: null },
        { shortDescription: '' },
        { description: null },
        { description: '' },
        { highlights: { isEmpty: true } },
      ],
    },
    include: {
      category: { select: { name: true } },
      subcategory: { select: { name: true } },
    },
  })

  console.log(`Productos a procesar (sin descripciones/highlights completos): ${products.length}`)

  let ok = 0
  let err = 0

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    try {
      const { shortDescription, longDescription, highlights } = generateDescriptionLocal(
        p.name,
        p.category.name,
        p.subcategory?.name ?? null,
      )
      await prisma.product.update({
        where: { id: p.id },
        data: {
          shortDescription: shortDescription || undefined,
          description: longDescription || undefined,
          highlights: highlights.filter((h) => h.length > 0),
        },
      })
      console.log(`  ✓ ${p.sku} - ${p.name}`)
      ok++
    } catch (e) {
      console.error(`  ✗ ${p.sku} - ${p.name}:`, e instanceof Error ? e.message : String(e))
      err++
    }
  }

  console.log(`\nCompletado: ${ok} actualizados, ${err} errores`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
