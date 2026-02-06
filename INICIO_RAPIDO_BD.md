# 🚀 Inicio Rápido - Base de Datos

## 📋 Pasos Rápidos (5 minutos)

### 1️⃣ Crear Cuenta en Supabase

1. Ve a: **https://supabase.com**
2. Crea una cuenta gratuita
3. Haz clic en **"New Project"**
4. Configura:
   - **Name:** `fishing-club`
   - **Password:** Crea una contraseña (¡guárdala!)
   - **Region:** La más cercana a ti
5. Espera 2-3 minutos

### 2️⃣ Obtener URL de Conexión

1. En Supabase, ve a **Settings** ⚙️ → **Database**
2. En "Connection String", selecciona **URI**
3. Copia la URL

### 3️⃣ Crear Archivo `.env`

Crea un archivo llamado **`.env`** en la raíz de tu proyecto (al lado de `package.json`):

```env
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.[TU-PROYECTO].supabase.co:5432/postgres"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Reemplaza:**
- `[TU-PASSWORD]` con tu contraseña de Supabase
- `[TU-PROYECTO]` con el ID de tu proyecto

### 4️⃣ Ejecutar Instalación Automática

**Opción A - Windows (Doble clic):**
```
INSTALAR_BD.bat
```

**Opción B - Terminal:**
```bash
npm install
npm run prisma:generate
npm run prisma:push
npm run db:seed
```

### 5️⃣ Iniciar tu Tienda

```bash
npm run dev
```

Abre: http://localhost:3000

---

## ✅ ¡Listo!

Tu base de datos está configurada con:
- ✅ 4 Categorías
- ✅ 12 Productos de pesca
- ✅ Todo conectado a Supabase

---

## 🔍 Ver tus Datos

```bash
npm run prisma:studio
```

Abrirá http://localhost:5555 con una interfaz para ver y editar tus datos.

---

## ❓ ¿Problemas?

Lee el archivo completo: **`CONFIGURACION_BASE_DE_DATOS.md`**
