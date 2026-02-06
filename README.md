# 🎣 PescaMar - E-commerce de Productos de Pesca

Tienda online moderna construida con **Next.js 14**, **Tailwind CSS** y **Stripe** para pagos seguros.

## ✨ Características

- 🛒 **Carrito de compras completo** con gestión de estado
- 💳 **Integración con Stripe** para pagos seguros
- 🎨 **Diseño moderno** con Tailwind CSS y dos tonos de azul
- 📱 **100% Responsive** - funciona en todos los dispositivos
- ⚡ **Optimizado con Next.js 14** - App Router y Server Components
- 🔒 **TypeScript** para código más seguro
- 🎯 **SEO optimizado**

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Edita el archivo `.env.local` y añade tus claves de Stripe:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Obtén tus claves de Stripe:**
1. Crea una cuenta en [stripe.com](https://stripe.com)
2. Ve a [Dashboard > API Keys](https://dashboard.stripe.com/apikeys)
3. Copia las claves de prueba (test mode)

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── checkout/          # API de Stripe
│   │   ├── checkout/              # Página de checkout
│   │   ├── success/               # Página de confirmación
│   │   ├── layout.tsx             # Layout principal
│   │   ├── page.tsx               # Página principal
│   │   └── globals.css            # Estilos globales
│   ├── components/
│   │   ├── Header.tsx             # Cabecera con navegación
│   │   ├── Footer.tsx             # Pie de página
│   │   ├── CartModal.tsx          # Modal del carrito
│   │   ├── Hero.tsx               # Banner principal
│   │   ├── Categories.tsx         # Categorías de productos
│   │   ├── ProductCard.tsx        # Tarjeta de producto
│   │   ├── ProductsSection.tsx    # Sección de productos
│   │   ├── FeaturedSection.tsx    # Sección destacada
│   │   ├── PromoBanners.tsx       # Banners promocionales
│   │   ├── Features.tsx           # Características del servicio
│   │   └── Newsletter.tsx         # Formulario de newsletter
│   └── context/
│       └── CartContext.tsx        # Context API para el carrito
├── public/                        # Archivos estáticos
├── .env.local                     # Variables de entorno
├── next.config.js                 # Configuración de Next.js
├── tailwind.config.js             # Configuración de Tailwind
└── package.json
```

## 🎨 Colores del Diseño

```css
--azul-principal: #1e40af
--azul-secundario: #3b82f6
--azul-claro: #60a5fa
--azul-oscuro: #1e3a8a
```

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Pagos:** Stripe
- **Iconos:** Font Awesome 6
- **State Management:** React Context API

## 💳 Integración de Stripe

### Modo Prueba (Test Mode)

Usa estas tarjetas de prueba:

- **Pago exitoso:** 4242 4242 4242 4242
- **Pago rechazado:** 4000 0000 0000 0002
- **Requiere autenticación:** 4000 0025 0000 3155

- **Fecha:** Cualquier fecha futura
- **CVC:** Cualquier 3 dígitos
- **Código postal:** Cualquier 5 dígitos

### Modo Producción

Para usar en producción:

1. Activa tu cuenta en Stripe
2. Cambia las claves de prueba por las claves de producción
3. Configura los webhooks en Stripe Dashboard

## 📦 Scripts Disponibles

```bash
npm run dev      # Ejecutar en desarrollo
npm run build    # Construir para producción
npm start        # Ejecutar en producción
npm run lint     # Verificar código
```

## 🚢 Despliegue

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Añade las variables de entorno
4. Despliega automáticamente

### Otras plataformas

Compatible con cualquier hosting que soporte Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📝 Características del Carrito

- ✅ Añadir/eliminar productos
- ✅ Actualizar cantidades
- ✅ Calcular totales automáticamente
- ✅ Persistencia en memoria
- ✅ Modal responsive
- ✅ Notificaciones visuales

## 🔐 Seguridad

- ✅ Pagos procesados por Stripe (PCI compliant)
- ✅ No se almacenan datos de tarjetas
- ✅ HTTPS obligatorio en producción
- ✅ Variables de entorno protegidas

## 📧 Contacto

Para preguntas o soporte:
- Email: info@pescamar.es
- Teléfono: +34 900 123 456

## 📄 Licencia

Este proyecto es privado y confidencial.

---

Hecho con ❤️ para PescaMar - 2026
