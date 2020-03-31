const messengerAPI = require('../connection');
const util = require('.');

function callSendApiWithOptions(recipient, payload, options = {}) {  
  return new Promise (async (resolve, reject) => {
    if (!recipient) {
      reject('recipient object required');
    }

    if (!payload) {
      reject('payload required');      
    }

    let request_options = { 'path': '/me/messages' };

    if (payload.formData) {
      request_options.formData = payload.formData;
    } else {
      request_options.payload = new util.RequestPayload(recipient, payload);
      if (!request_options.payload) reject('error creating request payload');
    }

    Object.assign(request_options.payload, options);
    
    try {    
      let response = await messengerAPI.client.sendGraphRequest(request_options);  
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  callSendApiWithOptions
};