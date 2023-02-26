import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import './Success.css'

function Success() {
    const { store, actions } = useContext(AppContext)

    return (
        <div className='successPage'>
            <h1>see you</h1>
            <h1 className='ledebut'>@ledebut&apos;23!</h1>
            <h4>follow @gdscmbcet for more updates.</h4>
            <h4>here&apos;s a small surprise for you</h4>
            <a
                className='uploadButton'
                href='/badge'
                onClick={() => {
                    actions?.setBackgroundColor('#1a1a1a')
                    actions?.setFooterColor('#42a5f5')
                }}
            >
                click here
                <div className='btnHole' />
                <div className='btnHole' />
            </a>
        </div>
    )
}

export default Success
