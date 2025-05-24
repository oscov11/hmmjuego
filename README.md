# Visualizador de Personajes Fantasy Low Poly

![Visualizador de Personajes Fantasy](https://via.placeholder.com/800x400?text=Visualizador+de+Personajes+Fantasy)

Este proyecto es un visualizador interactivo de personajes de fantasía medieval en estilo Low Poly, creado con HTML, CSS y Three.js. Permite construir y personalizar personajes combinando diferentes razas, clases y equipamiento.

## 🎮 [Prueba el visualizador aquí](https://oscov11.github.io/hmmjuego/)


## Instrucciones de Despliegue

### Despliegue en analisisdatos.blog

Para desplegar el proyecto en el sitio web analisisdatos.blog/juego, puedes usar uno de estos métodos:

#### Método 1: Script PowerShell Simple

1. Abre PowerShell en Windows
2. Navega al directorio del proyecto
3. Ejecuta el script de despliegue simple:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy_simple.ps1
```

#### Método 2: Script Batch con PSFTP (PuTTY)

1. Asegúrate de tener PuTTY instalado (incluye psftp.exe)
2. Haz doble clic en `deploy_sftp.bat` o ejecútalo desde CMD

#### Método 3: Script WinSCP (requiere instalación)

1. Instala WinSCP desde https://winscp.net/
2. Ejecuta el script avanzado:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy_winscp.ps1
```

Todos los métodos:
- Se conectarán al servidor SFTP con las credenciales configuradas
- Crearán una carpeta "juego" en public_html si no existe
- Subirán los archivos necesarios para el proyecto
- El juego estará disponible en https://analisisdatos.blog/juego/

#### Alternativa: GitHub Pages

También puedes desplegar usando GitHub Pages. Consulta el archivo `GITHUB_PAGES_DEPLOY.md` para más detalles.

### Prueba Local

Para probar el proyecto localmente:

1. Abre una terminal y navega al directorio del proyecto
2. Ejecuta el servidor Python:

```
python server.py
```

O simplemente haz doble clic en `iniciar_servidor.bat`

3. Abre un navegador y accede a: http://localhost:8000

## Estructura del Proyecto

```
jueguito/
├── index.html              # Página principal del visualizador
├── models/                 # Modelos 3D en formato PLY
│   ├── races/              # Modelos base para cada raza
│   │   ├── human/          # Humanos
│   │   ├── elf/            # Elfos
│   │   ├── orc/            # Orcos
│   │   └── undead/         # No muertos
│   ├── classes/            # Modificadores específicos de clase
│   │   ├── warrior/        # Guerrero
│   │   ├── mage/           # Mago
│   │   └── archer/         # Arquero
│   └── items/              # Objetos equipables
│       ├── weapons/        # Armas específicas para cada clase
│       ├── armor/          # Armaduras específicas para cada clase
│       └── accessories/    # Accesorios específicos para cada raza
├── lib/                    # Bibliotecas de terceros
│   ├── three.min.js        # Three.js (versión minificada)
│   ├── OrbitControls.js    # Controles de órbita para Three.js
│   └── GLTFLoader.js       # Cargador PLY para Three.js
├── public/                 # Recursos estáticos
│   └── css/                # Estilos CSS
│       └── styles.css      # Estilos principales
└── src/                    # Código fuente JavaScript
    ├── config.js           # Configuración y rutas de recursos
    ├── modelLoader.js      # Clase para cargar modelos 3D
    ├── characterBuilder.js # Clase para construir personajes
    └── main.js             # Script principal de inicialización
```

## Características

- **Selección de Raza**: Humano, Elfo, Orco, No muerto
- **Selección de Clase**: Guerrero, Mago, Arquero
- **Equipamiento personalizable**: Armas, armaduras y accesorios específicos para cada raza y clase
- **Visualización 3D**: Visor interactivo con controles de órbita para rotar, hacer zoom y explorar el modelo
- **Estructura modular**: Fácil de extender con nuevas razas, clases y objetos

## Cómo Usar

1. Abre el archivo `index.html` en un navegador web moderno
2. Utiliza los selectores para elegir una raza, clase y equipamiento
3. El modelo 3D se actualizará automáticamente con tus selecciones
4. Usa el ratón para interactuar con el modelo:
   - Clic y arrastrar para rotar
   - Rueda del ratón para hacer zoom
   - Clic derecho y arrastrar para mover el modelo

## Cómo Añadir Nuevos Elementos

### Añadir una nueva raza

1. Crea una carpeta con el nombre de la raza dentro de `models/races/`
2. Añade un modelo base `nombre_raza_base.ply`
3. Actualiza `config.js` para incluir la nueva raza

### Añadir una nueva clase

1. Crea una carpeta con el nombre de la clase dentro de `models/classes/`
2. Añade los modelos de postura y slots específicos
3. Actualiza `config.js` para incluir la nueva clase

### Añadir nuevos objetos

1. Coloca los nuevos modelos PLY en las carpetas correspondientes:
   - Armas: `models/items/weapons/clase/`
   - Armaduras: `models/items/armor/clase/`
   - Accesorios: `models/items/accessories/raza/`
2. Actualiza `config.js` para incluir los nuevos objetos

## Tecnologías Utilizadas

- **HTML5** - Estructura de la página
- **CSS3** - Estilos y diseño responsivo
- **JavaScript** - Lógica de la aplicación
- **Three.js** - Biblioteca 3D para WebGL
- **Formato PLY** - Para los modelos 3D de bajo poligonaje

## Requisitos Técnicos

- Navegador web moderno con soporte WebGL (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado

## Notas de Desarrollo

Este proyecto está diseñado como un visualizador base que puede expandirse. Los modelos PLY de ejemplo incluidos son simples para demostrar la estructura. En un proyecto real, estos modelos deberían reemplazarse con modelos 3D detallados y diseñados profesionalmente.

## Próximos Pasos

- Implementar animaciones básicas para los personajes
- Añadir opciones de color para personalizar los modelos
- Crear un sistema de guardado y carga de personajes
- Exportar los modelos personalizados como archivos PLY o glTF
