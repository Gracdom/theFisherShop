# 📋 Instrucciones de Instalación - PescaMar

## ✅ ¡Tu proyecto está listo!

He creado completamente tu tienda online con **Next.js + Tailwind CSS + Stripe**.

## 🚀 Para ejecutar el proyecto:

### Paso 1: Instalar dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Este comando instalará:
- Next.js 14
- React 18
- Tailwind CSS
- Stripe
- TypeScript
- Y todas las dependencias necesarias

### Paso 2: Configurar Stripe (IMPORTANTE)

1. Ve a [stripe.com](https://stripe.com) y crea una cuenta gratuita
2. Ve a [Dashboard > API Keys](https://dashboard.stripe.com/test/apikeys)
3. Copia las claves de prueba (Test Mode)
4. Abre el archivo `.env.local` en la raíz del proyecto
5. Reemplaza las claves:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA_AQUI
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA_AQUI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Paso 3: Ejecutar el proyecto

```bash
npm run dev
```

### Paso 4: Abrir en el navegador

Abre [http://localhost:3000](http://localhost:3000)

## 🎉 ¡Listo!

Tu tienda de pesca estará funcionando con:
- ✅ Carrito de compras
- ✅ Sistema de pagos con Stripe
- ✅ Diseño responsive
- ✅ Animaciones modernas

## 💳 Tarjetas de prueba de Stripe

Para probar pagos usa:
- **Número:** 4242 4242 4242 4242
- **Fecha:** Cualquier fecha futura
- **CVC:** Cualquier 3 dígitos
- **Código postal:** Cualquier 5 dígitos

---

¿Algún problema? Revisa el archivo README.md para más detalles.
