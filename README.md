# hapi-service-discovery

[![npm](https://img.shields.io/npm/v/@ideapod/hapi-service-discovery.svg)](https://www.npmjs.com/package/@ideapod/hapi-service-discovery)
[![Build Status](https://travis-ci.org/ideas/hapi-service-discovery.svg?branch=master)](https://travis-ci.org/ideas/hapi-service-discovery)
[![Dependency Status](https://david-dm.org/ideas/hapi-service-discovery.svg)](https://david-dm.org/ideas/hapi-service-discovery)

Service discovery plugin for the hapi framework.

## Installation

```sh
npm install --save @ideapod/hapi-service-discovery
```

## Configuration

The plugin accepts an `options` object where:
  - `services`: An array of service names.

```javascript
const plugin = {
  register: HapiServiceDiscovery,
  options: {
    services: ['auth', 'user']
  }
};
```

The plugin iterates through the `services` array and retrieves the necessary information from
environment variables. The environment variable format is `SERVICE_<service name>_HOST` and
`SERVICE_<service name>_PORT`. For example: `SERVICE_USER_HOST` and `SERVICE_USER_PORT`.

## Usage

### Registration

The plugin can be registered as a hapi plugin. Example:

```javascript
const Hapi = require('hapi');
const HapiServiceDiscovery = require('@ideapod/hapi-service-discovery');

const server = new Hapi.Server();
server.connection();

const plugin = {
  register: HapiServiceDiscovery,
  options: {
    services: ['auth', 'user']
  }
};

server.register(plugin, (err) => {
  // ...
});
```

### Exposed properties

Services are exposed under the `services` property.

```javascript
const UserService = server.plugins['hapi-service-discovery'].services.user;
```

Each exposed service has a `request()` method which makes a request to a configured service. The signature of the function is `request(path, options)` where:

  - `path`: The requested path (must begin with '/').
  - `options`: Optional request options.

```javascript
const UserService = server.plugins['hapi-service-discovery'].services.user;

UserService.request('/test', { method: 'POST', body: { test: 'test' }, json: true })
  .then((response) => {
    // ...
  });
```

Under the hood the plugin uses the [`request`](https://www.npmjs.com/package/request) module.
Options used in `request()` are directly passed to the `request` module.
