import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// Cursor
const cursor = { 
    x: 0,
    y: 0,
}
window.addEventListener("mousemove", (event) => {
    cursor.x = - event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
});

// Canvas
const canvas = document.querySelector("canvas.webgl");
// First Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const baseColorTexture = textureLoader.load("./images/BrushedIron01_MR_2K/BrushedIron01_2K_BaseColor.png")
const normalTexture = textureLoader.load("./images/BrushedIron01_MR_2K/BrushedIron01_2K_Normal.png")
const roughnessTexture = textureLoader.load("./images/Fingerprints_sl4fafbc_1K_Roughness.jpg")
const metalnessTexture = textureLoader.load("./images/BrushedIron01_MR_2K/BrushedIron01_2K_Metalness.png")

baseColorTexture.colorSpace = THREE.SRGBColorSpace;
normalTexture.colorSpace = THREE.SRGBColorSpace;
roughnessTexture.colorSpace = THREE.SRGBColorSpace;
metalnessTexture.colorSpace = THREE.SRGBColorSpace; 



const material = new THREE.MeshPhysicalMaterial()

material.roughnessMap = roughnessTexture;
// material.metalness = 0.6;
material.transmission = 0.8;
material.ior = 1.5;
material.thickness = 0.3;
material.iridescence = 1;
material.iridescenceIOR = 1.3;
material.iridescenceThickness = 1000;
material.iridescenceIOR = 1.3;

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    material
);
scene.add(object1);


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const rgbeLoader = new RGBELoader ()
rgbeLoader.load ('./images/autumn_field_puresky_2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
})


// Camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.render(scene, camera);

const clock = new THREE.Clock();

const tick = () => {
 

    object1.rotation.y -= 0.01;
   // Update controls
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();