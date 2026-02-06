# 🚀 PRIMEROS PASOS - PescaMar

## ❗ ERROR ACTUAL

```
"next" no se reconoce como un comando interno o externo
```

**Causa:** Las dependencias no están instaladas todavía.

---

## ✅ SOLUCIÓN: Instalar Dependencias

**DEBES HACER ESTO PRIMERO:**

### Paso 1: Abrir una Terminal NUEVA

1. Presiona `Ctrl + Shift + Ñ` en Cursor para abrir una terminal nueva
   O
2. Click derecho en la carpeta → "Abrir en Terminal"
   O  
3. Abre PowerShell/CMD directamente

### Paso 2: Instalar las dependencias

En la terminal, ejecuta:

```bash
npm install
```

**Esto tomará 2-3 minutos.** Verás que descarga muchos paquetes.

Espera a que veas un mensaje como:
```
added 500 packages in 2m
```

### Paso 3: Ejecutar el proyecto

Una vez instalado, ejecuta:

```bash
npm run dev:4000
```

O si prefieres el puerto 3000:
```bash
npm run dev
```

### Paso 4: Abrir en el navegador

Abre tu navegador en:
- **http://localhost:4000** (si usaste dev:4000)
- **http://localhost:3000** (si usaste dev)

---

## 🔧 Si npm install no funciona

### Verifica que tienes Node.js instalado:

```bash
node --version
npm --version
```

**Deberías ver algo como:**
```
v20.x.x
10.x.x
```

### Si no está instalado:

1. Ve a https://nodejs.org
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo el asistente
4. Reinicia tu computadora
5. Vuelve a intentar `npm install`

---

## 📋 Orden Correcto de Comandos

```bash
# 1. PRIMERO - Instalar dependencias (solo una vez)
npm install

# 2. DESPUÉS - Ejecutar el proyecto (cada vez que quieras trabajar)
npm run dev:4000

# 3. FINALMENTE - Abrir en navegador
http://localhost:4000
```

---

## ❓ ¿Por qué necesito npm install?

El archivo `package.json` lista las dependencias (Next.js, React, Tailwind, Stripe, etc.) pero NO las incluye.

`npm install`:
- ✅ Descarga todas las dependencias
- ✅ Las guarda en la carpeta `node_modules`
- ✅ Prepara el proyecto para ejecutarse

**Es como descargar las piezas antes de armar el puzzle.**

---

## 🎯 Siguiente Paso

**EJECUTA AHORA EN UNA TERMINAL NUEVA:**

```bash
npm install
```

¡Y luego podrás ejecutar tu tienda! 🎣✨
