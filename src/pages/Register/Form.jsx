import React, { useEffect, useRef, useState } from 'react'
import legoHead from '../../assets/images/lego-head.png'
import legoEye from '../../assets/images/lego-eyeball.png'
import './Form.css'
import Loader from '../../components/Loading/Loader'

function Form() {
    const legoRef = useRef(null)

    const [angleDeg, setAngleDeg] = useState(0)
    const [nameError, setNameError] = useState(null)
    const [wobble, setWobble] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingTimer, setLoadingTimer] = useState(true)
    const [loadingMsg, setLoadingMsg] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('CE')
    const [classno, setClassno] = useState('1')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [moreInfo, setMoreInfo] = useState('')

    function submitForm() {
        let baseURL = 'https://le-debut.vercel.app'
        if (import.meta.env.DEV) baseURL = 'http://localhost:3000'
        fetch(`${baseURL}/api/submitForm`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                phoneNumber,
                email,
                classno,
                department,
                moreInfo,
            }),
        })
            .then((response) => console.log(response))
            .then((data) => {
                console.log('success', data)
            })
            .catch((error) => {
                console.log('error:', error);
            })
    }

    function angle(cx, cy, ex, ey) {
        const dy = ey - cy
        const dx = ex - cx
        const rad = Math.atan2(dy, dx)
        const deg = (rad * 180) / Math.PI
        return deg
    }

    const animateHead = () => {
        if (wobble) return
        setWobble(true)
        // Buttons stops to shake after 2 seconds
        setTimeout(() => setWobble(false), 2000)
    }

    const lookAt = (target) => {
        const rect = legoRef.current.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const targetX = targetRect.left + targetRect.width / 2
        const targetY = targetRect.top + targetRect.height / 2
        const anchorX = rect.left + rect.width / 2
        const anchorY = rect.top + rect.height / 2
        setAngleDeg(angle(targetX, targetY, anchorX, anchorY))
    }

    useEffect(() => {
        window.addEventListener('load', () => setLoading(false))
        setTimeout(() => {
            setLoadingTimer(false)
        }, 2000)
        return () => window.removeEventListener('load', () => setLoading(false))
    }, [])

    useEffect(() => {
        const handleMouseMove = (event) => {
            const rect = legoRef.current.getBoundingClientRect()
            const anchorX = rect.left + rect.width / 2
            const anchorY = rect.top + rect.height / 2
            setAngleDeg(angle(event.clientX, event.clientY, anchorX, anchorY))
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])
    return !loading && !loadingTimer ? (
        <div className='main-wrapper'>
            <div className='form-wrapper'>
                <div
                    role='presentation'
                    className='lego-character-proximity'
                    onClick={animateHead}
                    onKeyDown={animateHead}
                />
                <div className={wobble ? 'lego-character wobble unselectable' : 'lego-character'}>
                    <img ref={legoRef} src={legoHead} width={96} alt='' id='head' />
                    <div id='eyes'>
                        <img
                            src={legoEye}
                            alt=''
                            style={{
                                top: -52,
                                left: 25.5,
                                borderRadius: '50%',
                                transform: `rotate(${90 + angleDeg}deg)`,
                            }}
                            className='eye'
                        />
                        <img
                            src={legoEye}
                            alt=''
                            style={{
                                top: -52,
                                left: 49.5,
                                borderRadius: '50%',
                                transform: `rotate(${90 + angleDeg}deg)`,
                            }}
                            className='eye'
                        />
                    </div>
                </div>
                <form action='submit' className='form'>
                    <h1 className='unselectable'>Welcome Aboard!</h1>
                    <h3 className='unselectable'>un poco loco</h3>
                    <div className='inputfield'>
                        <label htmlFor='name'>
                            Can we have your full name?<span>*</span>
                        </label>
                        <input
                            placeholder='Enter your name'
                            id='name'
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => {
                                lookAt(e.target)
                            }}
                            type='text'
                            style={
                                nameError && {
                                    border: '2px solid #FF002A',
                                }
                            }
                        />
                        <p>{nameError || ' '}</p>
                    </div>
                    <div className='inputfield'>
                        <label htmlFor='mail'>
                            Your Email ID<span>*</span>
                        </label>
                        <input
                            placeholder='Enter your Email ID'
                            id='mail'
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => {
                                lookAt(e.target)
                            }}
                            type='text'
                            style={
                                nameError && {
                                    border: '2px solid #FF002A',
                                }
                            }
                        />
                        <p>{nameError || ' '}</p>
                    </div>
                    <div className='inputfield'>
                        <label htmlFor='phno'>
                            Your Contact Number<span>*</span>
                        </label>
                        <input
                            placeholder='Enter your Contact Number'
                            id='phno'
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onFocus={(e) => {
                                lookAt(e.target)
                            }}
                            type='tel'
                            pattern='[0-9]{10}'
                            style={
                                nameError && {
                                    border: '2px solid #FF002A',
                                }
                            }
                        />
                        <p>{nameError || ' '}</p>
                    </div>
                    <div className='inputfield'>
                        <label htmlFor='dept'>
                            Your Department<span>*</span>
                        </label>
                        <div className='dropdown'>
                            <select
                                id='dept'
                                name='department'
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value='CE'>CE</option>
                                <option value='CT'>CT</option>
                                <option value='CSE'>CSE</option>
                                <option value='ECE'>ECE</option>
                                <option value='EEE'>EEE</option>
                                <option value='EL'>EL</option>
                                <option value='ME'>ME</option>
                            </select>
                        </div>
                        <p>{nameError || ' '}</p>
                    </div>
                    <div className='inputfield'>
                        <label htmlFor='class'>
                            Your Class<span>*</span>
                        </label>
                        <div className='dropdown'>
                            <select
                                id='class'
                                name='department'
                                onChange={(e) => setClassno(e.target.value)}
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                            </select>
                        </div>
                        <p>{nameError || ' '}</p>
                    </div>
                    {/* <div className='uploadImageContainer'>
							<img
								className='frame'
								// onMouseEnter={(e) =>
								//     (uploadBtnRef.current.style.opacity = 1)
								// }
								// onMouseLeave={(e) =>
								//     (uploadBtnRef.current.style.opacity = 0)
								// }
								id='placeholderImg'
								src={placeholderImage}
								ref={uploadImgRef}
								alt=''
							/>
							<input
								type='file'
								onChange={(e) => {
									const file = e.target.files[0];
									if (file) {
										const reader = new FileReader();
										reader.addEventListener('load', () => {
											uploadImgRef.current.setAttribute(
												'src',
												reader.result
											);
										});

										reader.readAsDataURL(file);
									}
								}}
								id='file'
							/>
							<label htmlFor='file' ref={uploadBtnRef} id='uploadBtn'>
                                Choose a photo
							</label>
						</div> */}
                    <div className='inputfield textarea'>
                        <label htmlFor='desc'>Anything else you would like to share with us?</label>
                        <textarea
                            placeholder='Any expectations or suggestions'
                            id='desc'
                            onChange={(e) => setMoreInfo(e.target.value)}
                            onFocus={(e) => {
                                lookAt(e.target)
                            }}
                            style={nameError && { border: '2px solid #FF002A' }}
                        />
                    </div>
                    <button
                        type='submit'
                        className='submit'
                        onClick={(e) => {
                            e.preventDefault()
                            submitForm()
                        }}
                    >
                        <p>Let&apos;s Go</p>
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <Loader loadingMsg={loadingMsg} />
    )
}

export default Form
