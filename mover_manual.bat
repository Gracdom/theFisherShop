@echo off
echo ========================================
echo MOVER PROYECTO - EJECUTAR COMO ADMINISTRADOR
echo ========================================
echo.
echo Este script debe ejecutarse como Administrador
echo.
echo Presiona cualquier tecla para continuar o Ctrl+C para cancelar...
pause >nul

set "ORIGEN=C:\Users\User"
set "DESTINO=H:\GRACDOM\Github\pescamar-ecommerce"

echo.
echo Creando carpeta destino...
mkdir "%DESTINO%" 2>nul
if not exist "%DESTINO%" (
    echo ERROR: No se pudo crear la carpeta. Ejecuta este script como Administrador.
    pause
    exit /b 1
)

echo Copiando archivos...
echo.

REM Copiar carpetas principales
echo [1/5] Copiando src...
xcopy "%ORIGEN%\src" "%DESTINO%\src" /E /I /Y /Q
echo [2/5] Copiando prisma...
xcopy "%ORIGEN%\prisma" "%DESTINO%\prisma" /E /I /Y /Q
if exist "%ORIGEN%\public" (
    echo [3/5] Copiando public...
    xcopy "%ORIGEN%\public" "%DESTINO%\public" /E /I /Y /Q
)

REM Copiar archivos de configuracion
echo [4/5] Copiando archivos de configuracion...
copy "%ORIGEN%\package.json" "%DESTINO%\" >nul
copy "%ORIGEN%\package-lock.json" "%DESTINO%\" >nul
copy "%ORIGEN%\next.config.js" "%DESTINO%\" >nul
copy "%ORIGEN%\tailwind.config.js" "%DESTINO%\" >nul
copy "%ORIGEN%\postcss.config.js" "%DESTINO%\" >nul
copy "%ORIGEN%\tsconfig.json" "%DESTINO%\" >nul
copy "%ORIGEN%\.gitignore" "%DESTINO%\" >nul
copy "%ORIGEN%\.env.example" "%DESTINO%\" >nul
if exist "%ORIGEN%\.env" copy "%ORIGEN%\.env" "%DESTINO%\" >nul

REM Copiar documentacion y scripts
echo [5/5] Copiando documentacion y scripts...
for %%f in (
    "README.md"
    "CONFIGURACION_BASE_DE_DATOS.md"
    "INSTRUCCIONES_IMPORTACION_CSV.md"
    "SOLUCION_ERROR_PERMISOS.md"
    "crear_tablas.sql"
    "importar_productos.bat"
    "ejecutar.bat"
    "ejecutar_puerto_alternativo.bat"
) do (
    if exist "%ORIGEN%\%%f" copy "%ORIGEN%\%%f" "%DESTINO%\" >nul
)

echo.
echo ========================================
echo PROYECTO COPIADO EXITOSAMENTE!
echo ========================================
echo.
echo Ubicacion: %DESTINO%
echo.
echo Proximos pasos:
echo   1. cd %DESTINO%
echo   2. npm install
echo   3. npm run prisma:generate
echo   4. npm run prisma:push
echo   5. npm run db:import
echo.
pause
