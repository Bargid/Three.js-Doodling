import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { EffectComposer, Vignette, ToneMapping, Glitch, Noise, Bloom, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { useControls } from 'leva'
import Drunk from './Drunk.js'
import { useRef } from 'react'


export default function Experience()
{

    const drunkRef = useRef()

    const drunkProps = useControls('Drunk Effect', 
    {
        frequency: { value: 2, min: 1, max: 20},
        amplitude: { value: 0.1, min: 0, max: 1},
        offset: { value: 0, min: 0, max: 10}
    })

    return <>

        <color args={ ['#ffffff'] } attach="background" /> {/* Il faut toujours attach une couleur ou qulquechose au background, puisqu'il est naturellement transparant */}

        <EffectComposer disableNormalPass multisampling={ 8 }>

            {/* <Vignette 
                offset={ 0.5 }
                darkness={ 0.7 }
                blendFunction={ BlendFunction.NORMAL }
            /> */}

            {/* <Glitch 
                delay={ [ 1, 2 ] }
                duration={ [ 0.1, 0.3 ] }
                strength={ [ 0.2, 0.4 ] }
                mode={ GlitchMode.CONSTANT_WILD }
            /> */}

            {/* <Noise
                premultiply
                blendFunction={ BlendFunction.SOFT_LIGHT }
            /> */}

            {/* <Bloom 
                luminanceThreshold={ 0.6 }
                intensity={ 0.5 }
                mipmapBlur
            /> */}

            {/* <DepthOfField 
                focusDistance={ 0.025 }
                focusLength={ 0.025 }
                bokehScale={ 6 }
            /> */}
            
            <Drunk
                ref={ drunkRef }
                { ...drunkProps }
                blendFunction={ BlendFunction.DARKEN }
            />


            <ToneMapping />

        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}