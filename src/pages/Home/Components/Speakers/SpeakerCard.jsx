import React from 'react'
import './SpeakerCard.css';
function SpeakerCard({img}) {
  return (
    <div className='speakerCard'>
      <div className='speakerCardImg'>
          <img src={img} alt=""/>
      </div>
    </div>
  )
}

export default SpeakerCard
