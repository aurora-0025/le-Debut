import React, { useContext, useEffect, useRef, useState } from 'react';
import charsImage from '../../assets/images/headerLegoCharacters.png'
import lego3brick from '../../assets/images/lego3brick.png'
import './Home.css'
import speakersData from './Components/Speakers/speakersData';
import reviewsData from './Components/Reviews/reviewData';
import SpeakerCard from './Components/Speakers/SpeakerCard';
import ChatBubble from './Components/Reviews/ChatBubble';
import { AppContext } from '../../context/AppContext';
import Loader from '../../components/Loading/Loader';

function Home () {
	const [loading, setLoading] = useState(false)
	const [loadingTimer, setLoadingTimer] = useState(true)
	const [loadingMsg, setLoadingMsg] = useState(null)
	const speakersRef = useRef(null);
    const {store, actions} = useContext(AppContext);

	useEffect(() => {
        window.addEventListener('load', ()=>setLoading(false))
		setTimeout(() => { 
			setLoadingTimer(false)
		  }, 2000)
        return () => window.removeEventListener('load', ()=>setLoading(false))
    }, [])

	useEffect(() => {
	  actions.setSpeakersRef(speakersRef)
	}, [speakersRef])
	
	return (
		!loading && !loadingTimer ? (
		<div id="home">
			<div className="landing">
				<h1>freshers ahoy !</h1>
				<h2>it&apos;s time to make your debut</h2>
				<div className='landing_dateWrapper'>
					<img src={lego3brick} alt="" />
					<h4>4th & 5th February 2023</h4>
				</div>
				<button className='registerButton' type='button'>Grab Your Spot Now <div className='btnHole'/><div className='btnHole' /></button>
			</div>
			<img alt="" src={charsImage} className="legoChars" />
			<div className="about">
				<div className="title">
					<h1>What is</h1>
					<h1><span>le&apos; debut</span>?</h1>
				</div>
				<div className="player" />
			</div>
			<div ref={speakersRef} className="speaker">
				<h1>speakers</h1>
				<div className="speakerCardsWrapper">
					{speakersData.map((s)=> (<SpeakerCard name={s.name} img={s.img} position={s.position} key={s.name} />))}
				</div>
			</div>
			<div className="reviews">
				<h1>Reviews</h1>
				<div className="reviewWrapper">
					{reviewsData.map((s)=> (<ChatBubble name={s.name} review={s.review} key={s.name} />))}
				</div>
			</div>
		</div>
		) : (
			<Loader loadingMsg={loadingMsg}/>
		)
	);
}

export default Home;
