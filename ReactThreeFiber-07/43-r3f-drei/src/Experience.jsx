import { Html, PivotControls, OrbitControls, TransformControls } from '@react-three/drei'
import { useRef } from 'react'


export default function Experience()
{
    const cube = useRef()
    const sphere = useRef()

    return <>

        <OrbitControls makeDefault enableDamping={ true }/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <PivotControls 
            anchor={ [0, 0, 0] } // Valeurs relative en lien a l'objet. 1 est la limite du mesh (y 1 est au dessus de la sphere)
            depthTest={ false }
            lineWidth={ 4 }
            axisColors={ ['#9381ff', '#ff4d6d', '#7ae582'] }
            scale={ 100 } // valeur en pixel
            fixed={ true }
        >
            <mesh ref={ sphere } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html 
                    position={ [1, 1, 0] }
                    wrapperClass='label'
                    center // centre le pivot du tag HTML
                    distanceFactor={ 6 } // change le format du tag HTML selon la distance
                    occlude={ [cube] }
                >Ceci est une orange 👍</Html>
            </mesh>
        </PivotControls>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={ cube } mode="translate" /> {/* Permet de scaler les objet directement dans la scene. Change mode pour rotation, scale, translate */}

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}