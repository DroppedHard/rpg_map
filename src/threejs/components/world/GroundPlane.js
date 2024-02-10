import * as THREE from "three";

let textureRepeat = 50;

export async function loadGrass(fieldSize) {
  // In this function I tried to create a beautiful grass texture, but something went wrong...
  const loader = new THREE.TextureLoader();
  const [
    grassBaseColor,
    grassNormalMap,
    grassHeightMap,
    grassRoughnessMap,
    grassAmbientOcclusionMap,
    grassMetallnessMap,
  ] = await Promise.all([
    loader.load("/assets/textures/grass/coast_sand_rocks_02_diff_4k.jpg"),
    loader.load("/assets/textures/grass/coast_sand_rocks_02_nor_gl_4k.jpg"),
    loader.load("/assets/textures/grass/coast_sand_rocks_02_disp_4k.png"),
    loader.load("/assets/textures/grass/coast_sand_rocks_02_rough_4k.jpg"),
    loader.load("/assets/textures/grass/coast_sand_rocks_02_ao_4k.jpg"),
    loader.load("/assets/textures/grass/coast_sand_rocks_02_arm_4k.jpg"),
  ]).then((data) => {
    data.forEach((el) => {
      el.wrapS = THREE.RepeatWrapping;
      el.wrapT = THREE.RepeatWrapping;
      el.repeat.set(textureRepeat, textureRepeat);
    });
    return data;
  });
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(fieldSize, fieldSize),
    new THREE.MeshStandardMaterial({
      map: grassBaseColor,
      normalMap: grassNormalMap,
      displacementMap: grassHeightMap,
      displacementScale: 0,
      roughnessMap: grassRoughnessMap,
      roughness: 0.5,
      aoMap: grassAmbientOcclusionMap,
      metalnessMap: grassMetallnessMap,
      metalness: 0.5,
    })
  );
  grass.geometry.attributes.uv2 = grass.geometry.attributes.uv;
  grass.rotateX(THREE.MathUtils.degToRad(-90));
  return { grass };
}
