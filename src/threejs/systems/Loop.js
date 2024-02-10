import * as THREE from "three";

const clock = new THREE.Clock();

export default class Loop {
  // This class is responsible for updating each observable object based on a calculated delta.
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }
  tick() {
    const delta = clock.getDelta();
    this.updatables.forEach((el) => el.tick(delta));
  }
}
