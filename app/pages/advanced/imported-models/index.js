import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";


export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        THREE.ColorManagement.enabled = false;

        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // Scene
        const scene = new THREE.Scene();


        /**
         * Models
         * */
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        let mixer = null;
        gltfLoader.load('/models/Fox/glTF/Fox.gltf', (gltf) => {

            mixer = new THREE.AnimationMixer(gltf.scene);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();

            gltf.scene.scale.set(0.025, 0.025, 0.025);
            scene.add(gltf.scene);
        });

        /**
         * Floor
         */
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({
                color: '#444',
                metalness: 0,
                roughness: 0.5
            })
        );
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        scene.add(floor);

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.camera.left = -7;
        directionalLight.shadow.camera.top = 7;
        directionalLight.shadow.camera.right = 7;
        directionalLight.shadow.camera.bottom = -7;
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Update camera
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        /**
         * Camera
         */
// Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(2, 2, 2);
        scene.add(camera);

// Controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 0.75, 0);
        controls.enableDamping = true;

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        /**
         * Animate
         */
        const clock = new THREE.Clock();
        let previousTime = 0;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = elapsedTime - previousTime;
            previousTime = elapsedTime;

            // Update controls
            controls.update();

            // Render
            renderer.render(scene, camera);

            if(mixer){
                mixer.update(deltaTime);
            }

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };

        tick();
    }

    // for destroy this script when navigating between each page
    destroy(){
        console.log('destroyed', this);
    }
}