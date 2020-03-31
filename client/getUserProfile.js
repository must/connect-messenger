/**
 *
 * getUserProfile
 *
 */
const platform = require('connect-platform');

const messengerAPI = require('../connection');

platform.core.node({
  path: '/fb/messaging/client/getUserProfile',

  public: false,

  method: 'GET',

  inputs: [ 'psid', 'fields' ],

  outputs: ['result', 'error'],

  controlOutputs: [],

  hints: {
    node: 'Send <span class="hl-blue">text</span> message to recipient <span class="hl-blue">recipient</span>.',

    inputs: {
      psid: 'psid Integer A valid user <span class="hl-blue">PSID</span>.',
      fields: 'fields Array<String> Optional. An array list of the user profile filds to retrieve. For a list of available fields, see the <a href="https://developers.facebook.com/docs/messenger-platform/identity/user-profile#fields">Messenger Platform docs</a>.'
    },
    
    outputs: {
      result: 'The returned <span class="hl-blue">result</span> object.',
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    },

    controlOutputs: { }
  }
},
  (inputs, output, control) => {
    messengerAPI.client.getUserProfile(inputs.psid, inputs.fields)
    .then(res => {
      // log the api response
      output('result', res);
    }).catch(err => {
      console.error(err);
      output('error', err.error);
    });
  }
);