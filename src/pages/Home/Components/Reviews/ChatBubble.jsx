import React from 'react'
import './ChatBubble.css'

function ChatBubble({name, review}) {
  return (
    <div className="chatBubble">
        <div className="content">
            <p>{review}</p>
            <b>{name}</b>
        </div>
    </div>
  )
}

export default ChatBubble