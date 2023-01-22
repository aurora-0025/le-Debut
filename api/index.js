const express = require('express');
const { Client } = require('@notionhq/client');
require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const NOTION_INTEGRATION_TOKEN = process.env.NOTION_INTEGRATION_TOKEN
const databaseId = process.env.NOTION_DB_ID
const notion = new Client({auth: NOTION_INTEGRATION_TOKEN});

console.log(notion);

app.post('/submitForm',jsonParser,async(req,res)=>{
 const name=req.body.name;
 const email=req.body.email;
 const phoneNumber=req.body.phoneNumber;
 const department=req.body.department;
 const classno=req.body.classno;
 const moreInfo=req.body.moreInfo;
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
      "Email":{
        "rich_text":[
           {
             "type":"text",
             "text":{
               content:email
             }
           }
         ]
       },
       "Department":{
        "rich_text":[
           {
             "type":"text",
             "text":{
                 content:department
             }
           }
         ]
       },
       "Class":{
        "rich_text":[
           {
             "type":"text",
             "text":{
                 content:classno
             }
           }
         ]
       },
       "Anything else":{
        "rich_text":[
           {
             "type":"text",
             "text":{
                 content:moreInfo
             }
           }
         ]
       },
       
      "Phone":{
       "rich_text":[
          {
            "type":"text",
            "text":{
              content:phoneNumber
            }
          }
        ]
      }
    }
  })
  console.log(response);
  console.log(process.env);
  console.log("success test");
 }catch(error){
  console.log(error);
 };
})

module.exports = app;