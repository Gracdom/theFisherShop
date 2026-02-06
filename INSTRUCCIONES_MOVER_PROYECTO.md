# 📦 Instrucciones para Mover el Proyecto

## 🎯 Objetivo

Mover el proyecto de `C:\Users\User` a `H:\GRACDOM\Github\pescamar-ecommerce`

## ⚠️ Problema de Permisos

Si recibes errores de "Acceso denegado", necesitas ejecutar Cursor como **Administrador**.

## ✅ Opción 1: Usar el Script Automático (Recomendado)

### Paso 1: Ejecutar como Administrador

1. **Cierra Cursor completamente**
2. **Haz clic derecho** en el icono de Cursor
3. Selecciona **"Ejecutar como administrador"**
4. Abre la terminal en Cursor

### Paso 2: Ejecutar el Script

```bash
cd C:\Users\User
.\mover_proyecto_a_github.bat
```

## ✅ Opción 2: Copiar Manualmente (Si el script falla)

### Paso 1: Crear la carpeta destino

Abre PowerShell como Administrador y ejecuta:
```powershell
New-Item -ItemType Directory -Path "H:\GRACDOM\Github\pescamar-ecommerce" -Force
```

### Paso 2: Copiar archivos manualmente

Copia estas carpetas y archivos desde `C:\Users\User` a `H:\GRACDOM\Github\pescamar-ecommerce`:

**Carpetas:**
- `src/` (carpeta completa)
- `prisma/` (carpeta completa)
- `public/` (si existe)

**Archivos:**
- `package.json`
- `package-lock.json`
- `next.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `.gitignore`
- `.env.example`
- `.env` (si existe)

**Documentación:**
- `README.md`
- `CONFIGURACION_BASE_DE_DATOS.md`
- `INSTRUCCIONES_IMPORTACION_CSV.md`
- `SOLUCION_ERROR_PERMISOS.md`
- `crear_tablas.sql`

**Scripts:**
- `importar_productos.bat`
- `ejecutar.bat`
- `ejecutar_puerto_alternativo.bat`

## ✅ Opción 3: Usar Robocopy (Más Confiable)

Abre PowerShell como **Administrador** y ejecuta:

```powershell
# Crear carpeta destino
New-Item -ItemType Directory -Path "H:\GRACDOM\Github\pescamar-ecommerce" -Force

# Copiar carpeta src
robocopy "C:\Users\User\src" "H:\GRACDOM\Github\pescamar-ecommerce\src" /E /COPYALL

# Copiar carpeta prisma
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

# Copiar documentación
Copy-Item "C:\Users\User\README.md" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\User\CONFIGURACION_BASE_DE_DATOS.md" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\User\INSTRUCCIONES_IMPORTACION_CSV.md" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\User\SOLUCION_ERROR_PERMISOS.md" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\User\crear_tablas.sql" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue

# Copiar scripts
Copy-Item "C:\Users\User\importar_productos.bat" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\User\ejecutar.bat" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\User\ejecutar_puerto_alternativo.bat" "H:\GRACDOM\Github\pescamar-ecommerce\" -ErrorAction SilentlyContinue

Write-Host "Proyecto copiado exitosamente a H:\GRACDOM\Github\pescamar-ecommerce"
```

## 🔧 Después de Mover el Proyecto

Una vez que el proyecto esté en la nueva ubicación:

### 1. Abre la nueva carpeta en Cursor

```bash
cd H:\GRACDOM\Github\pescamar-ecommerce
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Verifica el archivo .env

Asegúrate de que el archivo `.env` tenga la `DATABASE_URL` correcta.

### 4. Genera el cliente de Prisma

```bash
npm run prisma:generate
```

### 5. Aplica el schema a la base de datos

```bash
npm run prisma:push
```

### 6. Importa los productos

```bash
npm run db:import
```

## ✅ Verificar que Todo Funciona

```bash
npm run dev
```

Abre http://localhost:3000 y verifica que la aplicación funciona correctamente.

## 🗑️ Eliminar Archivos Originales (Opcional)

**Solo después de verificar que todo funciona en la nueva ubicación**, puedes eliminar los archivos originales de `C:\Users\User`:

⚠️ **IMPORTANTE:** No elimines archivos del sistema Windows. Solo elimina:
- `src/`
- `prisma/`
- `package.json`, `package-lock.json`
- Archivos de configuración del proyecto
- Documentación del proyecto (.md)
- Scripts del proyecto (.bat)

**NO elimines:**
- Archivos del sistema (NTUSER.*, etc.)
- Carpetas del sistema (AppData, Desktop, Documents, etc.)
- Otros proyectos (frameit, etc.)

---

**¡Listo!** Tu proyecto ahora está en `H:\GRACDOM\Github\pescamar-ecommerce` 🎉
