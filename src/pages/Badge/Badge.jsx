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
    const [uploadError, setUploadError] = useState(null)
    const [image, setImage] = useState(null)
    const [removedBGImage, setRemovedBGImage] = useState(null)
    const [cropWindow, setCropWindow] = useState(false)
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 256,
        height: 256,
        unit: 'px',
    })
    const canvasRef = useRef(null)

    const removeBG = async (imageData) => {
        let apiURL = 'https://remove-bg-api.fly.dev'
        if (import.meta.env.DEV) apiURL = 'http://localhost:8080'
        fetch(`${apiURL}/removeBG`, {
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
        // setLoading(true);
        console.log("yes");
        if (e.target.files) {
            let file = e.target.files[0]
            console.log(file);
            const fileSize = file.size;
            const fileMb = fileSize / 1024 ** 2;
            if (fileMb >= 17) {
                setUploadError('Please select a image less than 17MB.');
                file = null;
            } else {
                setUploadError(null);
                if (file) setCropWindow(true)
                setSrc(URL.createObjectURL(file))
            }
            e.target.value = ''
        }
    }

    const cropImageNow = () => {
        /**
         * @type {HTMLCanvasElement} canvas
         */
        setRemovedBGImage(null)
        setLoading(true);
        setCropWindow(false)
        setLoadingMsg('Cropping Image..')
        console.log(image);
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
        const cropX = crop.x * scaleX
        const cropY = crop.y * scaleY
        ctx.translate(-cropX, -cropY)
        ctx.filter = 'grayscale(100)'
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
        // Converting to base64
        let base64Image = canvas.toDataURL()
        const img = new Image()
        img.src = base64Image
        // Reduze Image to reduce server load
        img.onload = () => {
            canvas.width = 256
            canvas.height = 256
            ctx.drawImage(img, 0, 0, 256, 256)
            base64Image = canvas.toDataURL('image/jpeg')
            setLoadingMsg('Removing BG...')
            removeBG(base64Image)
        }
    }

    useEffect(() => {
        if (removedBGImage) {
            /**
             * @type {HTMLCanvasElement} canvas
             */
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

            const roundedImage = (context, x, y, width, height, radius) => {
                context.beginPath()
                context.moveTo(x + radius, y)
                context.lineTo(x + width - radius, y)
                context.quadraticCurveTo(x + width, y, x + width, y + radius)
                context.lineTo(x + width, y + height - radius)
                context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
                context.lineTo(x + radius, y + height)
                context.quadraticCurveTo(x, y + height, x, y + height - radius)
                context.lineTo(x, y + radius)
                context.quadraticCurveTo(x, y, x + radius, y)
                context.closePath()
            }

            const drawLayers = () => {
                roundedImage(ctx, 0, 0, canvas.width, canvas.height, 18)
                ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
                ctx.clip()
                ctx.restore()
                roundedImage(ctx, 0, 0, canvas.width, canvas.height, 18)
                ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height)
                ctx.clip()
                ctx.fillStyle = 'rgba(255, 255, 255,  0.9)'
                ctx.font = 'bold 15px GoogleSans'
                ctx.textBaseline = 'middle'
                ctx.textAlign = 'center'
                roundedImage(ctx, 0, 0, canvas.width, canvas.height, 18)
                ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height)
                ctx.clip()
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
                    {uploadError&& <p className='uploadError'>{uploadError}</p>}
                </div>
                <div className='generator'>
                    <canvas
                        width={320}
                        height={320}
                        style={{
                            display: removedBGImage && loading === false ? 'block' : 'none',
                            borderRadius: '18px',
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
