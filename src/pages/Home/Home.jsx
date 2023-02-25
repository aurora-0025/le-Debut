import React, { useContext, useEffect, useRef, useState } from 'react'
import charsImage from '../../assets/images/headerLegoCharacters.png'
import lego3brick from '../../assets/images/lego3brick.png'
import eye from '../../assets/images/eye.png'
import stellar from '../../assets/images/stellar.png'
import './Home.css'
import speakersData from './Components/Speakers/speakersData'
import reviewsData from './Components/Reviews/reviewData'
import SpeakerCard from './Components/Speakers/SpeakerCard'
import ChatBubble from './Components/Reviews/ChatBubble'
import { AppContext } from '../../context/AppContext'
import Loader from '../../components/Loading/Loader'

function Home() {
    const [loading, setLoading] = useState(false)
    const [loadingTimer, setLoadingTimer] = useState(true)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const speakersRef = useRef(null)
    const { store, actions } = useContext(AppContext)

	useEffect(() => {
        window.addEventListener('load', ()=> {
			actions?.setBackgroundColor('#42a5f5');
			setLoading(false)
		})
		setTimeout(() => { 
			setLoadingTimer(false)
		  }, 4000)
        return () => window.removeEventListener('load', ()=>setLoading(false))
    }, [])

    useEffect(() => {
        actions.setSpeakersRef(speakersRef)
    }, [speakersRef])

    return !loading && !loadingTimer ? (
        <div id='home'>
            <div className='main'>
                <div className='landing'>
                    <h1>freshers ahoy !</h1>
                    <h2>it&apos;s time to make your debut</h2>
                    <div className='landing_dateWrapper'>
                        <img src={lego3brick} alt='' />
                        <h4>4th & 5th February 2023</h4>
                        <img className='closeBar' src={lego3brick} alt='' />
                    </div>
                    <button className='registerButton' type='button'>
                        Grab Your Spot Now <div className='btnHole' />
                        <div className='btnHole' />
                    </button>
                </div>

                <img alt='' src={charsImage} className='legoChars' />
            </div>
            <div className='about'>
                <div className='title'>
                    <h1>Not your average </h1>
                    <h1>
                        <span>freshers event.</span>
                    </h1>
                </div>
                <div className='player' />
            </div>

            <div className='about1'>
                <div className='title'>
                    <h1>our stellar speakers </h1>
                    <h1>
                        <span>to be unlocked soon.</span>
                    </h1>
                </div>
                <div className='player'>
                    <img src={stellar} alt='' />
                </div>
            </div>

            <div ref={speakersRef} className='speaker'>
                <h1>
                    keep an <img src={eye} style={{ width: '60px', height: '70px' }} alt='' /> out
                    for
                </h1>
                <div className='speakerCardsWrapper'>
                    <div className='speakerCard'>
                        <div className='speakerCardImg'>
                            <div
                                className='speakerImg'
                                style={{
                                    backgroundImage: `url("/assets/images/speakersImgs/spk1.png")`,
                                }}
                            />
                        </div>
                        <h3>le debut </h3>
                        <h4>techista</h4>
                    </div>
                    <div className='speakerCard'>
                        <div className='speakerCardImg'>
                            <div
                                className='speakerImg'
                                style={{
                                    backgroundImage: `url("/assets/images/speakersImgs/spk1.png")`,
                                }}
                            />
                        </div>
                        <h3>le debut </h3>
                        <h4>designhub</h4>
                    </div>
                    <div className='speakerCard'>
                        <div className='speakerCardImg'>
                            <div
                                className='speakerImg'
                                style={{
                                    backgroundImage: `url("/assets/images/speakersImgs/spk1.png")`,
                                }}
                            />
                        </div>
                        <h3>le debut </h3>
                        <h4>foodie</h4>
                    </div>

                    <div className='speakerCard'>
                        <div className='speakerCardImg'>
                            <div
                                className='speakerImg'
                                style={{
                                    backgroundImage: `url("/assets/images/speakersImgs/spk1.png")`,
                                }}
                            />
                        </div>
                        <h3>le debut </h3>
                        <h4>lounge</h4>
                    </div>
                    <div className='speakerCard'>
                        <div className='speakerCardImg'>
                            <div
                                className='speakerImg'
                                style={{
                                    backgroundImage: `url("/assets/images/speakersImgs/spk1.png")`,
                                }}
                            />
                        </div>
                        <h3>le debut </h3>
                        <h4>arcade</h4>
                    </div>
                </div>
            </div>

            <div className='about1 ' id='sponsers'>
                <div className='title'>
                    <h1>our stellar sponsers </h1>
                    <h1>
                        <span>to be unlocked soon.</span>
                    </h1>
                </div>
                <div className='player'>
                    <img src={stellar} alt='' />
                </div>
            </div>

            <div className='reviews'>
                <h1>our past reviews</h1>
                <div className='reviewWrapper'>
                    {reviewsData.map((s) => (
                        <ChatBubble name={s.name} review={s.review} key={s.name} />
                    ))}
                    <div className='chatBubble'>
                        <div className='content'>
                            <p>So What are you waiting for?</p>
                            <p>Ready to join us and let&apos;s do cool things that matter?</p>
                            <div className='buttonContainer'>
                                <button type='button'>Yes</button>
                                <button type='button'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loader loadingMsg={loadingMsg} />
    )
}

export default Home
