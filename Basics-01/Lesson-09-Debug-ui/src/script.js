import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI({
    width: 340,
    title: 'Nice Debug UI',
    closeFolders: false
});
// gui.close() // ferme le GUI de base
// gui.hide()

window.addEventListener('keydown', (evt) => {
    if (evt.key == 'h') {
        gui.show(gui._hidden) // Toggle simplifier
    }
})

const debugObject = {

}


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
debugObject.color = '#66f76d' // applique la valeur de ton debug GUI ici

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome Cube'); // Creation d'un sous-folder pour le GUI
cubeTweaks.close();

cubeTweaks.add(mesh.position, 'y', -3, 3, 0.01).min(-3).max(3).step(0.01).name('Elevation'); // l'objet en ensuite la propriete a changer, ensuite le minimum, le maximum et l'intervale des changements
cubeTweaks.add(mesh, 'visible').name('Visibility');
cubeTweaks.add(material, 'wireframe').name('Wireframe');

cubeTweaks.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color)
});

debugObject.spin = () => { // On ajoute la function a l'object, directement
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
}
cubeTweaks.add(debugObject, 'spin');

debugObject.subdivision = 2;
cubeTweaks.add(debugObject, 'subdivision').min(1).max(20).step(1).name('SubDivisions').onFinishChange(() => {
    mesh.geometry.dispose() // on se debarasse de la vieille geometrie
    mesh.geometry = new THREE.BoxGeometry(
        1, 1, 1,
        debugObject.subdivision,
        debugObject.subdivision,
        debugObject.subdivision
    )
})


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

window.addEventListener('dblclick', () => { // Function pour permettre le fullscreen sur dblclick

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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