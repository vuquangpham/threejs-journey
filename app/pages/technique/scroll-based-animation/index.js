import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        THREE.ColorManagement.enabled = false;

        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        /**
         * Objects
         */
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: '#f00'})
        );
        scene.add(cube);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 6;
        scene.add(camera);

        // render
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        const clock = new THREE.Clock();

        // update the frame
        const render = () => {
            const elapsedTime = clock.getElapsedTime();

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