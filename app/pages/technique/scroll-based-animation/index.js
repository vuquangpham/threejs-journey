import * as THREE from 'three';
import GUI from 'lil-gui';
import gradientImg from './textures/gradients/3.jpg';
import gsap from 'gsap';

export default class{
    constructor({element}){
        this.element = element;
        this.init();
    }

    init(){

        // texture loader
        const textureLoader = new THREE.TextureLoader();
        const gradientTexture = textureLoader.load(gradientImg);
        gradientTexture.magFilter = THREE.NearestFilter;

        // LIL GUI
        const gui = new GUI();
        const parameters = {
            materialColor: '#fff'
        };

        // cursor
        const cursor = {x: 0, y: 0};
        window.addEventListener('mousemove', (e) => {
            cursor.x = (e.clientX) / innerWidth - 0.5;
            cursor.y = (e.clientY) / innerHeight - 0.5;
        });

        THREE.ColorManagement.enabled = false;

        // canvas
        const canvas = document.querySelector('canvas#webgl');

        // scene
        const scene = new THREE.Scene();

        /**
         * Lights
         */
        const directionalLight = new THREE.DirectionalLight('#fff', 1);
        directionalLight.position.set(1, 1, 0);
        scene.add(directionalLight);

        /**
         * Objects
         */
            // Material
        const material = new THREE.MeshToonMaterial({color: parameters.materialColor, gradientMap: gradientTexture});

        gui
            .addColor(parameters, 'materialColor')
            .onChange(() => {
                material.color.set(parameters.materialColor);
                particlesMaterial.color.set(parameters.materialColor);
            });

        // Meshes
        const objectPosition = 5;

        const mesh1 = new THREE.Mesh(
            new THREE.TorusGeometry(1, 0.4, 16, 60),
            material
        );
        const mesh2 = new THREE.Mesh(
            new THREE.ConeGeometry(1, 2, 32),
            material
        );
        const mesh3 = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
            material
        );
        mesh1.position.x = -2;
        mesh2.position.x = 2;
        mesh3.position.x = -2;

        mesh1.position.y = 0 * objectPosition;
        mesh2.position.y = -1 * objectPosition;
        mesh3.position.y = -2 * objectPosition;

        const sectionMeshes = [mesh1, mesh2, mesh3];
        scene.add(mesh1, mesh2, mesh3);


        /**
         * Particles
         */
            // Geometry
        const particlesCount = 200;
        const positions = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount; i++){
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = objectPosition * 0.5 - (Math.random() * objectPosition * sectionMeshes.length);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            color: parameters.materialColor,
            sizeAttenuation: true,
            size: 0.03
        });

        // Points
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // camera
        const cameraGroup = new THREE.Group();
        scene.add(cameraGroup);

        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 6;
        cameraGroup.add(camera);

        // render
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        const clock = new THREE.Clock();
        let previousTime = 0;

        // update the frame
        const render = () => {
            const elapsedTime = clock.getElapsedTime();
            const delta = elapsedTime - previousTime;
            previousTime = elapsedTime;

            // camera.position.y = -1 * (scrollY / )
            const progress = scrollY / sizes.height * objectPosition;
            camera.position.y = -1 * (progress);

            // Animate meshes
            for(const mesh of sectionMeshes){
                mesh.rotation.x += delta * 0.1;
                mesh.rotation.y += delta * 0.12;
            }

            // cursor
            cameraGroup.position.x += (cursor.x - cameraGroup.position.x) * 5 * delta;
            cameraGroup.position.y += (-cursor.y - cameraGroup.position.y) * 5 * delta;

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


        let currentSection = 0;
        // scroll effect
        window.addEventListener('scroll', () => {
            const newSection = Math.round(scrollY / sizes.height);

            if(newSection !== currentSection){
                currentSection = newSection;

                gsap.to(
                    sectionMeshes[currentSection].rotation,
                    {
                        duration: 1.5,
                        ease: 'power2.inOut',
                        x: '+=6',
                        y: '+=3',
                        z: '+=1.5'
                    }
                );
            }
        });
    }

    // for destroy this script when navigating between each page
    destroy(){
        console.log('destroyed', this);
    }
}