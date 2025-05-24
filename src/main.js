// Script principal para inicializar la aplicación y gestionar los eventos de la interfaz

// Variables globales
let scene, camera, renderer, controls;
let modelLoader, characterBuilder;
let canvasContainer;

// Verificar que THREE esté disponible
function checkDependencies() {
    if (typeof THREE === 'undefined') {
        console.error('THREE no está definido. Asegúrate de que three.min.js se haya cargado correctamente.');
        return false;
    }
    return true;
}

// Inicializar Three.js y configurar la escena
function init() {
    // Verificar dependencias
    if (!checkDependencies()) {
        console.error('No se pudo inicializar la aplicación debido a dependencias faltantes.');
        alert('Error al cargar las dependencias necesarias. Consulta la consola para más detalles.');
        return;
    }
    // Configurar el contenedor del canvas
    canvasContainer = document.getElementById('canvas-container');
    
    // Crear la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.renderer.clearColor);
    
    // Configurar la cámara
    const { fov, near, far, position } = CONFIG.camera;
    camera = new THREE.PerspectiveCamera(
        fov, 
        canvasContainer.clientWidth / canvasContainer.clientHeight, 
        near, 
        far
    );
    camera.position.set(position.x, position.y, position.z);
    
    // Configurar el renderizador
    renderer = new THREE.WebGLRenderer({ 
        antialias: CONFIG.renderer.antialias 
    });
    renderer.setPixelRatio(CONFIG.renderer.pixelRatio);
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);
    
    // Añadir OrbitControls para manejar la rotación y zoom
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    
    // Configurar luces
    setupLights();
    
    // Crear base para el personaje
    createFloor();
    
    // Inicializar cargador de modelos
    modelLoader = new ModelLoader();
    
    // Inicializar constructor de personajes
    characterBuilder = new CharacterBuilder(scene, modelLoader);
    
    // Configurar eventos de cambio en los selectores
    setupEventListeners();
    
    // Iniciar la primera carga del personaje con valores por defecto
    const raceSelect = document.getElementById('race');
    const classSelect = document.getElementById('class');
    
    characterBuilder.updateSelects(raceSelect.value, classSelect.value);
    loadInitialCharacter();
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', onWindowResize);
    
    // Iniciar el bucle de animación
    animate();
}

// Configurar las luces de la escena
function setupLights() {
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(
        CONFIG.lights.ambient.color,
        CONFIG.lights.ambient.intensity
    );
    scene.add(ambientLight);
    
    // Luz direccional
    const dirLight = new THREE.DirectionalLight(
        CONFIG.lights.directional.color,
        CONFIG.lights.directional.intensity
    );
    dirLight.position.set(
        CONFIG.lights.directional.position.x,
        CONFIG.lights.directional.position.y,
        CONFIG.lights.directional.position.z
    );
    scene.add(dirLight);
    
    // Luz puntual
    const pointLight = new THREE.PointLight(
        CONFIG.lights.point.color,
        CONFIG.lights.point.intensity,
        CONFIG.lights.point.distance
    );
    pointLight.position.set(
        CONFIG.lights.point.position.x,
        CONFIG.lights.point.position.y,
        CONFIG.lights.point.position.z
    );
    scene.add(pointLight);
}

// Crear una base simple para el personaje
function createFloor() {
    const geometry = new THREE.CircleGeometry(3, 32);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
}

// Configurar los eventos para los selectores de la UI
function setupEventListeners() {
    const raceSelect = document.getElementById('race');
    const classSelect = document.getElementById('class');
    const weaponSelect = document.getElementById('weapon');
    const armorSelect = document.getElementById('armor');
    const accessorySelect = document.getElementById('accessory');
    
    // Cuando cambia la raza o la clase, actualizar las opciones disponibles
    raceSelect.addEventListener('change', function() {
        characterBuilder.updateSelects(raceSelect.value, classSelect.value);
        updateCharacter();
    });
    
    classSelect.addEventListener('change', function() {
        characterBuilder.updateSelects(raceSelect.value, classSelect.value);
        updateCharacter();
    });
    
    // Para los demás selectores, solo actualizar el personaje
    weaponSelect.addEventListener('change', updateCharacter);
    armorSelect.addEventListener('change', updateCharacter);
    accessorySelect.addEventListener('change', updateCharacter);
}

// Cargar el personaje inicial con valores por defecto
async function loadInitialCharacter() {
    const race = document.getElementById('race').value;
    const characterClass = document.getElementById('class').value;
    
    if (race && characterClass) {
        try {
            await characterBuilder.buildFullCharacter(race, characterClass);
            console.log('Personaje inicial cargado con éxito');
        } catch (error) {
            console.error('Error al cargar el personaje inicial:', error);
        }
    }
}

// Actualizar el personaje con las selecciones actuales
async function updateCharacter() {
    const race = document.getElementById('race').value;
    const characterClass = document.getElementById('class').value;
    const weapon = document.getElementById('weapon').value;
    const armor = document.getElementById('armor').value;
    const accessory = document.getElementById('accessory').value;
    
    try {
        await characterBuilder.buildFullCharacter(race, characterClass, weapon, armor, accessory);
        console.log('Personaje actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el personaje:', error);
    }
}

// Manejar redimensionamiento de la ventana
function onWindowResize() {
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

// Función de animación (bucle de renderizado)
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
