
import { useGLTF, Clone } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb') // en utilsiant drei et useGLTF, le lload de models est beaucoup plus simple

    return <>
        {/* Clone permet de... cloner le model utilisé, plutot que Primitive */}
        <Clone object={ model.scene } scale={ 0.35 } position-x={ -4 }/>
        <Clone object={ model.scene } scale={ 0.35 } position-x={ 0 }/>
        <Clone object={ model.scene } scale={ 0.35 } position-x={ 4 }/>
    </>

}

useGLTF.preload('./hamburger-draco.glb')