import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {

    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // permet depas avoir de marche dans la definition des lignes, avec les pixels
})

window.addEventListener('dblclick', () => { // Function pour permettre le fullscreen sur dblclick

    //  SI SAFARI N'EST PAS IMPORTANT, UTILISE CECI
    // if (!document.fullscreenElement) {
    //     canvas.requestFullscreen();
    // } else {
    //     document.exitFullscreen();
    // }

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement // UNIQUEMENT POUR FURETEUR SAFARI

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullScreen) {
            document.webkitExitFullScreen;
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()