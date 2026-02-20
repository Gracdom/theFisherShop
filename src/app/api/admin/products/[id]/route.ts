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

// PUT - Actualizar producto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Nombre, precio y categoría son requeridos' },
        { status: 400 }
      )
    }

    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    const slug = createSlug(name)
    const imgArray = Array.isArray(images) ? images : image ? [image] : existing.images

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...(sku && { sku: sku.trim() }),
        name: name.trim(),
        slug,
        description: description || null,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        stock: parseInt(stock) ?? existing.stock,
        stockA: parseInt(stock) ?? existing.stockA,
        image: image || imgArray[0] || null,
        images: imgArray,
        featured: featured !== undefined ? !!featured : existing.featured,
        trending: trending !== undefined ? !!trending : existing.trending,
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
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'No se puede eliminar: el producto tiene pedidos asociados' },
        { status: 400 }
      )
    }
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
  }
}
