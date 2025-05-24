# Instrucciones para GitHub Pages

## 1. Crea un repositorio de GitHub
- Ve a GitHub.com y crea un nuevo repositorio
- Puedes nombrarlo `juego` o como prefieras

## 2. Inicializa Git en tu proyecto local
```powershell
cd "c:\Users\oscar.delacuesta\Desktop\Datos tratados\python\jueguito"
git init
git add .
git commit -m "Versión inicial del juego"
git remote add origin https://github.com/oscov11/juego.git
git push -u origin main
```

## 3. Configura GitHub Pages
- Ve a la sección "Settings" de tu repositorio
- Navega a "Pages" en el menú lateral
- En la sección "Source", selecciona la rama principal (main o master)
- Haz clic en "Save"

## 4. Tu juego estará disponible en:
https://oscov11.github.io/juego/

## 5. Para actualizaciones futuras
```powershell
# Cuando hagas cambios
git add .
git commit -m "Descripción de los cambios"
git push
```

## 6. Para configurar un dominio personalizado
- Ve a la sección "Settings" > "Pages"
- En "Custom domain", ingresa tu dominio (ej. juego.es)
- Guarda los cambios
- Configura los registros DNS de tu dominio:
  - Crea un registro A para @ que apunte a las IPs de GitHub Pages
  - Crea un registro CNAME para www que apunte a oscov11.github.io
