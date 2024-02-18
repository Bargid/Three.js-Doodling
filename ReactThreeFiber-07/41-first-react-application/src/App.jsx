import { useState } from "react"
import Clicker from './Clicker.jsx'

export default function App({ children, clickersCount }) {

    const [ hasClicker, setHasClicker ] = useState(true)
    const [ count, setCount ] = useState(0)

    const toggleClickerClick = () => {

        setHasClicker(!hasClicker)
    }

    const increment = () => {

        setCount(count + 1)
    }

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
                                        colorAttribute={`hsl(${Math.random() * 360}, 100%, 70%)`}
                                    />
                        }) }
                       </> : null}
    </>
}