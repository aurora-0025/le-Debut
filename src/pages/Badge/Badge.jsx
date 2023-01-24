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
                        <button onClick={()=>removeBG('data:image/jpeg;base64,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')}>test</button>
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
