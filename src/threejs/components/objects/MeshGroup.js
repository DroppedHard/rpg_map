import * as THREE from 'three';


export default class MeshGroup {

    createMaterial() {
        // const textureLoader = new THREE.TextureLoader();
        // const texture = textureLoader.load('./assets/textures/uv-test-bw.png')
        // this.material = new THREE.MeshStandardMaterial({map: texture, color: this.materialSpec.color});
    }
    constructor(x, y, z) {
        this.group = new THREE.Group()

        const geometry = new THREE.SphereGeometry(0.25, 16, 16);

        const material = new THREE.MeshStandardMaterial({
            color: 'indigo',
        });

        const protoSphere = new THREE.Mesh(geometry, material);

        // add the sphere to the group
        this.group.add(protoSphere);
        for (let i = 0; i < 1; i += 0.001) {
            const sphere = protoSphere.clone();

            sphere.position.x = Math.cos(2 * Math.PI * i);
            sphere.position.y = Math.sin(2 * Math.PI * i);
            sphere.position.z = -i * 5;
            sphere.scale.multiplyScalar(0.01 + i);

            this.group.add(sphere);
        }

        this.group.scale.multiplyScalar(2);
        // this.geometry = new THREE.BoxGeometry(x, y, z);
        // this.createMaterial()
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    tick(delta) {
        const radiansPerSecond = THREE.MathUtils.degToRad(90);

        this.group.rotation.z += delta * radiansPerSecond
        // const rotationPerSecond = THREE.MathUtils.degToRad(90)

        // this.mesh.rotation.x += rotationPerSecond * delta
        // this.mesh.rotation.y += rotationPerSecond * delta
        // // this.mesh.rotation.z += rotationPerSecond * delta
    }
    getMesh() {
        return this.group
    }
}