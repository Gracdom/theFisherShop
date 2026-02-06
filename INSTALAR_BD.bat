@echo off
echo ========================================
echo   INSTALACION DE BASE DE DATOS
echo   Fishing Club E-commerce
echo ========================================
echo.

echo [1/4] Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudieron instalar las dependencias
    echo Por favor, ejecuta manualmente: npm install
    pause
    exit /b 1
)

echo.
echo [2/4] Generando cliente de Prisma...
call npm run prisma:generate
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudo generar el cliente de Prisma
    pause
    exit /b 1
)

echo.
echo [3/4] Creando tablas en la base de datos...
call npm run prisma:push
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudieron crear las tablas
    echo Verifica que tu DATABASE_URL en .env sea correcta
    pause
    exit /b 1
)

echo.
echo [4/4] Llenando base de datos con productos de ejemplo...
call npm run db:seed
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudo ejecutar el seed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   INSTALACION COMPLETADA!
echo ========================================
echo.
echo Tu base de datos esta lista. Ahora puedes:
echo.
echo   1. Ejecutar: npm run dev
echo   2. Abrir: http://localhost:3000
echo   3. Ver datos: npm run prisma:studio
echo.
pause
