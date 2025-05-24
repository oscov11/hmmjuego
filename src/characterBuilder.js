// Clase para construir y gestionar personajes
class CharacterBuilder {
    constructor(scene, modelLoader) {
        this.scene = scene;
        this.modelLoader = modelLoader;
        this.character = new THREE.Group(); // Grupo para contener todas las partes del personaje
        this.currentParts = {
            race: null,
            class: null,
            weapon: null,
            armor: null,
            accessory: null
        };
        
        // Añadir el grupo de personaje a la escena
        this.scene.add(this.character);
    }
    
    /**
     * Limpia el personaje actual
     */
    clearCharacter() {
        while(this.character.children.length > 0) {
            const child = this.character.children[0];
            this.character.remove(child);
        }
        
        // Resetear partes actuales
        this.currentParts = {
            race: null,
            class: null,
            weapon: null,
            armor: null,
            accessory: null
        };
    }
    
    /**
     * Establece la raza del personaje
     * @param {string} race - Nombre de la raza
     * @returns {Promise} - Promesa que resuelve cuando se carga el modelo
     */
    async setRace(race) {
        // Si ya hay una raza, la quitamos primero
        if (this.currentParts.race) {
            const raceIndex = this.character.children.indexOf(this.currentParts.race);
            if (raceIndex !== -1) {
                this.character.remove(this.currentParts.race);
            }
        }
        
        const racePath = CONFIG.modelPaths.races[race].basePath;
        
        try {
            const raceMesh = await this.modelLoader.loadModel(racePath);
            this.character.add(raceMesh);
            this.currentParts.race = raceMesh;
            return raceMesh;
        } catch (error) {
            console.error(`Error al cargar la raza ${race}:`, error);
            return null;
        }
    }
    
    /**
     * Establece la clase del personaje
     * @param {string} characterClass - Nombre de la clase
     * @returns {Promise} - Promesa que resuelve cuando se carga el modelo
     */
    async setClass(characterClass) {
        // Si ya hay una clase, la quitamos primero
        if (this.currentParts.class) {
            const classIndex = this.character.children.indexOf(this.currentParts.class);
            if (classIndex !== -1) {
                this.character.remove(this.currentParts.class);
            }
        }
        
        const classPath = CONFIG.modelPaths.classes[characterClass].basePath + 
                         CONFIG.modelPaths.classes[characterClass].items[0];
        
        try {
            const classMesh = await this.modelLoader.loadModel(classPath);
            this.character.add(classMesh);
            this.currentParts.class = classMesh;
            return classMesh;
        } catch (error) {
            console.error(`Error al cargar la clase ${characterClass}:`, error);
            return null;
        }
    }
    
    /**
     * Establece el arma del personaje
     * @param {string} weaponName - Nombre del arma
     * @param {string} characterClass - Clase actual del personaje
     * @returns {Promise} - Promesa que resuelve cuando se carga el modelo
     */
    async setWeapon(weaponName, characterClass) {
        // Si ya hay un arma, la quitamos primero
        if (this.currentParts.weapon) {
            const weaponIndex = this.character.children.indexOf(this.currentParts.weapon);
            if (weaponIndex !== -1) {
                this.character.remove(this.currentParts.weapon);
            }
        }
        
        const weaponPath = `./models/items/weapons/${characterClass}/${weaponName}`;
        
        try {
            const weaponMesh = await this.modelLoader.loadModel(weaponPath);
            this.character.add(weaponMesh);
            this.currentParts.weapon = weaponMesh;
            return weaponMesh;
        } catch (error) {
            console.error(`Error al cargar el arma ${weaponName}:`, error);
            return null;
        }
    }
    
    /**
     * Establece la armadura del personaje
     * @param {string} armorName - Nombre de la armadura
     * @param {string} characterClass - Clase actual del personaje
     * @returns {Promise} - Promesa que resuelve cuando se carga el modelo
     */
    async setArmor(armorName, characterClass) {
        // Si ya hay una armadura, la quitamos primero
        if (this.currentParts.armor) {
            const armorIndex = this.character.children.indexOf(this.currentParts.armor);
            if (armorIndex !== -1) {
                this.character.remove(this.currentParts.armor);
            }
        }
        
        const armorPath = `./models/items/armor/${characterClass}/${armorName}`;
        
        try {
            const armorMesh = await this.modelLoader.loadModel(armorPath);
            this.character.add(armorMesh);
            this.currentParts.armor = armorMesh;
            return armorMesh;
        } catch (error) {
            console.error(`Error al cargar la armadura ${armorName}:`, error);
            return null;
        }
    }
    
    /**
     * Establece el accesorio del personaje
     * @param {string} accessoryName - Nombre del accesorio
     * @param {string} race - Raza actual del personaje
     * @returns {Promise} - Promesa que resuelve cuando se carga el modelo
     */
    async setAccessory(accessoryName, race) {
        // Si ya hay un accesorio, lo quitamos primero
        if (this.currentParts.accessory) {
            const accessoryIndex = this.character.children.indexOf(this.currentParts.accessory);
            if (accessoryIndex !== -1) {
                this.character.remove(this.currentParts.accessory);
            }
        }
        
        const accessoryPath = `./models/items/accessories/${race}/${accessoryName}`;
        
        try {
            const accessoryMesh = await this.modelLoader.loadModel(accessoryPath);
            this.character.add(accessoryMesh);
            this.currentParts.accessory = accessoryMesh;
            return accessoryMesh;
        } catch (error) {
            console.error(`Error al cargar el accesorio ${accessoryName}:`, error);
            return null;
        }
    }
    
    /**
     * Actualiza todas las opciones de selección en la UI
     * @param {string} race - Raza seleccionada
     * @param {string} characterClass - Clase seleccionada
     */
    updateSelects(race, characterClass) {
        // Actualiza las opciones de armas
        const weaponSelect = document.getElementById('weapon');
        weaponSelect.innerHTML = '';
        
        if (characterClass && CONFIG.modelPaths.items.weapons[characterClass]) {
            CONFIG.modelPaths.items.weapons[characterClass].forEach(weapon => {
                const option = document.createElement('option');
                option.value = weapon;
                option.textContent = weapon.replace('.ply', '').replace(/_/g, ' ');
                weaponSelect.appendChild(option);
            });
        }
        
        // Actualiza las opciones de armaduras
        const armorSelect = document.getElementById('armor');
        armorSelect.innerHTML = '';
        
        if (characterClass && CONFIG.modelPaths.items.armor[characterClass]) {
            CONFIG.modelPaths.items.armor[characterClass].forEach(armor => {
                const option = document.createElement('option');
                option.value = armor;
                option.textContent = armor.replace('.ply', '').replace(/_/g, ' ');
                armorSelect.appendChild(option);
            });
        }
        
        // Actualiza las opciones de accesorios
        const accessorySelect = document.getElementById('accessory');
        accessorySelect.innerHTML = '';
        
        if (race && CONFIG.modelPaths.items.accessories[race]) {
            CONFIG.modelPaths.items.accessories[race].forEach(accessory => {
                const option = document.createElement('option');
                option.value = accessory;
                option.textContent = accessory.replace('.ply', '').replace(/_/g, ' ');
                accessorySelect.appendChild(option);
            });
        }
    }
    
    /**
     * Crea un personaje completo con todas las partes seleccionadas
     * @param {string} race - Raza seleccionada
     * @param {string} characterClass - Clase seleccionada
     * @param {string} weapon - Arma seleccionada
     * @param {string} armor - Armadura seleccionada
     * @param {string} accessory - Accesorio seleccionado
     */
    async buildFullCharacter(race, characterClass, weapon, armor, accessory) {
        this.clearCharacter();
        
        try {
            await this.setRace(race);
            await this.setClass(characterClass);
            
            if (weapon) {
                await this.setWeapon(weapon, characterClass);
            }
            
            if (armor) {
                await this.setArmor(armor, characterClass);
            }
            
            if (accessory) {
                await this.setAccessory(accessory, race);
            }
            
            // Centrar el personaje
            this.centerCharacter();
            
        } catch (error) {
            console.error('Error al construir el personaje completo:', error);
        }
    }
    
    /**
     * Centra el personaje en la escena
     */
    centerCharacter() {
        // Obtener bounding box del personaje completo
        const bbox = new THREE.Box3().setFromObject(this.character);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        
        // Centrar el modelo en el origen
        this.character.position.x = -center.x;
        this.character.position.y = -center.y + size.y / 2;
        this.character.position.z = -center.z;
    }
}
