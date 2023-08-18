import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

import doorColorTexture from './textures/door/color.jpg';
import doorAlphaTexture from './textures/door/alpha.jpg';
import doorAmbientOcclusionTexture from './textures/door/ambientOcclusion.jpg';
import doorHeightTexture from './textures/door/height.jpg';
import doorNormalTexture from './textures/door/normal.jpg';
import doorMetalnessTexture from './textures/door/metalness.jpg';
import doorRoughnessTexture from './textures/door/roughness.jpg';
import matcapTexture from './textures/matcaps/1.png';
import gradientTexture from './textures/gradients/3.jpg';

export default class{
    constructor({element}){
        this.element = element;
        this.loadTexture();
        this.init();
    }

    loadTexture(){
        const textureLoader = new THREE.TextureLoader();

        this.doorColorTexture = textureLoader.load(doorColorTexture);
        this.doorAlphaTexture = textureLoader.load(doorAlphaTexture);
        this.doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionTexture);
        this.doorHeightTexture = textureLoader.load(doorHeightTexture);
        this.doorNormalTexture = textureLoader.load(doorNormalTexture);
        this.doorMetalnessTexture = textureLoader.load(doorMetalnessTexture);
        this.doorRoughnessTexture = textureLoader.load(doorRoughnessTexture);
        this.matcapTexture = textureLoader.load(matcapTexture);
        this.gradientTexture = textureLoader.load(gradientTexture);
    }

    init(){
        // Start of the code
        THREE.ColorManagement.enabled = false;

        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        // object
        // const material = new THREE.MeshBasicMaterial();
        // material.map = this.doorColorTexture;
        // material.wireframe = true;
        // material.alphaMap = this.doorAlphaTexture;
        // material.transparent = true;

        const material = new THREE.MeshNormalMaterial();
        material.flatShading = true;

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            material
        );
        sphere.position.x = -1.5;

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            material
        );

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.3, 0.2, 16, 32),
            material
        );
        torus.position.x = 1.5;

        scene.add(sphere, plane, torus);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 3;
        scene.add(camera);

        // controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        // render
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // After instantiating the renderer
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        // clock
        const clock = new THREE.Clock();

        // update the frame
        const render = () => {
            const elapsedTime = clock.getElapsedTime();

            // rotate the mesh
            sphere.rotation.y = 0.1 * elapsedTime;
            plane.rotation.y = 0.1 * elapsedTime;
            torus.rotation.y = 0.1 * elapsedTime;

            sphere.rotation.x = 0.15 * elapsedTime;
            plane.rotation.x = 0.15 * elapsedTime;
            torus.rotation.x = 0.15 * elapsedTime;

            // update the controls
            controls.update();

            // render
            renderer.render(scene, camera);

            // call on the next frame
            window.requestAnimationFrame(render);
        };
        render();

        // handle resize
        window.addEventListener('resize', () => {
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
    destroy(){
        console.log('destroyed', this);
    }
}