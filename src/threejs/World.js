import * as THREE from 'three';
import MeshGroup from './components/objects/MeshGroup';
import Resizer from './systems/Resizer';
import createLights from './components/overworld/Light';
import Loop from './systems/Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class World {
    constructor() { // setup
        this.setupScene()
        this.setupCamera()
        this.setupRenderer()
        this.resizer = new Resizer(window, this.renderer, this.camera)
        this.loop = new Loop(this.camera, this.scene, this.renderer)
        this.createControls()
        this.prepareSceneContent()
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
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.physicallyCorrectLights = true;
    }
    createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.tick = () => this.controls.update()
        this.loop.updatables.push(this.controls)
        this.controls.addEventListener('change', () => this.render())
        // this.controls.autoRotate = true
        // this.controls.autoRotateSpeed = 1
    }
    prepareSceneContent() {
        const group = new MeshGroup();
        this.loop.updatables.push(group);

        const {light, ambientLight} = createLights();
        this.scene.add(light, ambientLight, group.getMesh())
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