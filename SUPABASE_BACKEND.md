# Backend con Supabase Edge Functions

El proyecto usa **Supabase Edge Functions** como backend para checkout, contacto, newsletter y carrito abandonado.

## Estructura

```
supabase/
├── config.toml
└── functions/
    ├── _shared/
    │   └── cors.ts
    ├── create-checkout-session/
    │   └── index.ts
    ├── stripe-webhook/
    │   └── index.ts
    ├── contact/
    │   └── index.ts
    ├── newsletter/
    │   └── index.ts
    └── abandoned-cart/
        └── index.ts
```

## Variables de entorno (Secrets en Supabase)

Configura estos secrets en Supabase para que las funciones funcionen:

```bash
# Stripe
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx

# Resend (emails)
supabase secrets set RESEND_API_KEY=re_xxx
supabase secrets set RESEND_FROM="The Fisher Shop <info@thefishershop.com>"

# URL del frontend (para redirects de Stripe y enlaces en emails)
supabase secrets set APP_URL=https://thefishershop.com
```

**Nota:** `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` se inyectan automáticamente en Edge Functions; no hace falta definirlos.

## Despliegue

### 1. Instalar Supabase CLI

```bash
npm install -g supabase
```

### 2. Login y vincular proyecto

```bash
supabase login
supabase link --project-ref TU_PROJECT_REF
```

El `PROJECT_REF` está en: [Supabase Dashboard](https://app.supabase.com) → Settings → General → Reference ID.

### 3. Configurar secrets

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxx STRIPE_WEBHOOK_SECRET=whsec_xxx
supabase secrets set RESEND_API_KEY=re_xxx RESEND_FROM="The Fisher Shop <info@thefishershop.com>"
supabase secrets set APP_URL=https://tu-dominio.com
```

### 4. Desplegar funciones

```bash
# Todas
supabase functions deploy

# O una a una
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy contact
supabase functions deploy newsletter
supabase functions deploy abandoned-cart
```

## URLs de las funciones

Tras el despliegue, las funciones estarán en:

```
https://TU_PROJECT_REF.supabase.co/functions/v1/create-checkout-session
https://TU_PROJECT_REF.supabase.co/functions/v1/stripe-webhook
https://TU_PROJECT_REF.supabase.co/functions/v1/contact
https://TU_PROJECT_REF.supabase.co/functions/v1/newsletter
https://TU_PROJECT_REF.supabase.co/functions/v1/abandoned-cart
```

## Configurar webhook de Stripe

1. Entra en [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Añade un endpoint:
   - **URL:** `https://TU_PROJECT_REF.supabase.co/functions/v1/stripe-webhook`
   - **Eventos:** `checkout.session.completed`
3. Copia el **Signing secret** y ejecuta:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

## Frontend

El frontend llama a las Edge Functions usando `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`:

- `src/lib/supabase-functions.ts` – cliente de las funciones
- Checkout, contacto, newsletter y abandoned-cart usan estas funciones

## Cron de carrito abandonado

El endpoint `/api/cron/abandoned-cart` sigue en **Next.js** (Netlify). Es el que envían los recordatorios de carrito abandonado. Si usas un cron externo (p. ej. Netlify Scheduled Functions), apúntalo a:

```
https://tu-dominio.com/api/cron/abandoned-cart
```

Ese endpoint sigue usando Prisma y Resend; la base de datos es la misma (Supabase PostgreSQL).
