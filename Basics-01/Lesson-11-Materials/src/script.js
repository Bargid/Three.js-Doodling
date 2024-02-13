import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import GUI from 'lil-gui'

/**
 * Debug
 */

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
// // MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture
// material.color = new THREE.Color(0xff0000)
// material.wireframe = true
// material.opacity = 0.2 // pour avoir une baisse ou augmentation d'opacite, il faut absolument mettre le TRANSPARENT a true
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.slide = THREE,THREE.DoubleSide

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()

// // MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// // MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 30
// material.specular = new THREE.Color(0x1188ff)

// // MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter // Minecraft texture effect
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false // quand les deux d'en haut sont nearest, desactiver mipmaps
// material.gradientMap = gradientTexture

// MeshStandardMaterial
const material = new THREE.MeshPhysicalMaterial() // Physical est Standard, mais avec plus d'effets

material.map = doorColorTexture

material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1

material.displacementMap = doorHeightTexture // va etre utile quand il y a plusieurs polygone pour creer une elevation texturale
material.displacementScale = 0.08

material.metalnessMap = doorMetalnessTexture
material.metalness = 1
material.roughnessMap = doorRoughnessTexture
material.roughness = 1

material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)

// Clearcoat
material.clearcoat = 1
material.clearcoatRoughness = 0

// Sheen
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)

// Iridescent
material.iridescence = 1
material. iridescenceIOR = 1
material.iridescenceThicknessRange = [100, 800]

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Metalness')
gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Roughness')
gui.add(material, 'displacementScale').min(0).max(1).step(0.001).name('Displacement')
gui.add(material, 'aoMapIntensity').min(1).max(3).step(0.1).name('Ambient Occlusion')
gui.add(material.normalScale, 'x').min(0).max(1).step(0.01).name('Normal Map X')
gui.add(material.normalScale, 'y').min(0).max(1).step(0.01).name('Normal Map Y')
gui.add(material, 'clearcoat').min(0).max(1).step(0.0001).name('Clearcoat')
gui.add(material, 'sheen').min(0).max(1).step(0.0001).name('Sheen')
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001).name('Sheen Roughness')
gui.addColor(material, 'sheenColor').min(0).max(1).step(0.0001).name('Sheen Color')
gui.add(material, 'iridescence').min(0).max(1).step(0.0001).name('Iridescence')
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001).name('IridescenceIOR')
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1).name('Iridescence Thickness')
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1).name('Iridescence Thickness')
gui.add(material, 'transmission').min(0).max(1).step(0.0001).name('Transmission')
gui.add(material, 'ior').min(1).max(10).step(0.0001).name('Transmission IOR')
gui.add(material, 'thickness').min(0).max(1).step(0.0001).name('Transmission Thickness')

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight= new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 2.5
// pointLight.position.z = 3
// scene.add(pointLight)

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {

    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap // ajoute l'image en background
    scene.environment = environmentMap // fait la reflection
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()