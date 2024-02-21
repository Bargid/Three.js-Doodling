import { extend, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject'


extend({ OrbitControls })

export default function Experience() 
{
    const { camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) => 
    {
        // console.log(state.camera)
        // console.log(state.clock.elapsedTime)

        // La camera va tourner autours de la scene et regarder au centre.
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 6
        // state.camera.position.z = Math.cos(angle) * 6
        // state.camera.lookAt(0, 0, 0)


        cubeRef.current.rotation.y += delta // le delta est pour permettre une uniformisation selon le framerate
        // groupRef.current.rotation.y += delta
    })

    return <>

        <orbitControls args={ [camera, gl.domElement] }/>

        <directionalLight position={ [1, 2, 3] } intensity={ 4.5 }/>
        <ambientLight intensity={ 1.5 }/>

        <group ref={ groupRef }>
            {/* Le SCALE et la ROTATION ce font directement sur le mesh */}
            <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.23 } position-x={ 2 } scale={ [ 1.5, 1.5, 1.5 ] } > {/* scale = XYZ */}
                <boxGeometry args={ [1.5] }/>
                <meshStandardMaterial color="mediumpurple" wireframe={ false }/>
            </mesh>
            
            <mesh position-x={ -2 }>
                <sphereGeometry args={ [1.5, 26, 26] } />
                <meshStandardMaterial color="#ff0000" wireframe={ false } />
            </mesh>
        </group>

        <mesh rotation-x={ - Math.PI * 0.5 }position-y={ -1.5 } scale={ [10, 10, 10] }>
            <planeGeometry args={ [1] }/>
            <meshStandardMaterial color ="greenyellow" />
        </mesh>

        <CustomObject />
    </>
}