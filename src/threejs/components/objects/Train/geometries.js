import * as THREE from "three";

export default function createGeometries() {
  const cabin = new THREE.BoxGeometry(2, 2.25, 1.5);

  const nose = new THREE.CylinderGeometry(0.75, 0.75, 3, 12);

  // will be reusable
  const wheel = new THREE.CylinderGeometry(0.4, 0.4, 1.75, 16);

  const chimney = new THREE.CylinderGeometry(0.3, 0.1, 0.5);

  return {
    cabin,
    nose,
    wheel,
    chimney,
  };
}
