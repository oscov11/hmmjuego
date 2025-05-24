@echo off
REM Script para configurar y desplegar el juego en GitHub Pages
echo ==========================================
echo  DESPLIEGUE A GITHUB PAGES - OSCOV11
echo ==========================================
echo.

REM Comprobar si Git está instalado
git --version > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Git no está instalado o no está disponible en el PATH.
    echo Descarga Git desde https://git-scm.com/download/win e instálalo primero.
    pause
    exit /b 1
)

echo Inicializando repositorio Git local...
git init

echo Añadiendo archivos al repositorio...
git add .

echo Realizando primer commit...
git commit -m "Versión inicial del Visualizador de Personajes Fantasy Low Poly"

echo.
echo ------------------------------
echo Ahora necesitamos conectar este repositorio con GitHub.
echo Sigue estos pasos:
echo.
echo 1. Ve a https://github.com/new
echo 2. Nombre del repositorio: juego
echo 3. Descripción: Visualizador de Personajes Fantasy Low Poly con Three.js
echo 4. Elige "Public" 
echo 5. NO inicialices con README, .gitignore, o licencia
echo 6. Haz clic en "Create repository"
echo.
echo Presiona cualquier tecla cuando hayas creado el repositorio...
pause > nul

echo.
echo Conectando con el repositorio remoto...
git remote add origin https://github.com/oscov11/hmmjuego.git

echo Subiendo código a GitHub...
git push -u origin master

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Si falló la subida, prueba con la rama "main" en lugar de "master":
    echo git push -u origin main
    echo.
    echo También puedes necesitar autenticarte. Si usas token, ejecuta:
    echo git remote set-url origin https://oscov11:TU_TOKEN@github.com/oscov11/hmmjuego.git
    pause
)

echo.
echo ------------------------------
echo Para activar GitHub Pages:
echo.
echo 1. Ve a https://github.com/oscov11/hmmjuego/settings
echo 2. Desplázate hasta la sección "GitHub Pages"
echo 3. En "Source", selecciona "main" (o "master") y "/" (raíz)
echo 4. Haz clic en "Save"
echo.
echo Tu juego estará disponible en: https://oscov11.github.io/juego/
echo (puede tardar unos minutos en estar disponible)
echo ------------------------------
echo.
pause
