import React, { useContext } from 'react'
import './Footer.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiFillInstagram, AiFillMail, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';
import { AppContext } from '../../context/AppContext';

function Footer() {
    const {store, actions} = useContext(AppContext);
    const executeScroll = () => store.speakersRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' })  
  return (
    <div className='Footer' style={{backgroundColor: store.footerColor}}>
        <div className="footer_about">
            <h3>Google Developer Student Clubs, MBCET</h3>
            <p>Google Developer Student Clubs are university based community groups for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome.</p>
        </div>
        <div className='quickLinks'>
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <p onKeyDown={executeScroll} onClick={executeScroll}>Speakers</p>
            {/* <a href="/register">Register</a> */}
            <a href="/">Website</a>
        </div>
        <div className='findUs'>
            <h3>Find Us</h3>
            <div className="iconWrapper">
                <a href="https://www.instagram.com/gdscmbcet/">
                    <AiFillInstagram style={{ marginRight: '10px' }} size={25} />
                </a>
                <a href="mailto:dscmbcet@gmail.com">
                    <AiFillMail style={{ marginRight: '10px' }} size={25} />
                </a>
                <a href="https://twitter.com/gdscmbcet">
                    <AiOutlineTwitter style={{ marginRight: '10px' }} size={25} />
                </a>
                <a href="https://www.linkedin.com/company/dsc-mbcet/">
                    <AiFillLinkedin style={{ marginRight: '10px' }} size={25} />
                </a>
            </div>
        </div>
    </div>
  )
}

export default Footer