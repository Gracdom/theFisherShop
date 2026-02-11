# 🔐 Variables de Entorno para Netlify - TheFisherShop

## 📋 Lista Completa de Variables

Copia y pega estas variables en Netlify Dashboard → Site settings → Environment variables

---

## ✅ OBLIGATORIAS (Mínimo para funcionar)

### 1. DATABASE_URL
```
DATABASE_URL=postgresql://postgres:[TU-PASSWORD]@db.[TU-PROYECTO].supabase.co:5432/postgres
```
**⚠️ REEMPLAZA:**
- `[TU-PASSWORD]` → Tu contraseña de Supabase
- `[TU-PROYECTO]` → El ID de tu proyecto Supabase

**Ejemplo real:**
```
DATABASE_URL=postgresql://postgres:MiPassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

**Dónde conseguirla:**
1. Ve a https://supabase.com
2. Abre tu proyecto
3. Settings → Database → Connection String → URI
4. Copia y reemplaza `[YOUR-PASSWORD]` con tu contraseña

---

### 2. NEXT_PUBLIC_API_URL
```
NEXT_PUBLIC_API_URL=https://tu-sitio.netlify.app
```
**⚠️ IMPORTANTE:** Configura esto DESPUÉS del primer despliegue
- Netlify te dará una URL automática como: `https://random-name-12345.netlify.app`
- O puedes configurar un dominio personalizado

**Ejemplo:**
```
NEXT_PUBLIC_API_URL=https://thefishershop.netlify.app
```

---

### 3. ADMIN_PASSWORD
```
ADMIN_PASSWORD=admin123
```
**⚠️ CAMBIA ESTA CONTRASEÑA** por una más segura en producción

**Ejemplo seguro:**
```
ADMIN_PASSWORD=MiPasswordSegura2024!
```

---

### 4. ADMIN_SESSION_TOKEN
```
ADMIN_SESSION_TOKEN=change-this-to-a-random-secret-in-production
```
**⚠️ GENERA UN TOKEN ALEATORIO**

**Cómo generarlo en PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**O usa este generador online:**
- Ve a: https://randomkeygen.com/
- Usa "CodeIgniter Encryption Keys" (64 caracteres)

**Ejemplo:**
```
ADMIN_SESSION_TOKEN=aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1pQ3
```

---

### 5. NODE_ENV
```
NODE_ENV=production
```
**Nota:** Netlify la configura automáticamente, pero puedes agregarla manualmente

---

## 💳 OPCIONALES (Solo si usas pagos con Stripe)

### 6. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
**Dónde conseguirla:**
1. Ve a https://stripe.com
2. Dashboard → Developers → API keys
3. Copia la "Publishable key" (empieza con `pk_test_` o `pk_live_`)

---

### 7. STRIPE_SECRET_KEY
```
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA_AQUI
```
**Dónde conseguirla:**
1. Stripe Dashboard → Developers → API keys
2. Haz clic en "Reveal test key" o "Reveal live key"
3. Copia la "Secret key" (empieza con `sk_test_` o `sk_live_`)
4. **⚠️ NO uses el ejemplo de arriba, usa tu clave real de Stripe**

---

### 8. STRIPE_WEBHOOK_SECRET
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
**⚠️ Configura esto DESPUÉS del despliegue inicial**

**Dónde conseguirla:**
1. Después de desplegar, obtén tu URL de Netlify (ej: `https://tu-sitio.netlify.app`)
2. Ve a Stripe Dashboard → Developers → Webhooks
3. Haz clic en "Add endpoint"
4. **Endpoint URL:** `https://tu-sitio.netlify.app/api/webhooks/stripe`
5. Selecciona eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
6. Haz clic en "Add endpoint"
7. Haz clic en el webhook creado
8. En "Signing secret", haz clic en "Reveal"
9. Copia el secreto (empieza con `whsec_`)

---

## 📝 Cómo Configurarlas en Netlify

### Paso a Paso:

1. **Ve a Netlify Dashboard:**
   - https://app.netlify.com
   - Inicia sesión

2. **Selecciona tu sitio:**
   - Haz clic en "thefishershop" o el nombre de tu sitio

3. **Ve a Environment Variables:**
   - Site settings → Environment variables
   - O directamente: Site settings → Build & deploy → Environment

4. **Agrega cada variable:**
   - Haz clic en "Add a variable"
   - **Key:** Nombre de la variable (ej: `DATABASE_URL`)
   - **Value:** El valor (ej: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`)
   - **Scopes:** Deja "All scopes" (o selecciona "Production" si quieres)
   - Haz clic en "Save"

5. **Repite para cada variable**

6. **Haz un nuevo deploy:**
   - Deploys → Trigger deploy → Deploy site
   - O espera al siguiente push automático

---

## ✅ Checklist de Configuración

### Para empezar (sin pagos):
- [ ] `DATABASE_URL` configurada
- [ ] `ADMIN_PASSWORD` configurada
- [ ] `ADMIN_SESSION_TOKEN` generado y configurado
- [ ] `NEXT_PUBLIC_API_URL` configurada (después del primer deploy)
- [ ] `NODE_ENV=production` (opcional, Netlify la pone automáticamente)

### Si usas pagos (adicional):
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configurada
- [ ] `STRIPE_SECRET_KEY` configurada
- [ ] `STRIPE_WEBHOOK_SECRET` configurada (después del deploy inicial)

---

## 🚨 Importante

1. **No compartas estas variables** - Son secretas
2. **Usa valores diferentes** para producción y desarrollo
3. **Cambia las contraseñas** por defecto (`admin123`)
4. **Genera tokens aleatorios** para `ADMIN_SESSION_TOKEN`
5. **Configura `NEXT_PUBLIC_API_URL`** después del primer deploy exitoso

---

## 📞 Si Necesitas Ayuda

Si alguna variable no funciona:
1. Verifica que el valor esté correcto (sin espacios extra)
2. Asegúrate de que las URLs estén completas
3. Revisa los logs de Netlify para ver errores específicos
4. Verifica que las variables estén en "Production" scope si es necesario

---

**¡Configura estas variables y tu sitio debería funcionar correctamente!** 🚀
