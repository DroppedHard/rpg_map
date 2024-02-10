import * as THREE from "three";
import createMeshes from "./meshes";

const wheelSpeed = THREE.MathUtils.degToRad(45);
const rotationSpeed = THREE.MathUtils.degToRad(30);

export default class Train extends THREE.Group {
  // This class creates an example toy train. Just for funny drifting on a grass.
  constructor() {
    super();
    this.a = 0;
    this.meshes = createMeshes();

    this.add(
      this.meshes.nose,
      this.meshes.cabin,
      this.meshes.chimney,
      this.meshes.smallWheelRear,
      this.meshes.smallWheelCenter,
      this.meshes.smallWheelFront,
      this.meshes.bigWheel
    );
  }
  tick(delta) {
    this.meshes.bigWheel.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelRear.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelCenter.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelFront.rotation.y += wheelSpeed * delta;
    this.a += delta;
    this.position.x = 5 * Math.cos(rotationSpeed * this.a) + 0;
    this.position.z = 5 * Math.sin(rotationSpeed * this.a) + 0;
    this.rotation.reorder("ZXY");
    this.rotateOnAxis(
      new THREE.Vector3(0, 1, 0),
      Math.PI * 2 - rotationSpeed * delta
    );
  }
}
