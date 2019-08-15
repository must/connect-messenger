/**
 *
 * callback POST
 *
 */
const platform = require('connect-platform');

const messengerAPI = require('../connection');

platform.core.node({
  path: '/fb/messaging/webhook',

  public: true,

  method: 'POST',

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
    let req = context.req;
    let res = context.res;

    let body = req.body;
    
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {

        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        let sender_psid = webhook_event.sender.id;

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          platform.call(messengerAPI.config.callback_nodes.message, {
            sender_psid: sender_psid,
            message: webhook_event.message,
            webhook_event: webhook_event
          });
        } else if (webhook_event.postback) {
          platform.call(messengerAPI.config.callback_nodes.messaging_postback, {
            sender_psid: sender_psid,
            postback: webhook_event.postback,
            webhook_event: webhook_event
          });
        }
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }
);