# Script para cargar variables de entorno desde .env a Netlify
# Requiere tener Netlify CLI instalado

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cargar Variables .env a Netlify" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Netlify CLI está instalado
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "❌ Netlify CLI no está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instálalo con:" -ForegroundColor Yellow
    Write-Host "npm install -g netlify-cli" -ForegroundColor White
    Write-Host ""
    Write-Host "Luego ejecuta este script nuevamente" -ForegroundColor Yellow
    pause
    exit 1
}

# Verificar si existe archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "❌ No se encontró el archivo .env" -ForegroundColor Red
    Write-Host ""
    Write-Host "Crea un archivo .env con tus variables:" -ForegroundColor Yellow
    Write-Host "DATABASE_URL=postgresql://..." -ForegroundColor White
    Write-Host "ADMIN_PASSWORD=tu_password" -ForegroundColor White
    Write-Host "ADMIN_SESSION_TOKEN=tu_token" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ Netlify CLI encontrado" -ForegroundColor Green
Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
Write-Host ""

# Verificar si está logueado en Netlify
Write-Host "Verificando sesión de Netlify..." -ForegroundColor Yellow
$netlifyStatus = netlify status 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No estás logueado en Netlify" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Iniciando sesión..." -ForegroundColor Yellow
    netlify login
}

Write-Host ""
Write-Host "Leyendo variables del archivo .env..." -ForegroundColor Yellow

# Leer archivo .env y cargar variables
$envVars = @{}
Get-Content ".env" | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"').Trim("'")
        if ($key -and $value) {
            $envVars[$key] = $value
        }
    }
}

if ($envVars.Count -eq 0) {
    Write-Host "❌ No se encontraron variables válidas en .env" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "Se encontraron $($envVars.Count) variables:" -ForegroundColor Green
$envVars.Keys | ForEach-Object {
    Write-Host "  - $_" -ForegroundColor Gray
}

Write-Host ""
Write-Host "¿Deseas cargar estas variables a Netlify? (S/N)" -ForegroundColor Yellow
$confirm = Read-Host

if ($confirm -ne "S" -and $confirm -ne "s" -and $confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Operación cancelada" -ForegroundColor Yellow
    pause
    exit 0
}

Write-Host ""
Write-Host "Cargando variables a Netlify..." -ForegroundColor Yellow
Write-Host ""

# Cargar cada variable usando Netlify CLI
$successCount = 0
$failCount = 0

foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    Write-Host "Cargando $key..." -ForegroundColor Gray -NoNewline
    
    # Usar netlify env:set para cada variable
    $result = netlify env:set $key "$value" --json 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✅" -ForegroundColor Green
        $successCount++
    } else {
        Write-Host " ❌ Error" -ForegroundColor Red
        Write-Host "   $result" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Resumen" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Cargadas exitosamente: $successCount" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "❌ Fallidas: $failCount" -ForegroundColor Red
}
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "¡Variables cargadas correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Puedes verificar en:" -ForegroundColor Yellow
    Write-Host "https://app.netlify.com → Tu sitio → Site settings → Environment variables" -ForegroundColor White
}

pause
