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
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        scene.add(pointLight);

        /**
         * Objects
         */
            // Material
        const material = new THREE.MeshStandardMaterial();
        material.roughness = 0.4;

        // Objects
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            material
        );
        sphere.position.x = -1.5;

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.75, 0.75, 0.75),
            material
        );

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.3, 0.2, 32, 64),
            material
        );
        torus.position.x = 1.5;

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5),
            material
        );
        plane.rotation.x = -Math.PI * 0.5;
        plane.position.y = -0.65;

        scene.add(sphere, cube, torus, plane);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.x = 1;
        camera.position.y = 1;
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

            // Update objects
            sphere.rotation.y = 0.1 * elapsedTime;
            cube.rotation.y = 0.1 * elapsedTime;
            torus.rotation.y = 0.1 * elapsedTime;

            sphere.rotation.x = 0.15 * elapsedTime;
            cube.rotation.x = 0.15 * elapsedTime;
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