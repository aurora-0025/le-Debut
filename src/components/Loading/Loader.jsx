import React from 'react'
import './Loader.css'
import lego3brick from '../../assets/images/lego3brick.png'

function Loader({loadingMsg}) {
  return (
    <div className='loadingScreen'>
    <div className='loadingContainer'>
        <h3>{loadingMsg}</h3>
        <img src={lego3brick} alt="" />
    </div>
</div>
  )
}

export default Loader