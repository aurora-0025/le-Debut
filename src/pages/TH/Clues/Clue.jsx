import React, { useEffect, useState } from 'react'
import TreasureHunt from '../TreasureHunt';
import './Clue.css'

function Clue({clue}) {
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
            <div className='clueContainer'>
                <div className='clue'>
                    <div>{clue}<span className="cursor"></span></div>
                </div>
            </div>
			</TreasureHunt>
        </>
	)
}

export default Clue