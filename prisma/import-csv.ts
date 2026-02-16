/**
 * Importación desde CSVs (categorías + subcategorías).
 * Borra todos los OrderItem, Product y Category e importa desde los archivos "f *.csv".
 *
 * Uso:
 *   npm run db:import                    # usa D:\DESCARGA
 *   npm run db:import -- D:\DESCARGA     # otro directorio
 */
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

const CSV_DIR = process.argv[2] || 'D:\\DESCARGA'

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseFloatOrNull(value: string): number | null {
  if (!value || value === '-' || value.trim() === '') return null
  const parsed = parseFloat(String(value).replace(',', '.'))
  return isNaN(parsed) ? null : parsed
}

function parseIntOrZero(value: string): number {
  if (!value || value === '-' || value.trim() === '') return 0
  const parsed = parseInt(String(value), 10)
  return isNaN(parsed) ? 0 : parsed
}

function parseCSV(filePath: string): Record<string, string>[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split(/\r?\n/).filter((line) => line.trim() !== '')

  if (lines.length < 2) return []

  const headers = lines[0].split(';').map((h) => h.trim())
  const data: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';')
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() ?? ''
    })
    data.push(row)
  }

  return data
}

async function main() {
  console.log('Iniciando importación desde CSVs en:', CSV_DIR)

  if (!fs.existsSync(CSV_DIR)) {
    throw new Error('No existe el directorio: ' + CSV_DIR)
  }

  const csvFiles = fs.readdirSync(CSV_DIR).filter((f) => f.startsWith('f ') && f.endsWith('.csv'))
  if (csvFiles.length === 0) {
    throw new Error('No se encontraron archivos "f *.csv" en ' + CSV_DIR)
  }

  console.log('Archivos CSV encontrados:', csvFiles.length, csvFiles.join(', '))

  const allRows: Record<string, string>[] = []
  for (const file of csvFiles) {
    const filePath = path.join(CSV_DIR, file)
    const rows = parseCSV(filePath)
    console.log('  ', file, '->', rows.length, 'filas')
    allRows.push(...rows)
  }

  const hasSubCategory = allRows.some((r) => r['sub_category'] !== undefined && r['sub_category'] !== '')
  const categoryKey = allRows.some((r) => r['category'] !== undefined) ? 'category' : 'categoria'
  const uniqueCategories = Array.from(
    new Set(
      allRows
        .map((p) => (p[categoryKey] || p['category'] || '').trim())
        .filter((c) => c && c !== '-')
    )
  )

  const uniqueSubcategoriesByCategory = new Map<string, Set<string>>()
  for (const row of allRows) {
    const cat = (row[categoryKey] || row['category'] || '').trim()
    const sub = (row.sub_category || row['sub_category'] || '').trim()
    if (cat && cat !== '-' && sub && sub !== '-') {
      if (!uniqueSubcategoriesByCategory.has(cat)) uniqueSubcategoriesByCategory.set(cat, new Set())
      uniqueSubcategoriesByCategory.get(cat)!.add(sub)
    }
  }

  console.log('\n1. Eliminando OrderItem, Product, Subcategory y Category...')
  await prisma.orderItem.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.subcategory.deleteMany({})
  await prisma.category.deleteMany({})
  console.log('   Base limpia.\n')

  console.log('2. Creando categorías:', uniqueCategories.length)
  const categoryMap = new Map<string, string>()
  for (const name of uniqueCategories) {
    const slug = createSlug(name)
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: `Categoría: ${name}`,
      },
    })
    categoryMap.set(name, category.id)
    console.log('   ', name)
  }

  console.log('\n3. Creando subcategorías...')
  const subcategoryMap = new Map<string, string>()
  for (const [catName, subNames] of uniqueSubcategoriesByCategory) {
    const categoryId = categoryMap.get(catName)
    if (!categoryId) continue
    for (const subName of subNames) {
      const slug = createSlug(subName)
      const subcategory = await prisma.subcategory.create({
        data: { name: subName, slug, categoryId },
      })
      subcategoryMap.set(`${catName}\t${subName}`, subcategory.id)
    }
  }
  console.log('   Total subcategorías:', subcategoryMap.size)

  console.log('\n4. Importando productos...')
  let created = 0
  let errors = 0

  for (const row of allRows) {
    try {
      const sku = (row.sku || '').trim()
      if (!sku) {
        errors++
        continue
      }

      const categoryName = (row[categoryKey] || row['category'] || '').trim()
      if (!categoryName || categoryName === '-') {
        errors++
        continue
      }

      const categoryId = categoryMap.get(categoryName)
      if (!categoryId) {
        errors++
        continue
      }

      const name = (row.name || 'Sin nombre').trim()
      const slugBase = createSlug(name)
      const slug = `${slugBase}-${sku}`.substring(0, 100)

      const images: string[] = []
      const img = (row.images || '').trim()
      if (img && img !== '-') images.push(img)

      const pvr = parseFloatOrNull(row.pvr) ?? parseFloatOrNull(row.pvd) ?? 0
      const pvrOld = parseFloatOrNull(row.pvr_old)
      const pvd = parseFloatOrNull(row.pvd)
      const pvdOld = parseFloatOrNull(row.pvd_old)
      const pvdDif = (row.pvd_dif || '').trim() || null
      const pvrDif = (row.pvr_dif || '').trim() || null

      const stockA = parseIntOrZero(row.stock_a)
      const stockADays = parseIntOrZero(row.stock_a_days)
      const stockB = parseIntOrZero(row.stock_b)
      const stockBDays = parseIntOrZero(row.stock_b_days)
      const stockC = parseIntOrZero(row.stock_c)
      const stockCDays = parseIntOrZero(row.stock_c_days)
      const totalStock = stockA + stockB + stockC

      const video = (row.video || '').trim()
      const videoUrl = video && video !== '-' ? video : null

      const subcategoryRaw = (row.sub_category || row['sub_category'] || '').trim()
      const subcategoryId =
        subcategoryRaw && subcategoryRaw !== '-'
          ? subcategoryMap.get(`${categoryName}\t${subcategoryRaw}`) ?? null
          : null

      await prisma.product.create({
        data: {
          sku,
          name,
          slug,
          price: pvr,
          oldPrice: pvrOld,
          pvd,
          pvdOld,
          pvdDif,
          pvrDif,
          stock: totalStock,
          stockA,
          stockADays,
          stockB,
          stockBDays,
          stockC,
          stockCDays,
          image: images[0] || null,
          images,
          video: videoUrl,
          categoryId,
          subcategoryId,
        },
      })
      created++
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error('   Error SKU', row.sku, msg)
      errors++
    }
  }

  console.log('\nResumen:')
  console.log('   Categorías:', uniqueCategories.length)
  console.log('   Subcategorías:', subcategoryMap.size)
  console.log('   Productos creados:', created)
  console.log('   Errores/omitidos:', errors)
}

main()
  .then(() => {
    console.log('\nImportación completada.')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
