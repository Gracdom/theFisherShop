# Script PowerShell para mover el proyecto
# Ejecutar como Administrador: PowerShell -ExecutionPolicy Bypass -File mover_proyecto_powershell.ps1

$origen = "C:\Users\User"
$destino = "H:\GRACDOM\Github\pescamar-ecommerce"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Mover Proyecto a H:\GRACDOM\Github" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que la carpeta origen existe
if (-not (Test-Path $origen)) {
    Write-Host "ERROR: La carpeta origen no existe: $origen" -ForegroundColor Red
    exit 1
}

# Crear carpeta destino
Write-Host "Creando carpeta destino..." -ForegroundColor Yellow
try {
    New-Item -ItemType Directory -Path $destino -Force | Out-Null
    Write-Host "✅ Carpeta destino creada" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al crear carpeta destino: $_" -ForegroundColor Red
    Write-Host "Ejecuta este script como Administrador" -ForegroundColor Yellow
    exit 1
}

# Función para copiar carpeta
function Copy-Folder {
    param($source, $target)
    if (Test-Path $source) {
        Write-Host "Copiando $source..." -ForegroundColor Yellow
        robocopy $source $target /E /COPYALL /NFL /NDL /NJH /NJS | Out-Null
        Write-Host "✅ $source copiado" -ForegroundColor Green
    }
}

# Función para copiar archivo
function Copy-File {
    param($source, $target)
    if (Test-Path $source) {
        Copy-Item $source $target -Force -ErrorAction SilentlyContinue
        Write-Host "✅ $(Split-Path $source -Leaf) copiado" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Copiando archivos del proyecto..." -ForegroundColor Cyan
Write-Host ""

# Copiar carpetas
Copy-Folder "$origen\src" "$destino\src"
Copy-Folder "$origen\prisma" "$destino\prisma"
if (Test-Path "$origen\public") {
    Copy-Folder "$origen\public" "$destino\public"
}

# Copiar archivos de configuración
Write-Host "Copiando archivos de configuración..." -ForegroundColor Yellow
Copy-File "$origen\package.json" $destino
Copy-File "$origen\package-lock.json" $destino
Copy-File "$origen\next.config.js" $destino
Copy-File "$origen\tailwind.config.js" $destino
Copy-File "$origen\postcss.config.js" $destino
Copy-File "$origen\tsconfig.json" $destino
Copy-File "$origen\.gitignore" $destino
Copy-File "$origen\.env.example" $destino
Copy-File "$origen\.env" $destino

# Copiar documentación
Write-Host ""
Write-Host "Copiando documentación..." -ForegroundColor Yellow
$docs = @(
    "README.md",
    "CONFIGURACION_BASE_DE_DATOS.md",
    "INSTRUCCIONES_IMPORTACION_CSV.md",
    "SOLUCION_ERROR_PERMISOS.md",
    "crear_tablas.sql",
    "GUIA_COMPLETA_FINAL.md",
    "INICIO_RAPIDO_BD.md",
    "INSTRUCCIONES_INSTALACION.md",
    "PRIMEROS_PASOS.md"
)

foreach ($doc in $docs) {
    Copy-File "$origen\$doc" $destino
}

# Copiar scripts
Write-Host ""
Write-Host "Copiando scripts..." -ForegroundColor Yellow
$scripts = @(
    "importar_productos.bat",
    "ejecutar.bat",
    "ejecutar_puerto_alternativo.bat"
)

foreach ($script in $scripts) {
    Copy-File "$origen\$script" $destino
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Proyecto movido exitosamente!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ubicación nueva: $destino" -ForegroundColor Yellow
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "  1. cd $destino" -ForegroundColor White
Write-Host "  2. npm install" -ForegroundColor White
Write-Host "  3. npm run prisma:generate" -ForegroundColor White
Write-Host "  4. npm run prisma:push" -ForegroundColor White
Write-Host "  5. npm run db:import" -ForegroundColor White
Write-Host ""
Write-Host "Los archivos originales NO se han eliminado." -ForegroundColor Yellow
Write-Host "Si todo funciona correctamente, puedes eliminarlos manualmente." -ForegroundColor Yellow
Write-Host ""
