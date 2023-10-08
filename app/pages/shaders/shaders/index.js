import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

import vertexGLSL from './vertex.glsl';
import fragmentGLSL from './fragment.glsl';
import GUI from "lil-gui";

import flag from './mu.jpeg';

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // texture
        const textureLoader = new THREE.TextureLoader();
        const flagTexture = textureLoader.load(flag);
        flagTexture.colorSpace = THREE.SRGBColorSpace;

        // gui
        const gui = new GUI();

        // scene
        const scene = new THREE.Scene();

        /**
         * Objects
         */
            // geometry
        const geometry = new THREE.PlaneGeometry(1, 2 / 3, 64, 64);

        // randoms attributes
        const count = geometry.attributes.position.count;
        const randoms = new Float32Array(count);

        for(let i = 0; i < count; i++){
            randoms[i] = Math.random();
        }

        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

        // material
        const material = new THREE.RawShaderMaterial({
            vertexShader: vertexGLSL,
            fragmentShader: fragmentGLSL,
            side: THREE.DoubleSide,
            // wireframe: true
            uniforms: {
                uFrequency: {value: new THREE.Vector2(10.0, 15.0)},
                uTimeLapse: {value: 0},
                uTexture: {value: flagTexture}
            }
        });

        gui.add(material.uniforms.uFrequency.value, 'x', 0, 50, 0.01);
        gui.add(material.uniforms.uFrequency.value, 'y', 0, 50, 0.01);

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
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        const clock = new THREE.Clock();

        // update the frame
        const render = () => {
            const elapsedTime = clock.getElapsedTime();

            // update
            material.uniforms.uTimeLapse.value = elapsedTime;

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