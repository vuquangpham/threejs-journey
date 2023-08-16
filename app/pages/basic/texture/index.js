import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

// Textures
import colorTexture from './textures/door/color.jpg';
import alphaTexture from './textures/door/alpha.jpg';
import heightTexture from './textures/door/height.jpg';
import normalTexture from './textures/door/normal.jpg';
import ambientTexture from './textures/door/ambientOcclusion.jpg';
import metalnessTexture from './textures/door/metalness.jpg';
import roughnessTexture from './textures/door/roughness.jpg';

export default class{
    constructor({element}){
        this.element = element;

        this.createTexture();
        this.init();
    }

    createTexture(){
        // for control the process of all loading assets
        const loadingManger = new THREE.LoadingManager();
        const textureLoaderWithLoadingManager = new THREE.TextureLoader(loadingManger);

        // for each asset
        // const textureLoader = new THREE.TextureLoader();

        /**
         * Textures
         * */
        this.colorTexture = textureLoaderWithLoadingManager.load(colorTexture);
        this.alphaTexture = textureLoaderWithLoadingManager.load(alphaTexture);
        this.heightTexture = textureLoaderWithLoadingManager.load(heightTexture);
        this.normalTexture = textureLoaderWithLoadingManager.load(normalTexture);
        this.ambientTexture = textureLoaderWithLoadingManager.load(ambientTexture);
        this.metalnessTexture = textureLoaderWithLoadingManager.load(metalnessTexture);
        this.roughnessTexture = textureLoaderWithLoadingManager.load(roughnessTexture);
    }

    init(){
        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        // object
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({map: this.colorTexture});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

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

        // update the frame
        const render = () => {
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