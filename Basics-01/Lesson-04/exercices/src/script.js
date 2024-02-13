import * as THREE from 'three'
import './style.css'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group()
group.position.y = 1 // on bouge TOUT le groupe, ici
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    group.add(cube1)

    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    )
    cube2.position.x = -2
    group.add(cube2)

    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    )
    cube3.position.x = 2
    group.add(cube3)




// Axes Helper
const axesHelper = new THREE.AxesHelper(1)

scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 1200,
    height: 1000
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
// camera.lookAt(new THREE.Vector3(2, 0, 0))
// camera.lookAt(mesh.position)

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)