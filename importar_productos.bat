@echo off
echo ========================================
echo Importacion de Productos desde CSV
echo ========================================
echo.

echo IMPORTANTE: Si recibes errores de permisos (EPERM):
echo   1. Cierra esta ventana
echo   2. Ejecuta Cursor como Administrador (clic derecho -^> Ejecutar como administrador)
echo   3. Vuelve a ejecutar este script
echo.
echo O consulta el archivo: SOLUCION_ERROR_PERMISOS.md
echo.
pause

echo Paso 1: Generando cliente de Prisma...
call npm run prisma:generate
if errorlevel 1 (
    echo.
    echo ERROR: No se pudo generar el cliente de Prisma
    echo.
    echo Posibles soluciones:
    echo   1. Ejecuta Cursor como Administrador
    echo   2. Agrega exclusiones en Windows Defender para node_modules
    echo   3. Consulta SOLUCION_ERROR_PERMISOS.md para mas detalles
    echo.
    echo Si el problema persiste, puedes crear las tablas manualmente:
    echo   - Abre Supabase SQL Editor
    echo   - Ejecuta el contenido de crear_tablas.sql
    echo.
    pause
    exit /b 1
)

echo.
echo Paso 2: Aplicando cambios al schema de la base de datos...
call npm run prisma:push
if errorlevel 1 (
    echo.
    echo ERROR: No se pudo aplicar los cambios al schema
    echo.
    echo Si recibes error de permisos, ejecuta Cursor como Administrador
    echo O crea las tablas manualmente usando crear_tablas.sql en Supabase
    echo.
    pause
    exit /b 1
)

echo.
echo Paso 3: Importando productos desde CSV...
call npm run db:import
if errorlevel 1 (
    echo.
    echo ERROR: No se pudieron importar los productos
    echo.
    echo Verifica que:
    echo   1. El archivo CSV existe en d:\DESCARGA\thefishershop.csv
    echo   2. Las tablas estan creadas en la base de datos
    echo   3. La DATABASE_URL en .env es correcta
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Importacion completada exitosamente!
echo ========================================
echo.
echo Puedes verificar los productos en:
echo   - Prisma Studio: npm run prisma:studio
echo   - Supabase Dashboard: Table Editor
echo.
pause
