import React, { useContext, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/ledebutlogo.png'
import './NavBar.css'
import menuIcon from './menu.svg';
import { AppContext } from '../../context/AppContext';

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const {store, actions} = useContext(AppContext);
    const [toggle, setToggle] = useState(false);
    const changeToggle = () => {
        setToggle(!toggle);
    }
    const executeScroll = () => {
        changeToggle();
        if(location.pathname !== '/') {
            navigate('/');
        }
        else store.speakersRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return (
        <div id='navBar'>
            <div className='logoWrapper'>
                <img alt='ledebut logo' src={Logo} />
            </div>
            <ul className={`${toggle?'navLinks menu active':'navLinks'}`}>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li onKeyDown={executeScroll} onClick={executeScroll}>Speakers</li>
                <li>
                    <a href='/badge'>Badge</a>
                </li>
                <li>
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
