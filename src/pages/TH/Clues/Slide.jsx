import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import './Slide.css'
import TreasureHunt from '../TreasureHunt'

function Slide({clue}) {
    // ['1', '2', '3', '4', '5', '6', '7', '8', 'empty'];
    // const [tiles, setTiles] = useState(['1', '2', '3', '4', '5', '6', '7', 'empty', '8'])
    const [tiles, setTiles] = useState(['8', '6', '4', '3', 'empty', '1', '2', '7', '5'])
    const [solved, setSolved] = useState(false)
    const [showClue, setShowClue] = useState(false)
    const [showTransition, setShowTransition] = useState(true);

    function checkWin() {
        console.log(tiles)
        if (tiles.toString() == ['1', '2', '3', '4', '5', '6', '7', '8', 'empty'].toString()) {
            setShowTransition(true);
            setTimeout(() => {
                setSolved(true);
            }, 2000);
            console.log('you win')
        }
    }

    function trackProgress(progress) {
        if (progress.playedSeconds > 60) {
            setShowTransition(true);
            setTimeout(() => {
                setShowClue(true);
            }, 2000);
        }
    }

    useEffect(()=> {
        if(showTransition) {
            setTimeout(() => {
                setShowTransition(false);
            }, 2000);
        }
    }, [showTransition])

    function moveSlide(e) {
        /**
         * @type {HTMLElement}
         */
        const clickedSlide = e.target
        const index = parseInt(clickedSlide.getAttribute('data-index'), 10)
        // check right
        const newTiles = tiles
        let newIndex = index
        if (index + 1 <= 8 && newTiles[index + 1] === 'empty' && (index + 1) % 3 !== 0) {
            newIndex = index + 1
            ;[newTiles[index], newTiles[index + 1]] = [newTiles[index + 1], newTiles[index]]
        } else if (index - 1 >= 0 && newTiles[index - 1] === 'empty' && (index - 1) % 3 !== 2) {
            newIndex = index - 1
            ;[newTiles[index], newTiles[index - 1]] = [newTiles[index - 1], newTiles[index]]
        } else if (index - 3 >= 0 && newTiles[index - 3] === 'empty') {
            newIndex = index - 3
            ;[newTiles[index], newTiles[index - 3]] = [newTiles[index - 3], newTiles[index]]
        } else if (index + 3 >= 0 && newTiles[index + 3] === 'empty') {
            newIndex = index + 3
            ;[newTiles[index], newTiles[index + 3]] = [newTiles[index + 3], newTiles[index]]
        } else return

        console.log(newIndex + 1)
        console.log(newTiles[newIndex])
        clickedSlide.classList.add('popout')
        setTimeout(() => {
            clickedSlide.classList.remove('popout')
        }, 200)
        // eslint-disable-next-line eqeqeq
        if (newIndex + 1 == newTiles[newIndex]) {
            clickedSlide.setAttribute('data-correct', true)
        } else if (clickedSlide.getAttribute('data-correct', true)) {
            clickedSlide.setAttribute('data-correct', false)
        }
        setTiles([...newTiles])
        checkWin()
    }

    return (
        <>
            <TreasureHunt>
				<div className={`transition-wrapper ${showTransition?'black':'no-bg'}`}></div>
                {!solved ? (
                    <div className='slide_container'>
                        {tiles.map((tile, index) => (
                            <button
                                id={tile}
                                key={tile}
                                type='button'
                                data-index={index}
                                onClick={(e) => moveSlide(e)}
                                className='slide_block'
                            >
                                {tile}
                            </button>
                        ))}
                    </div>
                ) : (
                        <>
                            {showClue ? (
                                <div className="clueContainer">
                                    <div>{clue}</div>
                                </div>
                            ) : (
                                <div className='player-wrapper'>
                                    <p>WARNING: DO NOT CLOSE</p>
                                    <div className='nonclickable' />
                                    <ReactPlayer
                                        className='react-player'
                                        playing
                                        url='https://drive.google.com/u/0/uc?id=185v__vjs3xRH7cYuQ1BAwr0aUl0gPywf&export=download'
                                        onProgress={(p) => trackProgress(p)}
                                        stopOnUnmount={true}
                                        progressInterval={10000}
                                        width='100%'
                                        height='100%'
                                        config={{
                                            youtube: {
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    modestbranding: 1,
                                                    origin: 'https://le-debut.vercel.app',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            )}
                    </>
                )}
            </TreasureHunt>
        </>
    )
}

export default Slide
