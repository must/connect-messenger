const platform = require('connect-platform');
const Messenger = require('messenger-node');

let options = platform.config.get('messenger', {});

const messengerAPI = {
  _client: undefined,
  get client() {
    if(this._client == undefined) {
      this._client = new Messenger.Client(options.credentials);
    }
    return this._client;
  }
};

module.exports = messengerAPI