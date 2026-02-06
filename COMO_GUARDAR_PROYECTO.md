# 💾 Cómo Guardar y Respaldar tu Proyecto PescaMar

## 📍 Estado Actual

✅ Tu proyecto YA ESTÁ GUARDADO en: `C:\Users\User`

Todos los archivos están en tu disco duro y no se perderán a menos que borres la carpeta.

---

## 🎯 Opciones para Organizar y Respaldar

### **1️⃣ Mover a una Carpeta Dedicada (Recomendado)**

**¿Por qué?** La carpeta `C:\Users\User` es tu carpeta de usuario. Es mejor tener proyectos en una ubicación dedicada.

**Cómo hacerlo:**

1. Crea una nueva carpeta, por ejemplo:
   - `C:\Proyectos\pescamar`
   - `C:\Users\User\Documents\Proyectos\pescamar`
   - `C:\Users\User\Desktop\pescamar`

2. Selecciona TODOS los archivos de `C:\Users\User` relacionados con el proyecto:
   ```
   ✅ src/
   ✅ public/ (si existe)
   ✅ package.json
   ✅ next.config.js
   ✅ tailwind.config.js
   ✅ tsconfig.json
   ✅ .env.local
   ✅ .gitignore
   ✅ README.md
   ✅ todos los archivos .bat
   ❌ NO muevas: node_modules (si existe)
   ```

3. Muévelos a la nueva carpeta

4. En la nueva ubicación, abre terminal y ejecuta:
   ```bash
   npm install
   ```

---

### **2️⃣ Subir a GitHub (Mejor para Respaldo en la Nube)** ⭐

**¿Por qué?** GitHub guarda tu código en la nube, permite control de versiones, y puedes acceder desde cualquier lugar.

**Pasos:**

1. **Crear cuenta en GitHub** (si no tienes):
   - Ve a https://github.com
   - Regístrate gratis

2. **Crear un nuevo repositorio:**
   - Click en el botón "+" arriba a la derecha
   - Selecciona "New repository"
   - Nombre: `pescamar-ecommerce`
   - Descripción: "E-commerce de productos de pesca con Next.js y Stripe"
   - Selecciona **Private** (para que solo tú lo veas)
   - NO marques "Initialize with README"
   - Click "Create repository"

3. **Subir tu código:**
   
   Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

   ```bash
   git init
   git add .
   git commit -m "Proyecto inicial PescaMar - E-commerce de pesca"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/pescamar-ecommerce.git
   git push -u origin main
   ```

   **Nota:** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub

4. **¡Listo!** Tu código está respaldado en GitHub.

**Para clonar en otro computador:**
```bash
git clone https://github.com/TU_USUARIO/pescamar-ecommerce.git
cd pescamar-ecommerce
npm install
```

---

### **3️⃣ Crear un ZIP de Respaldo**

**¿Por qué?** Para tener una copia local que puedas guardar en USB, disco externo, o nube (Dropbox, Google Drive, OneDrive).

**Opción A - Usando el script:**
- Doble click en `crear_backup.bat`
- Se creará un archivo ZIP con la fecha actual

**Opción B - Manualmente:**

1. Selecciona todos los archivos del proyecto EXCEPTO:
   - `node_modules` (muy pesado, se puede reinstalar)
   - `.next` (se genera automáticamente)

2. Click derecho → "Enviar a" → "Carpeta comprimida (zip)"

3. Nombra el archivo: `pescamar_backup_2026_02_04.zip`

4. Guarda este ZIP en:
   - USB / Disco externo
   - OneDrive / Google Drive / Dropbox
   - Otro disco duro

---

### **4️⃣ Sincronizar con OneDrive / Google Drive**

**Opción fácil para respaldo automático:**

1. Mueve tu proyecto a una carpeta sincronizada:
   - `C:\Users\User\OneDrive\Proyectos\pescamar`
   - `C:\Users\User\Google Drive\Proyectos\pescamar`

2. Los archivos se respaldarán automáticamente en la nube

⚠️ **IMPORTANTE:** Excluye `node_modules` de la sincronización (es muy pesado)

---

## 🔒 Archivos Importantes a NUNCA Compartir Públicamente

❌ **NO compartas públicamente:**
- `.env.local` (contiene tus claves secretas de Stripe)
- Cualquier archivo con claves API

✅ **El archivo `.gitignore` ya protege estos archivos** cuando subes a GitHub

---

## 📋 Checklist de Respaldo Ideal

Para máxima seguridad, haz:

- ✅ Mueve el proyecto a una carpeta dedicada
- ✅ Sube a GitHub (repositorio privado)
- ✅ Crea un ZIP de respaldo cada semana
- ✅ Guarda copias en OneDrive/Google Drive
- ✅ Mantén un backup en disco externo

---

## 🆘 Si Pierdes el Proyecto

Si tienes el código en GitHub:
```bash
git clone https://github.com/TU_USUARIO/pescamar-ecommerce.git
cd pescamar-ecommerce
npm install
# Crea nuevamente el archivo .env.local con tus claves
npm run dev
```

Si tienes un ZIP de respaldo:
1. Descomprime el ZIP
2. Abre terminal en la carpeta
3. Ejecuta `npm install`
4. Crea el archivo `.env.local` con tus claves
5. Ejecuta `npm run dev`

---

## 💡 Recomendación Final

**La mejor estrategia:**

1. 🔵 Mueve el proyecto a `C:\Proyectos\pescamar`
2. 🟢 Súbelo a GitHub (privado)
3. 🟡 Crea backups ZIP mensuales

Así tendrás tu proyecto:
- ✅ Organizado localmente
- ✅ Respaldado en la nube
- ✅ Con control de versiones
- ✅ Accesible desde cualquier lugar

---

¿Necesitas ayuda con alguno de estos pasos? ¡Pregúntame!
