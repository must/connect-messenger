/**
 *
 * sendTemplate
 *
 */
const platform = require('connect-platform');

const messengerAPI = require('../connection');

platform.core.node({
  path: '/fb/messaging/client/sendTemplate',

  public: false,

  method: 'POST',

  inputs: ['recipient', 'payload'],

  outputs: ['result', 'error'],

  controlOutputs: [ ],

  hints: {
    node: 'Send template <span class="hl-blue">payload</span> message to recipient <span class="hl-blue">recipient</span>.',

    inputs: {
      recipient: 'Recipient Object An object that describes the message recipient in the format: {<id_type>: <id>}. For example, sends to a PSID would be {"id": 123456}, to a phone number { "phone_number": "+1 (408) 444-4444"}.',
      payload: 'Template <span class="hl-blue">payload</span>.'
    },
    
    outputs: {
      result: 'The returned <span class="hl-blue">result</span> object.',
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    },

    controlOutputs: { }
  }
},
  (inputs, output, control) => {
    messengerAPI.client.sendTemplate(inputs.recipient, inputs.payload)
    .then(res => {
      output('result', res);
    }).catch(err => {
      console.error(err);
      output('error', err.error);
    });
  }
);