/* eslint-disable import/no-extraneous-dependencies */
import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'
import micro from 'micro-cors'

dotenv.config()

const { NOTION_INTEGRATION_TOKEN } = process.env
const databaseId = process.env.NOTION_DB_ID
const notion = new Client({ auth: NOTION_INTEGRATION_TOKEN })

async function MyApi(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }
    if (req.method === 'POST') {
        const { name, email, phoneNumber, department, classno, moreInfo } = req.body
        try {
            const response = await notion.pages
                .create({
                    parent: { database_id: databaseId },
                    properties: {
                        Name: {
                            title: [
                                {
                                    text: {
                                        content: name,
                                    },
                                },
                            ],
                        },
                        Email: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: email,
                                    },
                                },
                            ],
                        },
                        Department: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: department,
                                    },
                                },
                            ],
                        },
                        Class: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: classno,
                                    },
                                },
                            ],
                        },
                        'Anything else': {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: moreInfo,
                                    },
                                },
                            ],
                        },

                        Phone: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: phoneNumber,
                                    },
                                },
                            ],
                        },
                    },
                })
                .then(() => res.json({ success: 'created db entry' }))
        } catch (error) {
            res.json({ error })
        }
    }
}

const cors = micro()

export default cors(MyApi)
