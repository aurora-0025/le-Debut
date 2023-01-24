/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import badgeBg from '../../assets/images/BadgeBg.png'
import badgeOverlay from '../../assets/images/BadgeOverlay.png'
import 'react-image-crop/dist/ReactCrop.css'
import './Badge.css'
import Loader from '../../components/Loading/Loader'

function Badge() {
    const [src, setSrc] = useState(null)
    const [downloadURI, setDownloadURI] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [removedBGImage, setRemovedBGImage] = useState(null)
    const [cropWindow, setCropWindow] = useState(false)
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 256,
        height: 256,
        unit: 'px',
    })
    const [image, setImage] = useState(null)
    const canvasRef = useRef(null)

    const removeBG = async (imageData) => {
        // let baseURL = 'https://le-debut.vercel.app'
        // if (import.meta.env.DEV) baseURL = 'http://localhost:8000'
        fetch('https://remove-bg-api.fly.dev/removeBG', {
        // fetch('http://localhost:8080/removeBG', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData }),
        })
            .then((response) => response.json())
            .then((data) => {
                setRemovedBGImage(data.data.imageSrc)
                setLoading(false)
                console.log('success received removed BG')
            })
            .catch((error) => {
                console.log('error:', error)
                setLoading(false)
            })
    }

    const readUpload = (e) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (file) setCropWindow(true)
            setSrc(URL.createObjectURL(file))
            e.target.value = ''
        }
    }

    const cropImageNow = () => {
        /**
         * @type {HTMLCanvasElement} canvas
         */
        setCropWindow(false)
        setLoading(true)
        setLoadingMsg('Cropping Image..')
        const canvas = canvasRef.current
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')

        const pixelRatio = window.devicePixelRatio
        canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
        ctx.scale(pixelRatio, pixelRatio)
        ctx.imageSmoothingQuality = 'high'
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY
        ctx.save()
        ctx.translate(-cropX, -cropY)
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        )
        ctx.restore()
        setLoadingMsg('Converting it to B/W...')
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imgData.data
        // loop through all pixels
        // each pixel is decomposed in its 4 rgba values
        for (let i = 0; i < d.length; i += 4) {
            // get the medium of the 3 first values ( (r+g+b)/3 )
            const med = (d[i] + d[i + 1] + d[i + 2]) / 3
            // set it to each value (r = g = b = med)
            // eslint-disable-next-line no-multi-assign
            d[i] = d[i + 1] = d[i + 2] = med
            // we don't touch the alpha
        }
        // redraw the new computed image
        ctx.putImageData(imgData, 0, 0)

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg')
        setLoadingMsg('Removing BG...')
        removeBG(base64Image)
    }
    useEffect(() => {
        if (removedBGImage) {
            /**
             * @type {HTMLCanvasElement} canvas
             */
            console.log(removedBGImage)
            const canvas = canvasRef.current
            const ctx = canvas?.getContext('2d')
            canvas.width = 256
            canvas.height = 256
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const bgImg = new Image()
            const fgImg = new Image()
            const overlayImg = new Image()
            bgImg.src = badgeBg
            fgImg.style['z-index'] = '98'
            fgImg.src = removedBGImage
            overlayImg.style['z-index'] = '99'
            overlayImg.src = badgeOverlay

            const loadImages = (callback) => {
                let loadCount = 0
                bgImg.onload = () => {
                    loadCount += 1
                    if (loadCount === 3) return callback()
                }
                fgImg.onload = () => {
                    loadCount += 1
                    if (loadCount === 3) return callback()
                }
                overlayImg.onload = () => {
                    loadCount += 1
                    if (loadCount === 3) return callback()
                }
            }

            const drawLayers = () => {
                ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
                ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height)
                ctx.fillStyle = 'rgba(255, 255, 255,  0.9)'
                ctx.font = 'bold 15px GoogleSans'
                ctx.textBaseline = 'middle'
                ctx.textAlign = 'center'
                ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height)
                ctx.fontKerning = 'normal'
                ctx.fillText('ATTENDEE', canvas.width / 2, canvas.height - 15)
                ctx.save()
                setDownloadURI(
                    canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'),
                )
                setLoadingMsg(null)
                setLoading(false)
            }
            loadImages(drawLayers)
        }
    }, [removedBGImage])

    return (
        <>
            {loading && <Loader loadingMsg={loadingMsg} />}
            {src && (
                <div style={cropWindow ? { display: 'block' } : { display: 'none' }}>
                    <ReactCrop aspect={1} crop={crop} onChange={(c) => setCrop(c)}>
                        <img alt='' src={src} onLoad={(e) => setImage(e.target)} />
                    </ReactCrop>
                    <button
                        type='submit'
                        className='uploadButton cropButton'
                        onClick={cropImageNow}
                    >
                        Crop
                    </button>
                </div>
            )}
            <div className='badge' style={cropWindow ? { display: 'none' } : { display: 'flex' }}>
                <div className='title'>
                    <h1>Get your own</h1>
                    <h1>le&apos;debut badge</h1>
                    <p>
                        Create your identity in a unique way! Upload your best pic and generate your
                        le&apos;debut badge to represent yourself.
                    </p>
                    <div className='buttonWrapper' style={{ display: 'flex', gap: '20px' }}>
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
                        {removedBGImage && (
                            <button
                                onClick={() => setCropWindow(true)}
                                className='uploadButton'
                                style={{ width: '120px' }}
                                type='button'
                            >
                                Edit Crop
                            </button>
                        )}
                    </div>
                </div>
                <div className='generator'>
                    <canvas
                        width={320}
                        height={320}
                        style={{
                            display: removedBGImage && loading === false ? 'block' : 'none',
                            borderRadius: '10px',
                        }}
                        ref={canvasRef}
                    />
                    {removedBGImage && (
                        <a
                            className='uploadButton'
                            download='attendee.png'
                            aria-label='download'
                            href={downloadURI}
                        >
                            Download
                        </a>
                    )}
                </div>
                <div className='player' />
            </div>
        </>
    )
}

export default Badge
