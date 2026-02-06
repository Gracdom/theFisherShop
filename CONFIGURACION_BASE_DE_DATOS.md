# 🗄️ Configuración de Base de Datos - Fishing Club

**Fecha:** 4 de Febrero, 2026

## 📋 Resumen

Tu tienda Fishing Club ahora está configurada para usar **PostgreSQL** con **Prisma ORM** y **Supabase** como proveedor de base de datos en la nube.

---

## 🚀 Paso 1: Crear Cuenta en Supabase

1. **Ve a:** https://supabase.com
2. **Crea una cuenta gratuita** (si no tienes una)
3. **Haz clic en:** "New Project"
4. **Configura tu proyecto:**
   - **Name:** `fishing-club` (o el nombre que prefieras)
   - **Database Password:** Crea una contraseña segura (¡guárdala!)
   - **Region:** Selecciona la región más cercana a ti
   - **Pricing Plan:** Free (hasta 500 MB de base de datos)

5. **Espera 2-3 minutos** mientras Supabase crea tu base de datos

---

## 🔑 Paso 2: Obtener la URL de Conexión

1. En tu proyecto de Supabase, ve a **Settings** (⚙️)
2. Haz clic en **Database** en el menú lateral
3. Busca la sección **Connection String**
4. Selecciona el tab **URI**
5. Copia la URL que se ve así:

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

6. **IMPORTANTE:** Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste en el Paso 1

---

## 📝 Paso 3: Configurar Variables de Entorno

1. **En tu proyecto, crea un archivo `.env`** en la raíz (mismo nivel que `package.json`)

2. **Copia y pega esto en tu archivo `.env`:**

```env
# Base de Datos PostgreSQL (Supabase)
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.[TU-PROYECTO].supabase.co:5432/postgres"

# Stripe (Ya existente)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_stripe_public_key
STRIPE_SECRET_KEY=tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=tu_webhook_secret

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Reemplaza:**
   - `[TU-PASSWORD]` con tu contraseña de Supabase
   - `[TU-PROYECTO]` con el ID de tu proyecto (ejemplo: `abcdefghijklmnop`)
   - Las claves de Stripe si ya las tienes

---

## 📦 Paso 4: Instalar Dependencias

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:
- `@prisma/client` - Cliente de Prisma para consultar la base de datos
- `prisma` - CLI de Prisma para migraciones y más
- `tsx` - Para ejecutar el script de seed

---

## 🗃️ Paso 5: Crear las Tablas en la Base de Datos

Ejecuta estos comandos en tu terminal:

```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Crear las tablas en Supabase (push schema)
npm run prisma:push
```

**Deberías ver algo como:**

```
✔ Generated Prisma Client
✔ The database is now in sync with your Prisma schema
```

---

## 🌱 Paso 6: Llenar la Base de Datos con Productos

Ejecuta el script de seed para agregar productos de ejemplo:

```bash
npm run db:seed
```

**Deberías ver:**

```
🌱 Starting database seeding...
✅ Categories created: 4
✅ Products created: 12
✅ Demo customer created
🎉 Database seeding completed successfully!
```

---

## ✅ Paso 7: Verificar tu Base de Datos

### Opción 1: Prisma Studio (Recomendado)

```bash
npm run prisma:studio
```

Esto abrirá una interfaz web en http://localhost:5555 donde puedes:
- Ver todas tus tablas
- Editar productos
- Ver pedidos
- Buscar y filtrar datos

### Opción 2: Supabase Dashboard

1. Ve a tu proyecto en Supabase
2. Haz clic en **Table Editor** en el menú lateral
3. Deberías ver las tablas:
   - `Category`
   - `Product`
   - `Customer`
   - `Order`
   - `OrderItem`

---

## 🎨 Paso 8: Ejecutar tu Tienda

Ahora que tu base de datos está configurada, ejecuta:

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

**¡Tu tienda ahora está conectada a una base de datos real!** 🎣✨

---

## 📊 Estructura de la Base de Datos

### Tablas Creadas:

#### 1. **Category** (Categorías)
- Fishing Hooks
- Fishing Accessories
- Rod & Reel
- Survival

#### 2. **Product** (Productos)
- 12 productos de ejemplo
- Con precios, imágenes, stock, ratings
- Algunos marcados como "featured" y "trending"

#### 3. **Customer** (Clientes)
- Se crean automáticamente al hacer un pedido
- Guarda email, nombre, dirección, etc.

#### 4. **Order** (Pedidos)
- Guarda información completa del pedido
- Estados: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- Conectado con Stripe

#### 5. **OrderItem** (Items del Pedido)
- Productos individuales dentro de un pedido
- Cantidad y precio al momento de la compra

---

## 🔌 APIs Disponibles

Tu tienda ahora tiene estos endpoints de API:

### Productos
```
GET  /api/products              - Obtener todos los productos
GET  /api/products?category=rod-reel  - Filtrar por categoría
GET  /api/products?featured=true      - Solo productos destacados
GET  /api/products?trending=true      - Solo productos en tendencia
GET  /api/products/[slug]       - Obtener un producto específico
```

### Categorías
```
GET  /api/categories            - Obtener todas las categorías
```

### Pedidos
```
POST /api/orders                - Crear un nuevo pedido
GET  /api/orders?email=...      - Obtener pedidos de un cliente
```

### Checkout
```
POST /api/checkout              - Crear sesión de pago (Stripe + BD)
```

---

## 🛠️ Comandos Útiles de Prisma

```bash
# Ver tus datos en el navegador
npm run prisma:studio

# Aplicar cambios del schema a la BD
npm run prisma:push

# Generar el cliente de Prisma después de cambiar el schema
npm run prisma:generate

# Llenar la BD con datos de ejemplo
npm run db:seed

# Ver el estado de la BD
npx prisma db pull
```

---

## 🔒 Seguridad

### ⚠️ IMPORTANTE:

1. **NUNCA** subas tu archivo `.env` a GitHub
   - Ya está incluido en `.gitignore`

2. **Guarda tu contraseña de Supabase en un lugar seguro**

3. **Para producción:**
   - Usa variables de entorno en tu plataforma de hosting (Vercel, Netlify, etc.)
   - Cambia `NEXT_PUBLIC_APP_URL` a tu dominio real

---

## 🐛 Solución de Problemas

### Error: "Can't reach database server"

**Solución:**
1. Verifica que tu `DATABASE_URL` en `.env` sea correcta
2. Asegúrate de reemplazar `[YOUR-PASSWORD]` con tu contraseña real
3. Verifica que tu proyecto de Supabase esté activo

### Error: "prisma command not found"

**Solución:**
```bash
npm install
```

### Error al hacer seed: "Foreign key constraint failed"

**Solución:**
```bash
# Reinicia la base de datos
npm run prisma:push -- --force-reset
npm run db:seed
```

### Ver logs detallados de Prisma

Agrega esto a tu archivo `.env`:
```env
DEBUG=prisma:*
```

---

## 📚 Recursos Adicionales

- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## ✨ Próximos Pasos

Ahora que tu base de datos está configurada, puedes:

1. ✅ **Actualizar los componentes** para obtener productos desde la API
2. ✅ **Crear una página de administración** para gestionar productos
3. ✅ **Agregar autenticación de usuarios** con Supabase Auth
4. ✅ **Implementar búsqueda avanzada** de productos
5. ✅ **Agregar sistema de reviews** y calificaciones
6. ✅ **Crear dashboard de pedidos** para clientes

---

**¡Tu tienda Fishing Club ahora tiene una base de datos profesional!** 🎣🗄️✨

Si tienes algún problema, revisa la sección de solución de problemas o contáctame.
