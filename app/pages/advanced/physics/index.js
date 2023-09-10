import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import GUI from "lil-gui";
import CANNON from 'cannon';
import CannonDebugger from 'cannon-es-debugger';

// env map
import px from './textures/environmentMaps/0/px.png';
import nx from './textures/environmentMaps/0/nx.png';
import py from './textures/environmentMaps/0/py.png';
import ny from './textures/environmentMaps/0/ny.png';
import pz from './textures/environmentMaps/0/pz.png';
import nz from './textures/environmentMaps/0/nz.png';

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){

        /**
         * Physics
         * */
            // world
        const world = new CANNON.World();
        world.gravity.set(0, -9.82, 0);

        // materials
        const defaultMaterial = new CANNON.Material('default');
        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            });
        world.defaultContactMaterial = defaultContactMaterial;

        // sphere
        const sphereShape = new CANNON.Sphere(0.5);
        const sphereBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 3, 0),
            shape: sphereShape,
        });
        world.addBody(sphereBody);

        // floor shape
        const floorShape = new CANNON.Plane();
        const floorBody = new CANNON.Body({
            shape: floorShape,
        });
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI * -0.5);
        world.addBody(floorBody);

        /**
         * Debug
         */
        const gui = new GUI();

        THREE.ColorManagement.enabled = false;

        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        /**
         * Textures
         */
        const textureLoader = new THREE.TextureLoader();
        const cubeTextureLoader = new THREE.CubeTextureLoader();

        const environmentMapTexture = cubeTextureLoader.load([px, nx, py, ny, pz, nz]);

        /**
         * Test sphere
         */
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.MeshStandardMaterial({
                metalness: 0.5,
                roughness: 0.1,
                envMap: environmentMapTexture,
                envMapIntensity: 0.5
            })
        );
        sphere.castShadow = true;
        sphere.position.y = 0.5;
        scene.add(sphere);

        /**
         * Floor
         */
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({
                color: '#777',
                metalness: 0.3,
                roughness: 0.4,
                envMap: environmentMapTexture,
                envMapIntensity: 0.5
            })
        );
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        scene.add(floor);

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.camera.left = -7;
        directionalLight.shadow.camera.top = 7;
        directionalLight.shadow.camera.right = 7;
        directionalLight.shadow.camera.bottom = -7;
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(-3, 3, 3);
        scene.add(camera);

        // controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        // render
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const clock = new THREE.Clock();
        let previousElapsedTime = 0;


        const cannonDebugger = new CannonDebugger(scene, world, {});

        // update the frame
        const render = () => {
            const elapsedTime = clock.getElapsedTime();
            const delta = elapsedTime - previousElapsedTime;
            previousElapsedTime = elapsedTime;

            // update physics world
            world.step(1 / 60, delta, 3);
            sphere.position.copy(sphereBody.position);
            console.log(sphereBody.position.y);

            // update the controls
            controls.update();
            // cannonDebugger.update();

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