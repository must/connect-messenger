/**
 *
 * getMessagingInsights
 *
 */
const platform = require('connect-platform');

const messengerAPI = require('../connection');

platform.core.node({
  path: '/fb/messaging/client/sendText',

  public: false,

  method: 'POST',

  inputs: ['recipient', 'text'],

  outputs: ['result'],

  controlOutputs: ['error'],

  hints: {
    node: 'Send <span class="hl-blue">text</span> message to recipient <span class="hl-blue">recipient</span>.',

    inputs: {
      recipient: 'Recipient Object An object that describes the message recipient in the format: {<id_type>: <id>}. For example, sends to a PSID would be {"id": 123456}, to a phone number { "phone_number": "+1 (408) 444-4444"}.',
      text: 'Text String The text to send.'
    },
    
    outputs: {
      result: 'The returned <span class="hl-blue">result</span> object.'
    },

    controlOutputs: {
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    }
  }
},
  (inputs, output, control) => {
    messengerAPI.client.sendText(inputs.recipient, inputs.text)
    .then(res => {
      output('result', res);
    }).catch(err => {
      console.error(err);
      control('error');
    });
  }
);