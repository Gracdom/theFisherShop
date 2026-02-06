@echo off
echo ========================================
echo   Instalando PescaMar E-commerce
echo ========================================
echo.

echo Instalando dependencias...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudieron instalar las dependencias
    echo Verifica que tienes Node.js y npm instalados
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Instalacion completada exitosamente!
echo ========================================
echo.
echo Para ejecutar el proyecto, usa:
echo   npm run dev
echo.
echo Luego abre http://localhost:3000 en tu navegador
echo.
pause
