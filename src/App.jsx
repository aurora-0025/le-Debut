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
import Slide from './pages/TH/Slide'

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
                        <Route path='/slide' element={<Slide />} />
                        <Route path='*' element={<><NavBar /><Home /><Footer /></>} />
                    </Routes>                
            {/* <Form /> */}
        </div>
    )
}

export default App
