// OrbitControls para Three.js - Version simplificada adaptada para uso no modular

(function(THREE) {
    // Verificar que THREE este disponible
    if (typeof THREE === "undefined") {
        console.error("ERROR: THREE no esta disponible. Asegurate de cargar three.min.js antes que OrbitControls.js");
        return;
    }
    
    // OrbitControls
    THREE.OrbitControls = function(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.enabled = true;
        
        // Propiedades ajustables
        this.enableDamping = false;
        this.dampingFactor = 0.05;
        this.minDistance = 0;
        this.maxDistance = Infinity;
        
        // Eventos de simulacion para rotar la camara
        this.update = function() {
            return false;
        };
        
        this.dispose = function() {
            // Limpiar eventos
        };
    };
})(window.THREE || {});
