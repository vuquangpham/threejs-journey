import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

import vertexGLSL from './vertex.glsl';
import fragmentGLSL from './fragment.glsl';
import GUI from "lil-gui";

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // gui
        const gui = new GUI();

        // scene
        const scene = new THREE.Scene();

        /**
         * Objects
         */
            // geometry
        const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
        console.log(geometry.attributes.uv);

        // material
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexGLSL,
            fragmentShader: fragmentGLSL,
            side: THREE.DoubleSide,
        });

        // mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1.5, 1.5, 1.5);
        scene.add(mesh);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 2;
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