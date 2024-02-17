import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Clicker from './Clicker.jsx'

const root = createRoot(document.querySelector('#root'))

const toto = 'there!'

root.render(
    <>
        <h1 className="title" style={ {color: 'coral', backgroundColor: 'lightgray'} }>
            Hello { toto }
        </h1>
        <p className='cute-paragraph'><strong>Lorem ipsum dolor</strong><br />sit amet consectetur adipisicing elit. Illo mollitia obcaecati minus enim! Ducimus earum veniam tenetur commodi vitae itaque, soluta, veritatis, quasi eos fugit sit officia sequi ipsa ea.</p>
        {/* <input type="checkbox" id="the-checkbox" />
        <label htmlFor="the-checkbox"> That Checkbox</label> */}

        <div>
            <App clickersCount={ 7 }>
                <h1>My First React App</h1>
                <h2>And a fancy subtitle</h2>
            </App>
        </div>

    </>
)