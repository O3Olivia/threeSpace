import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { KeyController } from './keyController';

export default class ControlModeManager {
  constructor(camera, renderer, scene) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.currentMode = null;
    this.orbitControls = new OrbitControls(camera, renderer.domElement);
    this.pointerLockControls = new PointerLockControls(camera, renderer.domElement);
    this.dragControls = null;
    this.keyController = new KeyController();
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyO') this.setMode('orbit');
      if (event.code === 'KeyP') this.setMode('pointerLock');
      if (event.code === 'KeyD') this.setMode('drag');
    });

    this.pointerLockControls.addEventListener('lock', () => console.log('PointerLock: Locked'));
    this.pointerLockControls.addEventListener('unlock', () => console.log('PointerLock: Unlocked'));
  }

  setMode(mode) {
    // Disable all controls
    this.orbitControls.enabled = false;
    this.pointerLockControls.enabled = false;
    if (this.dragControls) this.dragControls.enabled = false;

    // Enable the selected mode
    switch (mode) {
      case 'orbit':
        this.currentMode = 'orbit';
        this.orbitControls.enabled = true;
        break;
      case 'pointerLock':
        this.currentMode = 'pointerLock';
        this.pointerLockControls.lock();
        break;
      case 'drag':
        this.currentMode = 'drag';
        if (!this.dragControls) {
          this.dragControls = new DragControls([], this.camera, this.renderer.domElement);
          this.dragControls.addEventListener('dragstart', () => this.orbitControls.enabled = false);
          this.dragControls.addEventListener('dragend', () => this.orbitControls.enabled = true);
        }
        this.dragControls.enabled = true;
        break;
    }
  }

  update(delta) {
    if (this.currentMode === 'orbit') {
      this.orbitControls.update();
    } else if (this.currentMode === 'pointerLock') {
      this.handleKeyboardWalk();
    }
  }

  handleKeyboardWalk() {
    const speed = 0.15;
    if (this.keyController.keys['KeyW'] || this.keyController.keys['ArrowUp']) {
      this.pointerLockControls.moveForward(speed);
    }
    if (this.keyController.keys['KeyS'] || this.keyController.keys['ArrowDown']) {
      this.pointerLockControls.moveForward(-speed);
    }
    if (this.keyController.keys['KeyA'] || this.keyController.keys['ArrowLeft']) {
      this.pointerLockControls.moveRight(-speed);
    }
    if (this.keyController.keys['KeyD'] || this.keyController.keys['ArrowRight']) {
      this.pointerLockControls.moveRight(speed);
    }
  }

  setDragObjects(objects) {
    if (this.dragControls) {
      this.dragControls.setObjects(objects);
    }
  }
}