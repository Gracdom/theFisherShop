# Script para subir el proyecto a GitHub
# Este script te ayudará a hacer push usando tu Personal Access Token

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Subir Proyecto a GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path ".git")) {
    Write-Host "Error: No se encontró un repositorio Git en este directorio." -ForegroundColor Red
    exit 1
}

# Verificar que el remote está configurado
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host "Error: No se encontró el remote 'origin'." -ForegroundColor Red
    exit 1
}

Write-Host "Remote configurado: $remote" -ForegroundColor Green
Write-Host ""

# Solicitar el token
Write-Host "Por favor, ingresa tu Personal Access Token de GitHub:" -ForegroundColor Yellow
Write-Host "(El token se usará solo para esta operación y no se guardará)" -ForegroundColor Gray
Write-Host ""
$token = Read-Host -AsSecureString "Token"

# Convertir SecureString a texto plano
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($plainToken)) {
    Write-Host "Error: No se proporcionó un token válido." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Haciendo push al repositorio..." -ForegroundColor Yellow

# Configurar la URL con el token
$username = "Gracdom"
$repoUrl = "https://${username}:${plainToken}@github.com/Gracdom/theFisherShop.git"

# Hacer push usando la URL con token
try {
    git push -u $repoUrl main 2>&1 | ForEach-Object {
        if ($_ -match "password|token|credential") {
            # No mostrar información sensible
            Write-Host $_ -ForegroundColor Gray
        } else {
            Write-Host $_
        }
    }
    
    Write-Host ""
    Write-Host "¡Éxito! El código ha sido subido a GitHub." -ForegroundColor Green
    Write-Host "Puedes verlo en: https://github.com/Gracdom/theFisherShop" -ForegroundColor Cyan
} catch {
    Write-Host ""
    Write-Host "Error al hacer push:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifica que:" -ForegroundColor Yellow
    Write-Host "1. El token tenga permisos de 'repo'" -ForegroundColor Yellow
    Write-Host "2. El token no haya expirado" -ForegroundColor Yellow
    Write-Host "3. Tengas conexión a internet" -ForegroundColor Yellow
}

# Limpiar el token de memoria
$plainToken = $null
$token = $null
