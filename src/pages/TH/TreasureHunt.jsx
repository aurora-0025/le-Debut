import React from 'react'
import './TreasureHunt.css'
import RiddlerImg from '../../assets/images/riddler.png'

function TreasureHunt({ children }) {
    return (
		<div className='treasureHunt'>
			<div id='monitor'>
				<div id='bezel'>
					<div id='crt'>
						<div className='scanline'></div>
					</div>
				</div>
				<div className='monitor_content'>
					{children}
				</div>
			</div>
        </div>
    )
}

export default TreasureHunt
