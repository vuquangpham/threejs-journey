import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {BufferAttribute, BufferGeometry} from "three";

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        // object

        // custom geometry
        const count = 900;
        const positionArray = new Float32Array(count);
        for(let i = 0; i < count; i += 3){
            positionArray[i] = Math.round(Math.random() * 3);
            positionArray[i + 1] = Math.round(Math.random() * 3);
            positionArray[i + 2] = Math.round(Math.random() * 3);
        }
        console.log(positionArray);

        // save to Buffer Attribute (store position)
        const positionAttribute = new BufferAttribute(positionArray, 3);
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', positionAttribute);

        const material = new THREE.MeshBasicMaterial({color: 'red', wireframe: false});
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