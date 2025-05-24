// Clase para cargar modelos .ply
class ModelLoader {
    constructor() {
        // Utilizamos PLYLoader de Three.js para cargar archivos .ply
        this.plyLoader = new THREE.PLYLoader();
        
        // Almacenamiento caché para modelos ya cargados
        this.modelCache = {};
    }

    /**
     * Carga un modelo PLY y lo convierte en una malla de Three.js
     * @param {string} path - Ruta al archivo PLY
     * @param {object} materialOptions - Opciones para el material
     * @returns {Promise<THREE.Mesh>} - Promesa que resuelve a la malla cargada
     */
    loadModel(path, materialOptions = {}) {
        // Si el modelo ya está en caché, devolvemos una copia
        if (this.modelCache[path]) {
            return Promise.resolve(this.cloneModel(this.modelCache[path]));
        }

        return new Promise((resolve, reject) => {
            this.plyLoader.load(
                path,
                // Callback de éxito
                (geometry) => {
                    // Calcular normales si no existen
                    geometry.computeVertexNormals();
                    
                    // Crear material por defecto
                    const defaultMaterial = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        flatShading: false,
                        ...materialOptions
                    });
                    
                    // Crear la malla
                    const mesh = new THREE.Mesh(geometry, defaultMaterial);
                    
                    // Guardar en caché
                    this.modelCache[path] = mesh;
                    
                    // Devolver una copia
                    resolve(this.cloneModel(mesh));
                },
                // Callback de progreso
                (xhr) => {
                    console.log(`${path}: ${(xhr.loaded / xhr.total * 100).toFixed(0)}% cargado`);
                },
                // Callback de error
                (error) => {
                    console.error('Error cargando modelo PLY:', error);
                    reject(error);
                }
            );
        });
    }
    
    /**
     * Clona un modelo para evitar conflictos de referencia
     * @param {THREE.Mesh} model - Modelo a clonar
     * @returns {THREE.Mesh} - Modelo clonado
     */
    cloneModel(model) {
        const clonedMesh = new THREE.Mesh(
            model.geometry,
            model.material.clone()
        );
        
        clonedMesh.position.copy(model.position);
        clonedMesh.rotation.copy(model.rotation);
        clonedMesh.scale.copy(model.scale);
        
        return clonedMesh;
    }
    
    /**
     * Aplica un color al material de una malla
     * @param {THREE.Mesh} mesh - Malla a colorear
     * @param {number} color - Color en formato hexadecimal
     */
    setModelColor(mesh, color) {
        if (mesh && mesh.material) {
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(mat => {
                    mat.color.set(color);
                });
            } else {
                mesh.material.color.set(color);
            }
        }
    }
}
