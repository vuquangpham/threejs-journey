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
         * Objects
         */
        const object1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({color: '#f00'})
        );

        // the raycaster will intersect through 2 points
        // const object1 = new THREE.Mesh(
        //     new THREE.TorusGeometry(0.5),
        //     new THREE.MeshBasicMaterial({color: '#f00'})
        // )
        object1.position.x = -2;

        const object2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({color: '#f00'})
        );

        const object3 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({color: '#f00'})
        );
        object3.position.x = 2;

        scene.add(object1, object2, object3);

        // raycaster
        const raycaster = new THREE.Raycaster();
        const rayOrigin = new THREE.Vector3(-3, 0, 0);
        const rayDirection = new THREE.Vector3(1, 0, 0);
        rayDirection.normalize();
        raycaster.set(rayOrigin, rayDirection);

        object1.updateMatrixWorld();
        object2.updateMatrixWorld();
        object3.updateMatrixWorld();

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 4;
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

            // objects
            object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
            object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
            object3.position.y = Math.sin(elapsedTime * 1.3) * 1.5;

            // raycaster
            const objectToTest = [object1, object2, object3];
            const intersects = raycaster.intersectObjects(objectToTest);

            // reset color
            objectToTest.forEach(o => o.material.color.set('#f00'));

            intersects.forEach(i => i.object.material.color.set('#00f'));

            console.log(intersects);

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