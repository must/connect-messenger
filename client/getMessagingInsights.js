/**
 *
 * getMessagingInsights
 *
 */
const platform = require('connect-platform');

const messengerAPI = require('../connection');

platform.core.node({
  path: '/fb/messaging/client/getMessagingInsights',

  public: false,

  method: 'GET',

  inputs: ['metrics', 'since', 'until'],

  outputs: ['result', 'error'],

  controlOutputs: [ ],

  hints: {
    node: 'Get messaging insights according to the requested <span class="hl-blue">metrics</span>, <span class="hl-blue">since</span>, <span class="hl-blue">until</span>.',

    inputs: {
      metrics: 'The <span class="hl-blue">metrics</span> to be used.',
      since: 'The <span class="hl-blue">since</span> date.',
      until: 'The <span class="hl-blue">until</span> date.'
    },
    
    outputs: {
      result: 'The returned <span class="hl-blue">result</span> object.',
      error: 'This signals that something bad happened with the <span class="hl-blue">request</span>.'
    },

    controlOutputs: { }
  }
},
  (inputs, output, control) => {
    var params = {
      metrics: inputs.metrics,
      since: inputs.since,
      until: inputs.until
    };
    
    messengerAPI.client.getMessagingInsights(params)
    .then(res => {
      output('result', res);
    }).catch(err => {
      output('error', err.error);
    });
  }
);