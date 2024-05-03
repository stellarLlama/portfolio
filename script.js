import * as THREE from 'three';

import { OBJLoader } from 'three/examples/jsm/Addons.js';

const cursor = document.querySelector(".cursor");
const gameControllerDiv = document.querySelector(".gameController");
const directionalLight = new THREE.DirectionalLight(0xffffff);
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 600/ 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(600, 400);
gameControllerDiv.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
let gameController = new THREE.Mesh;

const loader = new OBJLoader();
loader.load(
    'controller.obj',
    function (object) {
        object.material = new THREE.MeshNormalMaterial;
        gameController = scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading GLTF model:', error);
    }
);

scene.add(directionalLight);

directionalLight.position.set(0, 1, 0);

camera.position.z = 15;

document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.screenX+"px";
});

function animate() {
    controls.update();
    gameController.rotateX(0.01)
    gameController.rotateY(0.01)
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();