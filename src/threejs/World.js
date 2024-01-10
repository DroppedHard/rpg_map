import * as THREE from 'three';
import Cube from './objects/cube';
import Resizer from './Resizer';

export default class World {
    sceneObjects = {}
    constructor() { // setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);   // when I configure responsive design...
        this.renderer = new THREE.WebGLRenderer();
        const resizer = new Resizer(window, this.renderer, this.camera)
        this.prepareScene()
    }
    prepareScene() {
        this.scene.background = new THREE.Color('skyblue');
    }
    initializeScene() {
        var cube = new Cube();
        this.sceneObjects["cube"] = cube;
        this.scene.add(cube.object);
        this.camera.position.z = 5;
    }
    startAnimation() {
        var cube = this.sceneObjects.cube.object;
        var animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}