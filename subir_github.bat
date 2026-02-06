@echo off
echo ========================================
echo   Subir PescaMar a GitHub
echo ========================================
echo.
echo PASOS PARA SUBIR A GITHUB:
echo.
echo 1. Ve a https://github.com y crea una cuenta (si no tienes)
echo.
echo 2. Crea un nuevo repositorio:
echo    - Click en "+" arriba a la derecha
echo    - Selecciona "New repository"
echo    - Nombre: pescamar-ecommerce
echo    - Marca como "Private" si quieres que sea privado
echo    - NO inicialices con README
echo.
echo 3. Ejecuta estos comandos en la terminal:
echo.
echo    git init
echo    git add .
echo    git commit -m "Proyecto inicial PescaMar"
echo    git branch -M main
echo    git remote add origin https://github.com/TU_USUARIO/pescamar-ecommerce.git
echo    git push -u origin main
echo.
echo NOTA: Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
echo.
echo El archivo .env.local NO se subira (esta en .gitignore)
echo Esto es correcto para proteger tus claves de Stripe
echo.
pause
