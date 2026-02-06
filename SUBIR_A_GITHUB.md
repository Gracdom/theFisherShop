# Subir proyecto a GitHub

## Paso 0: Renombrar carpeta (si aún no lo has hecho)

La carpeta del proyecto debe llamarse `theFisherShop`:

```powershell
cd H:\GRACDOM\Github
Rename-Item -Path "escamar-ecommerce" -NewName "theFisherShop"
```

Luego abre el proyecto desde: `H:\GRACDOM\Github\theFisherShop`

## Paso 1: Crear el repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el **+** (arriba derecha) → **New repository**
3. Nombre: `theFisherShop`
4. Elige **Private** si quieres que sea privado
5. **No** marques "Add a README" (el proyecto ya tiene archivos)
6. Haz clic en **Create repository**

## Paso 2: Ejecutar comandos en la terminal

Abre **PowerShell** o **CMD** en la carpeta del proyecto y ejecuta:

```bash
cd H:\GRACDOM\Github\theFisherShop

git init
git add .
git commit -m "Proyecto inicial - The FisherShop e-commerce"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/theFisherShop.git
git push -u origin main
```

**Importante:** Sustituye `TU_USUARIO` por tu nombre de usuario de GitHub.

## Archivos que NO se suben (por seguridad)

El `.gitignore` ya excluye:
- `.env` (claves de Supabase, Stripe, etc.)
- `node_modules/`
- `.next/` (build de Next.js)

## Si ya existe un repositorio remoto

Si GitHub te creó un README o licencia, puedes hacer:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```
