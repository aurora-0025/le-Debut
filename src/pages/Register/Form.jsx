/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
import legoHead from '../../assets/images/lego-head.png'
import legoEye from '../../assets/images/lego-eyeball.png'
import './Form.css'
import Loader from '../../components/Loading/Loader'
import lego3brick from '../../assets/images/lego3brick.png'
import qrCode from '../../assets/images/qrcode.png'
import Success from './Success'
import SelectPlan from './SelectPlan'
import { AppContext } from '../../context/AppContext'

function Form() {
    const {store, actions} = useContext(AppContext);

    const legoRef = useRef(null)

    const [angleDeg, setAngleDeg] = useState(0)
    const [wobble, setWobble] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitText, setSubmitText] = useState("Let's Go")
    const [loadingTimer, setLoadingTimer] = useState(true)
    const [loadingMsg, setLoadingMsg] = useState(null)

    const [nameError, setNameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [phoneError, setPhoneError] = useState(null)
    const [isFirstYearError, setIsFirstYearError] = useState(null)
    const [uploadError, setUploadError] = useState(null)
    const [showSuccessPage, setShowSuccessPage] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('CE')
    const [classno, setClassno] = useState('1')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isFirstYear, setIsFirstYear] = useState('yes')
    const [selectedPayment, setSelectedPayment] = useState('gpay')
    const [plan, setPlan] = useState(null);
    const [moreInfo, setMoreInfo] = useState('')
    const [paymentScreenshotSrc, setPaymentScreenshotSrc] = useState(null)

    const [page, setPage] = useState(0)

    const readUpload = (e) => {
        if (e.target.files) {
            let file = e.target.files[0]
            const fileSize = file.size
            const fileMb = fileSize / 1024 ** 2
            if (fileMb >= 5) {
                setUploadError('Please select a image less than 5MB.')
                file = null
            } else {
                const imageRef = ref(storage, `ledebut-screenshots/${name + v4()}`)
                uploadBytes(imageRef, file).then((res) => {
                    getDownloadURL(res.ref).then((url) => {
                        console.log(url)
                        setPaymentScreenshotSrc(url)
                    })
                })
                setUploadError(null)
            }
            e.target.value = ''
        }
    }

    // eslint-disable-next-line consistent-return
    async function submitForm() {
        setNameError(null)
        setEmailError(null)
        setPhoneError(null)

        if (submitText === 'submitting') return;

        if (name === '') setNameError('Please provide us with your name')
        if (email === '') setEmailError('Please provide us with your email')
        if (phoneNumber === '') setPhoneError('Please provide us with your contact number')
        if (isFirstYear === 'no') setIsFirstYearError('This event is exclusively for first years')
        if (name === '' || email === '' || phoneNumber === '' || isFirstYear === 'no') {
            setSubmitText("Let's Go")
            return
        }

        if (page === 1) {
            setPaymentScreenshotSrc(null)
        }

        if (selectedPayment === 'bank' && page !== 2) {
            setSubmitText('Submit')
            setPage(2)
            legoRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }

        if (selectedPayment === 'gpay' && page !== 3) {
            setSubmitText('Submit')
            setPage(3)
            legoRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }

        if (page === 2 || page === 3) {
            if (!paymentScreenshotSrc) {
                setUploadError('You need to upload the screenshot of your payment')
                return
            }
        }

        let baseURL = 'https://le-debut.vercel.app'
        if (import.meta.env.DEV) baseURL = 'http://localhost:3000'
        fetch(`${baseURL}/api/sendForm`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                phoneNumber,
                email,
                classno,
                department,
                moreInfo,
                plan,
                selectedPayment,
                paymentScreenshotSrc,
            }),
        })
            .then((response) => {
                setSubmitText("Let's Go")
                if (response.status === 501) {
                    setPage(1)
                    setEmailError('You are already registered')
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                if (data.success) {
                    actions?.setBackgroundColor('#42a5f5');
                    actions?.setFooterColor('#42a5f5');
                    setShowSuccessPage(true);
                }
            })
            .catch((error) => {
                setSubmitText("Let's Go")
                console.log('error:', error)
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
        const rect = legoRef?.current.getBoundingClientRect()
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
        if(plan) {
            setPage(1);
		    actions?.setBackgroundColor('#42a5f5');
        }
    }, [plan])

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
            {showSuccessPage ? (
                <Success />
            ) : <>
                    {page === 0 ? <SelectPlan setPlan={setPlan} />
                    : <div className='form-wrapper'>
                        <div
                            role='presentation'
                            className='lego-character-proximity'
                            onClick={animateHead}
                            onKeyDown={animateHead}
                        />
                        <div
                            className={
                                wobble ? 'lego-character wobble unselectable' : 'lego-character'
                            }
                        >
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
                        {page === 1 && (
                            <form action='submit' className='form'>
                                <h1 className='unselectable'>Welcome Aboard!</h1>
                                <h3 className='unselectable'>un poco loco</h3>
                                <h4 className='unselectable'>Tell us about yourself</h4>
                                <div className='inputfield'>
                                    <label htmlFor='name'>
                                        Can we have your full name?<span>*</span>
                                    </label>
                                    <input
                                        placeholder='Enter your name'
                                        id='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onFocus={(e) => {
                                            setNameError(null)
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
                                        Email ID<span>*</span>
                                    </label>
                                    <input
                                        placeholder='Enter your Email ID'
                                        id='mail'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={(e) => {
                                            setEmailError(null)
                                            lookAt(e.target)
                                        }}
                                        type='text'
                                        style={
                                            emailError && {
                                                border: '2px solid #FF002A',
                                            }
                                        }
                                    />
                                    <p>{emailError || ' '}</p>
                                </div>
                                <div className='inputfield'>
                                    <label htmlFor='phno'>
                                        Contact Number<span>*</span>
                                    </label>
                                    <input
                                        placeholder='Enter your Contact Number'
                                        id='phno'
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        onFocus={(e) => {
                                            setPhoneError(null)
                                            lookAt(e.target)
                                        }}
                                        type='tel'
                                        pattern='[0-9]{10}'
                                        style={
                                            phoneError && {
                                                border: '2px solid #FF002A',
                                            }
                                        }
                                    />
                                    <p>{phoneError || ' '}</p>
                                </div>
                                <div className='inputfield radioButtonField'>
                                    <label htmlFor='firstYear'>
                                        Are you currently enrolled in first year?<span>*</span>
                                    </label>
                                    <div className='hradioContainer'>
                                        <span className='option'>
                                            <input
                                                type='radio'
                                                checked={isFirstYear === 'yes'}
                                                onChange={(e) => setIsFirstYear(e.target.value)}
                                                onFocus={(e) => {
                                                    setIsFirstYearError(null)
                                                    lookAt(e.target)
                                                }}
                                                value='yes'
                                                name='firstYear'
                                            />
                                            <label htmlFor='yes'>Yes</label>
                                        </span>
                                        <span className='option'>
                                            <input
                                                type='radio'
                                                checked={isFirstYear === 'no'}
                                                onChange={(e) => setIsFirstYear(e.target.value)}
                                                onFocus={(e) => {
                                                    setIsFirstYearError(null)
                                                    lookAt(e.target)
                                                }}
                                                value='no'
                                                name='firstYear'
                                            />
                                            <label htmlFor='no'>No</label>
                                        </span>
                                    </div>
                                    <p>{isFirstYearError || ' '}</p>
                                </div>
                                <div className='inputfield'>
                                    <label htmlFor='dept'>
                                        Department<span>*</span>
                                    </label>
                                    <div className='dropdown'>
                                        <select
                                            id='dept'
                                            name='department'
                                            value={department}
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
                                </div>
                                <div className='inputfield'>
                                    <label htmlFor='class'>
                                        Class<span>*</span>
                                    </label>
                                    <div className='dropdown'>
                                        <select
                                            id='class'
                                            name='department'
                                            value = {classno}
                                            onChange={(e) => setClassno(e.target.value)}
                                        >
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                        </select>
                                    </div>
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
                                <div className='inputfield radioButtonField'>
                                    <label htmlFor='payment'>
                                        Select your preferred payment mode<span>*</span>
                                    </label>
                                    <div className='vradioContainer'>
                                        <span className='option'>
                                            <input
                                                type='radio'
                                                checked={selectedPayment === 'gpay'}
                                                onChange={(e) => setSelectedPayment(e.target.value)}
                                                value='gpay'
                                                name='payment'
                                            />
                                            <label htmlFor='gpay'>Gpay/UPI</label>
                                        </span>
                                        <span className='option'>
                                            <input
                                                type='radio'
                                                checked={selectedPayment === 'bank'}
                                                onChange={(e) => setSelectedPayment(e.target.value)}
                                                value='bank'
                                                name='payment'
                                            />
                                            <label htmlFor='bank'>Bank Transfer</label>
                                        </span>
                                        <span className='option'>
                                            <input
                                                type='radio'
                                                checked={selectedPayment === 'other'}
                                                onChange={(e) => setSelectedPayment(e.target.value)}
                                                value='other'
                                                name='payment'
                                            />
                                            <label htmlFor='other'>
                                                The above mentioned modes are not convenient
                                            </label>
                                        </span>
                                    </div>
                                </div>
                                <div className='inputfield textarea'>
                                    <label htmlFor='desc'>
                                        Anything else you would like to share with us?
                                    </label>
                                    <textarea
                                        placeholder='Any expectations or suggestions'
                                        id='desc'
                                        onChange={(e) => setMoreInfo(e.target.value)}
                                        onFocus={(e) => {
                                            lookAt(e.target)
                                        }}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSubmitText('Submitting')
                                        submitForm()
                                    }}
                                >
                                    <p>{submitText}</p>
                                </button>
                            </form>
                        )}
                        {page === 2 && (
                            <div className='form payment'>
                                <h1>Payment | Bank Transfer</h1>
                                <h3>Ticket Rates</h3>
                                <h4>
                                    2-day pass excl. food pass : <span> Rs. 100</span>
                                </h4>
                                <h4>
                                    2-day pass incl. food pass (non-veg) : <span> Rs. 300</span>
                                </h4>
                                <h4>
                                    2-day pass incl. food pass (veg) : <span> Rs. 250</span>
                                </h4>
                                <h3>Payment Details</h3>
                                <h4>
                                    Transfer the amount using the following bank details, and upload
                                    a screenshot with transaction ID.
                                </h4>

                                <div className='paymentDetails'>
                                    <h4>
                                        Name: <span> Deepa Renjith</span>
                                    </h4>
                                    <h4>
                                        Bank Account Number: <span> 29860100008984</span>
                                    </h4>
                                    <h4>
                                        IFSC Code:{' '}
                                        <span> BARB0PEROOR [Fifth character is zero]</span>
                                    </h4>
                                    <h4>
                                        Bank Name: <span> Bank of Baroda, Peroorkada</span>
                                    </h4>
                                    <h4>
                                        Remarks: <span> Le debut - [Your Full Name]</span>
                                    </h4>
                                </div>

                                <h3>Take Screenshot</h3>
                                <h4>
                                    You will be asked to upload a screenshot of payment with
                                    Transaction ID in the coming page.
                                </h4>

                                <h3>
                                    Upload Screenshot<span>*</span>
                                </h3>
                                <h4>screenshot of payment with transaction ID.</h4>

                                <label className='uploadButton'>
                                    <input
                                        onChange={readUpload}
                                        type='file'
                                        id='imageInput'
                                        accept='image/*'
                                    />
                                    Upload Image
                                    <div className='btnHole' />
                                    <div className='btnHole' />
                                </label>
                                {uploadError && <p className='uploadError'>{uploadError}</p>}
                                {paymentScreenshotSrc && (
                                    <img
                                        src={paymentScreenshotSrc}
                                        width={50}
                                        height={50}
                                        alt='uploaded'
                                    />
                                )}
                                <button
                                    type='submit'
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSubmitText('Submitting')
                                        submitForm()
                                    }}
                                >
                                    <p>{submitText}</p>
                                </button>
                            </div>
                        )}
                        {page === 3 && (
                            <div className='form payment screenshotUpload'>
                                <h1>Payment | Gpay / UPI</h1>
                                <h3>Ticket Rates</h3>
                                <h4>
                                    2-day pass excl. food pass : <span> Rs. 100</span>
                                </h4>
                                <h4>
                                    2-day pass incl. food pass (non-veg) : <span> Rs. 300</span>
                                </h4>
                                <h4>
                                    2-day pass incl. food pass (veg) : <span> Rs. 250</span>
                                </h4>
                                <h3>Payment Details for GPay</h3>
                                <h4>
                                    Transfer the amount to the below number or scan the qr code, and
                                    upload a screenshot with transaction ID.
                                </h4>

                                <div className='paymentDetails'>
                                    <h4>
                                        GPay Number: <span> +91 7994833202</span>
                                    </h4>
                                    <h4>
                                        Remarks: <span> Le debut - [Your Full Name]</span>
                                    </h4>
                                </div>

                                <h3>Payment Details for UPI</h3>
                                <h4>
                                    For Other UPI Payments: Transfer the amount to the below UPI id
                                    or scan the qr code, and upload a screenshot with transaction
                                    ID.
                                </h4>

                                <div className='paymentDetails'>
                                    <h4>
                                        UPI ID: <span> deeparenji250@okaxis</span>
                                    </h4>
                                    <h4>
                                        Remarks: <span> Le debut - [Your Full Name]</span>
                                    </h4>
                                </div>

                                <div className='qrcodeContainer'>
                                    <h3>Scan the QR Code</h3>
                                    <img src={qrCode} alt='qrcode' />
                                </div>

                                <h3>
                                    Upload Screenshot<span>*</span>
                                </h3>
                                <h4>screenshot of payment with transaction ID.</h4>

                                <label className='uploadButton'>
                                    <input
                                        onChange={readUpload}
                                        type='file'
                                        id='imageInput'
                                        accept='image/*'
                                    />
                                    Upload Image
                                    <div className='btnHole' />
                                    <div className='btnHole' />
                                </label>
                                {uploadError && <p className='uploadError'>{uploadError}</p>}
                                {paymentScreenshotSrc && (
                                    <img
                                        src={paymentScreenshotSrc}
                                        width={50}
                                        height={50}
                                        alt='uploaded'
                                    />
                                )}

                                <button
                                    type='submit'
                                    className='submit'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSubmitText('Submitting')
                                        submitForm()
                                    }}
                                >
                                    <p>{submitText}</p>
                                </button>
                            </div>
                        )}
                    </div>
}</>
                }
        </div>
    ) : (
        <Loader loadingMsg={loadingMsg} />
    )
}

export default Form
