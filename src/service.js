'use strict';

// Load external modules
const request = require('request-promise');

class Service {
  constructor(host, port) {
    this._host = host;
    this._port = port;
  }

  request(path, options) {
    return request(Object.assign({ method: 'GET' }, options, {
      uri: `http://${this._host}:${this._port}${path}`
    }));
  }
}

module.exports = Service;
