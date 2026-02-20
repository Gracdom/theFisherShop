import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100)
}

// POST - Crear producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sku,
      name,
      description,
      price,
      oldPrice,
      stock,
      image,
      images,
      categoryId,
      featured,
      trending,
    } = body

    if (!sku || !name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'SKU, nombre, precio y categoría son requeridos' },
        { status: 400 }
      )
    }

    const slug = createSlug(name)
    const imgArray = Array.isArray(images) ? images : image ? [image] : []

    const product = await prisma.product.create({
      data: {
        sku: sku.trim(),
        name: name.trim(),
        slug,
        description: description || null,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        stock: parseInt(stock) || 0,
        stockA: parseInt(stock) || 0,
        image: image || imgArray[0] || null,
        images: imgArray,
        featured: !!featured,
        trending: !!trending,
        categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json(product)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El SKU o slug ya existe' },
        { status: 400 }
      )
    }
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}
