import * as THREE from 'three';
import Cube from './components/objects/cube';
import Resizer from './Resizer';
import createLights from './components/components/Light';
import Loop from './systems/Loop';

export default class World {
    constructor() { // setup
        this.setupScene()
        this.setupCamera()
        this.setupRenderer()
        this.resizer = new Resizer(window, this.renderer, this.camera)
        this.loop = new Loop(this.camera, this.scene, this.renderer)
        this.prepareScene()
        this.startAnimation()
    }
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('skyblue');
    }
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);   // when I configure responsive design...
        this.camera.position.z = 5;
    }
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.physicallyCorrectLights = true;
    }
    prepareScene() {
        const cube = new Cube();
        this.loop.updatables.push(cube);
        
        const light = createLights();
        this.scene.add(light, cube.mesh)
    }
    startAnimation() {
        // var cube = this.sceneObjects.cube.mesh;
        // const animate = () => {
        //     requestAnimationFrame(animate);
        //     cube.rotation.x += 0.01;
        //     cube.rotation.y += 0.01;
        //     this.render()
        // };
        // animate();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    stop() {
        this.loop.stop()
    }
    start() {
        this.loop.start()
    }
}