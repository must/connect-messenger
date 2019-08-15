const platform = require('connect-platform');
const Messenger = require('messenger-node');

let config = platform.config.get('messenger', {});

const messengerAPI = {
  _client: undefined,
  get client() {
    if(this._client == undefined) {
      this._client = new Messenger.Client(config.credentials);
    }
    return this._client;
  }
};

module.exports = messengerAPI
module.exports.config = config