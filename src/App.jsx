/* eslint-disable no-constant-condition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Form from './pages/Register/Form'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Badge from './pages/Badge/Badge'
import { AppContext } from './context/AppContext'
import Slide from './pages/TH/Clues/Slide'
import File from './pages/TH/Clues/File'
import Submit from './pages/TH/Clues/Submit'
import Sound from './pages/TH/Clues/Sound'
import Clue from './pages/TH/Clues/Clue'
import Cipher from './pages/TH/Clues/Cipher'
import cipher10 from './assets/images/ceaser_10.png'
import cipher11 from './assets/images/ceaser_11.png'
import cipher12 from './assets/images/ceaser_12.png'
import cipher13 from './assets/images/ceaser_13.png'
import morse0 from './assets/audio/morse0.wav'
import morse1 from './assets/audio/morse1.wav'

function App() {
    const { store, actions } = useContext(AppContext)
    const [bgColor, setBgColor] = useState('#42a5f5')
    const location = useLocation()

    useEffect(() => {
        if (store.backgroundColor !== bgColor) {
            setBgColor(store.backgroundColor)
        }
    }, [store])

    return (
        <div className='App' style={{ backgroundColor: bgColor }}>
            <div className='overlay' /> 
                    <Routes>
                        <Route path='/' element={<><NavBar /><Home /><Footer /></>} />
                        <Route path='/badge' element={<><NavBar /><Badge /><Footer /></>} />
                        {/* <Route path='/register' element={<><NavBar /><Form /><Footer /></>} /> */}
                        {/* 1st Slug */}
                        <Route path='/code1' element={<Clue clue={'Check the paper given to you'} />} />
                        {/* 2nd Slug */}
                        <Route path='/code2' element={<Clue clue={'Find the location mentioned in the QR'} />} />
                        {/* 3rd Slugs */}
                        <Route path='/pepe' element={<File link={'https://drive.google.com/file/d/1s4PPOrsxJvF4l8MM87ZqakEdXNbiqBZU/view?usp=share_link'} />} />
                        <Route path='/baldski' element={<File link={'https://drive.google.com/file/d/1YkL6fixgrYVGozZUcXY7MIOUOZnNez3J/view?usp=share_link'} />} />
                        <Route path='/oogway' element={<File link={'https://drive.google.com/file/d/1Woqg93a6m21IB4Nbkehs1ujUzvB8Sn1b/view?usp=share_link'} />} />
                        <Route path='/code3' element={<File link={'https://drive.google.com/file/d/1gzGaQKKGGfwHDMQ6YdaZbFZ6lsB9YJ9Z/view?usp=share_link'} />} />
                        {/* 4th Slugs */}
                        <Route path='/coldplay' element={<Clue clue={'68 65 72 65 20 79 6F 75 20 66 69 6E 64 20 74 68 65 20 79 65 6C 6C 6F 77 20 63 68 61 72 69 6F 74 73 20 72 65 73 74 69 6E 67'} />} />
                        <Route path='/swartz' element={<Clue clue={'74 68 65 20 65 61 73 74 20 70 6F 73 74 20 6F 66 20 74 68 65 20 67 61 6D 65 20 77 68 65 72 65 20 79 6F 75 20 74 68 72 6F 77 20 62 61 6C 6C 73 20 69 6E 74 6F 20 62 61 73 6B 65 74 73'} />} />
                        <Route path='/mrbeast' element={<Clue clue={'74 68 65 20 77 65 73 74 20 70 6F 73 74 20 6F 66 20 74 68 65 20 67 61 6D 65 20 77 68 65 72 65 20 79 6F 75 20 74 68 72 6F 77 20 62 61 6C 6C 73 20 69 6E 74 6F 20 62 61 73 6B 65 74 73'} />} />
                        <Route path='/code4' element={<Clue clue={'6D 62 63 65 74 20 69 6E 20 67 72 65 65 6E 20 77 72 69 74 69 6E 67'} />} />
                        {/* 5th Slugs */}
                        <Route path='/black12' element={<Cipher cipher={'dkukcrsvk oxdbkxmo'} image={cipher10} />} />
                        <Route path='/blue69' element={<Cipher cipher={'rz espcp ez efcy jzfc alty tyez rltyd'} image={cipher11} />} />
                        <Route path='/grey50' element={<Cipher cipher={'g euf tqdq gzpqd ftq zafuoq namdp ituot efmdqe mf M nguxpuzs'} image={cipher12} />} />
                        <Route path='/code5' element={<Cipher cipher={'fbzrjurer qbja gur fybcr jurer ovxrf ner xrcg'} image={cipher13} />} />
                        {/* 6th Slugs */}
                        <Route path='/wanda' element={<Sound soundFile={morse0} link={"https://drive.google.com/file/d/1xIgQ5E__Z8APs4UySWg8Z13iUBIEewYL/view?usp=share_link"} />} />
                        <Route path='/xavier' element={<Sound soundFile={morse0} link={"https://drive.google.com/file/d/1xIgQ5E__Z8APs4UySWg8Z13iUBIEewYL/view?usp=share_link"} />} />
                        <Route path='/strange' element={<Sound soundFile={morse0} link={"https://drive.google.com/file/d/1xIgQ5E__Z8APs4UySWg8Z13iUBIEewYL/view?usp=share_link"} />} />
                        <Route path='/code6' element={<Sound soundFile={morse1} link={"https://drive.google.com/file/d/16dVRGl4gh1en-dwAfaViZQOZQgNdxpKe/view?usp=share_link"} />} />
                        {/* 7th Slugs */}
                        <Route path='/usoclose' element={<Slide clue={'ualmostthere'} />} />
                        <Route path='/code7' element={<Slide clue={'ualmostthere'} />} />
                        {/* Last Slug */}
                        <Route path='/ualmostthere' element={<Submit />} />
                        <Route path='/sikeuthot' element={<Clue clue={'sike!!! you thought we were that dumb??\ngo back to code2 and find the proper answers lmaooo'} />} />
                        <Route path='*' element={<><NavBar /><Home /><Footer /></>} />
                    </Routes>                
            {/* <Form /> */}
        </div>
    )
}

export default App
