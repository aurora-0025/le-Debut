import React, { useEffect, useState } from 'react'
import TreasureHunt from '../TreasureHunt'
import { useNavigate, useParams } from "react-router-dom";
import './Submit.css'

const initialValues = {
    slug1: '',
    slug2: '',
    slug3: '',
    slug4: '',
    slug5: '',
    slug6: '',
    slug7: '',
}

function Submit({clue}) {
    const navigate = useNavigate();
    const [showTransition, setShowTransition] = useState(true)
    const [showFinalClue, setShowFinalClue] = useState(false);
    const [values, setValues] = useState(initialValues)
    const [error, setError] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    function SubmitSlugs(e) {
        e.preventDefault()
        setError(false)
        let answer = []
        Object.values(values).map((val) => answer.push(val.toLowerCase()))
        answer.sort()
        let correct = false
        let answerKeys = [
            ['code1', 'code2', 'pepe', 'coldplay', 'black12', 'wanda', 'usoclose'],
            ['code1', 'code2', 'baldski', 'swartz', 'blue69', 'xavier', 'usoclose'],
            ['code1', 'code2', 'oogway', 'mrbeast', 'grey50', 'strange', 'usoclose'],
        ]
        const answerString = answer.toString();
        for (const soln of answerKeys) {
            if (soln.toString() == answerString) {
                correct = true
            }
            else if (answerString == ['code1', 'code2', 'code3', 'code4', 'code5', 'code6', 'code7'].toString()) {
                console.log("yes");
                navigate(`/sikeuthot`);
            }
        }
        if (correct) {
            setShowTransition(true)
            setTimeout(() => {
                setShowFinalClue(true)
            }, 2000)
        } else setError(true)
    }

    useEffect(() => {
        if (showTransition) {
            setShowTransition(true)
            setTimeout(() => {
                setShowTransition(false)
            }, 2000)
        }
    }, [showTransition])
    return (
        <>
            <TreasureHunt>
                {showFinalClue ? (
                    <div className='clueContainer'>
                            <div className='clue'>
                                <div>find the operations lead somewhere near where u started</div>
                            </div>
                    </div>
                ) : (
                    <>
                        <div
                            className={`transition-wrapper ${showTransition ? 'black' : 'no-bg'}`}
                        ></div>
                        <div className='clueContainer'>
                            <div className='clue'>
                                <div>Enter All Slugs Below</div>
                            </div>
                            <form className='inputContainer'>
                                <input
                                    value={values.slug1}
                                    onChange={handleInputChange}
                                    placeholder="1"
                                    name='slug1'
                                />
                                <input
                                    value={values.slug2}
                                    onChange={handleInputChange}
                                    placeholder="2"
                                    name='slug2'
                                />
                                <input
                                    value={values.slug3}
                                    onChange={handleInputChange}
                                    placeholder="3"
                                    name='slug3'
                                />
                                <input
                                    value={values.slug4}
                                    onChange={handleInputChange}
                                    placeholder="4"
                                    name='slug4'
                                />
                                <input
                                    value={values.slug5}
                                    onChange={handleInputChange}
                                    placeholder="5"
                                    name='slug5'
                                />
                                <input
                                    value={values.slug6}
                                    onChange={handleInputChange}
                                    placeholder="6"
                                    name='slug6'
                                />
                                <input
                                    value={values.slug7}
                                    onChange={handleInputChange}
                                    placeholder="7"
                                    name='slug7'
                                />
                                <button type='submit' onClick={(e) => SubmitSlugs(e)}>
                                    Submit
                                </button>
                            </form>
                            {error && <p className='error'>Invalid Slugs</p>}
                        </div>
                    </>
                )}
            </TreasureHunt>
        </>
    )
}

export default Submit
