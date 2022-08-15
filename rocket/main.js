import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { Raycaster } from 'three'


/**
 * Scene setup
 */
 const scene = new THREE.Scene();
 scene.background = new THREE.Color( 0x87ceeb );
 const canvas = document.querySelector('#bg')

/**
 * Loaders
 */

// Loading Manager
const progressBar = document.querySelector('#progress-bar')
const progressBarContainer = document.querySelector('#progress-bar-container')
// console.log(progressBar);

let sceneReady = false

const loadingManager = new THREE.LoadingManager(
    ()=>{
        setTimeout(()=>{
            progressBarContainer.style.animation = "fadeOutAnimation ease 1s"
        }, "200")
        setTimeout(()=>{
            progressBarContainer.style.display = "none"
            sceneReady = true
        }, "1200")
    },
    (itemUrl, itemLoaded, itemTotal)=>{
        progressBar.value = (itemLoaded/itemTotal) * 100
    }
)


// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
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
// controls.maxAzimuthAngle = 1.75 * Math.PI
// controls.minAzimuthAngle = 0.25 * Math.PI
controls.minPolarAngle = 0.2 * Math.PI
controls.maxPolarAngle = 0.6 * Math.PI
controls.minDistance = 3    
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
 * Points
 */

 const points = [
    {
        position: new THREE.Vector3(-0.16, 1.5, -0.95),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(0, 2.5, -0.9),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(0, 3.5, -0.9),
        element: document.querySelector('.point-2')
    },
    {
        position: new THREE.Vector3(0, 4, -0.9),
        element: document.querySelector('.point-3')
    },
    {
        position: new THREE.Vector3(0, 4.5, -0.9),
        element: document.querySelector('.point-4')
    },
    {
        position: new THREE.Vector3(-0.5, 5, -0.9),
        element: document.querySelector('.point-5')
    }

]
// console.log(points);


/**
 * Helpers
 */
 const gridHelper = new THREE.GridHelper(200, 50);
//  scene.add(gridHelper)

const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = points[1].position.x
cube.position.y = points[1].position.y
cube.position.z = points[1].position.z
// scene.add( cube );


/**
 * Animation Loop
 */

const raycaster = new Raycaster()

function animate() {
    
    controls.update();
    if(sceneReady){
        for(const point of points){
            const screenPosition = point.position.clone()
            screenPosition.project(camera)

            // console.log(screenPosition.x);

            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            if(intersects.length === 0){
                point.element.classList.add('visible')
            }
            else{
                const intersectDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)

                if(intersectDistance < pointDistance){
                    point.element.classList.remove('visible')
                }
                else{
                    point.element.classList.add('visible')
                }
            }
            
            const translateX = (screenPosition.x * sizes.width * 0.5)-20 ;
            const translateY = (- screenPosition.y * sizes.height * 0.5)-20;
            // console.log(screenPosition.x);
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    
    }
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

