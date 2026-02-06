@echo off
echo ========================================
echo   Crear Backup de PescaMar
echo ========================================
echo.

set FECHA=%date:~-4%%date:~3,2%%date:~0,2%
set HORA=%time:~0,2%%time:~3,2%
set HORA=%HORA: =0%
set BACKUP_NAME=pescamar_backup_%FECHA%_%HORA%

echo Creando backup: %BACKUP_NAME%.zip
echo.

echo Archivos que se incluiran:
echo   - Todos los archivos de codigo fuente
echo   - Configuraciones
echo   - Componentes
echo.
echo Archivos que NO se incluiran:
echo   - node_modules (se puede reinstalar con npm install)
echo   - .next (se genera automaticamente)
echo   - .env.local (contiene claves privadas)
echo.

if exist "C:\Program Files\7-Zip\7z.exe" (
    echo Creando archivo ZIP...
    "C:\Program Files\7-Zip\7z.exe" a -tzip "%BACKUP_NAME%.zip" * -xr!node_modules -xr!.next -x!.env.local
    echo.
    echo Backup creado exitosamente: %BACKUP_NAME%.zip
) else (
    echo.
    echo ERROR: 7-Zip no esta instalado
    echo.
    echo OPCION 1: Instala 7-Zip desde https://www.7-zip.org/
    echo.
    echo OPCION 2: Crea el backup manualmente:
    echo   1. Selecciona todos los archivos del proyecto
    echo   2. Click derecho - Enviar a - Carpeta comprimida
    echo   3. NO incluyas: node_modules, .next, .env.local
)

echo.
pause
