@echo off
echo ========================================
echo   Liberar Puerto 3000
echo ========================================
echo.

echo Buscando procesos usando el puerto 3000...
echo.

netstat -ano | findstr :3000

echo.
echo Los numeros al final son los PID (Process ID)
echo.

echo Para matar un proceso, usa:
echo   taskkill /PID NUMERO /F
echo.
echo Ejemplo: taskkill /PID 12345 /F
echo.

pause
