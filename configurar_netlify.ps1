# Script para generar valores de variables de entorno para Netlify
# Ejecuta este script para generar tokens aleatorios

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Generador de Variables para Netlify" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Generando ADMIN_SESSION_TOKEN..." -ForegroundColor Yellow
$token = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
Write-Host ""
Write-Host "✅ ADMIN_SESSION_TOKEN generado:" -ForegroundColor Green
Write-Host $token -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Variables que necesitas configurar:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. DATABASE_URL" -ForegroundColor Yellow
Write-Host "   Obtener de: Supabase → Settings → Database → Connection String" -ForegroundColor Gray
Write-Host "   Formato: postgresql://postgres:[PASSWORD]@db.[PROYECTO].supabase.co:5432/postgres" -ForegroundColor Gray
Write-Host ""

Write-Host "2. NEXT_PUBLIC_API_URL" -ForegroundColor Yellow
Write-Host "   Configurar DESPUÉS del primer deploy" -ForegroundColor Gray
Write-Host "   Formato: https://tu-sitio.netlify.app" -ForegroundColor Gray
Write-Host ""

Write-Host "3. ADMIN_PASSWORD" -ForegroundColor Yellow
Write-Host "   Elige una contraseña segura" -ForegroundColor Gray
Write-Host "   Ejemplo: MiPasswordSegura2024!" -ForegroundColor Gray
Write-Host ""

Write-Host "4. ADMIN_SESSION_TOKEN" -ForegroundColor Yellow
Write-Host "   Valor generado arriba ↑" -ForegroundColor Green
Write-Host ""

Write-Host "5. NODE_ENV" -ForegroundColor Yellow
Write-Host "   Valor: production" -ForegroundColor Gray
Write-Host "   (Netlify lo configura automáticamente)" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  OPCIONALES (Solo si usas Stripe):" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "6. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" -ForegroundColor Yellow
Write-Host "   Obtener de: Stripe → Developers → API keys → Publishable key" -ForegroundColor Gray
Write-Host ""

Write-Host "7. STRIPE_SECRET_KEY" -ForegroundColor Yellow
Write-Host "   Obtener de: Stripe → Developers → API keys → Secret key" -ForegroundColor Gray
Write-Host ""

Write-Host "8. STRIPE_WEBHOOK_SECRET" -ForegroundColor Yellow
Write-Host "   Configurar DESPUÉS del deploy inicial" -ForegroundColor Gray
Write-Host "   Obtener de: Stripe → Developers → Webhooks" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cómo configurarlas en Netlify:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ve a: https://app.netlify.com" -ForegroundColor White
Write-Host "2. Selecciona tu sitio" -ForegroundColor White
Write-Host "3. Site settings → Environment variables" -ForegroundColor White
Write-Host "4. Add a variable para cada una" -ForegroundColor White
Write-Host "5. Copia los valores de arriba" -ForegroundColor White
Write-Host ""

Write-Host "Para más detalles, lee: VARIABLES_NETLIFY.md" -ForegroundColor Cyan
Write-Host ""

pause
