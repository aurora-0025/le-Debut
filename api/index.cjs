/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { Client } = require('@notionhq/client');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const {NOTION_INTEGRATION_TOKEN} = process.env
const databaseId = process.env.NOTION_DB_ID
const notion = new Client({auth: NOTION_INTEGRATION_TOKEN});

app.post('/submitForm',jsonParser,async(req,res)=>{
 const {name} = req.body;
 const {email} = req.body;
 const {phoneNumber} = req.body;
 const {department} = req.body;
 const {classno} = req.body;
 const {moreInfo} = req.body;
 try{
  const response = await notion.pages.create({
    parent:{database_id:databaseId},
    properties:{
      Name:{
        title:[
          {
            text:{
              content:name
            }
          }
        ]
      },
      'Email':{
        'rich_text':[
           {
             'type':'text',
             'text':{
               content:email
             }
           }
         ]
       },
       'Department':{
        'rich_text':[
           {
             'type':'text',
             'text':{
                 content:department
             }
           }
         ]
       },
       'Class':{
        'rich_text':[
           {
             'type':'text',
             'text':{
                 content:classno
             }
           }
         ]
       },
       'Anything else':{
        'rich_text':[
           {
             'type':'text',
             'text':{
                 content:moreInfo
             }
           }
         ]
       },
       
      'Phone':{
       'rich_text':[
          {
            'type':'text',
            'text':{
              content:phoneNumber
            }
          }
        ]
      }
    }
  }).then(()=> res.send('OK'))
  console.log(response);
  console.log('success');
 }catch(error){
  console.log(error);
 };
})

export default app;