# Instrucciones para Crear un Personal Access Token en GitHub

## Paso 1: Crear el Token

1. **Abre tu navegador** y ve a: https://github.com/settings/tokens/new
   - (Si no se abrió automáticamente, copia y pega esta URL)

2. **Completa el formulario:**
   - **Note** (Nota): Escribe `theFisherShop` o cualquier nombre que te ayude a recordar
   - **Expiration** (Expiración): Elige cuánto tiempo quieres que dure el token
     - Recomendado: 90 días o más
   - **Select scopes** (Seleccionar permisos): 
     - ✅ Marca la casilla **`repo`** (esto incluye todos los permisos de repositorio)
     - Esto es necesario para poder subir código

3. **Haz clic en** "Generate token" (Generar token) al final de la página

4. **¡IMPORTANTE!** Copia el token inmediatamente
   - Se mostrará solo UNA VEZ
   - Es una cadena larga de letras y números
   - Guárdalo en un lugar seguro temporalmente

## Paso 2: Usar el Token

Tienes dos opciones:

### Opción A: Usar el Script Automático (Recomendado)

1. Abre PowerShell en la carpeta del proyecto
2. Ejecuta:
   ```powershell
   .\subir_a_github.ps1
   ```
3. Cuando te pida el token, pégalo y presiona Enter
4. El script hará el push automáticamente

### Opción B: Hacer Push Manualmente

1. Abre PowerShell en la carpeta del proyecto
2. Ejecuta:
   ```powershell
   git push -u origin main
   ```
3. Cuando te pida credenciales:
   - **Username**: `Gracdom`
   - **Password**: Pega el token (NO uses tu contraseña de GitHub)

## Paso 3: Verificar

Una vez completado, ve a:
https://github.com/Gracdom/theFisherShop

Deberías ver todos tus archivos allí.

## Notas Importantes

- ⚠️ El token es como una contraseña temporal - guárdalo de forma segura
- 🔒 No compartas tu token con nadie
- 📝 Puedes revocar el token en cualquier momento desde: https://github.com/settings/tokens
- 🔄 Si el token expira, necesitarás crear uno nuevo

## Solución de Problemas

Si recibes un error de "permission denied":
- Verifica que el token tenga el permiso `repo` marcado
- Asegúrate de haber copiado el token completo

Si recibes un error de "authentication failed":
- Verifica que estés usando el token, no tu contraseña
- Verifica que el token no haya expirado
