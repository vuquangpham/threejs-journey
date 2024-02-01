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
    const debugObject = {};

    // color
    debugObject.depthColor = "#247bae";
    debugObject.surfaceColor = "#9bd8ff";

    /**
     * Objects
     */

    // water geometry
    const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128);

    // material
    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,

      uniforms: {
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4.0, 1.5) },

        uTime: { value: 0 },
        uBigWavesSpeed: { value: 0.75 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
      },

      side: THREE.DoubleSide,
    });

    // add to GUI
    gui
      .add(waterMaterial.uniforms.uBigWavesElevation, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uBigWavesElevation");

    // frequency
    gui
      .add(waterMaterial.uniforms.uBigWavesFrequency.value, "x")
      .min(0)
      .max(10)
      .step(0.001)
      .name("uBigWavesFrequencyX");
    gui
      .add(waterMaterial.uniforms.uBigWavesFrequency.value, "y")
      .min(0)
      .max(10)
      .step(0.001)
      .name("uBigWavesFrequencyY");

    // waves speed
    gui
      .add(waterMaterial.uniforms.uBigWavesSpeed, "value")
      .min(0)
      .max(4)
      .step(0.001)
      .name("uBigWavesSpeed");

    // color
    gui
      .addColor(debugObject, "depthColor")
      .name("depthColor")
      .onChange((_) => {
        waterMaterial.uniforms.uDepthColor.value = new THREE.Color(
          debugObject.depthColor
        );
      });
    gui
      .addColor(debugObject, "surfaceColor")
      .name("surfaceColor")
      .onChange((_) => {
        console.log("change");
        waterMaterial.uniforms.uSurfaceColor.value = new THREE.Color(
          debugObject.surfaceColor
        );
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

      // update the time
      waterMaterial.uniforms.uTime.value = elapsedTime;

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
