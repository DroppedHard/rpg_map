import * as THREE from "three";

export default function createLights() {
  const ambientLight = new THREE.AmbientLight("white", 0.5);

  const hemisphereLight = new THREE.HemisphereLight(
    "white", // bright sky color
    "darkslategrey", // dim ground color
    0.2 // intensity
  );

  const backlight = new THREE.DirectionalLight("white", 2);
  backlight.position.set(-5, 2, -5);
  const frontlight = new THREE.DirectionalLight("white", 2);
  frontlight.position.set(5, 2, 5);
  return { backlight, frontlight, ambientLight, hemisphereLight };
}
