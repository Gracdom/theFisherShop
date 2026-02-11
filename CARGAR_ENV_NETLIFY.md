# 📤 Cargar Variables de Entorno desde .env a Netlify

## ✅ SÍ, puedes usar un archivo .env

Netlify **NO lee automáticamente** archivos `.env` del repositorio (por seguridad), pero puedes cargarlas usando **Netlify CLI**.

---

## 🚀 Opción 1: Usar el Script Automático (Recomendado)

### Paso 1: Instalar Netlify CLI

```powershell
npm install -g netlify-cli
```

### Paso 2: Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con tus variables:

```env
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
NEXT_PUBLIC_API_URL=https://tu-sitio.netlify.app
ADMIN_PASSWORD=tu_contraseña_segura
ADMIN_SESSION_TOKEN=tu_token_aleatorio
NODE_ENV=production

# Opcionales (si usas Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Paso 3: Ejecutar el script

```powershell
.\cargar_env_netlify.ps1
```

El script:
- ✅ Verifica que Netlify CLI esté instalado
- ✅ Verifica que exista el archivo `.env`
- ✅ Te pide iniciar sesión si es necesario
- ✅ Lee todas las variables del `.env`
- ✅ Las carga automáticamente a Netlify

---

## 🔧 Opción 2: Usar Netlify CLI Manualmente

### Paso 1: Instalar Netlify CLI

```powershell
npm install -g netlify-cli
```

### Paso 2: Iniciar sesión

```powershell
netlify login
```

### Paso 3: Conectar tu sitio (si es necesario)

```powershell
netlify link
```

### Paso 4: Cargar variables desde .env

```powershell
# Cargar todas las variables del archivo .env
netlify env:import .env
```

O cargar una por una:

```powershell
netlify env:set DATABASE_URL "postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
netlify env:set ADMIN_PASSWORD "tu_password"
netlify env:set ADMIN_SESSION_TOKEN "tu_token"
```

---

## 📝 Opción 3: Configurar Manualmente en Netlify (Sin CLI)

Si prefieres no usar CLI, puedes configurarlas manualmente:

1. Ve a: https://app.netlify.com
2. Selecciona tu sitio
3. Site settings → Environment variables
4. Agrega cada variable una por una

---

## ⚠️ Importante sobre .env

### ❌ NO subas .env a GitHub

El archivo `.env` contiene secretos y **NO debe estar en el repositorio**.

**Verifica que esté en `.gitignore`:**
```gitignore
.env
.env*.local
```

### ✅ Usa .env.example para documentación

Puedes tener un `.env.example` en el repositorio con valores de ejemplo (sin secretos reales).

---

## 🔍 Verificar Variables Cargadas

### Desde Netlify CLI:

```powershell
netlify env:list
```

### Desde la Web:

1. Ve a: https://app.netlify.com
2. Tu sitio → Site settings → Environment variables
3. Verás todas las variables configuradas

---

## 🛠️ Solución de Problemas

### Error: "netlify: command not found"
- Instala Netlify CLI: `npm install -g netlify-cli`

### Error: "Not logged in"
- Ejecuta: `netlify login`

### Error: "Site not linked"
- Ejecuta: `netlify link`
- O especifica el sitio: `netlify env:set VARIABLE "value" --site=tu-sitio-id`

### Las variables no se cargan
- Verifica que el archivo `.env` esté en la raíz del proyecto
- Verifica que el formato sea correcto: `VARIABLE=valor` (sin espacios alrededor del `=`)
- Verifica que no haya líneas vacías o comentarios mal formateados

---

## 📋 Formato Correcto del .env

```env
# ✅ CORRECTO
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
ADMIN_PASSWORD=mi_password_segura

# ✅ CORRECTO (con comillas si tiene espacios)
NEXT_PUBLIC_API_URL="https://tu-sitio.netlify.app"

# ✅ CORRECTO (comentarios)
# Esta es una variable opcional
# STRIPE_SECRET_KEY=sk_test_...

# ❌ INCORRECTO (espacios alrededor del =)
DATABASE_URL = postgresql://...

# ❌ INCORRECTO (sin valor)
ADMIN_PASSWORD=
```

---

## 🎯 Resumen Rápido

**Método más fácil:**
1. Crea archivo `.env` con tus variables
2. Ejecuta: `.\cargar_env_netlify.ps1`
3. ¡Listo!

**Método manual:**
1. `npm install -g netlify-cli`
2. `netlify login`
3. `netlify env:import .env`

**Método web:**
1. Ve a Netlify Dashboard
2. Site settings → Environment variables
3. Agrega cada variable manualmente

---

**¡Elige el método que prefieras!** 🚀
