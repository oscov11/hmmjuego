# Script para desplegar a GitHub Pages
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   DESPLIEGUE A GITHUB PAGES - OSCOV11            " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "Git detectado: $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "Error: Git no está instalado o no está disponible en el PATH." -ForegroundColor Red
    Write-Host "Descarga Git desde https://git-scm.com/download/win e instálalo primero." -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit
}

# Inicializar repositorio Git
Write-Host "Inicializando repositorio Git local..." -ForegroundColor Yellow
git init

# Añadir archivos al repositorio
Write-Host "Añadiendo archivos al repositorio..." -ForegroundColor Yellow
git add .

# Realizar primer commit
Write-Host "Realizando primer commit..." -ForegroundColor Yellow
git commit -m "Versión inicial del Visualizador de Personajes Fantasy Low Poly"

# Instrucciones para crear repositorio en GitHub
Write-Host "`n--------------------------------------------------------------" -ForegroundColor White
Write-Host "Ahora necesitamos conectar este repositorio con GitHub." -ForegroundColor White
Write-Host "Sigue estos pasos:" -ForegroundColor White
Write-Host "1. Ve a https://github.com/new" -ForegroundColor White
Write-Host "2. Nombre del repositorio: juego" -ForegroundColor White
Write-Host "3. Descripción: Visualizador de Personajes Fantasy Low Poly con Three.js" -ForegroundColor White
Write-Host "4. Elige 'Public'" -ForegroundColor White
Write-Host "5. NO inicialices con README, .gitignore, o licencia" -ForegroundColor White
Write-Host "6. Haz clic en 'Create repository'" -ForegroundColor White
Write-Host "--------------------------------------------------------------`n" -ForegroundColor White

Read-Host "Presiona Enter cuando hayas creado el repositorio"

# Conectar con repositorio remoto
Write-Host "`nConectando con el repositorio remoto..." -ForegroundColor Yellow
git remote add origin https://github.com/oscov11/hmmjuego.git

# Subir código a GitHub
Write-Host "Subiendo código a GitHub..." -ForegroundColor Yellow

try {
    # Intentar con rama master primero
    git push -u origin master
}
catch {
    Write-Host "`nError al subir a la rama 'master'. Intentando con 'main'..." -ForegroundColor Yellow
    try {
        git branch -m master main
        git push -u origin main
    }
    catch {
        Write-Host "`nError al subir el código. Es posible que necesites autenticarte." -ForegroundColor Red
        Write-Host "Si usas token de acceso personal, configura la URL remota con:" -ForegroundColor Yellow
        Write-Host "git remote set-url origin https://oscov11:TU_TOKEN@github.com/oscov11/hmmjuego.git" -ForegroundColor Yellow
        Write-Host "`nLuego ejecuta:" -ForegroundColor Yellow
        Write-Host "git push -u origin main" -ForegroundColor Yellow
    }
}

# Instrucciones para activar GitHub Pages
Write-Host "`n--------------------------------------------------------------" -ForegroundColor White
Write-Host "Para activar GitHub Pages:" -ForegroundColor White
Write-Host "1. Ve a https://github.com/oscov11/hmmjuego/settings" -ForegroundColor White
Write-Host "2. En el menú lateral, haz clic en 'Pages'" -ForegroundColor White
Write-Host "3. En 'Source', selecciona la rama 'main' (o 'master') y '/' (raíz)" -ForegroundColor White
Write-Host "4. Haz clic en 'Save'" -ForegroundColor White
Write-Host "`nTu juego estará disponible en: https://oscov11.github.io/juego/" -ForegroundColor Green
Write-Host "(puede tardar unos minutos en estar disponible)" -ForegroundColor Yellow
Write-Host "--------------------------------------------------------------" -ForegroundColor White

Read-Host "`nPresiona Enter para finalizar"
