@echo off
echo ========================================
echo   PescaMar - Puerto Alternativo
echo ========================================
echo.

echo El puerto 3000 esta ocupado.
echo Usando puerto alternativo: 3001
echo.
echo Abre en tu navegador: http://localhost:3001
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

set PORT=3001
call npm run dev
