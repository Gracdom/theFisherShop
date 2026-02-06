import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// POST - Crear categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, icon } = body

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      )
    }

    const slug = createSlug(name)

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug,
        description: description || null,
        icon: icon || null,
      },
    })

    return NextResponse.json(category)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe una categoría con ese nombre/slug' },
        { status: 400 }
      )
    }
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Error al crear categoría' }, { status: 500 })
  }
}
