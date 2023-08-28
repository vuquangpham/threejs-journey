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

        // sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };


        /**
         * Objects
         * */

        const parameters = {
            radius: 5,
            branches: 3,
            spin: 1,
            randomness: 0.2,
            randomnessPower: 3
        };

        // Geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 100000;

        const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)

        for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
        {
            const i3 = i * 3;

            const radius = Math.random() * parameters.radius;
            const spinRadius = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinRadius) * radius + randomX;
            positions[i3 + 1] = 0 + randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinRadius) * radius + randomZ;
        }

        // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial();
        particlesMaterial.color = new THREE.Color('#fff');
        particlesMaterial.size = 0.001;
        particlesMaterial.sizeAttenuation = true; // distant particles will be smaller than the close particles

        // particlesMaterial.alphaTest = 0.1;
        // particlesMaterial.depthTest = false;
        particlesMaterial.depthWrite = false;
        particlesMaterial.blending = THREE.AdditiveBlending;

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

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