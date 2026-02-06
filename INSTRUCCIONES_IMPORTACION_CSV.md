# 📦 Instrucciones para Importar Productos desde CSV

## 📋 Resumen

Este documento explica cómo importar los productos del archivo `thefishershop.csv` a la base de datos.

## 🔧 Cambios Realizados

### 1. Schema de Prisma Actualizado

Se actualizó el modelo `Product` en `prisma/schema.prisma` para incluir todos los campos del CSV:

- ✅ `sku` - SKU único del producto
- ✅ `video` - URL del video del producto
- ✅ `stockA`, `stockADays` - Stock A y días de stock A
- ✅ `stockB`, `stockBDays` - Stock B y días de stock B  
- ✅ `stockC`, `stockCDays` - Stock C y días de stock C
- ✅ `pvd`, `pvdOld`, `pvdDif` - Precios de distribución
- ✅ `pvrDif` - Diferencia porcentual de precio de venta recomendado

### 2. Script de Importación Creado

Se creó el archivo `prisma/import-csv.ts` que:
- Lee el archivo CSV desde `d:\DESCARGA\thefishershop.csv`
- Crea las categorías automáticamente si no existen
- Importa todos los productos con sus datos completos
- Actualiza productos existentes si ya tienen el mismo SKU

## 🚀 Pasos para Importar

### Opción 1: Usar el Script Batch (Recomendado)

1. **Asegúrate de tener las dependencias instaladas:**
   ```bash
   npm install
   ```

2. **Ejecuta el script batch:**
   ```bash
   importar_productos.bat
   ```

Este script ejecutará automáticamente:
- Generación del cliente de Prisma
- Aplicación del schema a la base de datos
- Importación de productos desde CSV

### Opción 2: Ejecutar Manualmente

Si prefieres ejecutar los comandos manualmente:

```bash
# 1. Generar cliente de Prisma
npm run prisma:generate

# 2. Aplicar cambios al schema
npm run prisma:push

# 3. Importar productos
npm run db:import
```

## 📊 Qué Hace el Script de Importación

1. **Lee el archivo CSV** desde `d:\DESCARGA\thefishershop.csv`

2. **Identifica categorías únicas** y las crea automáticamente si no existen

3. **Para cada producto:**
   - Crea un slug único basado en el nombre y SKU
   - Parsea todos los campos numéricos (precios, stocks)
   - Calcula el stock total (suma de stockA + stockB + stockC)
   - Si el producto ya existe (mismo SKU), lo actualiza
   - Si no existe, lo crea

4. **Muestra un resumen** al final con:
   - Productos creados
   - Productos actualizados
   - Errores encontrados

## 📁 Estructura del CSV

El CSV debe tener las siguientes columnas separadas por punto y coma (`;`):

```
sku;name;images;video;stock_a;stock_a_days;stock_b;stock_b_days;stock_c;stock_c_days;pvd_old;pvd;pvd_dif;pvr_old;pvr;pvr_dif;category
```

## ⚠️ Requisitos Previos

1. **Base de datos configurada:**
   - Debes tener configurado tu archivo `.env` con `DATABASE_URL`
   - La base de datos debe estar accesible

2. **Dependencias instaladas:**
   ```bash
   npm install
   ```

3. **Archivo CSV en la ubicación correcta:**
   - El archivo debe estar en: `d:\DESCARGA\thefishershop.csv`

## 🔍 Verificar la Importación

### Opción 1: Prisma Studio

```bash
npm run prisma:studio
```

Esto abrirá una interfaz web en http://localhost:5555 donde puedes ver todos los productos importados.

### Opción 2: Supabase Dashboard

1. Ve a tu proyecto en Supabase
2. Haz clic en **Table Editor**
3. Revisa las tablas `Category` y `Product`

## 🐛 Solución de Problemas

### Error: "No se encontró el archivo CSV"

**Solución:** Verifica que el archivo esté en `d:\DESCARGA\thefishershop.csv`

Si el archivo está en otra ubicación, edita `prisma/import-csv.ts` y cambia la línea:
```typescript
const csvPath = path.join('d:', 'DESCARGA', 'thefishershop.csv')
```

### Error: "Can't reach database server"

**Solución:** 
1. Verifica tu `DATABASE_URL` en el archivo `.env`
2. Asegúrate de que tu proyecto de Supabase esté activo
3. Verifica tu conexión a internet

### Error: "prisma command not found"

**Solución:**
```bash
npm install
```

### Error: "Foreign key constraint failed"

**Solución:** Esto puede ocurrir si hay productos sin categoría válida. El script debería manejar esto automáticamente, pero si persiste:

1. Verifica que todas las categorías en el CSV sean válidas
2. Ejecuta el script nuevamente

## 📝 Notas Importantes

- **SKU único:** Cada producto debe tener un SKU único. Si un producto con el mismo SKU ya existe, se actualizará en lugar de crear uno nuevo.

- **Categorías:** Las categorías se crean automáticamente con un slug basado en el nombre. Si una categoría ya existe, se reutiliza.

- **Stocks:** El campo `stock` se calcula automáticamente como la suma de `stockA + stockB + stockC`.

- **Precios:** El campo `price` se toma de `pvr` (precio de venta recomendado). Si no existe, se usa `pvd` (precio de distribución).

## ✅ Resultado Esperado

Después de ejecutar la importación, deberías ver:

```
🚀 Iniciando importación de productos desde CSV...
📖 Leyendo archivo CSV...
✅ Se encontraron X productos en el CSV
📁 Categorías encontradas: Y
✅ Categoría creada: ...
...
✅ Creado: [Nombre del producto] (SKU: ...)
...
==================================================
📊 Resumen de importación:
   ✅ Productos creados: X
   🔄 Productos actualizados: Y
   ❌ Errores: Z
   📦 Total procesados: X+Y+Z
==================================================
🎉 ¡Importación completada exitosamente!
```

---

**¡Listo!** Tus productos ahora están en la base de datos y listos para ser mostrados en tu tienda. 🎣✨
