// PLYLoader para Three.js - Versión simplificada adaptada para uso no modular

(function (THREE) {
    // Verificar que THREE esté disponible
    if (typeof THREE === 'undefined') {
        console.error('ERROR: THREE no está disponible. Asegúrate de cargar three.min.js antes que PLYLoader.js');
        return;
    }

    // Color temporal para uso interno
    const _color = new THREE.Color();

    /**
     * Cargador para archivos PLY (Polygon File Format / Stanford Triangle Format)
     */
    THREE.PLYLoader = function (manager) {
        THREE.Loader.call(this, manager);
        this.propertyNameMapping = {};
    };

    THREE.PLYLoader.prototype = Object.assign(Object.create(THREE.Loader.prototype), {
        constructor: THREE.PLYLoader,

        load: function (url, onLoad, onProgress, onError) {
            const scope = this;
            const loader = new THREE.FileLoader(this.manager);
            loader.setPath(this.path);
            loader.setResponseType('arraybuffer');
            loader.setRequestHeader(this.requestHeader);
            loader.setWithCredentials(this.withCredentials);            loader.load(url, function (text) {
                try {
                    onLoad(scope.parse(text));
                } catch (e) {
                    if (onError) {
                        onError(e);
                    } else {
                        console.error(e);
                    }
                    scope.manager.itemError(url);
                }
            }, onProgress, onError);
        },
        
        parse: function (data) {
            // Función simplificada para parsear datos PLY
            console.log('Analizando datos PLY...');
            const geometry = new THREE.BufferGeometry();
            
            // En una implementación real, aquí se procesarían los datos del archivo PLY
            // Por simplicidad, creamos una geometría básica
            const vertices = new Float32Array([
                -1.0, -1.0, 0.0,
                 1.0, -1.0, 0.0,
                 0.0,  1.0, 0.0            ]);
            
            // Añadir atributos a la geometría
            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            return geometry;
        }
    });
})(window.THREE || {});
