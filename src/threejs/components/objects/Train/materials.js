import * as THREE from "three";

export default function createMaterials() {
  const body = new THREE.MeshStandardMaterial({
    color: "firebrick",
    flatShading: true,
  });

  const detail = new THREE.MeshStandardMaterial({
    color: "darkslategray",
    flatShading: true,
  });

  return { body, detail };
}
