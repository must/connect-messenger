/**
 *
 * callback GET
 *
 */
const platform = require('connect-platform');

const messengerAPI = require('../connection');

platform.core.node({
  path: '/fb/messaging/webhook',

  public: true,

  method: 'GET',

  inputs: [],

  outputs: [],

  controlOutputs: ['error'],

  hints: {
    node: 'Callback method from facebook messenger API.',

    inputs: {},
    
    outputs: {},

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control, _, context) => {
    console.log('ca;ll');
    let req = context.req;
    let res = context.res;

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = messengerAPI.config.credentials.verify_token;
    console.log('VERIFY_TOKEN', VERIFY_TOKEN);
    
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  }
);