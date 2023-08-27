import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import texture from './textures/particles/2.png';

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
         * Textures
         */
        const textureLoader = new THREE.TextureLoader();
        const particleTexture = textureLoader.load(texture);

        /**
         * Objects
         * */

            // Geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 50000;

        const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)
        const colors = new Float32Array(count * 3);

        for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
        {
            positions[i] = (Math.random() - 0.5) * 10;
            colors[i] = Math.random();
        }

        // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial();
        particlesMaterial.size = 0.1;
        particlesMaterial.sizeAttenuation = true; // distant particles will be smaller than the close particles
        particlesMaterial.map = particleTexture;
        particlesMaterial.transparent = true;
        particlesMaterial.alphaMap = particleTexture;

        // particlesMaterial.alphaTest = 0.1;
        // particlesMaterial.depthTest = false;
        particlesMaterial.depthWrite = false;

        // activate vertex colors
        particlesMaterial.vertexColors = true;

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

            for(let i = 0; i < count; i++){
                const i3 = i * 3;

                const x = particlesGeometry.attributes.position.array[i3];
                particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
            }
            particlesGeometry.attributes.position.needsUpdate = true;

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