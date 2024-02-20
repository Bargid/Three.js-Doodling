import { useState, useEffect, useRef } from "react"

export default function Clicker({ keyName, colorAttribute = 'black', increment }) { // le "=" est le default value

    console.log(keyName); // un props de App
    console.log(colorAttribute); // un props de App

    // On va chercher la valeur du nombres de clique store dans localStorage lors du load de la page
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0 )) // le "??" permet de mettre un resultat si null ou NaN
    const buttonRef = useRef()

    useEffect(() => {

        // console.log('first render')
        buttonRef.current.style.backgroundColor = 'papayawhip'
        buttonRef.current.style.color = 'salmon'

        return () => {


            // quand on hide le clicker, on detruit ce qui est dans localeStorage
            localStorage.removeItem(keyName)
        }
    }, [])

    useEffect(() => {

        localStorage.setItem(keyName, count)
    }, [ count ]) // le empty array appalle la fonction seulement "onload"

    const buttonClick = () => {

        // C'est pour s'assurer qu'on a toujours la valeur la plus recente
        setCount((value) => { return value + 1 })
        increment()
    }

    return <div>
        <div style={ { color: colorAttribute } }>Click count: { count }</div>
        <button ref={ buttonRef } onClick={ buttonClick }>Click me</button>
    </div>
}