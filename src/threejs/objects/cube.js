import * as THREE from 'three';

export default class Cube {
    constructor(x, y, z) {
        this.geometry = new THREE.BoxGeometry(x, y, z);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.object = new THREE.Mesh(this.geometry, this.material);
    }
}