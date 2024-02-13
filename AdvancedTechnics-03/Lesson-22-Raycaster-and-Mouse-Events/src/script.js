import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2
// object1.updateMatrixWorld()

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
// object2.updateMatrixWorld()

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2
// object3.updateMatrixWorld()

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()

// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)


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
 * Mouse
 */
const mouse = new THREE.Vector2() // Vector2 parceque c'est uniquement X et Y

window.addEventListener('mousemove', (evt) => {

    mouse.x = evt.clientX / sizes.width * 2 - 1 // le centre de l'ecran est 0, la gauche -1, la droite 1 
    mouse.y = - (evt.clientY / sizes.height * 2 - 1)
})

window.addEventListener('click', () => {

    if (currentIntersect) {
        if (currentIntersect.object === object1) {
            console.log('Sphere 1 clicked!');
        }
        if (currentIntersect.object === object2) {
            console.log('Sphere 2 clicked!');
        }
        if (currentIntersect.object === object3) {
            console.log('Sphere 3 clicked!');
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Model loader
 */
const gltfLoader = new GLTFLoader()
let model = null

gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) => {
        model = gltf.scene
        model.position.y = -1.2
        scene.add(model)
    }
)

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.9)
scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Cast a ray
    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    // console.log(intersects);

    for (const object of objectsToTest) {

        object.material.color.set('#ff0000') // redevient rouge quand le ray n'est pas dessus
    }

    for (const intersect of intersects) {
        
        intersect.object.material.color.set('#0000ff') // quand le ray passe une sphere, elle devient la color set
    }

    // Mouse enter and leave
    if (intersects.length) {

        if(currentIntersect === null) {
            console.log('Mouse Enter');
        }
        currentIntersect = intersects[0]
    } else {
        if(currentIntersect) {
            console.log('Mouse Leave');
        }
        currentIntersect = null
    }

    // Test intersect with model
    if (model) {
        const modelIntersects = raycaster.intersectObject(model)
        // console.log(modelIntersects);
        if (modelIntersects.length) {
            model.scale.set(1.2, 1.2, 1.2) // on fait grossir le canar quand le ray de la souris passe au travers
        } else {
            model.scale.set(1, 1, 1)
        }
    }


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()