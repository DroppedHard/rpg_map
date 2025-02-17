export default class Resizer {
  // This class helps to keep the scene responsive. Nice to have
  constructor(window, renderer, camera) {
    this.setSize(window, renderer, camera);
    window.addEventListener("resize", () => {
      this.setSize(window, renderer, camera);
      this.onResize();
    });
  }
  setSize(window, renderer, camera) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
  onResize() {}
}
