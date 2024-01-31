import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

// shaders
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// LIL Gui
import GUI from "lil-gui";

export default class {
  constructor({ element }) {
    this.element = element;
    this.init();
  }

  init() {
    // canvas
    const canvas = document.querySelector("canvas#webgl");

    // scene
    const scene = new THREE.Scene();

    // debug GUI
    const gui = new GUI();

    /**
     * Objects
     */

    // water geometry
    const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128);

    // material
    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    // mesh
    const mesh = new THREE.Mesh(waterGeometry, waterMaterial);
    mesh.rotation.x = -Math.PI * 0.5;
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 2;
    camera.position.y = 1.5;
    scene.add(camera);

    // controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // render
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const clock = new THREE.Clock();

    // update the frame
    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      // update the controls
      controls.update();

      // render
      renderer.render(scene, camera);

      // call on the next frame
      window.requestAnimationFrame(render);
    };
    render();

    // handle resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // update the camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // update the render
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  // for destroy this script when navigating between each page
  destroy() {
    console.log("destroyed", this);
  }
}
