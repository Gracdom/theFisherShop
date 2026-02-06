@echo off
echo ========================================
echo   Iniciando PescaMar E-commerce
echo ========================================
echo.

echo IMPORTANTE: Asegurate de haber configurado tus claves de Stripe en .env.local
echo.
echo Iniciando servidor de desarrollo...
echo Abre http://localhost:3000 en tu navegador
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev
