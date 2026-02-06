# 🔧 Solución de Errores de Build en Netlify

## Problema Detectado

Los builds están fallando en Netlify durante la etapa "building site". Esto puede deberse a varias causas.

## ✅ Cambios Realizados

1. **Script de build mejorado** (`build:netlify` en `package.json`)
2. **Postinstall script** para generar Prisma Client automáticamente
3. **Configuración de Netlify actualizada** (`netlify.toml`)

## 🔍 Verificar el Error Específico

Para ver el error exacto en Netlify:

1. Ve a tu sitio en Netlify Dashboard
2. Haz clic en el deploy fallido
3. Expande los logs para ver el error completo
4. Busca líneas que digan "Error:" o "Failed"

## 🛠️ Soluciones Comunes

### Error: "Prisma Client not generated"

**Solución:**
- El script `postinstall` ahora genera automáticamente el cliente
- Verifica que `DATABASE_URL` esté configurada (aunque Prisma puede generar sin conexión)

### Error: "Cannot find module '@prisma/client'"

**Solución:**
- Asegúrate de que `@prisma/client` esté en `dependencies` (no en `devDependencies`)
- Ya está correctamente configurado

### Error: "Build script returned non-zero exit code"

**Posibles causas:**
1. **Falta DATABASE_URL:** Aunque Prisma puede generar sin conexión, algunos casos pueden fallar
2. **Dependencias faltantes:** Verifica que todas las dependencias estén en `package.json`
3. **Error de TypeScript:** Revisa los logs para ver errores de compilación

### Error: "Command failed: prisma generate"

**Solución:**
- Verifica que el archivo `prisma/schema.prisma` esté presente
- Asegúrate de que la sintaxis del schema sea correcta

## 📋 Checklist de Verificación

Antes de hacer deploy, verifica:

- [ ] `DATABASE_URL` está configurada en Netlify (aunque sea un valor dummy para el build)
- [ ] `package.json` tiene el script `build:netlify`
- [ ] `package.json` tiene el script `postinstall`
- [ ] `netlify.toml` está presente y configurado
- [ ] `prisma/schema.prisma` existe y es válido
- [ ] Todas las dependencias están en `package.json`

## 🚀 Próximos Pasos

1. **Haz commit y push de los cambios:**
   ```bash
   git add .
   git commit -m "Fix Netlify build configuration"
   git push origin main
   ```

2. **Netlify se desplegará automáticamente**

3. **Si sigue fallando:**
   - Revisa los logs completos en Netlify
   - Comparte el error específico para más ayuda

## 💡 Nota Importante

**DATABASE_URL durante el build:**
- Prisma puede generar el cliente sin conexión a la base de datos
- Sin embargo, si el build falla, puedes poner una URL temporal:
  ```
  DATABASE_URL=postgresql://postgres:temp@temp:5432/temp
  ```
- Esto solo es para el build, la URL real se usará en runtime

## 📞 Si Necesitas Ayuda

Comparte:
1. El error completo de los logs de Netlify
2. La línea específica donde falla
3. Cualquier mensaje de error relacionado con Prisma o dependencias
