@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Mover Proyecto a H:\GRACDOM\Github
echo ========================================
echo.

set "ORIGEN=C:\Users\User"
set "DESTINO=H:\GRACDOM\Github\pescamar-ecommerce"

echo Origen: %ORIGEN%
echo Destino: %DESTINO%
echo.

REM Verificar que la carpeta destino existe
if not exist "H:\GRACDOM\Github" (
    echo ERROR: La carpeta H:\GRACDOM\Github no existe
    pause
    exit /b 1
)

REM Crear carpeta destino si no existe
if not exist "%DESTINO%" (
    echo Creando carpeta destino...
    mkdir "%DESTINO%"
)

echo Copiando archivos del proyecto...
echo.

REM Copiar archivos de configuración
echo [1/8] Copiando archivos de configuracion...
copy "%ORIGEN%\package.json" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\package-lock.json" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\next.config.js" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\tailwind.config.js" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\postcss.config.js" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\tsconfig.json" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\.gitignore" "%DESTINO%\" >nul 2>&1
copy "%ORIGEN%\.env.example" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\.env" copy "%ORIGEN%\.env" "%DESTINO%\" >nul 2>&1

REM Copiar carpeta src
echo [2/8] Copiando carpeta src...
xcopy "%ORIGEN%\src" "%DESTINO%\src" /E /I /Y /Q >nul 2>&1

REM Copiar carpeta prisma
echo [3/8] Copiando carpeta prisma...
xcopy "%ORIGEN%\prisma" "%DESTINO%\prisma" /E /I /Y /Q >nul 2>&1

REM Copiar documentación
echo [4/8] Copiando documentacion...
if exist "%ORIGEN%\README.md" copy "%ORIGEN%\README.md" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\CONFIGURACION_BASE_DE_DATOS.md" copy "%ORIGEN%\CONFIGURACION_BASE_DE_DATOS.md" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\INSTRUCCIONES_IMPORTACION_CSV.md" copy "%ORIGEN%\INSTRUCCIONES_IMPORTACION_CSV.md" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\SOLUCION_ERROR_PERMISOS.md" copy "%ORIGEN%\SOLUCION_ERROR_PERMISOS.md" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\crear_tablas.sql" copy "%ORIGEN%\crear_tablas.sql" "%DESTINO%\" >nul 2>&1

REM Copiar scripts batch
echo [5/8] Copiando scripts...
if exist "%ORIGEN%\importar_productos.bat" copy "%ORIGEN%\importar_productos.bat" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\ejecutar.bat" copy "%ORIGEN%\ejecutar.bat" "%DESTINO%\" >nul 2>&1
if exist "%ORIGEN%\ejecutar_puerto_alternativo.bat" copy "%ORIGEN%\ejecutar_puerto_alternativo.bat" "%DESTINO%\" >nul 2>&1

REM Copiar carpeta public si existe
echo [6/8] Verificando carpeta public...
if exist "%ORIGEN%\public" (
    xcopy "%ORIGEN%\public" "%DESTINO%\public" /E /I /Y /Q >nul 2>&1
)

REM Copiar otros archivos de documentación relevantes
echo [7/8] Copiando otros archivos de documentacion...
for %%f in (
    "GUIA_COMPLETA_FINAL.md"
    "INICIO_RAPIDO_BD.md"
    "INSTRUCCIONES_INSTALACION.md"
    "PRIMEROS_PASOS.md"
) do (
    if exist "%ORIGEN%\%%f" copy "%ORIGEN%\%%f" "%DESTINO%\" >nul 2>&1
)

REM Actualizar rutas en el script de importación
echo [8/8] Actualizando rutas en scripts...
if exist "%DESTINO%\prisma\import-csv.ts" (
    powershell -Command "(Get-Content '%DESTINO%\prisma\import-csv.ts') -replace 'd:\\\\DESCARGA\\\\thefishershop.csv', 'd:\\DESCARGA\\thefishershop.csv' | Set-Content '%DESTINO%\prisma\import-csv.ts'"
)

echo.
echo ========================================
echo Proyecto movido exitosamente!
echo ========================================
echo.
echo Ubicacion nueva: %DESTINO%
echo.
echo IMPORTANTE:
echo   1. Ve a la nueva ubicacion: %DESTINO%
echo   2. Ejecuta: npm install
echo   3. Verifica que el archivo .env tenga la DATABASE_URL correcta
echo   4. Ejecuta: npm run prisma:generate
echo   5. Ejecuta: npm run prisma:push
echo   6. Ejecuta: npm run db:import
echo.
echo Los archivos originales en %ORIGEN% NO se han eliminado.
echo Si todo funciona correctamente, puedes eliminarlos manualmente.
echo.
pause
