import * as THREE from 'three';

export default class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
  }

  get entity() {
    return this.camera;
  }
}
