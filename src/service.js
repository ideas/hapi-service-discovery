'use strict';

// Load external modules
const Request = require('request-promise');

class Service {
  constructor(host, port) {
    this._host = host;
    this._port = port;
  }

  get(path, options) {
    return Request.get(`http://${this._host}:${this._port}${path}`, options);
  }
}

module.exports = Service;
