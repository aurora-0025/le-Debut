import React from 'react'
import './EventCard.css'

function EventCard({event, img, eventDesc}) {
  return (
    <div className='eventCard'>
        <div className="eventCardImg">
            <div className='eventImg' style={{'backgroundImage':`url("/assets/images/eventImgs/${img}.png")`}} />
            <div className='desc'><p>{eventDesc}</p></div>
        </div>
        <h3>le debut</h3>
        <h4>{event}</h4>
    </div>
  )
}

export default EventCard