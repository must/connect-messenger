/**
 *
 * callSendAou
 *
 */
const platform = require('connect-platform');

const send = require('../util/send');

platform.core.node({
  path: '/fb/messaging/client/callSendApi',

  public: false,

  method: 'POST',

  inputs: ['recipient', 'payload', 'options'],

  outputs: ['result'],

  controlOutputs: ['error'],

  hints: {
    node: 'Send <span class="hl-blue">payload</span> to recipient <span class="hl-blue">recipient</span>.',

    inputs: {
      recipient: 'Recipient Object An object that describes the message recipient in the format: {<id_type>: <id>}. For example, sends to a PSID would be {"id": 123456}, to a phone number { "phone_number": "+1 (408) 444-4444"}.',
      payload: '<span class="hl-blue">Payload</span> to send.',
      options: '<span class="hl-blue">Options</span> to attach to the request.'
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
    send.callSendApiWithOptions(inputs.recipient, inputs.payload, inputs.options)
    .then(res => {
      output('result', res);
    }).catch(err => {
      console.error(err);
      control('error');
    });
  }
);