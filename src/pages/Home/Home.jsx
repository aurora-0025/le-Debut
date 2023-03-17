import React, { useContext, useEffect, useRef, useState } from 'react'
import charsImage from '../../assets/images/headerLegoCharacters.png'
import lego3brick from '../../assets/images/lego3brick.png'
import eye from '../../assets/images/eye.png'
import star from '../../assets/images/star.png'
import star1 from '../../assets/images/star1.png'
import star3 from '../../assets/images/star3.png'
import star4 from '../../assets/images/star.png'
import cloud1 from '../../assets/images/cloud1.png'
import cloud2 from '../../assets/images/cloud2.png'
import stellar from '../../assets/images/stellar.png'
import rectangle from '../../assets/images/Rectangle.png'
import eyeoutlights from '../../assets/images/keepeyeoutlights.png'
import reviewTopLight from '../../assets/images/reviewTopLight.png'
import topLeftLight from '../../assets/images/lighttopleft.png'
import reviewBottomLight from '../../assets/images/reviewBottomLight.png'
import speaker1 from '../../assets/images/speaker1.png';
import speaker2 from '../../assets/images/speaker2.png';
import speaker3 from '../../assets/images/speaker3.png';
import speaker4 from '../../assets/images/speaker4.png';
import speaker5 from '../../assets/images/speaker5.png';
import speaker6 from '../../assets/images/speaker6.png';
import speaker7 from '../../assets/images/speaker7.png';
import speaker8 from '../../assets/images/speaker8.png';
import speaker9 from '../../assets/images/speaker9.png';
import './Home.css'

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
                <img src={cloud1} alt='' className='cloud1'/>
                <img src={cloud2} alt='' className='cloud2'/>
                <img alt='' src={charsImage} className='legoChars' />
            </div>
            <div className='about'>
            <div className='star'>
                <img className='star3' src={star3} alt=''/>
                  <img className='star4' src={star4} alt=''/>
                 
                </div>
                
                <div className='title'>
                    <h1>Not your average </h1>
                    <h1>
                        <span>freshers event</span>.
                    </h1>
                    <p>@MBCET Campus</p>
                </div>
                
                <div className='player' >
                    <div id="wrap">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/wCmt2Oa9Olk" title="promo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen/>
                        {/* <iframe title="promo" src="https://drive.google.com/file/d/1f8jPcM92jHkDUjmy0Ta0GpkikBcFKki3/preview" width="440" height="280" allow="autoplay" /> */}
                    </div>
                </div>
            </div>

            <div className='about1' id="speakers" ref={speakersRef}>
                {/* <img alt='' src={topLeftLight} className='lights' /> */}
                
				<div className="titleContent">
                 <h1>our stellar speakers</h1>  
                </div>
                <div className='stars'>
                <img className='star2' src={star1} alt=''/>
                  <img className='star1' src={star} alt=''/>
                 
                </div>
                <div className='speakers'>
                <SpeakerCard img={speaker1} />
                <SpeakerCard img={speaker2}/>
                <SpeakerCard img={speaker3}/>
                <SpeakerCard img={speaker4}/>
                <SpeakerCard img={speaker5}/>
                <SpeakerCard img={speaker6}/>
                <SpeakerCard img={speaker7}/>
                <SpeakerCard img={speaker8}/>
                <SpeakerCard img={speaker9}/>
                </div>
                
           
          </div>
            <div className='event'>
                {/* <img alt='' src={eyeoutlights} className='lights' /> */}
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

            

            <div className='reviews'>
            {/* <img alt='' src={reviewTopLight} className='toplight' /> */}
            {/* <img alt='' src={reviewBottomLight} className='bottomlight' /> */}

                <h1>our past reviews</h1>
                <div className='reviewWrapper'>
                    {reviewsData.map((s) => (
                        <ChatBubble name={s.name} review={s.review} key={s.name} />
                    ))}
                    <div className='chatBubble'>
                        <div className='content'>
                            <p>So What are you waiting for?</p>
                            <p>Join us and <b>let&apos;s do cool things that matter.</b></p>
                            <div className='buttonContainer'>
                                <button type='button' onClick={()=> {
									landingRef?.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                    setButtonHighlight(true);
                                    setTimeout(() => {
                                        setButtonHighlight(false)
                                    }, 2000);

								}}>Count me in</button>
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
