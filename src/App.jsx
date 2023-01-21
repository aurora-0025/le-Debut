/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Form from './pages/Register/Form'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Badge from './pages/Badge/Badge'

function App() {
    return (
        <div className='App'>
            <div className='overlay' />
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <NavBar />
                            <Home />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/badge'
                    element={
                        <>
                            <NavBar />
                            <Badge />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <>
                            <NavBar />
                            <Form />
                        </>
                    }
                />
                <Route
                    path='*'
                    element={
                        <>
                            <NavBar />
                            <Home />
                            <Footer />
                        </>
                    }
                />
            </Routes>
            {/* <Form /> */}
        </div>
    )
}

export default App
