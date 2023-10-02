import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import GUI from "lil-gui";
import {RGBELoader} from "three/addons/loaders/RGBELoader";
import {GroundProjectedSkybox} from "three/addons/objects/GroundProjectedSkybox";

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        // lil gui
        const gui = new GUI();
        const debugObject = {
            envMapIntensity: 5,
        };

        // function for updating all materials
        const updateAllMaterials = () => {
            scene.traverse(child => {
                if(child.isMesh && child.material.isMeshStandardMaterial){
                    child.material.envMapIntensity = debugObject.envMapIntensity;
                }
            });
        };

        // add to debug
        gui.add(debugObject, 'envMapIntensity', 0, 10, 0.001)
            .onChange(updateAllMaterials);

        // set color
        THREE.ColorManagement.enabled = false;

        /**
         * Loaders
         */
            // cube loader
        const cubeTextureLoader = new THREE.CubeTextureLoader();

        // gltf loader
        const gltfLoader = new GLTFLoader();

        // rgbe loader for loading HDR image
        const rgbeLoader = new RGBELoader();

        // load the object from gltf
        gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
            gltf.scene.scale.set(10, 10, 10);
            scene.add(gltf.scene);

            updateAllMaterials();
        });

        /**
         * Environment map
         */
        // LDR cube texture
        // const environmentMap = cubeTextureLoader.load([
        //         '/environmentMaps/0/px.png',
        //         '/environmentMaps/0/nx.png',
        //         '/environmentMaps/0/py.png',
        //         '/environmentMaps/0/ny.png',
        //         '/environmentMaps/0/pz.png',
        //         '/environmentMaps/0/nz.png'
        //     ]);

        // rgbeLoader.load('/environmentMaps/blender-2k.hdr', (environmentMap) => {
        rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularRefractionMapping;
            scene.background = environmentMap;

            // const skybox = new GroundProjectedSkybox(environmentMap);
            // skybox.scale.setScalar(50);
            // scene.add(skybox);
            //
            // gui.add(skybox, 'radius', 1, 200, 0.1);
            // gui.add(skybox, 'height', 1, 200, 0.1);

        });

        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001);
        gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001);

        /**
         * Torus Knot
         */
        const torusKnot = new THREE.Mesh(
            new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
            new THREE.MeshStandardMaterial({roughness: 0, metalness: 1, color: 0xaaaaaa})
        );
        torusKnot.position.x = -4;
        torusKnot.position.y = 4;
        scene.add(torusKnot);

        // create holy donut
        const holyDonut = new THREE.Mesh(
            new THREE.TorusGeometry(8, 0.5),
            new THREE.MeshStandardMaterial({color: 'red'})
        );
        holyDonut.position.y = 3.5;
        holyDonut.layers.enable(1);
        scene.add(holyDonut);

        // cubeRenderTarget
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            type: THREE.HalfFloatType
        });
        scene.environment = cubeRenderTarget.texture;

        const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
        cubeCamera.layers.enable(1);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(4, 5, 4);
        scene.add(camera);

        // controls
        const controls = new OrbitControls(camera, canvas);
        controls.target.y = 3.5;
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

            // update the mesh
            holyDonut.rotation.x = Math.sin(elapsedTime) * Math.PI * 0.5;
            cubeCamera.update(renderer, scene);

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