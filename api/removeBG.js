/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import * as dotenv from 'dotenv'
import micro from 'micro-cors'
import edgeChromium from 'chrome-aws-lambda'
import fs from 'fs'
import fetch from 'node-fetch'

import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

dotenv.config()

async function MyApi(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }
    if (req.method === 'POST') {
        const executablePath = (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE
        const { imageData } = req.body
        const browser = await puppeteer.launch({
            executablePath,
            args: edgeChromium.args,
            headless: false,
        })

        const fileName = `${Date.now().toString()}Image`
        // eslint-disable-next-line no-buffer-constructor
        const base64Image = imageData.split(';base64,').pop()

        const imagePath = `/tmp/${fileName}.png`

        fs.writeFile(imagePath, base64Image, { encoding: 'base64' }, (err) => {
            console.log('File created')
        })

        const page = await browser.newPage()

        await page.goto('https://removal.ai/upload')

        // // wait for the file input element to be visible
        await page.waitForSelector('input[type="file"]')
        const inputUploadHandle = await page.$('input[type=file]')
        inputUploadHandle.uploadFile(imagePath)

        await page.waitForSelector('a[download]')
        // // wait for the preview image to load
        await page.waitForFunction(() => {
            const link = document.querySelector('a[download]')
            return link !== null && link.href !== undefined && link.href !== ''
        })
        // get the preview image source
        const previewImageSrc = await page.evaluate(
            () => document.querySelector('a[download]').href,
        )

        const imageUrlData = await fetch(previewImageSrc)
        const buffer = await imageUrlData.arrayBuffer()
        const stringifiedBuffer = Buffer.from(buffer).toString('base64')
        const contentType = imageUrlData.headers.get('content-type')
        const imageBas64 = `data:image/${contentType};base64,${stringifiedBuffer}`

        // Close the browser
        await browser.close()
        res.setHeader('Content-Type', 'application/json')
        res.json({ imageSrc: imageBas64 })
        // fs.unlinkSync(`./tmp/${fileName}.png`);
        console.log('File Deleted');
    }
}

const cors = micro({
    origin: '*',
})

export default cors(MyApi)
