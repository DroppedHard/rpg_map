import * as THREE from "three";

// Clips to mitigate position change during walking stop and start animation. Should be done better...
let customClips = {
  startWalking: new THREE.AnimationClip("startWalking-pos", 3, [
    new THREE.VectorKeyframeTrack(
      ".position",
      [0, 1, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, -1.6]
    ),
  ]),
  stopWalking: new THREE.AnimationClip("stopWalking-pos", 3.04, [
    new THREE.VectorKeyframeTrack(
      ".position",
      [0, 1, 3.04],
      [0, 0, -1, 0, 0, -1, 0, 0, -1]
    ),
  ]),
};

export default class AjCharacter extends THREE.Group {
  constructor(data) {
    super();

    this.model = data.scene.children[0];
    // get animations from given data - hardcoded for now.
    this.animations = {
      breathingIdle: data.animations[0],
      brooklynUprock: data.animations[1],
      flair: data.animations[2],
      sillyDancing: data.animations[3],
      startWalking: data.animations[4],
      stopWalking: data.animations[5],
      TPose: data.animations[6],
      walking: data.animations[8],
    };

    // mixer creation and action creations from clips from given data.
    this.mixer = new THREE.AnimationMixer(this.model);
    this.actions = {
      breathingIdle: this.mixer.clipAction(data.animations[0]),
      brooklynUprock: this.mixer.clipAction(data.animations[1]),
      flair: this.mixer.clipAction(data.animations[2]),
      sillyDancing: this.mixer.clipAction(data.animations[3]),
      startWalking: this.mixer.clipAction(data.animations[4]),
      stopWalking: this.mixer.clipAction(data.animations[5]),
      TPose: this.mixer.clipAction(data.animations[6]),
      walking: this.mixer.clipAction(data.animations[8]),
    };
    // creating custom actions from custom clips
    this.customActions = {
      startWalking: this.mixer.clipAction(customClips.startWalking),
      stopWalking: this.mixer.clipAction(customClips.stopWalking),
    };

    this.deltaSum = 0;
    this.currentAnimation = "breathingIdle";
    this.switchDuration = 0.5;
    this.actions[this.currentAnimation].play();
    this.add(this.model);
  }
  tick(delta) {
    // This method updates time delta (from Loop class)
    this.deltaSum += delta;
    if (this.animations[this.currentAnimation].duration < this.deltaSum) {
      this.deltaSum = 0;
      if (["startWalking", "walking"].includes(this.currentAnimation)) {
        this.toggleWalking(true); // continue walking
      } else {
        this.toggleWalking(false); // stop walking
      }
    }
    this.mixer.update(delta);
  }
  toggleWalking(state) {
    // This method is responsible for switching between animations.
    const prevAnimation = this.currentAnimation;
    this.currentAnimation = this.getClipName(state);

    // console.log("TOGGLE", prevAnimation, this.currentAnimation);
    if (this.currentAnimation !== prevAnimation) {
      this.deltaSum = 0;
      this.actions[prevAnimation].fadeOut(this.switchDuration);
      Object.values(this.customActions).forEach((customAction) => {
        customAction.stop();
      });
      if (Object.keys(customClips).includes(this.currentAnimation)) {
        // customClips[this.currentAnimation].stop()
        this.customActions[this.currentAnimation].play();
      }
      this.actions[this.currentAnimation]
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(this.switchDuration)
        .play();
    }
  }
  getClipName(start) {
    // returns name of a next played clip. Basically state machine
    if (start) {
      // we need to give walking animation clip
      if (
        !["walking", "startWalking", "stopWalking"].includes(
          this.currentAnimation
        )
      ) {
        return "startWalking";
      }
      return "walking";
    }
    // YIELD STOP ANIMATION
    else {
      if (this.currentAnimation == "stopWalking") {
        // dance when idle for too long
        return "breathingIdle";
      } else if (this.currentAnimation == "breathingIdle") {
        return "sillyDancing";
      } else if (this.currentAnimation == "sillyDancing") {
        return "brooklynUprock";
      } else if (this.currentAnimation == "brooklynUprock") {
        return "flair";
      } else if (this.currentAnimation == "flair") {
        return "breathingIdle";
      }
      return "stopWalking";
    }
  }
  resetToIdle() {
    // Method to stop currently played animation and return to idle breathing
    this.deltaSum = 0;
    Object.values(this.customActions).forEach((customAction) => {
      customAction.stop();
    });
    if (this.currentAnimation != "breathingIdle") {
      this.actions[this.currentAnimation].fadeOut(this.switchDuration);
      this.actions.breathingIdle
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(this.switchDuration)
        .play();
      this.currentAnimation = "breathingIdle";
    }
  }
}
