import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


/**
 * Scene setup
 */
 const scene = new THREE.Scene();
 scene.background = new THREE.Color( 0x87ceeb );
 const canvas = document.querySelector('#bg')

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Materials
 */
const bakedTexture = textureLoader.load('models/pslv/textures.jpg')
// and the loaded texture will be flipped on y axis so keep that in  mind
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial({ map:bakedTexture })

/**
 * Model
 */
gltfLoader.load(
    'models/pslv/pslv.glb',
    (gltf) => {
        gltf.scene.traverse((child)=>{
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
    }
)

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 9
camera.position.z = -10

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target = new THREE.Vector3(0,3.3,-1)
controls.enableDamping = true
controls.maxAzimuthAngle = 1.75 * Math.PI
controls.minAzimuthAngle = 0.25 * Math.PI
controls.minPolarAngle = 0.2 * Math.PI
controls.maxPolarAngle = 0.6 * Math.PI
controls.minDistance = 5    
controls.maxDistance = 14
controls.panSpeed = 0.5
controls.rotateSpeed = 0.76


/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding


/**
 * Helpers
 */
 const gridHelper = new THREE.GridHelper(200, 50);
//  scene.add(gridHelper)


/**
 * Animation Loop
 */

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

