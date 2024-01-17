import * as THREE from 'three';

export default class Cube {
    materialSpec = {
        color: 'purple'
    }
    constructor(x, y, z) {
        this.geometry = new THREE.BoxGeometry(x, y, z);
        this.material = new THREE.MeshStandardMaterial(this.materialSpec);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    tick(delta) {
        const rotationPerSecond = THREE.MathUtils.degToRad(90)

        this.mesh.rotation.x += rotationPerSecond * delta
        this.mesh.rotation.y += rotationPerSecond * delta
        // this.mesh.rotation.z += rotationPerSecond * delta
    }
}