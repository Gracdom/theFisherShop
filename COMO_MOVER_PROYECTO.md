# 🚀 Cómo Mover el Proyecto - Guía Rápida

## ⚠️ IMPORTANTE: Necesitas Permisos de Administrador

Para mover el proyecto a `H:\GRACDOM\Github\pescamar-ecommerce`, necesitas ejecutar como **Administrador**.

## ✅ Método 1: Usar el Script (Más Fácil)

### Paso 1: Ejecutar como Administrador

1. **Cierra Cursor completamente**
2. **Haz clic derecho** en el icono de Cursor
3. Selecciona **"Ejecutar como administrador"**
4. Abre la terminal en Cursor

### Paso 2: Ejecutar el Script

```bash
cd C:\Users\User
.\mover_manual.bat
```

El script te pedirá confirmación y copiará todos los archivos automáticamente.

## ✅ Método 2: Copiar Manualmente desde el Explorador

### Paso 1: Crear la Carpeta Destino

1. Abre el **Explorador de Archivos**
2. Ve a `H:\GRACDOM\Github`
3. **Clic derecho** → **Nuevo** → **Carpeta**
4. Nombra la carpeta: `pescamar-ecommerce`

### Paso 2: Copiar Archivos

Desde `C:\Users\User`, copia estas carpetas y archivos a `H:\GRACDOM\Github\pescamar-ecommerce`:

#### Carpetas a Copiar:
- ✅ `src/` (carpeta completa)
- ✅ `prisma/` (carpeta completa)
- ✅ `public/` (si existe)

#### Archivos a Copiar:
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.js`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`
- ✅ `tsconfig.json`
- ✅ `.gitignore`
- ✅ `.env.example`
- ✅ `.env` (si existe - **IMPORTANTE**)

#### Documentación (opcional pero recomendado):
- ✅ `README.md`
- ✅ `CONFIGURACION_BASE_DE_DATOS.md`
- ✅ `INSTRUCCIONES_IMPORTACION_CSV.md`
- ✅ `SOLUCION_ERROR_PERMISOS.md`
- ✅ `crear_tablas.sql`

#### Scripts (opcional pero útil):
- ✅ `importar_productos.bat`
- ✅ `ejecutar.bat`
- ✅ `ejecutar_puerto_alternativo.bat`

## ✅ Método 3: Usar PowerShell como Administrador

1. Presiona `Win + X`
2. Selecciona **"Windows PowerShell (Administrador)"**
3. Ejecuta estos comandos:

```powershell
# Crear carpeta destino
New-Item -ItemType Directory -Path "H:\GRACDOM\Github\pescamar-ecommerce" -Force

# Copiar carpetas
robocopy "C:\Users\User\src" "H:\GRACDOM\Github\pescamar-ecommerce\src" /E /COPYALL
robocopy "C:\Users\User\prisma" "H:\GRACDOM\Github\pescamar-ecommerce\prisma" /E /COPYALL

# Copiar archivos de configuración
Copy-Item "C:\Users\User\package.json" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\package-lock.json" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\next.config.js" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\tailwind.config.js" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\postcss.config.js" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\tsconfig.json" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\.gitignore" "H:\GRACDOM\Github\pescamar-ecommerce\"
Copy-Item "C:\Users\User\.env.example" "H:\GRACDOM\Github\pescamar-ecommerce\"
if (Test-Path "C:\Users\User\.env") {
    Copy-Item "C:\Users\User\.env" "H:\GRACDOM\Github\pescamar-ecommerce\"
}

Write-Host "Proyecto copiado exitosamente!" -ForegroundColor Green
```

## 🔧 Después de Mover el Proyecto

Una vez que el proyecto esté en `H:\GRACDOM\Github\pescamar-ecommerce`:

### 1. Abre la Nueva Ubicación en Cursor

```bash
cd H:\GRACDOM\Github\pescamar-ecommerce
```

### 2. Instala las Dependencias

```bash
npm install
```

### 3. Verifica el Archivo .env

Asegúrate de que el archivo `.env` tenga la `DATABASE_URL` correcta.

### 4. Genera el Cliente de Prisma

```bash
npm run prisma:generate
```

### 5. Aplica el Schema a la Base de Datos

```bash
npm run prisma:push
```

### 6. Importa los Productos

```bash
npm run db:import
```

### 7. Ejecuta el Proyecto

```bash
npm run dev
```

Abre http://localhost:3000 y verifica que todo funciona.

## ✅ Verificar que Todo Está Correcto

Después de mover, verifica que existan estas carpetas y archivos en `H:\GRACDOM\Github\pescamar-ecommerce`:

- ✅ `src/` (con app, components, lib)
- ✅ `prisma/` (con schema.prisma, import-csv.ts)
- ✅ `package.json`
- ✅ `.env` (con DATABASE_URL)

## 🗑️ Eliminar Archivos Originales (Opcional)

**Solo después de verificar que todo funciona en la nueva ubicación**, puedes eliminar los archivos originales de `C:\Users\User`.

⚠️ **IMPORTANTE:** Solo elimina archivos del proyecto, NO archivos del sistema Windows.

---

**¡Listo!** Tu proyecto ahora está en `H:\GRACDOM\Github\pescamar-ecommerce` 🎉
