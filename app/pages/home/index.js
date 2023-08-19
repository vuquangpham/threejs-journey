import Page from '@/classes/Page';
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {FontLoader} from 'three/addons/loaders/FontLoader.js';

export default class Home extends Page{
    constructor(){
        super({
            id: 'home',
            element: '[data-template]',
        });

        this.generate3DText();
    }

    generate3DText(){
        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        // font
        const fontLoader = new FontLoader();
        fontLoader.load(
            '/helvetiker_bold.typeface.json',
            (font) => {
                const textGeometry = new TextGeometry('Hello Three.js', {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                const textMaterial = new THREE.MeshNormalMaterial({wireframe: false});
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                scene.add(textMesh);
                textGeometry.center();

                // donuts
                const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
                const donutMaterial = new THREE.MeshNormalMaterial();

                for(let i = 0; i < 100; i++){
                    const donut = new THREE.Mesh(donutGeometry, donutMaterial);
                    scene.add(donut);

                    donut.position.x = (Math.random() - 0.5) * 10;
                    donut.position.y = (Math.random() - 0.5) * 10;
                    donut.position.z = (Math.random() - 0.5) * 10;

                    donut.rotation.x = Math.random() * Math.PI;
                    donut.rotation.y = Math.random() * Math.PI;

                    const scale = Math.random();
                    donut.scale.set(scale, scale, scale);
                }
            }
        );

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
}