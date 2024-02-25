import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    const { animationName } = useControls({
        animationName: { options: animations.names } // on prend le nom des animations qui existent deja dans l'objet
    })

    useEffect(() =>
    {
        const action = animations.actions[animationName] // on va chercher l'animation Run dans action qui est dans notre const animations...
        action
            .reset()
            .fadeIn(0.5)
            .play()

        return () =>
        {
            action.fadeOut(0.5) // sera appelé apres une action dans la function superieur. C`est le cleanup phase
        }

        // window.setTimeout(() => 
        // {
        //     // il faut appeler l'animation de walk et ensuite, le crossfade vers celle-ci (avec comme propriete, l'animation de laquelle on fade et le temps du fade)
        //     animations.actions.Walk.play()
        //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
        // }, 2000)

    }, [ animationName ]) // cette action (useEffect) sera appelé quand la variable change

    return <primitive 
                object={ fox.scene }
                scale={ 0.02 }
                position={ [ -2.5, 0, 2.5 ] }
                rotation-y={ 0.3 }
            />
}