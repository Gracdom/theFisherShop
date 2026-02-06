# Guía de Despliegue en Netlify

## ✅ Estado del Proyecto

Tu proyecto **SÍ está preparado** para Netlify, pero necesita algunas configuraciones adicionales que ya hemos creado.

## 📋 Archivos Creados

1. **`netlify.toml`** - Configuración de Netlify
2. **`public/_redirects`** - Redirecciones para Next.js
3. **`NETLIFY_DEPLOY.md`** - Esta guía

## 🚀 Pasos para Desplegar en Netlify

### Opción 1: Desde GitHub (Recomendado)

1. **Conecta tu repositorio a Netlify:**
   - Ve a [Netlify](https://app.netlify.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "Add new site" → "Import an existing project"
   - Selecciona el repositorio `Gracdom/theFisherShop`

2. **Configuración automática:**
   - Netlify detectará automáticamente Next.js
   - Los valores deberían ser:
     - **Build command:** `npm run prisma:generate && npm run build`
     - **Publish directory:** `.next`
     - **Node version:** 18 (o superior)

3. **Configura las Variables de Entorno:**
   En la sección "Site settings" → "Environment variables", agrega:

   ```
   DATABASE_URL=postgresql://postgres:[TU-PASSWORD]@db.[TU-PROYECTO].supabase.co:5432/postgres
   
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_stripe_public_key
   STRIPE_SECRET_KEY=tu_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=tu_webhook_secret
   
   NEXT_PUBLIC_API_URL=https://tu-sitio.netlify.app
   
   ADMIN_PASSWORD=admin123
   ADMIN_SESSION_TOKEN=change-this-to-a-random-secret-in-production
   
   NODE_ENV=production
   ```

4. **Despliega:**
   - Haz clic en "Deploy site"
   - Netlify comenzará el proceso de build

### Opción 2: Desde Netlify CLI

```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Inicia sesión
netlify login

# Despliega
netlify deploy --prod
```

## ⚙️ Configuraciones Importantes

### Build Command
El comando de build incluye la generación de Prisma Client:
```bash
npm run prisma:generate && npm run build
```

### Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo | ¿Dónde conseguirla? |
|----------|-------------|---------|---------------------|
| `DATABASE_URL` | URL de conexión a Supabase | `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres` | **Ver sección "Dónde Conseguir las Variables"** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | `pk_test_...` | **Ver sección "Dónde Conseguir las Variables"** |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe | `sk_test_...` | **Ver sección "Dónde Conseguir las Variables"** |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook de Stripe | `whsec_...` | **Ver sección "Dónde Conseguir las Variables"** |
| `NEXT_PUBLIC_API_URL` | URL de tu sitio en Netlify | `https://tu-sitio.netlify.app` | **Se configura después del despliegue** |
| `ADMIN_PASSWORD` | Contraseña del admin | (cambiar en producción) | **Tú la eliges** |
| `ADMIN_SESSION_TOKEN` | Token de sesión del admin | (generar aleatorio) | **Generar aleatorio** |

## 🔑 Dónde Conseguir las Variables de Entorno

### 1. DATABASE_URL (Supabase) - ⚠️ OBLIGATORIA

**Pasos para obtenerla:**

1. **Crea una cuenta en Supabase** (si no la tienes):
   - Ve a: https://supabase.com
   - Haz clic en "Start your project" o "Sign up"
   - Regístrate con GitHub, Google o email

2. **Crea un nuevo proyecto:**
   - Haz clic en "New Project"
   - **Name:** `thefishershop` (o el nombre que prefieras)
   - **Database Password:** Crea una contraseña segura (¡GUÁRDALA BIEN!)
   - **Region:** Selecciona la más cercana (ej: `Europe West`)
   - **Pricing Plan:** Free (suficiente para empezar)
   - Haz clic en "Create new project"
   - Espera 2-3 minutos mientras se crea

3. **Obtén la URL de conexión:**
   - En tu proyecto de Supabase, ve a **Settings** (⚙️) en el menú lateral
   - Haz clic en **Database**
   - Busca la sección **Connection String** o **Connection pooling**
   - Selecciona el tab **URI** o **Connection string**
   - Copia la URL que se ve así:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     ```
   - **IMPORTANTE:** Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste
   - **Ejemplo final:**
     ```
     postgresql://postgres:MiPassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
     ```

**✅ Esta es tu `DATABASE_URL`**

---

### 2. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY y STRIPE_SECRET_KEY - ⚠️ OBLIGATORIAS si usas pagos

**Pasos para obtenerlas:**

1. **Crea una cuenta en Stripe** (si no la tienes):
   - Ve a: https://stripe.com
   - Haz clic en "Start now" o "Sign up"
   - Regístrate con email

2. **Obtén las claves de prueba (Test Mode):**
   - Una vez dentro del Dashboard de Stripe
   - Asegúrate de estar en **Test mode** (toggle en la esquina superior derecha)
   - Ve a **Developers** → **API keys** en el menú lateral
   - Verás dos claves:
     - **Publishable key:** Empieza con `pk_test_...` → Esta es `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - **Secret key:** Haz clic en "Reveal test key" → Empieza con `sk_test_...` → Esta es `STRIPE_SECRET_KEY`

**✅ Estas son tus claves de Stripe**

**Nota:** Para producción, usa las claves "Live" (empiezan con `pk_live_` y `sk_live_`)

---

### 3. STRIPE_WEBHOOK_SECRET - ⚠️ OBLIGATORIA si usas pagos

**Pasos para obtenerla:**

1. **Después de desplegar tu sitio en Netlify:**
   - Necesitas primero tener la URL de tu sitio (ej: `https://tu-sitio.netlify.app`)

2. **Configura el webhook en Stripe:**
   - En Stripe Dashboard, ve a **Developers** → **Webhooks**
   - Haz clic en "Add endpoint"
   - **Endpoint URL:** `https://tu-sitio.netlify.app/api/webhooks/stripe`
   - **Events to send:** Selecciona:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `checkout.session.completed`
   - Haz clic en "Add endpoint"

3. **Obtén el secreto:**
   - Una vez creado el webhook, haz clic en él
   - En la sección "Signing secret", haz clic en "Reveal"
   - Copia el secreto que empieza con `whsec_...`

**✅ Este es tu `STRIPE_WEBHOOK_SECRET`**

**Nota:** Puedes crear el webhook después del despliegue inicial, pero necesitarás actualizar la variable en Netlify.

---

### 4. NEXT_PUBLIC_API_URL - Se configura después

**Pasos:**

1. **Después de desplegar en Netlify:**
   - Netlify te dará una URL automática como: `https://random-name-12345.netlify.app`
   - O puedes configurar un dominio personalizado

2. **Usa esa URL como valor:**
   ```
   NEXT_PUBLIC_API_URL=https://tu-sitio.netlify.app
   ```

**✅ Esta variable se configura después del primer despliegue**

---

### 5. ADMIN_PASSWORD - Tú la eliges

**Pasos:**

- Elige cualquier contraseña segura para acceder al panel de administración
- Ejemplo: `MiPasswordSegura123!`
- **⚠️ IMPORTANTE:** Cámbiala por una contraseña fuerte en producción

**✅ Esta la eliges tú**

---

### 6. ADMIN_SESSION_TOKEN - Generar aleatorio

**Pasos para generar un token aleatorio:**

**Opción A: Desde PowerShell (Windows):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Opción B: Desde Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Opción C: Online:**
- Ve a: https://randomkeygen.com/
- Usa una "CodeIgniter Encryption Keys" (64 caracteres)

**✅ Copia el resultado y úsalo como `ADMIN_SESSION_TOKEN`**

---

### 7. NODE_ENV - Se configura automáticamente

- Netlify la configura automáticamente como `production`
- No necesitas hacer nada

---

## 📝 Resumen: Variables Mínimas para Empezar

**Para empezar SIN pagos (solo base de datos):**
```
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
NEXT_PUBLIC_API_URL=https://tu-sitio.netlify.app (después del despliegue)
ADMIN_PASSWORD=tu_contraseña_segura
ADMIN_SESSION_TOKEN=token_aleatorio_generado
NODE_ENV=production
```

**Para empezar CON pagos (completo):**
```
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (después de configurar webhook)
NEXT_PUBLIC_API_URL=https://tu-sitio.netlify.app (después del despliegue)
ADMIN_PASSWORD=tu_contraseña_segura
ADMIN_SESSION_TOKEN=token_aleatorio_generado
NODE_ENV=production
```

## 🔧 Configuración de Prisma en Netlify

Netlify ejecutará automáticamente `prisma generate` durante el build gracias al comando configurado en `netlify.toml`.

## 📝 Notas Importantes

1. **Base de Datos:** Asegúrate de que tu base de datos Supabase esté accesible desde Internet (debería estarlo por defecto).

2. **Stripe Webhooks:** 
   - Configura el webhook en Stripe apuntando a: `https://tu-sitio.netlify.app/api/webhooks/stripe`
   - Usa el secreto del webhook en `STRIPE_WEBHOOK_SECRET`

3. **Dominio Personalizado:**
   - En Netlify, ve a "Domain settings"
   - Agrega tu dominio personalizado si lo deseas

4. **Builds Automáticos:**
   - Netlify desplegará automáticamente cada vez que hagas push a la rama `main`

## 🐛 Solución de Problemas

### Error: "Prisma Client not generated"
- Asegúrate de que el build command incluya `npm run prisma:generate`
- Verifica que `DATABASE_URL` esté configurada correctamente

### Error: "Database connection failed"
- Verifica que la URL de la base de datos sea correcta
- Asegúrate de que Supabase permita conexiones desde Netlify

### Error: "Build timeout"
- Netlify tiene un límite de tiempo de build
- Si tu build tarda mucho, considera optimizar las dependencias

## 📚 Recursos

- [Documentación de Netlify para Next.js](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Guía de Variables de Entorno en Netlify](https://docs.netlify.com/environment-variables/overview/)

## ✅ Checklist Pre-Despliegue

- [ ] Variables de entorno configuradas en Netlify
- [ ] Base de datos Supabase accesible
- [ ] Stripe configurado con webhooks
- [ ] `netlify.toml` creado
- [ ] `public/_redirects` creado
- [ ] Pruebas locales funcionando (`npm run build`)

¡Tu proyecto está listo para Netlify! 🎉
