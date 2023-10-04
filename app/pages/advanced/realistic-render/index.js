import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import GUI from "lil-gui";
import {RGBELoader} from "three/addons/loaders/RGBELoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        THREE.ColorManagement.enabled = false;

        const gui = new GUI();
        const global = {};
        gui.add(THREE.ColorManagement, 'enabled');

        // loader
        const rgbeLoader = new RGBELoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

// Canvas
        const canvas = document.querySelector('canvas#webgl');

// Scene
        const scene = new THREE.Scene();

        /**
         * Update all materials
         */
        const updateAllMaterials = () => {
            scene.traverse((child) => {
                if(child.isMesh && child.material.isMeshStandardMaterial){
                    child.material.envMapIntensity = global.envMapIntensity;

                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        };

        /**
         * Environment map
         */
// Global intensity
        global.envMapIntensity = 1;
        gui
            .add(global, 'envMapIntensity')
            .min(0)
            .max(10)
            .step(0.001)
            .onChange(updateAllMaterials);

// HDR (RGBE) equirectangular
        rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = environmentMap;
            scene.environment = environmentMap;
        });

        /**
         * Models
         */
// Helmet
//         gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
        gltfLoader.load('/models/Hamburger/glTF-Binary/Hamburger.glb', (gltf) => {
                // gltf.scene.scale.set(10, 10, 10);
                gltf.scene.scale.set(0.4, 0.4, 0.4);
                gltf.scene.position.y = 2.5;
                scene.add(gltf.scene);
                updateAllMaterials();
            }
        );

        // load the texture
        const textureLoader = new THREE.TextureLoader();

        // floor
        const floorColorTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg');
        const floorAOMetalnessRoughnessTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg');
        const floorNormalTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png');

        // wall
        const wallColorTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg');
        const wallAOMetalnessRoughnessTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg');
        const wallNormalTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png');

        // change color space
        wallColorTexture.colorSpace = THREE.SRGBColorSpace;
        floorColorTexture.colorSpace = THREE.SRGBColorSpace;

        // load the floor and the wall
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(8, 8),
            new THREE.MeshStandardMaterial({
                aoMap: floorAOMetalnessRoughnessTexture,
                roughnessMap: floorAOMetalnessRoughnessTexture,
                metalnessMap: floorAOMetalnessRoughnessTexture,
                map: floorColorTexture,
                normalMap: floorNormalTexture
            })
        );
        floor.rotation.x = -Math.PI * 0.5;
        scene.add(floor);

        // load the wall
        const wall = new THREE.Mesh(
            new THREE.PlaneGeometry(8, 8),
            new THREE.MeshStandardMaterial({
                aoMap: wallAOMetalnessRoughnessTexture,
                roughnessMap: wallAOMetalnessRoughnessTexture,
                metalnessMap: wallAOMetalnessRoughnessTexture,
                map: wallColorTexture,
                normalMap: wallNormalTexture
            })
        );
        wall.position.set(0, 4, -4);
        scene.add(wall);

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
        camera.position.set(4, 5, 4);
        scene.add(camera);

        // Controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.y = 3.5;
        controls.enableDamping = true;

        /**
         * Directional light
         */
        const directionalLight = new THREE.DirectionalLight('#fff', 2);
        directionalLight.position.set(3, 7, 6);
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.mapSize.set(1024, 1024);

        gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity');
        gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.001).name('lightX');
        gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.001).name('lightY');
        gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.001).name('lightZ');

        // directional light helper
        const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
        scene.add(directionalLightHelper);

        // change the position point to the top
        directionalLight.target.position.set(0, 4, 0);
        directionalLight.target.updateMatrixWorld();

        // shadow
        directionalLight.castShadow = true;
        gui.add(directionalLight, 'castShadow');

        // avoid the shadow acne
        gui.add(directionalLight.shadow, 'normalBias').min(-0.05).max(0.05).step(0.001);
        gui.add(directionalLight.shadow, 'bias').min(-0.05).max(0.05).step(0.001);

        directionalLight.shadow.normalBias = 0.027;
        directionalLight.shadow.bias = -0.004;

        scene.add(directionalLight);

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // tone mapping
        renderer.toneMapping = THREE.ReinhardToneMapping;
        gui.add(renderer, 'toneMapping', {
            No: THREE.NoToneMapping,
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping
        });

        // exposure
        renderer.toneMappingExposure = 3;
        gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001);

        // Physically accurate lighting
        renderer.useLegacyLights = false;
        gui.add(renderer, 'useLegacyLights');

        // add the shadow
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        /**
         * Animate
         */
        const tick = () => {
            // Update controls
            controls.update();

            // Render
            renderer.render(scene, camera);

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