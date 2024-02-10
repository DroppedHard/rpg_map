import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AjCharacter from "./AjCharacter";

async function loadAj() {
  const loader = new GLTFLoader();

  const ajData = await loader.loadAsync(
    "/assets/models/aj-idle-walking-dancing-2.glb"
  );
  const aj = new AjCharacter(ajData);
  return { aj };
}

export { loadAj };
