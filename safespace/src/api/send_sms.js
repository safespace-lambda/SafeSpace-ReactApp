// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure


/* sample sending an SMS */

require('dotenv').config();
console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', process.env.TWILIO_ACCOUNT_SID);



const accountSid = 'AC1919ebb4da82e72c1304676487efebbe';
const authToken = '73f077db7483785c5c25c41b8e15e148';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+14694143109',
     to: '+17577449783'
   })
  .then(message => console.log(message.sid));
/******************************************************* */

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;
