import React from 'react'
import './SpeakerCard.css'

function SpeakerCard({name, position, img}) {
  return (
    <div className='speakerCard'>
        <div className="speakerCardImg">
            <div className='speakerImg' style={{'backgroundImage':`url("../../../../assets/images/speakersImgs/${img}")`}} />
        </div>
        <h3>{name}</h3>
        <h4>{position}</h4>
    </div>
  )
}

export default SpeakerCard