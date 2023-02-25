import React from 'react'
import './Success.css'

function Success() {
    return (
        <div className='successPage'>
            <h1>see you</h1>
            <h1 className='ledebut'>@ledebut&apos;23!</h1>
            <h4>follow @gdscmbcet for more updates.</h4>
            <h4>here&apos;s a small surprise for you</h4>
            <a className='uploadButton' href='/badge'>
                click here
                <div className='btnHole' />
                <div className='btnHole' />
            </a>
        </div>
    )
}

export default Success
