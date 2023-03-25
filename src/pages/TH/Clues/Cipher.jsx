import React, { useEffect, useState } from 'react'
import TreasureHunt from '../TreasureHunt';
import './Cipher.css'

function Cipher({cipher, image}) {
    const [showTransition, setShowTransition] = useState(true);

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
			<div className="imgContainer">
				<img src={image} alt="" />
			</div>
            <div className='clueContainer'>
                <div className='clue'>
                    <div>{cipher}<span className="cursor"></span></div>
                </div>
            </div>
			</TreasureHunt>
        </>
	)
}

export default Cipher