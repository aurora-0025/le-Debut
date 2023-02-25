import React, { useContext, useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/ledebutlogo.png'
import legobrick from '../../assets/images/lego-brick.png'
import './NavBar.css'
import menuIcon from './menu.svg';
import { AppContext } from '../../context/AppContext';

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const {store, actions} = useContext(AppContext);
    const [toggle, setToggle] = useState(false);
    const [activeLink, setActiveLink] = useState(null);


    useEffect(() => {
        if (location.pathname === '/') {
            setActiveLink('home')
        }
        else {
            setActiveLink('register')
        }
    }, [location])
    

    const executeScroll = (link) => {
        console.log(store);
        if(location.pathname !== '/') {
            navigate('/');
        }
        else if (link === 'sponsor') {
            store.sponsorsRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        else {
            store.speakersRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
    const changeToggle = () => {
        setToggle(!toggle);
    }
    return (
        <div id='navBar'>
            <div className='logoWrapper'>
                <img alt='ledebut logo' src={Logo} />
            </div>
            <ul className={`${toggle?'navLinks menu active':'navLinks'}`}>
                <li className={`${activeLink === 'home' && "activelink"}`}>
                    <a href='/'>Home</a>
                </li>
                <li onKeyDown={()=>executeScroll("speaker")} onClick={()=>executeScroll("speaker")}>Speakers</li>
                <li onKeyDown={()=>executeScroll("sponsor")} onClick={()=>executeScroll("sponsor")}>
                    Sponsors
                </li>
                <li className={`${activeLink === 'register'&& "activelink"}`}>
                    <a href='/register'>Register</a>
                </li>
            </ul>
            <img className='hamburgerMenu' src={menuIcon} onClick={changeToggle} onKeyDown={changeToggle} alt="" />
            <div role='none'
                className={toggle ? 'backgroundOverlay' : 'backgroundOverlay backgroundOverlayClosed'}
                onClick={() => {
                    setToggle(false);
                }}
                onKeyDown={() => {
                    setToggle(false);
                }}
             />
        </div>
    )
}

export default NavBar
