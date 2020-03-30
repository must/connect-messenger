/**
 *
 * callback POST
 *
 */
const platform = require('connect-platform');
const crypto = require('crypto');

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
    const SIG_HEADER_NAME = 'X-Hub-Signature';

    let req = context.req;
    let res = context.res;

    let body = req.body;

    if(messengerAPI.config.app.secret !== '') {
      const sig = req.get(SIG_HEADER_NAME) || '';

      const hmac = crypto.createHmac('sha1', messengerAPI.config.app.secret);;
      hmac.update(req.raw, 'utf-8');

      const checksum = Buffer.from(sig, 'utf8');
      const digest = Buffer.from('sha1=' + hmac.digest('hex'), 'utf8');

      if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
        console.error(`Request body digest (${digest}) did not match ${sig} (${checksum})`);

        res.sendStatus(404);
        return;
      }
    }
    
    const callback_nodes = Object.assign({
      message: "/callback/message", // parameters: sender_psid, message, webhook_event
      messaging_postback: "/callback/messaging_postback", // parameters: sender_psid, postback, webhook_event
      messaging_account_linking: "/callback/messaging_account_linking",
      messaging_checkout_updates: "/callback/messaging_checkout_updates",
      message_deliveries: "/callback/message_deliveries",
      message_echoes: "/callback/message_echoes",
      messaging_game_plays: "/callback/messaging_game_plays",
      messaging_handovers: "/callback/messaging_handovers",
      messaging_optins: "/callback/messaging_optins",
      messaging_payments: "/callback/messaging_payments",
      messaging_policy_enforcement: "/callback/messaging_policy_enforcement",
      messaging_pre_checkouts: "/callback/messaging_pre_checkouts",
      message_reads: "/callback/message_reads",
      messaging_referrals: "/callback/messaging_referrals",
      messaging_standby: "/callback/messaging_standby"
    }, messengerAPI.config.callback_nodes);

    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        const webhook_event = entry.messaging[0];
        const sender_psid = webhook_event.sender.id;
        const data = {
          sender_psid: sender_psid,
          webhook_event: webhook_event
        }

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          data.message = webhook_event.message;
          platform.call(callback_nodes.message, data);
        } else if (webhook_event.postback) {
          data.postback = webhook_event.postback;
          platform.call(callback_nodes.messaging_postback, data);
        } else if (webhook_event.read) {
          data.read = webhook_event.read;
          platform.call(callback_nodes.message_reads, data);
        } else if (webhook_event.optin) {
          data.optin = webhook_event.optin;
          platform.call(callback_nodes.messaging_optins, data);
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