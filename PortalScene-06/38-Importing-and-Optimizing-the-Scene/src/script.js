import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

/**
 * Base
 */
// Debug
const debugObject = {

}
const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('Baked_final.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */

// Baked Material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

// Polelight Light Material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xFFF4EC })

// Portal Light Material
debugObject.portalColorStart = '#ffffff' //'#ffffff'
debugObject.portalColorEnd = '#943276' //'#943276'

gui
    .addColor(debugObject, 'portalColorStart')
    .onChange(() => 
    {
        portalLightMaterial.uniforms.uColorStart.value.set(debugObject.portalColorStart)
    })

gui
    .addColor(debugObject, 'portalColorEnd')
    .onChange(() => 
    {
        portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd)
    })

const portalLightMaterial = new THREE.ShaderMaterial({
    uniforms: 
    {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
        uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) }
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader
 })

/**
 * Model
 */
gltfLoader.load(
    'portal.glb',
    (gltf) =>
    {
        // gltf.scene.traverse((child) => {
        //     // console.log(child);
        //     child.material = bakedMaterial // on refere notre material créé plus haut et on l'applique sur la scene et tout ses childs
        // })

        const bakedMesh = gltf.scene.children.find((child) => 
                            {
                                return child.name === 'Baked'
                            })

                            bakedMesh.material = bakedMaterial

        // On traverse tous les mesh enfants jusqu'a ce qu'on trouve celui nomé `poleLightA`, etc...
        const poleLightAMesh = gltf.scene.children.find((child) => 
                                {
                                    return child.name === 'poleLightA'
                                })

                                poleLightAMesh.material = poleLightMaterial

        const poleLightBMesh = gltf.scene.children.find((child) => 
                                {
                                    return child.name === 'poleLightB'
                                })

                                poleLightBMesh.material = poleLightMaterial

        const portalLightMesh = gltf.scene.children.find((child) => 
                                {
                                    return child.name === 'portalLight'
                                })

                                portalLightMesh.material = portalLightMaterial

        scene.add(gltf.scene); // On ajoute mon model portal a la scene
    }
)

/**
 * Fireflies
 */
// Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positionArray = new Float32Array(firefliesCount * 3) // multiplie par 3 a cause du XYZ
const scaleArray = new Float32Array(firefliesCount)

for(let i = 0; i < firefliesCount; i++)
{
    positionArray[i * 3 + 0] = (Math.random() - 0.62) * 4 // X
    positionArray[i * 3 + 1] = (Math.random() + 0.25) * 1.9 // Y
    positionArray[i * 3 + 2] = (Math.random() - 0.8) * 4 // Z

    scaleArray[i] = Math.random()
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material
const firefliesMaterial = new THREE.ShaderMaterial({ 
    uniforms:
    {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2)},
        uSize: { value: 150 }
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending, // Ajoute la couleur de ce qui est en background au fireflies
    depthWrite: false
 })

 gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('firefliesSize')

// Points
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

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

    // Update Fireflies
    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Check if camera position is stored in localStorage
if (localStorage.getItem('cameraPosition')) {
    // If stored, parse the position string and set the camera position
    const cameraPosition = JSON.parse(localStorage.getItem('cameraPosition'));
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
} else {
    // If not stored, set a default camera position
    camera.position.set(4, 2, 4);
}

// Update controls target
controls.target.set(0, 0, 0);
controls.update();

// Event listener to save camera position when the window is unloaded
window.addEventListener('beforeunload', () => {
    localStorage.setItem('cameraPosition', JSON.stringify(camera.position));
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Object Gui pour le background
debugObject.clearColor = '#1e161f'
renderer.setClearColor(debugObject.clearColor)
gui
    .addColor(debugObject, 'clearColor')
    .onChange(() => 
    {
        renderer.setClearColor(debugObject.clearColor)
    })


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Materials
    firefliesMaterial.uniforms.uTime.value = elapsedTime
    portalLightMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()