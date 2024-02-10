import * as THREE from "three";
import MeshGroup from "./components/objects/MeshGroup";
import Resizer from "./systems/Resizer";
import createLights from "./components/overworld/Light";
import Loop from "./systems/Loop";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Train from "./components/objects/Train/Train";
import { loadAj } from "./components/characters/AjLoader";
import { loadGrass } from "./components/world/GroundPlane";

let fieldSize = 200;
let keyboardControls = {
  w: false,
  a: false,
  s: false,
  d: false,
};
let facing = 0; // 0 - North, 1 - East (right), 2 - South, 3 - West (left)
let mainCharacter = undefined;

export default class World {
  // This is main class, from which everything starts.
  constructor() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.resizer = new Resizer(window, this.renderer, this.camera);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.createControls();
    this.prepareSceneContent();
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }
  async init() {
    const { grass } = await loadGrass(fieldSize);
    this.scene.add(grass);

    const { aj } = await loadAj();
    mainCharacter = aj;
    this.loop.updatables.push(aj);
    this.scene.add(aj);
  }
  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("skyblue");
  }
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 3, 5);
  }
  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.physicallyCorrectLights = true;
  }
  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.tick = () => this.controls.update();
    this.loop.updatables.push(this.controls);
    this.controls.addEventListener("change", () => this.render());
  }
  prepareSceneContent() {
    const train = new Train();
    train.position.set(5, 0, 0);
    train.rotateY(THREE.MathUtils.degToRad(90));
    this.loop.updatables.push(train);

    // const axesHelper = new THREE.AxesHelper( 3 );

    const gridHelper = new THREE.GridHelper(fieldSize, fieldSize);

    const { backlight, frontlight, ambientLight, hemisphereLight } =
      createLights();
    this.scene.add(
      backlight,
      frontlight,
      ambientLight,
      hemisphereLight,
      train,
      gridHelper
    );
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  stop() {
    this.loop.stop();
  }
  start() {
    this.loop.start();
  }
  handleKeyDown(event) {
    if (Object.keys(keyboardControls).includes(event.key.toLowerCase())) {
      if (!keyboardControls[event.key.toLowerCase()]) {
        keyboardControls[event.key.toLowerCase()] = true;
        switch (event.key.toLowerCase()) {
          case "w":
            mainCharacter.toggleWalking(true);
            break;
          case "s":
            mainCharacter.rotateY(Math.PI);
            facing = (facing + 2) % 4;
            mainCharacter.resetToIdle();
            break;
          case "d":
            mainCharacter.rotateY(-Math.PI / 2);
            facing = (facing + 1) % 4;
            mainCharacter.resetToIdle();
            break;
          case "a":
            mainCharacter.rotateY(Math.PI / 2);
            facing = facing == 0 ? 3 : (facing - 1) % 4;
            mainCharacter.resetToIdle();
            break;
        }
      }
      if (event.key.toLowerCase() == "w") {
        switch (facing) {
          case 0:
            mainCharacter.position.z += 0.025;
            break;
          case 1:
            mainCharacter.position.x -= 0.025;
            break;
          case 2:
            mainCharacter.position.z -= 0.025;
            break;
          case 3:
            mainCharacter.position.x += 0.025;
            break;
        }
      }
    }
  }
  handleKeyUp(event) {
    if (Object.keys(keyboardControls).includes(event.key.toLowerCase())) {
      if (keyboardControls[event.key.toLowerCase()]) {
        keyboardControls[event.key.toLowerCase()] = false;
        if (event.key.toLowerCase() == "w") {
          mainCharacter.toggleWalking(false);
        }
      }
    }
  }
}
