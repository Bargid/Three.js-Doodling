import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

console.log(OrbitControls);

/**
 * Cursor
 */
const cursor = { 
    x: 0,
    y: 0
 }

window.addEventListener('mousemove', (evt) => {

    cursor.x = evt.clientX / sizes.width - 0.5 // Permet de maintenir l'amplitude dans un range de -0.5 a 0.5
    cursor.y = - (evt.clientY / sizes.height -0.5)

    // console.log(cursor.x); // montre la valeur d'ou ma souris est, dans l'axe X, dans ma scene
})


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) // Field of view, Aspect Ration (Width divise par Height), Near, Far 

// const aspectRatio = sizes.width / sizes.height // *ORTOGRAPHIC CAMERA*
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100); // Left, Right, Top, Bottom, Near, Far

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
console.log(camera.position.length());
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas) // tu dois lui donner la camera, et un element du DOM
controls.enableDamping = true // ajoute un smoothness au mouvements

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = cursor.x * 3 // la multiplication augmente l'amplitude et l'intensite du mouvement
    // camera.position.y = cursor.y * 3
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3 // * 2 pour une rotation complete
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position) // avec ca, la camera bouge, mais vise toujours l'objet -- DOIT TOUJOURS RESTER APRES SINON CA CHANGE

    // Update Controls
    controls.update() // on doit le faire si on utilise du damping

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()