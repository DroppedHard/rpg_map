import * as THREE from 'three';

export default function createLights() {
    // const ambientLight = new THREE.AmbientLight('white', 0.5);

    const ambientLight = new THREE.HemisphereLight(
        'white', // bright sky color
        'darkslategrey', // dim ground color
        5, // intensity
    );

    const light = new THREE.DirectionalLight('white', 8)
    light.position.set(10, 10, 10)
    return { light, ambientLight }
}