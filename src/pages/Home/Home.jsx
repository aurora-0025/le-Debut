import React, { useContext, useEffect, useRef, useState } from 'react'
import charsImage from '../../assets/images/headerLegoCharacters.png'
import lego3brick from '../../assets/images/lego3brick.png'
import eye from '../../assets/images/eye.png'
import stellar from '../../assets/images/stellar.png'
import rectangle from '../../assets/images/Rectangle.png'
import eyeoutlights from '../../assets/images/keepeyeoutlights.png'
import reviewTopLight from '../../assets/images/reviewTopLight.png'
import topLeftLight from '../../assets/images/lighttopleft.png'
import reviewBottomLight from '../../assets/images/reviewBottomLight.png'

import './Home.css'
import speakersData from './Components/Speakers/speakersData'
import reviewsData from './Components/Reviews/reviewData'
import SpeakerCard from './Components/Speakers/SpeakerCard'
import ChatBubble from './Components/Reviews/ChatBubble'
import { AppContext } from '../../context/AppContext'
import Loader from '../../components/Loading/Loader'
import EventCard from './Components/Events/EventCard'

function Home() {
    const [loading, setLoading] = useState(false)
    const [loadingTimer, setLoadingTimer] = useState(true)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [buttonHighlight, setButtonHighlight] = useState(false)

    const speakersRef = useRef(null)
    const sponsorsRef = useRef(null)
    const landingRef = useRef(null)

    const { store, actions } = useContext(AppContext)

    useEffect(() => {
        window.addEventListener('load', () => {
            actions?.setBackgroundColor('#42a5f5')
            setLoading(false)
        })
        setTimeout(() => {
            setLoadingTimer(false)
        }, 2000)
        return () => window.removeEventListener('load', () => setLoading(false))
    }, [])

    useEffect(() => {
        if(!speakersRef) return;
        actions.setSpeakersRef(speakersRef)
    }, [speakersRef])

    useEffect(() => {
        if(!sponsorsRef) return;
        actions.setSponsorsRef(sponsorsRef)
    }, [sponsorsRef])

    return !loading && !loadingTimer ? (
        <div id='home'>
            <div className='main'>
                <div className='landing' ref={landingRef}>
                    <h1>freshers ahoy !</h1>
                    <h2>it&apos;s time to make your debut</h2>
                    <div className='landing_dateWrapper'>
                        <img src={lego3brick} alt='' />
                        <h4>25th & 26th March 2023</h4>
                        <img className='closeBar' src={lego3brick} alt='' />
                    </div>
                    <a href='/register' className={`registerButton ${buttonHighlight&&'highlight'}`} type='button'>
                        Grab Your Spot Now <div className='btnHole' />
                        <div className='btnHole' />
                    </a>
                </div>

                <img alt='' src={charsImage} className='legoChars' />
            </div>
            <div className='about'>
                <div className='title'>
                    <h1>Not your average </h1>
                    <h1>
                        <span>freshers event</span>.
                    </h1>
                </div>
                <div className='player' >
                    <div id="wrap">
                        <iframe title="promo" src="https://drive.google.com/file/d/1f8jPcM92jHkDUjmy0Ta0GpkikBcFKki3/preview" width="440" height="280" allow="autoplay" />
                    </div>
                </div>
            </div>

            <div className='about1' id="speakers" ref={speakersRef}>
                <img alt='' src={topLeftLight} className='lights' />
                <div className='title'>
				<div className="titleContent">
                    <h1>our stellar speakers </h1>
                    <h1>
                        <span>to be unlocked soon</span>.
                    </h1>
					</div>
                </div>
                <div className='image'>
                <div className='player'>
                    <img src={stellar} alt='' />
                </div>
                <div className='playerin'>
                    <img src={rectangle} alt='' />
                </div>
                </div>
            </div>
          
            <div className='event'>
                <img alt='' src={eyeoutlights} className='lights' />
                <h1>
                    keep an{' '}
                    <img id='eyesImg' src={eye} style={{ width: '60px', height: '70px' }} alt='' />{' '}
                    out for
                </h1>
                <div className='eventsCardsContainer'>
                    <div className='eventCardsWrapper'>
                        <EventCard
                            event='techista'
                            img='techista'
                            eventDesc='unlocking the technical world piece by piece.'
                        />
                        <EventCard
                            event='designhub'
                            img='designhub'
                            eventDesc='designs that provide beyond practicality.'
                        />
                        <EventCard
                            event='foodie'
                            img='foodie'
                            eventDesc='from bakes & bites to mouth-watering recipes.'
                        />
                        <EventCard
                            event='lounge'
                            img='lounge'
                            eventDesc='meet the inspiring people in the limelight.'
                        />
                        <EventCard
                            event='arcade'
                            img='arcade'
                            eventDesc='bring out your inner gamer.'
                        />
                    </div>
                </div>
            </div>

            <div className='about1 ' id='sponsors' ref={sponsorsRef}>
                <div className='title'>
					<div className="titleContent">
						<h1>our sponsors </h1>
						<h1>
							<span>to be unlocked soon</span>.
						</h1>
					</div>
                </div>
                <div className='image'>
                <div className='player'>
                    <img src={stellar} alt='' />
                </div>
                <div className='playerin'>
                    <img src={rectangle} alt='' />
                </div>
                </div>
            </div>

            <div className='reviews'>
            <img alt='' src={reviewTopLight} className='toplight' />
            <img alt='' src={reviewBottomLight} className='bottomlight' />

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
                                <button type='button' onClick={()=> {
									landingRef?.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                    setButtonHighlight(true);
                                    setTimeout(() => {
                                        setButtonHighlight(false)
                                    }, 2000);

								}}>Yes</button>
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
