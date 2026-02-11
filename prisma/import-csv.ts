import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Función para crear slug a partir del nombre
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Función para parsear valores numéricos
function parseFloatOrNull(value: string): number | null {
  if (!value || value === '-' || value.trim() === '') return null
  const parsed = parseFloat(value.replace(',', '.'))
  return isNaN(parsed) ? null : parsed
}

function parseIntOrZero(value: string): number {
  if (!value || value === '-' || value.trim() === '') return 0
  const parsed = parseInt(value)
  return isNaN(parsed) ? 0 : parsed
}

// Función para parsear el CSV
function parseCSV(filePath: string): any[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim() !== '')
  
  if (lines.length < 2) {
    throw new Error('El archivo CSV no tiene suficientes líneas')
  }

  // Obtener headers
  const headers = lines[0].split(';').map(h => h.trim())
  
  // Parsear datos
  const data: any[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';')
    const row: any = {}
    
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || ''
    })
    
    data.push(row)
  }
  
  return data
}

async function importProducts() {
  try {
    console.log('🚀 Iniciando importación de productos desde CSV...\n')

    // Ruta del archivo CSV (en proyecto o argumento)
    const csvPath = process.argv[2] || path.join(__dirname, 'thefishershop.csv')
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`No se encontró el archivo CSV en: ${csvPath}`)
    }

    // Parsear CSV
    console.log('📖 Leyendo archivo CSV...')
    const products = parseCSV(csvPath)
    console.log(`✅ Se encontraron ${products.length} productos en el CSV\n`)

    // Obtener todas las categorías únicas (Array.from para compatibilidad con target es5)
    const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(c => c && c !== '-')))
    console.log(`📁 Categorías encontradas: ${uniqueCategories.length}`)
    uniqueCategories.forEach(cat => console.log(`   - ${cat}`))
    console.log()

    // Crear o encontrar categorías
    const categoryMap = new Map<string, string>()
    
    for (const categoryName of uniqueCategories) {
      const slug = createSlug(categoryName)
      
      let category = await prisma.category.findUnique({
        where: { slug }
      })

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: categoryName,
            slug: slug,
            description: `Categoría: ${categoryName}`
          }
        })
        console.log(`✅ Categoría creada: ${categoryName}`)
      } else {
        console.log(`ℹ️  Categoría ya existe: ${categoryName}`)
      }
      
      categoryMap.set(categoryName, category.id)
    }
    console.log()

    // Importar productos
    let created = 0
    let updated = 0
    let errors = 0

    for (const productData of products) {
      try {
        const sku = productData.sku?.trim()
        if (!sku || sku === '') {
          console.log(`⚠️  Producto sin SKU, saltando...`)
          errors++
          continue
        }

        const categoryName = productData.category?.trim()
        if (!categoryName || categoryName === '-') {
          console.log(`⚠️  Producto ${sku} sin categoría, saltando...`)
          errors++
          continue
        }

        const categoryId = categoryMap.get(categoryName)
        if (!categoryId) {
          console.log(`⚠️  No se encontró categoría para ${sku}, saltando...`)
          errors++
          continue
        }

        const name = productData.name?.trim() || 'Sin nombre'
        const slug = createSlug(name)
        
        // Parsear imágenes
        const images: string[] = []
        if (productData.images && productData.images !== '-') {
          images.push(productData.images.trim())
        }

        // Parsear precios
        const pvr = parseFloatOrNull(productData.pvr) || parseFloatOrNull(productData.pvd) || 0
        const pvrOld = parseFloatOrNull(productData.pvr_old)
        const pvd = parseFloatOrNull(productData.pvd)
        const pvdOld = parseFloatOrNull(productData.pvd_old)
        const pvdDif = productData.pvd_dif?.trim() || null
        const pvrDif = productData.pvr_dif?.trim() || null

        // Parsear stocks
        const stockA = parseIntOrZero(productData.stock_a)
        const stockADays = parseIntOrZero(productData.stock_a_days)
        const stockB = parseIntOrZero(productData.stock_b)
        const stockBDays = parseIntOrZero(productData.stock_b_days)
        const stockC = parseIntOrZero(productData.stock_c)
        const stockCDays = parseIntOrZero(productData.stock_c_days)
        const totalStock = stockA + stockB + stockC

        // Video
        const video = productData.video && productData.video !== '-' 
          ? productData.video.trim() 
          : null

        // Verificar si el producto ya existe
        const existingProduct = await prisma.product.findUnique({
          where: { sku }
        })

        const productDataToSave = {
          sku,
          name,
          slug: `${slug}-${sku}`.substring(0, 100), // Asegurar unicidad
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
          video,
          categoryId,
        }

        if (existingProduct) {
          await prisma.product.update({
            where: { sku },
            data: productDataToSave
          })
          updated++
          console.log(`🔄 Actualizado: ${name} (SKU: ${sku})`)
        } else {
          await prisma.product.create({
            data: productDataToSave
          })
          created++
          console.log(`✅ Creado: ${name} (SKU: ${sku})`)
        }
      } catch (error: any) {
        console.error(`❌ Error procesando producto ${productData.sku}:`, error.message)
        errors++
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log('📊 Resumen de importación:')
    console.log(`   ✅ Productos creados: ${created}`)
    console.log(`   🔄 Productos actualizados: ${updated}`)
    console.log(`   ❌ Errores: ${errors}`)
    console.log(`   📦 Total procesados: ${created + updated + errors}`)
    console.log('='.repeat(50))

  } catch (error: any) {
    console.error('❌ Error durante la importación:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar importación
importProducts()
  .then(() => {
    console.log('\n🎉 ¡Importación completada exitosamente!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error)
    process.exit(1)
  })
