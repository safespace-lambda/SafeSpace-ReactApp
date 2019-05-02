// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure


/* sample sending an SMS */

require('dotenv').config();
// console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', process.env.TWILIO_ACCOUNT_SID);
// console.log('Your environment variable TWILIO_AUTH_TOKEN has the value: ', process.env.TWILIO_AUTH_TOKEN);
// console.log('Your environment variable TWILIO_NUMBER has the value: ', process.env.TWILIO_NUMBER);

//const accountSid
//const authToken

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)  

const cors = require('cors');
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())
app.post('/sms',(req,res) => {
  const {body,from,to} = req.body;
  client.messages
  .create({
     body: body,
     from: from,
     to: to
   })
  .then(message => {
    console.log(message.sid);
    res.json({message : 'message successfully sent'})
  });
})

const port = process.env.PORT || 8080;
app.listen(port,()=>{console.log(`listening on port ${port}`)})


/******************************************************* */



