import React from 'react'
import './SpeakerCard.css';

function SpeakerCard({img,name,desc}) {
  return (
    <div className='speakerCard'>
      <div className='speakerCardImg'>
          <img src={img} alt=""/>
      </div>
      <h1>{name}</h1>
      <h3>{desc}</h3>
    </div>
  )
}

export default SpeakerCard
