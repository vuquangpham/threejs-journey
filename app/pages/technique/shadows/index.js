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

        const pointLight = new THREE.PointLight(0xffffff, 5);
        pointLight.position.x = 1;
        pointLight.position.y = 1.5;
        // scene.add(pointLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.x = 2;

        // shadows
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 6;
        directionalLight.shadow.camera.top = 1;
        directionalLight.shadow.camera.bottom = -1;
        directionalLight.shadow.camera.left = -1;
        directionalLight.shadow.camera.right = 1;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;

        scene.add(directionalLight);

        // helper
        scene.add(new THREE.DirectionalLightHelper(directionalLight));
        scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

        // shadows
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        pointLight.shadow.camera.fov = 60;

        const axesHelper = new THREE.AxesHelper();
        scene.add(axesHelper);

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
        sphere.castShadow = true;

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5),
            material
        );
        plane.rotation.x = -Math.PI * 0.5;
        plane.position.y = -0.5;
        plane.receiveShadow = true;

        scene.add(sphere, plane);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.y = 1;
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
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        // shadows
        renderer.shadowMap.enabled = true;

        const clock = new THREE.Clock();

        // update the frame
        const render = () => {
            // Update objects

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