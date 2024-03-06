import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const donutsGroup = useRef()
    const [ torusGeometry, setTorusGeometry ] = useState()
    const [ material, setMaterial ] = useState()

    const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)

    // useEffect(() => 
    // {
    //     matcapTexture.encoding = THREE.SRGBColorSpace
    //     matcapTexture.needsUpdate = true

    //     material.matcap = matcapTexture
    //     material.needsUpdate = true
    // }, [])

    // const tempArray = [...Array(100)]
    // tempArray.map(() =>
    // {
    //     console.log('value');
    // })
    
    useFrame((state, delta) => 
    {
        // On loop au travers du donutGroups pour animer chaque donut independemment
        for(const donut of donutsGroup.current.children)
        {
            donut.rotation.y += delta * 0.2
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <torusGeometry ref={ setTorusGeometry } args={ [1, 0.6, 16, 48] } />
        <meshMatcapMaterial ref={ setMaterial } matcap={matcapTexture[0]} />

        <Center>
            <Text3D 
                font="./fonts/helvetiker_regular.typeface.json"
                material={ material }
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                HELLO R3F
            </Text3D>
        </Center>

        <group ref={ donutsGroup }>
            { [...Array(100)].map((value, index) => 
                <mesh
                key={ index }
                geometry={ torusGeometry }
                material={ material }
                    position={ [
                        (Math.random() -0.5) * 10,
                        (Math.random() -0.5) * 10,
                        (Math.random() -0.5) * 10
                    ] }
                    scale={ 0.2 + Math.random() * 0.2 }
                    rotation={ [
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ] }
                />
                
            ) }
        </group>

    </>
}