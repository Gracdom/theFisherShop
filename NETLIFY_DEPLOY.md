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

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a Supabase | `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook de Stripe | `whsec_...` |
| `NEXT_PUBLIC_API_URL` | URL de tu sitio en Netlify | `https://tu-sitio.netlify.app` |
| `ADMIN_PASSWORD` | Contraseña del admin | (cambiar en producción) |
| `ADMIN_SESSION_TOKEN` | Token de sesión del admin | (generar aleatorio) |

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
