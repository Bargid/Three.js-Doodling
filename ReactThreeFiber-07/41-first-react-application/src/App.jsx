import { useState, useMemo } from "react"
import Clicker from './Clicker.jsx'
import People from './People.jsx'

const colors = [
    `hsl(${Math.random() * 360}, 100%, 70%)`,
    `hsl(${Math.random() * 360}, 100%, 70%)`,
    `hsl(${Math.random() * 360}, 100%, 70%)`
]

export default function App({ children, clickersCount }) {

    const [ hasClicker, setHasClicker ] = useState(true)
    const [ count, setCount ] = useState(0)

    const toggleClickerClick = () => {

        setHasClicker(!hasClicker)
    }

    const increment = () => {

        setCount(count + 1)
    }

    // const colors = []
        
    // for(let i = 0; i < clickersCount; i++) {

    //     colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`)
    // }

    const colors = useMemo(() => {

        const colors = []
            
        for(let i = 0; i < clickersCount; i++) {

            colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`)
        }

        return colors

    }, [clickersCount])

    return <>
        { children }

        <div>Total Count : { count } </div>

        <button onClick={toggleClickerClick}>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
        { hasClicker ? <>
                        { [...Array(clickersCount)].map((value, index) => {
                            return <Clicker
                                        key={ index } // si tu peux avoir un ID dún API, utilise le
                                        increment={ increment }
                                        keyName={`count ${index}`}
                                        colorAttribute={ colors[index] }
                                    />
                        }) }
                       </> : null}
        <People />
    </>
}