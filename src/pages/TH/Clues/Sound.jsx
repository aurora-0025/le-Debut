import React, { useEffect, useRef, useState } from 'react'
import TreasureHunt from '../TreasureHunt'
import './Sound.css'

function Sound({ soundFile, link }) {
    const [showTransition, setShowTransition] = useState(true);
	const audioRef = useRef(null)
	function playAudio(e) {
		audioRef.current.play()
	}
    useEffect(()=> {
        if(showTransition) {
            setTimeout(() => {
                setShowTransition(false);
            }, 2000);
        }
    }, [showTransition])
    return (
        <>
			<TreasureHunt>
            <div className={`transition-wrapper ${showTransition ? 'black' : 'no-bg'}`}></div>
            <div className='clueContainer'>
                <div className='clue'>
                    <div>Some clue here.</div>
                </div>
                <div className='soundIcon'>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#008000" d="M9 18h-7v-12h7v12zm2-12v12l11 6v-24l-11 6z"/></svg>
						<p>?.mp3</p>
                </div>
				<audio ref={audioRef} src={soundFile} />
                <div className="buttonContainer">
					<button onClick={(e)=>playAudio(e)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#008000" d="M3 22v-20l18 10-18 10z"/></svg>
					</button>
                    <a href={link}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#008000" d="M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z"/></svg></a>
                </div>
            </div>
			</TreasureHunt>
        </>
    )
}

export default Sound
