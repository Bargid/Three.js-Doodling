import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// // Time
// let time = Date.now();

// Clock
const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 }) // position du mesh, quel axe avec la distance, et la duration, et un delay, meme ON UTILISE LA LIBRARY *GREENSOCK*
gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 })

// Animation
const tick = () => {

    // // Time
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime; // Tout ca permet de reguler la vitesse de l'animation peu importe le framerate, que ce sois 30, 60, 120...
    // console.log(deltaTime)

    // Clock
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);

    // Update Objects
    // mesh.position.x -= 0.01
    // mesh.position.y += 0.01
    // mesh.position.y = Math.sin(elapsedTime) // Une respiration, up and down -- peut etre fait avec cos aussi
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.rotation.y = elapsedTime * Math.PI * 2 // Une rotation par seconde
    // mesh.rotation.x = elapsedTime

    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)

    // mesh.rotation.y += 0.001 * deltaTime;
    // mesh.rotation.x += 0.001 * deltaTime;
    // mesh.rotation.z += 0.001 * deltaTime;

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick);
};

tick();