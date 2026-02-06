# FrameIt - Tienda Online de Marcos

Una tienda online moderna y minimalista para la venta de marcos de alta calidad, construida con Next.js 14, Tailwind CSS, TypeScript y Shadcn/UI.

## 🚀 Características

- **Next.js 14** con App Router
- **Tailwind CSS** para estilos con paleta de colores neutros
- **TypeScript** para type safety
- **Shadcn/UI** para componentes reutilizables
- **Lucide-react** para iconos
- Diseño **Mobile First** y responsive
- Tipografía elegante (serif para títulos, sans-serif para cuerpo)

## 📁 Estructura del Proyecto

```
frameit/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio (Home)
│   └── globals.css         # Estilos globales
├── components/
│   ├── ui/                 # Componentes de Shadcn/UI
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── Header.tsx          # Encabezado de navegación
│   ├── Footer.tsx          # Pie de página
│   ├── Hero.tsx            # Sección hero
│   ├── CategoryGrid.tsx    # Grid de categorías
│   ├── PromoSection.tsx    # Sección promocional
│   ├── Testimonials.tsx    # Testimonios de clientes
│   ├── StoriesSection.tsx  # Sección de historias
│   └── Features.tsx        # Características/ventajas
├── lib/
│   └── utils.ts            # Utilidades (cn function)
└── public/                 # Archivos estáticos
```

## 🛠️ Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Próximos Pasos

- [ ] Página de productos con filtros (material, tamaño, color)
- [ ] Visualizador de marco interactivo
- [ ] Carrito de compras con drawer lateral
- [ ] Páginas de categorías
- [ ] Sistema de autenticación
- [ ] Integración con pasarela de pago

## 🎨 Paleta de Colores

- **Fondos**: Blancos y grises suaves
- **Acentos**: Tonos de madera (wood-*)
- **Texto**: Gris oscuro sobre fondos claros, blanco sobre fondos oscuros
- **Header/Footer**: Gris oscuro (#111827 / gray-900)

## 📝 Notas

- Las imágenes utilizan Unsplash como placeholder. Reemplázalas con tus propias imágenes en producción.
- El diseño está optimizado para ser Mobile First.
- Los componentes de Shadcn/UI están configurados y listos para usar.
