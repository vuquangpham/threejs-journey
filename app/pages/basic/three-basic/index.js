import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){
        // canvas
        const canvas = document.querySelector('canvas#basic');

        // cursor
        // const cursor = {x: 0, y: 0};
        // canvas.addEventListener('mousemove', (e) => {
        //     cursor.x = e.offsetX;
        //     cursor.y = e.offsetY;
        // });


        // scene
        const scene = new THREE.Scene();

        // object
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 'red'});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Sizes
        const sizes = {
            width: 800,
            height: 600
        };

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        // const aspectRatio = sizes.width / sizes.height
        // const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
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

        // update the frame
        const render = () => {
            // calculate the distance
            // const deltaX = cursor.x / sizes.width - 0.5;
            // const deltaY = cursor.y / sizes.height - 0.5;

            // update the position
            // camera.position.x = deltaX * 10;
            // camera.position.y = deltaY * 10;

            // update the controls
            controls.update();

            // update the camera
            // camera.lookAt(mesh.position);

            // render
            renderer.render(scene, camera);

            // call on the next frame
            window.requestAnimationFrame(render);
        };
        render();
    }

    // for destroy this script when navigating between each page
    destroy(){
        console.log('destroyed', this);
    }
}